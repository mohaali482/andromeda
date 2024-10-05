import { Redis } from "@upstash/redis";
import { Request, Response } from "express";
import { Config } from "../types/config";
import { MarsRoverResponse } from "../types/mars-rover-photos";
import {
  validateCamera,
  validateEarthDate,
  validatePage,
  validateQueryParams,
  validateSol,
} from "../validators/mars-rover-photos";
import { fetchMarsRoverPhotos } from "../data/mars-rover-photos";
import { ROVERS } from "../constants/data";

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

    if (!validateCamera(rover, cameraQuery)) {
      res.status(400).json({
        error:
          "Invalid camera, choose from " +
          rover.cameras.map((camera) => `'${camera}'`).join(", "),
      });
      return;
    }

    if (!validateQueryParams(solQuery, earthDateQuery)) {
      res.status(400).json({
        error: "Cannot query by both earth_date and sol",
      });
      return;
    }

    if (!validateEarthDate(earthDateQuery)) {
      res.status(400).json({ error: "Invalid earth_date" });
      return;
    }

    if (!validateSol(solQuery)) {
      res.status(400).json({ error: "Invalid sol" });
      return;
    }

    if (!validatePage(pageQuery)) {
      res.status(400).json({ error: "Invalid page" });
      return;
    }

    const data = await fetchMarsRoverPhotos(
      config,
      redis,
      roverParam,
      cameraQuery,
      solQuery,
      earthDateQuery,
      pageQuery
    );

    if (!data) {
      res.status(500).json({ error: "Error fetching Mars Rover Photos" });
      return;
    }

    res.json(data);
  };
}
