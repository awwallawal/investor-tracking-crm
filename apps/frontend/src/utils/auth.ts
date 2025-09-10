import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  role: 'Staff' | 'Portal Administrator' | 'Director-General';
  iat: number;
  exp: number;
}

export const getDecodedToken = (): DecodedToken | null => {
  const token = localStorage.getItem('authToken');
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }
  return null;
};
