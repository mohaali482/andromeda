import { Redis } from "@upstash/redis";
import { Config } from "../types/config";
import { MarsRoverResponse } from "../types/mars-rover-photos";

export async function fetchMarsRoverPhotos(
  config: Config,
  redis: Redis,
  roverParam: string,
  cameraQuery: string,
  solQuery: string,
  earthDateQuery: string,
  pageQuery: string
) {
  const cacheKey = `${roverParam}-${cameraQuery}-${
    solQuery ? solQuery : "no-sol"
  }-${earthDateQuery ? earthDateQuery : "no-earth-date"}-${pageQuery}`;

  try {
    const cachedData: MarsRoverResponse | null = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Mars Rover Photos found in cache", cacheKey);
      return cachedData;
    }
  } catch (error) {
    console.log("Error fetching Mars Rover Photos from cache", error);
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
    return data;
  } catch (error) {
    console.log("Error fetching Mars Rover Photos from API", error);
    return null;
  }
}
