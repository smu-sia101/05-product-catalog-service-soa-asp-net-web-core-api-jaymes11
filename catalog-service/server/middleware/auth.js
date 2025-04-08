require('dotenv').config();

const auth = (req, res, next) => {
  // Get user ID from header
  const userId = req.header('x-user-id');

  // Check if no user ID
  if (!userId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Set user ID in request
  try {
    req.user = { id: userId };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth; 