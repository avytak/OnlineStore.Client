import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@shared/interfaces/jwt-payload';

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded?.id && decoded?.email) return decoded;
    return decoded;
  } catch {
    return null;
  }
}
