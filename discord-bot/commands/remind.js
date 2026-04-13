import { sendToN8n } from "../services/n8nService.js";
import { parseReminder } from "../utils/parser.js";

export default async function handleRemind(message) {
  try {
    const input = message.content.replace("!remind ", "");

    const parsed = parseReminder(input);

    if (!parsed.valid) {
      return message.reply(
        "❌ Invalid format. Use: `!remind 10m do homework`"
      );
    }

    const { delay, task } = parsed;

    await sendToN8n({
      content: `⏰ Reminder: ${task}`,
      delay,
      userId: message.author.id,
      channelId: message.channel.id,
    });

    message.reply(`✅ Reminder set for: ${task}`);
  } catch (err) {
    console.error(err);
    message.reply("❌ Error setting reminder");
  }
}
