import jwt from 'jsonwebtoken';

// Middleware to verify the JWT token
export function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, "flamengo");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

export function generateToken(payload) {
  const token = jwt.sign(payload, "flamengo", { expiresIn: '1h' });
  return token;
}
