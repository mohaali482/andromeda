import { Redis } from "@upstash/redis";
import { ApodData, Config } from "../types";

export default function apodHandler(redis: Redis, config: Config) {
  return async (req, res) => {
    const reqDate = req.query.date
      ? req.query.date.toString()
      : new Date().toISOString().split("T")[0];

    const reqDateObj = new Date(reqDate);

    if (reqDateObj.toString() === "Invalid Date") {
      console.log("Error parsing date", reqDate);
      res.status(400).json({ error: "Invalid date" });
      return;
    }

    if (reqDateObj > new Date()) {
      console.log("Date cannot be in the future. Requested date:", reqDate);
      res.status(400).json({ error: "Date cannot be in the future" });
      return;
    }

    const cachedData: ApodData | null = await redis.get(`apod-${reqDate}`);
    if (cachedData) {
      console.log("APOD Data found in cache", reqDate);
      res.json(cachedData);
      return;
    }

    const response = await fetch(
      `${config.nasaURL}/planetary/apod?api_key=${config.apiKey}&date=${reqDate}`
    );

    if (!response.ok) {
      console.log("Error fetching APOD data", response.statusText);
      res.status(response.status).json({ error: response.statusText });
      return;
    }

    const data: ApodData = await response.json();

    await redis.set(`apod-${reqDate}`, data);
    console.log("APOD Data saved in cache", reqDate);
    res.json(data);
  };
}
