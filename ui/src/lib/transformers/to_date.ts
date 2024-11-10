export function toDate(date?: string | null) {
  return date ? new Date(date) : undefined;
}
