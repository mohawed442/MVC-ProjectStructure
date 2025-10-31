<h1 align="center">
  🚀 Auth Framework Helper 🛠️  
</h1>

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXpsY3l1NWhpMmV5MGZ0Y3l1bTlmb2trc3V3b2k5b3U4ZWFlNmpoeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ln7z2eWriiQAllfVcn/giphy.gif" width="200" alt="Framework Animation" />
</p>

<p align="center">
  مشروع مساعد يشبه <strong>Framework</strong> جاهز لبناء نظام تسجيل دخول وتسجيل حساب بسيط باستخدام <strong>Node.js + Express + MongoDB</strong> 🚀  
</p>

---

## 🧱 هيكلة المشروع (Project Structure)

📦 back-End
┣ 📂 src
┃ ┣ 📂 config
┃ ┃ ┗ 📜 connect-mongo.js ← الاتصال بقاعدة البيانات MongoDB
┃ ┣ 📂 controllers
┃ ┃ ┗ 📜 auth.controller.js ← يحتوي على دوال login و signup
┃ ┣ 📂 models
┃ ┃ ┗ 📜 user.model.js ← موديل المستخدم (name, email, password, ...)
┃ ┣ 📂 routes
┃ ┃ ┗ 📜 auth.routes.js ← الراوتر الأساسي للمصادقة
┃ ┗ 📜 app.js ← نقطة تشغيل السيرفر
┣ 📜 .env ← متغيرات البيئة (MONGO_URI, JWT_SECRET...)
┗ 📜 README.md ← الملف التوضيحي (أنت هنا 😎)

yaml
Copy code

---

## 🧬 الموديل (User Model)
```js
import mongoose, { Schema , model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 25, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, enum: ['male', 'female'], default: "male" },
  address: String,
  image: String,
  confirmEmail: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: "user" }
},{timestamps : true});

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
⚙️ الاتصال بقاعدة البيانات (MongoDB)
js
Copy code
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('.env') });

const dbConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("✅ Connected to MongoDB"))
    .catch((err)=>console.log("❌ Database connection error:", err))
}

export default dbConnect
🚀 نقطة التشغيل (Server Entry)
js
Copy code
import dbConnect from './config/connect-mongo.js';
import router from './routes/auth.routes.js';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
dbConnect();
app.use("/", router);

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
🧭 الراوتر (Routes)
js
Copy code
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
🧩 الكنترولر (Controller)
✳️ Signup
js
Copy code
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await userModel.findOne({ email });
    if (checkUser) return res.status(409).json({ message: "البريد الإلكتروني مسجل بالفعل" });

    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SOLT));
    const user = await userModel.create({ name, email, password: hashPassword });

    return res.status(201).json({ message: "تم إنشاء الحساب بنجاح.", user });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "خطأ في السيرفر." });
  }
};
🔑 Login
js
Copy code
export const login = async (req , res)=>{
  try {
    const { email , password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message:"بيانات تسجيل الدخول غير صحيحة" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(404).json({ message:"بيانات تسجيل الدخول غير صحيحة" });

    if (!user.confirmEmail) {
      return res.status(403).json({ message: "يرجى تأكيد البريد الإلكتروني أولاً" });
    }

    let token;
    switch (user.role) {
      case "user":
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        break;
      case "admin":
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRETADMIN, { expiresIn: "1h" });
        break;
      default:
        return res.status(401).json({ message: "دور المستخدم غير صالح" });
    }

    return res.status(200).json({ message: "تم تسجيل الدخول بنجاح", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "حدث خطأ داخلي في الخادم." });
  }
};
🎨 واجهة المشروع (Animation Preview)
<p align="center"> <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3A5eHZraW9vZDFubnYwbXZ6ZGczOGJ6OTRybmRycjVkOHg1am11NCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JtBZm8yGdF3Xy/giphy.gif" width="450" alt="Animation Example" /> </p>
🪄 مميزات المشروع
✅ نظام تسجيل دخول وتسجيل حساب كامل
✅ استخدام JWT لتأمين الجلسات
✅ التحقق من البريد الإلكتروني
✅ بنية نظيفة على أسلوب MVC
✅ سهل التوسيع لأي مشروع أكبر
✅ ألوان مريحة للعين وتصميم جذاب 💙

⚡ أوامر التشغيل
bash
Copy code
# تثبيت الحزم
npm install

# إنشاء ملف .env
MONGO_URI=mongodb+srv://<your-cluster>
JWT_SECRET=yourSecret
JWT_SECRETADMIN=adminSecret
SOLT=8

# تشغيل المشروع
npm run dev
💬 تواصل معي
📧 Email: yourmail@example.com
🐙 GitHub: YourGitHubProfile
🌐 Website: yourwebsite.com

<h3 align="center"> ✨ تم تصميم هذا المشروع بحب ❤️ باستخدام Node.js و Express ✨ </h3> ```
