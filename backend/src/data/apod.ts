import { Redis } from "@upstash/redis";
import { ApodData } from "../types/apod";
import { Config } from "../types/config";

type Response = {
  status: number;
  data: ApodData | null;
  error: string | null;
};

export async function fetchAPOD(
  config: Config,
  redis: Redis,
  reqDate: string
): Promise<Response> {
  const cacheKey = `apod-${reqDate}`;

  try {
    const cachedData: ApodData | null = await redis.get(cacheKey);
    if (cachedData) {
      console.log("APOD Data found in cache", reqDate);
      return { status: 200, data: cachedData, error: null };
    }
  } catch (e) {
    console.log("Error fetching APOD data from cache", e);
  }

  let data: ApodData;
  try {
    const response = await fetch(
      `${config.nasaURL}/planetary/apod?api_key=${config.nasaApiKey}&date=${reqDate}`
    );

    if (!response.ok) {
      console.log("Error fetching APOD data", response.statusText);
      return {
        status: response.status,
        data: null,
        error: response.statusText,
      };
    }
    data = await response.json();
  } catch (e) {
    console.log("Error fetching APOD data", e);
    return null;
  }

  try {
    await redis.set(cacheKey, data);
    console.log("APOD Data saved in cache", reqDate);
  } catch (e) {
    console.log("Error saving APOD data in cache", e);
  }

  return { status: 200, data, error: null };
}
