import bcrypt from "bcryptjs";
import { emailEvent } from "../utils/email-event.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import generateCode from "../utils/generate-code.js";
import { generateOTPToken } from "../utils/jwt.js";
import User from "../models/user.model.js";
import OTP from "../models/OTP.model.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ApiError("in-valid login Data", 401));
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return next(new ApiError("in-valid login Data", 401));
  }

  const code = generateCode();
  await OTP.create({ userId: user._id, code });

  emailEvent.emit("sendConfirmEmail", { email, code });

  if (!user.isVerified) {
    return next(new ApiError(" user is not verified check your email", 403));
  }

  const token = generateOTPToken(String(user._id));
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 5 * 60 * 1000,
  };

  res.cookie("OTP_verification_token", token, cookieOptions);
  return res
    .status(200)
    .json(
      new ApiResponse({ message: "please check your email", success: true })
    );
};