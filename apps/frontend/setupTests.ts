import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

// Polyfill for TextEncoder, which is used by some libraries in a browser context
// but might not be available in JSDOM environment by default.
// This is needed for react-router-dom in Jest environment.
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
