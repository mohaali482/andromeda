export function isValidDate(date: Date): boolean {
  return date.toString() !== "Invalid Date";
}

export function isFutureDate(date: Date): boolean {
  return date > new Date();
}
