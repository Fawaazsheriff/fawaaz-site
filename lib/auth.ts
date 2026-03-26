import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Hardcoded admin credentials (for now)
const ADMIN_EMAIL = 'admin@fawaz.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10); // Change this password!

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  if (email !== ADMIN_EMAIL) return false;
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function generateToken(email: string): string {
  return jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; role: string };
  } catch {
    return null;
  }
}
