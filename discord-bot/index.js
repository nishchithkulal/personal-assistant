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

  const content = message.content.trim();

  // Only handle !remind
  if (!content.startsWith("!remind")) return;

  const parts = content.split(/\s+/);

  // ❌ Missing arguments
  if (parts.length < 3) {
    return message.reply(
      `❌ Invalid format\n\nUse:\n!remind <time> <task>\n\nExample:\n!remind 10m Study`,
    );
  }

  const time = parts[1].toLowerCase();
  const task = parts.slice(2).join(" ");

  // ❌ Validate time format (number + m/h)
  const timeRegex = /^(\d+)(m|h)$/;
  const match = time.match(timeRegex);

  if (!match) {
    return message.reply(
      `❌ Invalid time format\n\nUse:\nm = minutes\nh = hours\n\nExample:\n!remind 10m Study`,
    );
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  // ❌ Min/Max validation
  if (unit === "m" && value < 1) {
    return message.reply("❌ Minimum time is 1 minute");
  }

  if (unit === "h" && value > 24) {
    return message.reply("❌ Maximum allowed is 24 hours");
  }

  // Convert to readable text
  const readableTime =
    unit === "m"
      ? `${value} minute${value > 1 ? "s" : ""}`
      : `${value} hour${value > 1 ? "s" : ""}`;

  try {
    await axios.post("http://localhost:5678/webhook/reminder", {
      time: time,
      task: task,
      user: message.author.username,
      userId: message.author.id
    });

    message.reply(`⏳ Reminder set in ${readableTime} for: ${task}`);
  } catch (error) {
    console.error(error);
    message.reply("❌ Failed to connect to system");
  }
});

client.login(TOKEN);
