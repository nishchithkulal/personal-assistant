import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.DISCORD_TOKEN;

client.once("ready", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!remind")) {
    const task = message.content.replace("!remind ", "");
    try {
      await axios.post("http://localhost:5678/webhook-test/reminder", {
        task: task,
        user: message.author.username,
      });

      message.reply(`✅ Reminder sent to system: ${task}`);
    } catch (error) {
      console.error(error);
      message.reply("❌ Failed to connect to n8n");
    }
  }
});

client.login(TOKEN);
