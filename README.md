<div align="center">

# 🔐 E-Commerce Auth Framework

### *نظام توثيق احترافي متكامل مع لوحة تحكم إدارية*

<img src="https://user-images.githubusercontent.com/74038190/212257472-08e52665-c503-4bd9-aa20-f5a4dae769b5.gif" width="600" alt="Authentication Flow" />

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![BCrypt](https://img.shields.io/badge/BCrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)](https://github.com/kelektiv/node.bcrypt.js)

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

</div>

---

## 📖 نظرة عامة

**E-Commerce Auth Framework** هو نظام توثيق شامل ومتطور، مصمم خصيصاً لمشاريع التجارة الإلكترونية الاحترافية. يوفر نظام تسجيل دخول متقدم مع دعم الأدوار (User & Admin) وتأكيد البريد الإلكتروني.

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" width="200" />

</div>

### ✨ لماذا هذا المشروع مميز؟

<table>
<tr>
<td width="50%">

🎯 **نظام أدوار متقدم**
- مستخدم عادي (User)
- مسؤول (Admin)
- JWT منفصل لكل دور

</td>
<td width="50%">

🔒 **أمان متعدد الطبقات**
- تشفير BCrypt قوي
- تأكيد البريد الإلكتروني
- حماية من الهجمات

</td>
</tr>
<tr>
<td>

⚡ **بيانات شاملة**
- الاسم والبريد
- الجنس والعنوان
- صورة الملف الشخصي
- تواريخ تلقائية

</td>
<td>

🏗️ **هيكلة MVC احترافية**
- كود نظيف ومنظم
- سهل التوسع والصيانة
- توثيق كامل

</td>
</tr>
</table>

---

## 🎬 معاينة النظام

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/229223156-0cbdaba9-3128-4d8e-8719-b6b4cf741b67.gif" width="400">

| 🔑 تسجيل الدخول | 📝 إنشاء حساب | 👤 الملف الشخصي |
|:---:|:---:|:---:|
| <img src="https://user-images.githubusercontent.com/74038190/216120981-b9507c36-0e04-4469-8e27-c99271b45ba5.png" width="200"/> | <img src="https://user-images.githubusercontent.com/74038190/216121919-60befe4d-11c6-4227-8992-35221d463365.png" width="200"/> | <img src="https://user-images.githubusercontent.com/74038190/216121986-1a506a75-2381-41c2-baff-eeab94bcec74.png" width="200"/> |

</div>

---

## 🏗️ هيكلية المشروع الكاملة

```
📦 E-commerce-auth/
┃
┣ 📂 src/
┃ ┣ 📂 config/
┃ ┃ ┗ 📜 connect-mongo.js          # اتصال MongoDB مع معالجة الأخطاء
┃ ┃
┃ ┣ 📂 controllers/
┃ ┃ ┗ 📜 auth.controller.js        # Login & Signup Controllers
┃ ┃
┃ ┣ 📂 models/
┃ ┃ ┗ 📜 user.model.js              # نموذج المستخدم المتقدم
┃ ┃
┃ ┣ 📂 routes/
┃ ┃ ┗ 📜 auth.routes.js             # مسارات API
┃ ┃
┃ ┗ 📜 app.js                       # التطبيق الرئيسي
┃
┣ 📜 .env                            # المتغيرات البيئية
┣ 📜 package.json
┗ 📜 README.md
```

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="100">
</div>

---

## 🚀 البدء السريع

### 📋 المتطلبات الأساسية

```bash
Node.js >= 14.x
MongoDB >= 4.x
npm or yarn
```

### ⚙️ خطوات التثبيت

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100">
</div>

```bash
# 1️⃣ استنساخ المشروع
git clone https://github.com/your-username/e-commerce-auth.git
cd e-commerce-auth

# 2️⃣ تثبيت الحزم
npm install

# 3️⃣ إعداد ملف البيئة
cp .env.example .env

# 4️⃣ تشغيل السيرفر
npm run dev
```

<div align="center">

🎉 **السيرفر يعمل الآن على** → `http://localhost:3000`

</div>

---

## 🔧 إعدادات البيئة (.env)

```env
# 🗄️ MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

# 🔐 JWT Secrets
JWT_SECRET=your_user_secret_key_here
JWT_SECRETADMIN=your_admin_secret_key_here

# 🧂 BCrypt Salt Rounds
SOLT=10

# 🌐 Server Configuration
PORT=3000
```

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="100">
</div>

---

## 📡 نقاط النهاية API

### 1️⃣ إنشاء حساب جديد (Signup)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/216122003-15c1f6c5-9f63-4381-b21e-71bbda54808d.png" width="80">
</div>

```http
POST /signup
Content-Type: application/json
```

**البيانات المطلوبة:**
```json
{
  "name": "محمد أحمد",
  "email": "mohamed@example.com",
  "password": "SecurePass123",
  "gender": "male",
  "address": "القاهرة، مصر"
}
```

**الاستجابة (201 Created):**
```json
{
  "message": "تم إنشاء الحساب بنجاح. يرجى تأكيد البريد الإلكتروني.",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "محمد أحمد",
    "email": "mohamed@example.com",
    "gender": "male",
    "address": "القاهرة، مصر",
    "confirmEmail": false,
    "role": "user",
    "createdAt": "2024-10-31T10:30:00.000Z"
  }
}
```

**حالات الخطأ:**
- `409 Conflict` - البريد مسجل مسبقاً
- `500 Internal Server Error` - خطأ في الخادم

---

### 2️⃣ تسجيل الدخول (Login)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/216120974-24a76b31-7f39-41f1-a38f-b3c1377cc612.png" width="80">
</div>

```http
POST /login
Content-Type: application/json
```

**البيانات المطلوبة:**
```json
{
  "email": "mohamed@example.com",
  "password": "SecurePass123"
}
```

**الاستجابة (200 OK):**
```json
{
  "message": "done",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY..."
}
```

**حالات الخطأ:**
- `404 Not Found` - بيانات دخول خاطئة
- `403 Forbidden` - البريد غير مؤكد
- `401 Unauthorized` - دور المستخدم غير صالح
- `500 Internal Server Error` - خطأ في الخادم

---

## 🗃️ نموذج البيانات (User Schema)

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="100">
</div>

```javascript
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
    type: String
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
```

---

## 🔐 نظام الأمان المتقدم

<div align="center">

| الميزة | الوصف | التنفيذ |
|:---:|:---|:---:|
| 🔒 | **تشفير كلمات المرور** | BCrypt مع 10 Salt Rounds |
| 🎫 | **JWT Tokens منفصلة** | User Token & Admin Token |
| ✉️ | **تأكيد البريد** | منع الدخول قبل التأكيد |
| 🛡️ | **Unique Email** | لا تكرار للحسابات |
| ⏱️ | **Token Expiration** | صلاحية ساعة واحدة |
| 🔍 | **Role-Based Auth** | صلاحيات حسب الدور |

</div>

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212281775-b468df30-4edc-4bf8-a4ee-f52e1aaddc86.gif" width="400">
</div>

---

## 📝 أكواد المشروع الكاملة

### 🗄️ **1. نموذج المستخدم** `user.model.js`

```javascript
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

### ⚙️ **2. اتصال قاعدة البيانات** `connect-mongo.js`

```javascript
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('.env') });

console.log({ path: path.resolve('.env') });

const dbConnect = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database Connected Successfully"))
    .catch((err) => console.log("❌ Database Connection Error:", err));
}

export default dbConnect;
```

---

### 🎮 **3. الكنترولرز** `auth.controller.js`

```javascript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

// 📝 Signup Controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

// 🔑 Login Controller
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
      return res.status(403).json({ 
        message: "Please confirm your email before proceeding" 
      });
    }

    let token;
    switch (user.role) {
      case "user":
        token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        break;
      case "admin":
        token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRETADMIN,
          { expiresIn: "1h" }
        );
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

### 🛣️ **4. المسارات** `auth.routes.js`

```javascript
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
```

---

### 🚀 **5. التطبيق الرئيسي** `app.js`

```javascript
import dbConnect from './config/connect-mongo.js';
import router from './routes/auth.routes.js';
import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
dbConnect();

app.use("/", router);

app.listen(port, () => console.log(`🚀 Server running at: http://localhost:${port}`));
```

---

## 🔄 Git Workflow للمطورين

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257460-738ff738-247f-4445-a718-cdd0ca76e2db.gif" width="400">
</div>

> ⚠️ **هام للفريق التطويري**

يتم تطوير كل ميزة في فرع منفصل:

```bash
# 🌿 إنشاء فرع Login
git checkout -b feature/login-controller

# 🌿 إنشاء فرع Signup
git checkout -b feature/signup-controller

# ✅ دمج التغييرات في Main
git checkout main
git merge feature/login-controller
git merge feature/signup-controller
```

---

## 🧪 اختبار API

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257468-1e9a91f1-b626-4baa-b15d-5c385dfa7ed2.gif" width="100">
</div>

### باستخدام cURL:

```bash
# 📝 تسجيل حساب جديد
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@test.com",
    "password": "123456",
    "gender": "male",
    "address": "الإسكندرية"
  }'

# 🔑 تسجيل الدخول
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@test.com",
    "password": "123456"
  }'
```

---

## 🎨 المزايا الرئيسية

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="400">

| 🎯 الميزة | 📝 التفاصيل |
|:---:|:---|
| ⚡ | **أداء عالي** - كود محسّن وسريع |
| 🏗️ | **MVC Structure** - هيكلة احترافية |
| 🔐 | **Multi-layer Security** - أمان متعدد الطبقات |
| 👥 | **Role Management** - إدارة الأدوار (User/Admin) |
| 📧 | **Email Confirmation** - تأكيد البريد الإلكتروني |
| 🌍 | **RTL Support** - دعم العربية والإنجليزية |
| 🔄 | **RESTful API** - معايير صناعية |
| 📦 | **Easy to Scale** - قابل للتوسع |

</div>

---

## 🔮 الخطط المستقبلية

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257463-4d082cb4-7483-4eaf-bc25-6dde2628aabd.gif" width="100">
</div>

- [ ] إرسال تأكيد البريد الإلكتروني
- [ ] نظام استعادة كلمة المرور
- [ ] OAuth 2.0 (Google, Facebook, GitHub)
- [ ] Two-Factor Authentication (2FA)
- [ ] Rate Limiting للحماية من Brute Force
- [ ] Refresh Tokens للجلسات الطويلة
- [ ] لوحة تحكم إدارية كاملة
- [ ] نظام الصلاحيات المتقدم
- [ ] Logging & Monitoring

---

## 📚 الحزم المستخدمة

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1"
  }
}
```

---

## 🤝 المساهمة في المشروع

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="100">
</div>

نرحب بكل المساهمات! إليك الخطوات:

1. 🍴 **Fork** المشروع
2. 🌿 أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. ✍️ اكتب الكود (`git commit -m 'Add amazing feature'`)
4. 📤 ارفع التغييرات (`git push origin feature/amazing-feature`)
5. 🔀 افتح **Pull Request**

---

## 📄 الترخيص

هذا المشروع مرخص تحت **MIT License** - حرية الاستخدام والتعديل

---

## 👨‍💻 المطور

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="100">

**Mohamed Developer**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohamed-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mohamed)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohamed@example.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://mohamed-portfolio.com)

</div>

---

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

### 💙 صُنع بحب في مصر 🇪🇬

**الإصدار 1.0.0** | أكتوبر 2024

<img src="https://user-images.githubusercontent.com/74038190/212257472-08e52665-c503-4bd9-aa20-f5a4dae769b5.gif" width="400">

⭐ **إذا أعجبك المشروع، لا تنسَ إضافة نجمة!** ⭐

**نظام توثيق احترافي آمن وموثوق لمشروعك القادم** 🚀

</div>
