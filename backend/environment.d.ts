declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      NASA_API_KEY: string;
      UPSTASH_URL: string;
      REDIS_TOKEN: string;
    }
  }
}

export {};
