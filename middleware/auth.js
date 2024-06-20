const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Update with the correct path
// const serviceAccount = require('../path/to/serviceAccountKey.json'); // Replace with the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  console.log("Authorization header:", req.headers.authorization); // Debugging line
  // console.log("Token:", token); // Debugging line

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // console.log("Decoded Token:", decodedToken); // Debugging line
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Token verification error:", error); // Debugging line
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
