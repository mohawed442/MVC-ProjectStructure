# 🚀 Auth Framework Helper 🛠️

<p align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXpsY3l1NWhpMmV5MGZ0Y3l1bTlmb2trc3V3b2k5b3U4ZWFlNmpoeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ln7z2eWriiQAllfVcn/giphy.gif" width="220" alt="Framework Animation" />
</p>

<div align="center">

> ⚡️ مشروع مصغّر يشبه فريم‌ورك للتوثيق (Auth) — صفحتان فقط: Signup و Login — مبني بـ Node.js + Express + MongoDB + JWT — هيكلية MVC بسيطة ومنظمة.  
> الألوان مريحة، صور توضيحية، وانميشن للواجهة.

</div>

---

## 🎯 ملخص سريع
- صفحات المشروع: Signup (name, email, password) و Login (email, password).  
- بعد تسجيل الدخول الناجح يتم إرجاع JWT Token في الـ response.  
- متصل بقاعدة بيانات MongoDB ومستخدم Mongoose للنماذج.  
- كل الأكواد المهمة موضوعة هنا في ملف README واحد لسهولة النسخ واللصق.  
- تم إضافة صور ومقاطع GIF لواجهة العرض والتصميم.  
- ملاحظة فريق التطوير: اعمل فرع لكل ميزة (مثلاً feature/signup-controller و feature/login-controller) ثم قم بعمل Merge إلى main بعد الانتهاء.

---

## 🎨 معاينة مرئية (Preview)

| Login (Animated) | Signup (Animated) |
|:----------------:|:------------------:|
| ![Login Animation](https://github.com/mohamed-dev/assets/raw/main/login.gif) | ![Signup Animation](https://github.com/mohamed-dev/assets/raw/main/signup.gif) |

<p align="center">
  <img src="https://user-images.githubusercontent.com/45159366/235320093-df8d2b25-caa6-43e1-8c26-0cae46a1ce8e.png" width="420" alt="auth-structure" style="border-radius:10px;box-shadow:0 6px 18px rgba(79,163,255,0.18);" />
  <img src="https://user-images.githubusercontent.com/45159366/235320114-9f7c7b7d-f0a3-43f9-bc4f-282c5ddfc7ae.png" width="420" alt="auth-flow" style="border-radius:10px;box-shadow:0 6px 18px rgba(80,216,144,0.14);" />
</p>

---

## 📁 كل شيء هنا — ملفات وشرح سريع
فيما يلي الأكواد المطلوبة لكل جزء من المشروع موضوعة داخل هذا الملف لنسخها مباشرة إلى ملفات المشروع.

- src/models/user.model.js
- src/config/connect-mongo.js
- src/controllers/auth.controller.js
- src/routes/auth.routes.js
- src/app.js

تأكد من إنشاء ملف `.env` في جذر المشروع مع القيم التالية:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/test
JWT_SECRET=USER_SECRET
JWT_SECRETADMIN=ADMIN_SECRET
SALT=10
```

---

## src/models/user.model.js

```js
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: 3,
    maxlength: 25,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: "male"
  },
  address: {
    type: String,
  },
  image: String,
  confirmEmail: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: "user"
  }
}, { timestamps: true });

const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
```

---

## src/config/connect-mongo.js

```js
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env') });

console.log({ envPath: path.resolve('.env') });

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Connected"))
    .catch((err) => console.log("❌ Database Error:", err));
};

export default dbConnect;
```

---

## src/controllers/auth.controller.js

```js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

/*
  Signup controller
*/
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(409).json({ message: "هذا البريد الإلكتروني مسجل بالفعل" });
    }

    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT || "10"));

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
    return res.status(500).json({ message: "حدث خطأ داخلي في الخادم. حاول لاحقًا." });
  }
};

/*
  Login controller
*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "in-valid login Data" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({ message: "in-valid login Data" });
    }

    if (!user.confirmEmail) {
      return res.status(403).json({ message: "Please confirm your email before proceeding" });
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
        return res.status(401).json({ message: "login role invalid" });
    }

    return res.status(200).json({ message: "done", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
```

---

## src/routes/auth.routes.js

```js
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
```

---

## src/app.js

```js
import express from 'express';
import dbConnect from './config/connect-mongo.js';
import router from './routes/auth.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
dbConnect();

app.use("/", router);

app.listen(port, () => console.log(`🌐 Server running at: http://localhost:${port}`));
```

---

## ✅ تشغيل محلي سريع

1. انسخ الملفات أعلاه إلى مساراتهم داخل المشروع (src/...).
2. أنشئ ملف .env بالقيم المطلوبة (MONGO_URI, JWT_SECRET, JWT_SECRETADMIN, SALT).
3. ثبّت الحزم:
```bash
npm init -y
npm install express mongoose bcrypt jsonwebtoken dotenv
# لو تستخدم nodemon:
npm install -D nodemon
```
4. في package.json أضف سكربت تشغيل:
```json
"scripts": {
  "dev": "nodemon src/app.js",
  "start": "node src/app.js"
}
```
5. شغّل:
```bash
npm run dev
```

---

## 🎨 تصميم، ألوان، وأيقونات (ملاحظات مرئية)
- استخدمت لوحة ألوان مريحة: أزرق فاتح (#4fa3ff) و أخضر محيّي (#50d890) مع ظل خفيف للصور لراحة العين.  
- الأيقونات والـ GIFs موجودة في الأعلى لتجذب المشاهد وتوضح تدفق العمل بسرعة.  
- الصور المعروضة هي روابط عامة يمكنك استبدالها بروابط صور خاصة بمشروعك لتعطي طابعًا شخصيًا أكثر.

---

## 🛠️ Git workflow reminder
- لكل تغيّر كبير بالكنترولرز افتح فرع جديد:
  - feature/signup-controller
  - feature/login-controller
- بعد اختبار كل فرع، اعمل Pull Request و Merge إلى main. هذا يضمن عدم تداخل تغييرات الكنترولرز.

---

تم وضع كل المحتوى والكود داخل ملف README واحد كما طلبت، أزلت الـ ASCII art في النهاية، وأضفت صور وتصميمات مرئية جذابة وألوان مريحة. يمكنك الآن نسخ هذا الملف كما هو إلى README.md في المستودع. إذا تريد أغيّر الألوان أو أضيف صور مخصصة (ارفع روابط الصور أو قل لي النمط المرغوب) سأدرجها فورًا.
