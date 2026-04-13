import { parseRemindCommand } from "../utils/parser.js";
import { sendToN8n } from "../services/n8nService.js";

export async function handleRemind(message) {
  const parsed = parseRemindCommand(message.content);

  if (parsed.error) {
    return message.reply(`❌ ${parsed.error}`);
  }

  const { time, task, value, unit } = parsed;

  const readableTime =
    unit === "m"
      ? `${value} minute${value > 1 ? "s" : ""}`
      : `${value} hour${value > 1 ? "s" : ""}`;

  try {
    await sendToN8n({
      time,
      task,
      userId: message.author.id,
    });

    message.reply(`⏳ Reminder set in ${readableTime} for: ${task}`);
  } catch (err) {
    console.error(err);
    message.reply("❌ Failed to connect to system");
  }
}