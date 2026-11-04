export function isComingSoon(status: string) {
  return status === "coming-soon";
}

export function isAvailable(status: string) {
  return !isComingSoon(status);
}
