import axios from "axios";
import { ENV } from "../config/env.js";

export async function sendToN8n(data) {
  try {
    console.log("📡 Sending to n8n:", data);

    await axios.post(ENV.N8N_WEBHOOK_URL, data);

    console.log("✅ Sent to n8n");
  } catch (error) {
    console.error("❌ Error sending to n8n:", error.message);
    throw error;
  }
}
