import cors from "cors";
import express from "express";
import { Redis } from "@upstash/redis";
import { apiKey, nasaURL, port, redisToken, redisURL } from "./config";
import logger from "./middlewares/logger";
import apodHandler from "./controllers/apod";

const redis = new Redis({
  url: redisURL,
  token: redisToken,
});

const config = {
  apiKey,
  nasaURL,
  port: port,
};

const app = express();
app.use(express.json());

// CORS middleware
app.use(cors());
// Logger middleware
app.use(logger());

app.get("/apod", apodHandler(redis, config));

app.listen(port, () => {
  return console.log(`http://localhost:${port}`);
});
