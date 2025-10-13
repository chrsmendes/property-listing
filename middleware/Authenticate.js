const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json({
      success: false,
      message: 'You are not logged in. Please login or register.'
    });
  }
  next();
}

module.exports = isAuthenticated