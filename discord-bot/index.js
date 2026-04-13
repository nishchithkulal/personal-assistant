import { Client, GatewayIntentBits } from "discord.js";
import { ENV } from "./config/env.js";
import handleRemind from "./commands/remind.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("clientReady", () => {
  console.log(`🤖 Bot is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!remind")) {
    await handleRemind(message);
  }
});

client.login(ENV.DISCORD_TOKEN);
