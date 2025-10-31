<div align="center">

# ⚡️ E-Commerce Auth Mini Framework

✨ مشروع بسيط يشبه Framework صغير، يحتوي على صفحات **Login** و **Signup** متصلة بقاعدة بيانات MongoDB  
مع استخدام **Express.js + Mongoose + JWT + bcrypt**.

<br/>

🚀 **مبني بلغة Node.js (ES Modules)**  
🧩 **يعتمد على هيكلية MVC منظمة**  
🎨 **تصميم README جذاب مع ألوان مريحة للعين**

---

🌈 **لقطات توضيحية (Animated Preview)**

| 👤 Login Page | 📝 Signup Page |
|:--------------:|:----------------:|
| ![Login Animation](https://github.com/mohamed-dev/assets/raw/main/login.gif) | ![Signup Animation](https://github.com/mohamed-dev/assets/raw/main/signup.gif) |

---

</div>

## 📁 Project Structure

```
E-commerce-f/
│
├── 📂 src/
│ ├── 📂 config/
│ │ └── connect-mongo.js
│ │
│ ├── 📂 controllers/
│ │ └── auth.controller.js
│ │
│ ├── 📂 models/
│ │ └── user.model.js
│ │
│ ├── 📂 routes/
│ │ └── auth.routes.js
│ │
│ └── app.js
│
├── .env
├── package.json
└── README.md
```

---

## 🧠 فكرة المشروع

المشروع ده عبارة عن **نظام تسجيل دخول وتسجيل مستخدمين** بسيط جدًا، لكنه مبني بطريقة منظمة تشبه الـ Framework.  
يحتوي فقط على صفحتين رئيسيتين:

- **Signup** ➜ لإنشاء حساب جديد.  
- **Login** ➜ لتسجيل الدخول وإرجاع JWT Token في الـ Response.

---

## ⚙️ الإعدادات (Environment)

قم بإنشاء ملف `.env` في جذر المشروع وأضف الآتي:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/test
JWT_SECRET=USER_SECRET
JWT_SECRETADMIN=ADMIN_SECRET
SALT=10
```

---

## 🧩 Models

### 📄 user.model.js

```js
import mongoose, { Schema , model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength : 3 ,
    maxlength : 25 ,
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
    default : "male"
  },
  address: String,
  image: String,
  confirmEmail: {
    type: Boolean,
    default: false
  },
  role:{
    type: String,
    enum: ['user', 'admin'],
    default : "user"
  }
},{timestamps : true})

const userModel = mongoose.models.User || model("User", userSchema) ;
export default userModel;
```

---

## ⚙️ Database Connection

### 📄 connect-mongo.js

```js
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path: path.resolve('.env') });

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("✅ Database Connected"))
    .catch((err)=>console.log("❌ Database Error:", err))
}

export default dbConnect;
```

---

## 🧭 Routes

### 📄 auth.routes.js

```js
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
```

---

## 🧠 Controllers

### 📄 auth.controller.js

```js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(409).json({ message: "هذا البريد الإلكتروني مسجل بالفعل" });
    }

    const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

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
    return res.status(500).json({ message: "حدث خطأ داخلي في الخادم." });
  }
};


export const login = async (req, res) => {
  try {
    const  {email , password } = req.body;
    const user = await userModel.findOne({email});

    if (!user) return res.status(404).json({message:"بيانات تسجيل دخول غير صحيحة"});

    const match = await bcrypt.compare(password,user.password);
    if (!match) return res.status(404).json({message:"كلمة المرور غير صحيحة"});

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

    return res.status(200).json({message : "تم تسجيل الدخول بنجاح" , token});
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({message: 'حدث خطأ داخلي في الخادم'});
  }
};
```

---

## 🚀 Main App

### 📄 app.js

```js
import express from 'express'
import dbConnect from './config/connect-mongo.js';
import router from './routes/auth.routes.js';

const app = express();
const port = 3000;

app.use(express.json());
dbConnect();

app.use("/", router);

app.listen(port, () => console.log(`🌐 Server running at: http://localhost:${port}`));
```

---

## 🧰 أوامر التشغيل

```bash
# تثبيت الحزم
npm install

# تشغيل السيرفر
npm run dev
```

---

## ✨ مزايا المشروع

✅ هيكلية MVC منظمة  
✅ اتصال كامل بـ MongoDB  
✅ Hashing باستخدام bcrypt  
✅ JWT Tokens للتوثيق  
✅ سهولة التطوير والتوسع مستقبلاً  
✅ تصميم README جميل ومتحرك ✨

---

## 🌟 أنميشن شعار (ASCII Art)

```
   ______      _                                      
  / ____/___  (_)___  ____  ____ ___  ____ _____  ___ 
 / /   / __ \/ / __ \/ __ \/ __ `__ \/ __ `/ __ \/ _ \
/ /___/ /_/ / / / / / /_/ / / / / / / /_/ / / / /  __/
\____/\____/_/_/ /_/\____/_/ /_/ /_/\__,_/_/ /_/\___/ 
                                                      
```

---

## 🧩 معاينة لونية جميلة (Dark + Light)

🌙 الوضع الداكن	☀️ الوضع الفاتح

---

<div align="center">
💙 تم التصميم بواسطة Mohamed  
📦 Framework-Like Auth Template  
🕓 الإصدار 1.0.0  
🚀 جاهز للنشر على GitHub  
</div>
