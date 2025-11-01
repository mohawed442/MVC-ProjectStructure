import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import { emailEvent } from "../utils/email-event.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import logger from "../utils/logger.js";
import generateCode from "../utils/generate-code.js";
import {
  generateOTPToken,
  generateAccessToken,
  generateRefreshToken,
  verifyOTPToken,
} from "../utils/jwt.js";

import User from "../models/user.model.js";
import OTP from "../models/OTP.model.js";

export const signup = async (req, res, next) => {
  const {
    userName,
    fullName,
    email,
    password,
    phoneNumber,
    gender,
    bio,
    DOB,
  } = req.body;



  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(new ApiError("This email is already registered", 409));
  }

  const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

  const encryptedPhone = CryptoJS.AES.encrypt(
    phoneNumber,
    process.env.ENCRYPT
  ).toString();

  const user = await User.create({
    userName,
    fullName,
    email,
    password: hashPassword,
    phoneNumber: encryptedPhone,
    gender,
    bio,
    date_of_birth: DOB,
  });

  const code = generateCode();
  await OTP.create({ userId: user._id, code });
  emailEvent.emit("sendConfirmEmail", { email, code });

  const token = generateOTPToken(String(user._id));

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 5 * 60 * 1000,
  };

  res.cookie("OTP_verification_token", token, cookieOptions);

  return res.status(201).json(
    new ApiResponse({
      message:
        "The account has been created successfully. Please check your email for verification.",
      status: "success",
    })
  );
};