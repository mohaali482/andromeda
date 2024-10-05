import { Redis } from "@upstash/redis";
import { Config } from "../types/config";
import { ApodData } from "../types/apod";
import { isFutureDate, isValidDate } from "../validators/apod";
import { fetchAPOD } from "../data/apod";

export default function apodHandler(redis: Redis, config: Config) {
  return async (req, res) => {
    const reqDate = req.query.date
      ? req.query.date.toString()
      : new Date().toISOString().split("T")[0];

    const reqDateObj = new Date(reqDate);

    if (!isValidDate(reqDateObj)) {
      console.log("Error parsing date", reqDate);
      res.status(400).json({ error: "Invalid date" });
      return;
    }

    if (isFutureDate(reqDateObj)) {
      console.log("Date cannot be in the future. Requested date:", reqDate);
      res.status(400).json({ error: "Date cannot be in the future" });
      return;
    }

    const data = await fetchAPOD(config, redis, reqDate);
    if (!data.data && data.status === 500) {
      res.status(500).json({ error: "Error fetching APOD data" });
      return;
    }

    if (!data.data && data.status !== 200) {
      res.status(data.status).json({ error: data.error });
      return;
    }

    res.json(data.data);
  };
}
