const jwt = require('jsonwebtoken');

// Middleware basado en sesión (para Passport)
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({
      success: false,
      message: 'You are not logged in. Please login or register.'
    });
  }
  next();
};

// Middleware basado en JWT (para rutas protegidas con token)
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


module.exports = { isAuthenticated, authMiddleware };
