import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TMDB_API_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
}); 