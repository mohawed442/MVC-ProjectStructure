<div align="center">

# ⚡️ E-Commerce Auth Mini Framework

> 🧩 **مساعد توثيق وتسجيل دخول يشبه الفريم ورك!**

---

✨ مشروع صغير منظم، يحتوي فقط على صفحتين رئيسيتين: **Login** و **Signup**  
مبني بـ **Node.js + Express.js + MongoDB + JWT** وهيكلية **MVC** نظيفة.

<br/>

🎨 **واجهة README عصرية، ألوان مريحة للعين، وأيقونات جذابة!**

---

🌟 **لقطات متحركة توضيحية**
<br>

| 👤 <span style="color:#4fa3ff;">Login</span> | 📝 <span style="color:#50d890;">Signup</span> |
|:--:|:--:|
| ![Login Animation](https://github.com/mohamed-dev/assets/raw/main/login.gif) | ![Signup Animation](https://github.com/mohamed-dev/assets/raw/main/signup.gif) |

---

</div>

## 🏗️ هيكلية المشروع (MVC Project Structure)

```
E-commerce-auth/
│
├── 📂 src/
│   ├── 📂 config/
│   │   └── connect-mongo.js
│   ├── 📂 controllers/
│   │   └── auth.controller.js
│   ├── 📂 models/
│   │   └── user.model.js
│   ├── 📂 routes/
│   │   └── auth.routes.js
│   └── app.js
│
├── .env
├── package.json
└── README.md
```

---

## 🌐 صفحات المشروع

- **Signup** : إنشاء حساب جديد (الاسم، البريد، كلمة السر)
- **Login** : تسجيل الدخول (البريد، كلمة السر)  
  عند نجاح تسجيل الدخول ➜ يتم إرجاع **JWT Token** في الـ Response

---

## 🧩 نقطة هامة للمطورين

> 🛡️ **ملاحظة:**  
> ملفات الكنترولرز `auth.controller.js` الخاصة بـ **Login** و **Signup** يتم العمل عليها في فروع منفصلة (Branches)  
> **يجب عمل Merge للبرانشات الخاصة بكل من Login و Signup قبل النشر النهائي للمشروع!**
>
> مثال:
> - Branch: `feature/login-controller`
> - Branch: `feature/signup-controller`
>
> بعد الانتهاء من كل كنترولر يتم الدمج (Merge) إلى الفرع الرئيسي (`main`).

---

## 🧬 نموذج المستخدم (User Model)

```js
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 25, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

export default mongoose.models.User || model("User", userSchema);
```

---

## 🔗 الاتصال بقاعدة البيانات (MongoDB)

```js
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export default function dbConnect() {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Connected"))
    .catch((err) => console.log("❌ Database Error:", err));
}
```

---

## 🛣️ الراوتس (Routes)

```js
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
```

---

## 🧠 الكنترولرز (Controllers)

```js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await userModel.findOne({ email })) {
      return res.status(409).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashPassword });
    res.status(201).json({ message: "تم إنشاء الحساب بنجاح", user });
  } catch (e) {
    res.status(500).json({ message: "خطأ داخلي في الخادم" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "بيانات الدخول غير صحيحة" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "تم تسجيل الدخول بنجاح", token });
  } catch (e) {
    res.status(500).json({ message: "خطأ داخلي في الخادم" });
  }
};
```

---

## 🚀 ملف التطبيق الرئيسي (Main app.js)

```js
import express from "express";
import dbConnect from "./config/connect-mongo.js";
import router from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
dbConnect();

app.use("/", router);

app.listen(3000, () => console.log("🌐 Server running at: http://localhost:3000"));
```

---

## 🧩 إعدادات البيئة (Environment)

أنشئ ملف `.env` وضع به:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/test
JWT_SECRET=SECRET_KEY
```

---

## ⚡️ تشغيل المشروع

```bash
# تثبيت الحزم
npm install

# تشغيل السيرفر
npm run dev
```

---

## ✨ مزايا المشروع

- هيكلية MVC منظمة وسهلة التوسعة
- اتصال كامل بـ MongoDB
- Hashing لكلمات السر باستخدام bcrypt
- توثيق باستخدام JWT Token
- صفحات بسيطة وسريعة
- README متحرك وجذاب 🎨

---

## 🌈 معاينة لونية جميلة وأيقونات مميزة

<div align="center">

<img src="https://github.com/mohamed-dev/assets/raw/main/dark-preview.png" width="45%" style="border-radius:16px;box-shadow:0 0 8px #4fa3ff88" />
<img src="https://github.com/mohamed-dev/assets/raw/main/light-preview.png" width="45%" style="border-radius:16px;box-shadow:0 0 8px #50d89088" />

</div>

---

## 🌟 شعار ASCII متحرك

```
   ______      _                                      
  / ____/___  (_)___  ____  ____ ___  ____ _____  ___ 
 / /   / __ \/ / __ \/ __ \/ __ `__ \/ __ `/ __ \/ _ \
/ /___/ /_/ / / / / / /_/ / / / / / / /_/ / / / /  __/
/____/\____/_/_/ /_/\____/_/ /_/ /_/\__,_/_/ /_/\___/ 
```

---

<div align="center">

💙 تم التصميم بواسطة Mohamed  
🕓 الإصدار 1.0.0  
🚀 جاهز للنشر على GitHub

</div>
