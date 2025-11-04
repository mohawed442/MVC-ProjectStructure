import {mongoose} from "../config/connect-mongo.js" ;

const OTPSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 8,
    },
  },
  { timestamps: true }
);

OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 5 * 60 });

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
