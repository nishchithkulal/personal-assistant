import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;