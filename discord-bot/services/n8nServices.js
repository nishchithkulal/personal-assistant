import axios from "axios";
import { N8N_WEBHOOK_URL } from "../config/env.js";

export async function sendToN8n(data) {
  return axios.post(N8N_WEBHOOK_URL, data);
}