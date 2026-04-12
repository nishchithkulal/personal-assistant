import { Client, GatewayIntentBits } from "discord.js";
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

    message.reply(`✅ Reminder set for: ${task}`);
  }
});

client.login(TOKEN);
