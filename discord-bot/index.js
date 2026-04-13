import { Client, GatewayIntentBits } from "discord.js";
import { DISCORD_TOKEN } from "./config/env.js";
import { handleRemind } from "./commands/remind.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim().toLowerCase();

  if (content.startsWith("!remind")) {
    return handleRemind(message);
  }
});

client.login(DISCORD_TOKEN);