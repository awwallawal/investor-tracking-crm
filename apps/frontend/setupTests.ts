import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

// Polyfill TextEncoder for Jest / JSDOM
if (typeof (global as any).TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder;
}

// Set a default for Jest environment
process.env.VITE_API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
