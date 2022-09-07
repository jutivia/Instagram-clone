const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema(
  {
    uniqueString: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User-verifications", UserVerificationSchema);