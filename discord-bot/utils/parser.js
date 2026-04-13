export function parseReminder(input) {
  const match = input.match(/^(\d+)([smhd])\s+(.+)$/);

  if (!match) {
    return { valid: false };
  }

  const value = parseInt(match[1]);
  const unit = match[2];
  const task = match[3];

  let delay = 0;

  switch (unit) {
    case "s":
      delay = value * 1000;
      break;
    case "m":
      delay = value * 60 * 1000;
      break;
    case "h":
      delay = value * 60 * 60 * 1000;
      break;
    case "d":
      delay = value * 24 * 60 * 60 * 1000;
      break;
    default:
      return { valid: false };
  }

  return {
    valid: true,
    delay,
    task,
  };
}
