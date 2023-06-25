import jwt from 'jsonwebtoken';

// Middleware to verify the JWT token
export function authenticateToken(req, res, next) {
  // Get the token from the request headers, query parameters, or cookies
  const token = req.headers.authorization?.split(' ')[1] || req.query.token || req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "flamengo");
    req.user = decoded; // Attach the decoded payload to the request object
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Generate a JWT token with a payload
export function generateToken(payload) {
  const token = jwt.sign(payload, "flamengo", { expiresIn: '1h' });
  return token;
}
