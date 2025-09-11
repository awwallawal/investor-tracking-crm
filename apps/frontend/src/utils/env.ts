// src/utils/env.ts
/**
 * Returns the base API URL depending on environment.
 * - Uses VITE_API_BASE_URL if set (for prod or staging)
 * - Defaults to localhost for development
 * Ensures only a single '/api/v1' at the end.
 */
export const getApiBaseUrl = (): string => {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  const base = envBase || "http://localhost:3000";

  // Avoid double '/api/v1'
  if (base.endsWith("/api/v1")) {
    return base;
  }

  // Remove trailing slash if present, then append '/api/v1'
  return `${base.replace(/\/$/, "")}/api/v1`;
};
