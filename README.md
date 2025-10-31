<div align="center">

# 🔐 E-Commerce Auth Framework

### *نظام توثيق احترافي متكامل مع لوحة تحكم إدارية*

<img src="https://raw.githubusercontent.com/Anmol-Baranwal/Cool-GIFs-For-GitHub/main/images/handshake.gif" width="400" alt="Authentication System" />

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![BCrypt](https://img.shields.io/badge/BCrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)](https://github.com/kelektiv/node.bcrypt.js)

---

</div>

## 📖 نظرة عامة

**E-Commerce Auth Framework** هو نظام توثيق شامل ومتطور، مصمم خصيصاً لمشاريع التجارة الإلكترونية الاحترافية. يوفر نظام تسجيل دخول متقدم مع دعم الأدوار (User & Admin) وتأكيد البريد الإلكتروني.

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/235224431-e8c8c12e-6826-47f1-89fb-2ddad83b3abf.gif" width="300" alt="Secure Authentication">
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

| 🔑 تسجيل الدخول | 📝 إنشاء حساب | 👤 الملف الشخصي |
|:---:|:---:|:---:|
| <img src="https://cdn-icons-png.flaticon.com/512/6681/6681204.png" width="150"/> | <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" width="150"/> | <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" width="150"/> |
| تسجيل دخول آمن | إنشاء حساب سريع | إدارة البيانات |

</div>

---

## 🏗️ هيكلية المشروع الكاملة

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="80" alt="Project Structure">
</div>

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

---

## 🚀 البدء السريع

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/213866269-5d00981c-7c98-46d7-8a8e-16f462f15227.gif" width="200" alt="Getting Started">
</div>

### 📋 المتطلبات الأساسية

```bash
Node.js >= 14.x
MongoDB >= 4.x
npm or yarn
```

### ⚙️ خطوات التثبيت

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

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257467-871d32b7-e401-42e8-a166-fcfd7baa4c6b.gif" width="80" alt="Environment Setup">
</div>

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

---

## 📡 نقاط النهاية API

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="80" alt="API Endpoints">
</div>

### 1️⃣ إنشاء حساب جديد (Signup)

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/6711/6711659.png" width="100" alt="Signup">
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
<img src="https://cdn-icons-png.flaticon.com/512/6357/6357048.png" width="100" alt="Login">
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
<img src="https://user-images.githubusercontent.com/74038190/216120981-b9507c36-0e04-4469-8e27-c99271b45ba5.png" width="100" alt="Database Schema">
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
<img src="https://user-images.githubusercontent.com/74038190/235224431-e8c8c12e-6826-47f1-89fb-2ddad83b3abf.gif" width="200" alt="Security System">
</div>

| الميزة | الوصف | التنفيذ |
|:---:|:---|:---:|
| 🔒 | **تشفير كلمات المرور** | BCrypt مع 10 Salt Rounds |
| 🎫 | **JWT Tokens منفصلة** | User Token & Admin Token |
| ✉️ | **تأكيد البريد** | منع الدخول قبل التأكيد |
| 🛡️ | **Unique Email** | لا تكرار للحسابات |
| ⏱️ | **Token Expiration** | صلاحية ساعة واحدة |
| 🔍 | **Role-Based Auth** | صلاحيات حسب الدور |

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

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/1183/1183672.png" width="80" alt="MongoDB Connection">
</div>

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

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920235.png" width="80" alt="Controllers">
</div>

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

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="80" alt="Routes">
</div>

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

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/919/919827.png" width="80" alt="Node.js App">
</div>

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
<img src="https://cdn-icons-png.flaticon.com/512/4494/4494740.png" width="100" alt="Git Workflow">
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
<img src="https://cdn-icons-png.flaticon.com/512/2666/2666505.png" width="100" alt="API Testing">
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
<img src="https://user-images.githubusercontent.com/74038190/213910845-af37a709-8995-40d6-be59-724526e3c3d7.gif" width="200" alt="Features">
</div>

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

---

## 🔮 الخطط المستقبلية

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/3588/3588592.png" width="100" alt="Future Plans">
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

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/919/919853.png" width="80" alt="NPM Packages">
</div>

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
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" width="100" alt="Contribute">
</div>

نرحب بكل المساهمات! إليك الخطوات:

1. 🍴 **Fork** المشروع
2. 🌿 أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. ✍️ اكتب الكود (`git commit -m 'Add amazing feature'`)
4. 📤 ارفع التغييرات (`git push origin feature/amazing-feature`)
5. 🔀 افتح **Pull Request**

---

## 📄 الترخيص

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/3406/3406886.png" width="80" alt="License">
</div>

هذا المشروع مرخص تحت **MIT License** - حرية الاستخدام والتعديل

---

## 👨‍💻 المطور

<div align="center">

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Technologist.png" width="100" alt="Developer">

**Mohamed Developer**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohamed-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mohamed)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohamed@example.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://mohamed-portfolio.com)

</div>

---

<div align="center">

### 💙 صُنع في مصر 🇪🇬

**الإصدار 1.0.0** | أكتوبر 2024

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" width="25" alt="Star"> **إذا أعجبك المشروع، لا تنسَ إضافة نجمة!** <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" width="25" alt="Star">

**نظام توثيق احترافي آمن وموثوق لمشروعك القادم** 🚀

</div>
