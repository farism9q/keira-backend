const admin = require("firebase-admin");
const serviceAccount = require(`./${process.env.FIREBASE_ADMIN_FILENAME}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin.auth();
