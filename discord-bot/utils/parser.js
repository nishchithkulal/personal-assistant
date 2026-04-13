export function parseRemindCommand(content) {
  const parts = content.trim().split(/\s+/);

  if (parts.length < 3) {
    return { error: "Invalid format" };
  }

  const time = parts[1].toLowerCase();
  const task = parts.slice(2).join(" ");

  const match = time.match(/^(\d+)(m|h)$/);

  if (!match) {
    return { error: "Invalid time format" };
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  if (unit === "m" && value < 1) {
    return { error: "Minimum time is 1 minute" };
  }

  if (unit === "h" && value > 24) {
    return { error: "Maximum 24 hours allowed" };
  }

  return { time, task, value, unit };
}