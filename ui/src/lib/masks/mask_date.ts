type Options = {
  now?: Date | undefined;
};

export function maskDate(date: Date, options?: Options) {
  const now = options?.now ?? new Date();

  if (
    now.getDate() === date.getDate() && now.getFullYear() === date.getFullYear()
  ) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h12",
    });
  }

  if (
    now.getDate() > date.getDate() &&
    now.getFullYear() === date.getFullYear()
  ) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  });
}
