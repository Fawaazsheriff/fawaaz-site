import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Admin credentials and signing secret come from environment variables
// (set them in Netlify → Project configuration → Environment variables).
//   ADMIN_EMAIL     – the email used to log into /admin/login
//   ADMIN_PASSWORD  – the admin password
//   JWT_SECRET      – a long random string used to sign login sessions

const isProd = process.env.NODE_ENV === 'production';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (isProd) throw new Error('JWT_SECRET environment variable is not set');
  return 'dev-only-secret-change-me';
}

let cachedHash: string | null = null;
function getAdminPasswordHash(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  if (!cachedHash) cachedHash = bcrypt.hashSync(password, 10);
  return cachedHash;
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const hash = getAdminPasswordHash();
  // If credentials are not configured, nobody can log in.
  if (!adminEmail || !hash) return false;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) return false;
  return await bcrypt.compare(password, hash);
}

export function generateToken(email: string): string {
  return jwt.sign({ email, role: 'admin' }, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    return jwt.verify(token, getJwtSecret()) as { email: string; role: string };
  } catch {
    return null;
  }
}
