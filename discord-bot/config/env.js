import dotenv from "dotenv";

// load env from root folder
dotenv.config({ path: "../.env" });

export const ENV = {
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || "http://n8n:5678/webhook/reminder",
};

// Optional safety check
if (!ENV.DISCORD_TOKEN) {
  throw new Error("❌ DISCORD_TOKEN is missing in .env");
}
