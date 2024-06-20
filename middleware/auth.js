const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Update with the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
