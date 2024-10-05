import { Redis } from "@upstash/redis";
import { Request, Response } from "express";
import { Config } from "../types/config";
import { MarsRoverResponse } from "../types/mars-rover-photos";

const ROVERS = [
  {
    name: "curiosity",
    cameras: ["fhaz", "rhaz", "mast", "chemcam", "mahli", "mardi", "navcam"],
  },
  {
    name: "opportunity",
    cameras: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
  },
  {
    name: "spirit",
    cameras: ["fhaz", "rhaz", "navcam", "pancam", "minites"],
  },
];

export default function marsRoverPhotosHandler(redis: Redis, config: Config) {
  return async (req: Request, res: Response) => {
    const roverParam = req.params.rover.toString();

    const cameraQuery = req.query.camera
      ? req.query.camera.toString().toLowerCase()
      : "all";
    const solQuery = req.query.sol ? req.query.sol.toString() : "";
    const earthDateQuery = req.query.earth_date
      ? req.query.earth_date.toString()
      : "";
    const pageQuery = req.query.page ? req.query.page.toString() : "1";

    const rover = ROVERS.find((r) => r.name === roverParam);
    if (!rover) {
      console.log("Invalid rover name", roverParam);
      res.status(400).json({
        error:
          "Invalid rover name, make sure to choose from 'curiosity', 'opportunity' and 'spirit'.",
      });
      return;
    }

    if (
      cameraQuery &&
      cameraQuery !== "all" &&
      !rover.cameras.includes(cameraQuery)
    ) {
      console.log("Invalid camera name", cameraQuery);
      res.status(400).json({
        error:
          "Invalid camera, choose from " +
          rover.cameras.map((camera) => `'${camera}'`).join(", "),
      });
      return;
    }

    if (earthDateQuery && solQuery) {
      res.status(400).json({
        error: "Cannot query by both earth_date and sol",
      });
      return;
    }

    if (!earthDateQuery && !solQuery) {
      res.status(400).json({
        error: "Must query by either earth_date or sol",
      });
      return;
    }

    if (earthDateQuery && earthDateQuery.match(/\d{4}-\d{2}-\d{2}/) === null) {
      if (new Date(earthDateQuery) > new Date()) {
        console.log("Earth date cannot be in the future", earthDateQuery);
        res.status(400).json({ error: "Earth date cannot be in the future" });
        return;
      }
      if (new Date(earthDateQuery).toString() === "Invalid Date") {
        console.log("Error parsing earth_date", earthDateQuery);
        res.status(400).json({ error: "Invalid earth_date" });
        return;
      }
    }

    if (solQuery && isNaN(parseInt(solQuery))) {
      console.log("Error parsing sol", solQuery);
      res.status(400).json({ error: "Invalid sol" });
      return;
    }

    if (pageQuery && isNaN(parseInt(pageQuery))) {
      console.log("Error parsing page", pageQuery);
      res.status(400).json({ error: "Invalid page" });
      return;
    }

    const cacheKey = `${roverParam}-${cameraQuery}-${
      solQuery ? solQuery : "no-sol"
    }-${earthDateQuery ? earthDateQuery : "no-earth-date"}-${pageQuery}`;

    try {
      const cachedData: MarsRoverResponse | null = await redis.get(cacheKey);
      if (cachedData) {
        console.log("Mars Rover Photos found in cache", cacheKey);
        res.json(cachedData);
        return;
      }
    } catch (e) {
      console.log("Error fetching Mars Rover Photos from cache", e);
    }

    const params = new URLSearchParams();
    params.append("api_key", config.nasaApiKey);
    params.append("page", pageQuery);

    if (cameraQuery && cameraQuery !== "all") {
      params.append("camera", cameraQuery);
    }

    if (earthDateQuery) {
      params.append("earth_date", earthDateQuery);
    } else {
      params.append("sol", solQuery);
    }

    const apiUrl = `${
      config.nasaURL
    }/mars-photos/api/v1/rovers/${roverParam}/photos?${params.toString()}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Mars Rover Photos fetched from API", apiUrl);
      try {
        await redis.set(cacheKey, data);
        console.log("Mars Rover Photos saved in cache", cacheKey);
      } catch (e) {
        console.log("Error saving Mars Rover Photos in cache", e);
      }
      res.json(data);
    } catch (error) {
      console.log("Error fetching Mars Rover Photos from API", error);
      res.status(500).json({ error: "Failed to fetch Mars Rover Photos" });
    }
  };
}
