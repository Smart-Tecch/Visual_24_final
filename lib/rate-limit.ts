type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Simple in-memory limiter for form spam. Fine for a single server instance. */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (current.count >= limit) {
    return { ok: false };
  }
  current.count += 1;
  return { ok: true };
}
