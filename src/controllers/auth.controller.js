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
} from "../utils/jwt.js";

import User from "../models/user.model.js";
import OTP from "../models/OTP.model.js";

// 🟢 تسجيل حساب جديد
export const signup = async (req, res, next) => {
  try {
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

    // التحقق من وجود المستخدم مسبقًا
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(new ApiError("This email is already registered", 409));
    }

    // تشفير الباسورد
    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    // تشفير رقم الهاتف
    const encryptedPhone = CryptoJS.AES.encrypt(
      phoneNumber,
      process.env.ENCRYPT
    ).toString();

    // إنشاء المستخدم
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

    // توليد كود تحقق وإرساله عبر الإيميل
    const code = generateCode();
    await OTP.create({ userId: user._id, code });
    emailEvent.emit("sendConfirmEmail", { email, code });

    const token = generateOTPToken(String(user._id));

    return res.status(201).json(
      new ApiResponse({
        message:
          "Account created successfully. Please check your email for verification.",
        success: true,
      })
    );
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // التحقق من وجود المستخدم
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError("Invalid login data", 401));
    }
