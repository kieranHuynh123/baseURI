const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../thai-sproject-firebase-adminsdk-e59ok-3cb7c69e99.json");
const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});
require('dotenv').config();
const storageRef = admin.storage().bucket(process.env.STORAGEREF);


async function uploadFile(path, filename) {
    const storage = await storageRef.upload(path, {
      public: true,
      destination: `/metadata/${filename}`,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    });
    
    return storage[0].metadata.mediaLink;
}

module.exports = { uploadFile};