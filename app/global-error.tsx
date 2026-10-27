"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // ! Log the error to an error reporting service (e.g., Sentry, Honeybadger)
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen font-sans text-center p-5">
          <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
            Something went critically wrong!
          </h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            {error.message || "An unexpected error occurred on our servers."}
          </p>
          <button onClick={() => reset()} className="px-5 py-2.5">
            Reload application
          </button>
        </div>
      </body>
    </html>
  );
}
