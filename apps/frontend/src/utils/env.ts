// src/utils/env.ts
export const getApiBaseUrl = (): string => {
  // Use process.env for tests (Jest/Node) and fallback
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
};
