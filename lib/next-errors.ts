import { unstable_rethrow } from "next/navigation";

/** Let Next.js keep control of prerender interrupts, redirects, and notFound(). */
export function rethrowNext(error: unknown) {
  unstable_rethrow(error);
}
