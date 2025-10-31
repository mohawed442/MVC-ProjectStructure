import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;


    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res
        .status(409)
        .json({ message: "هذا البريد الإلكتروني مسجل بالفعل" });
    }

    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SOLT)
    );


    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "تم إنشاء الحساب بنجاح. يرجى تأكيد البريد الإلكتروني.",
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم. حاول لاحقًا." });
  }
};