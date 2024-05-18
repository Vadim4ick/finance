import { defineConfig } from "drizzle-kit";

import { config } from "dotenv";

config({ path: ".env" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/app/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});