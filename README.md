<div align="center">

# 🔑 Login System - الدليل الشامل

### *نظام تسجيل دخول متقدم مع OTP والتحقق الثنائي*

<img src="https://cdn-icons-png.flaticon.com/512/6357/6357048.png" width="200" alt="Login System" />

[![Branch](https://img.shields.io/badge/Branch-login-blue?style=for-the-badge)](https://github.com/your-repo/tree/login)
[![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)](https://github.com/your-repo)
[![Version](https://img.shields.io/badge/Version-2.0.0-orange?style=for-the-badge)](https://github.com/your-repo)

</div>

---

## 📖 جدول المحتويات

- [نظرة عامة](#-نظرة-عامة)
- [هيكلية المشروع الكاملة](#-هيكلية-المشروع-الكاملة)
- [الكود الكامل مع الشرح](#-الكود-الكامل-مع-الشرح)
- [آلية العمل التفصيلية](#-آلية-العمل-التفصيلية)
- [دليل Git المفصل](#-دليل-git-المفصل)
- [الملفات المطلوبة](#-الملفات-المطلوبة)
- [اختبار النظام](#-اختبار-النظام)
- [حل المشاكل](#-حل-المشاكل)

---

## 🎯 نظرة عامة

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/235224431-e8c8c12e-6826-47f1-89fb-2ddad83b3abf.gif" width="300" alt="Secure Login">
</div>

### **نظام Login متقدم يتضمن:**

✅ **تسجيل دخول آمن** - مع التحقق من البريد وكلمة المرور  
✅ **OTP System** - رمز تحقق يرسل عند كل تسجيل دخول  
✅ **Email Verification Check** - التأكد من تأكيد البريد قبل الدخول  
✅ **Event-Driven** - نظام Events لإرسال البريد  
✅ **BCrypt Validation** - مقارنة آمنة لكلمات المرور  
✅ **Error Handling** - معالجة احترافية للأخطاء  
✅ **JWT OTP Token** - Token مؤقت للتحقق  
✅ **Secure Cookies** - حفظ آمن للـ Tokens  
✅ **Two-Factor Authentication Ready** - جاهز للـ 2FA

---

## 📁 هيكلية المشروع الكاملة

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" width="80" alt="Project Structure">
</div>

```
📦 E-commerce-auth/
┃
┣ 📂 src/
┃ ┃
┃ ┣ 📂 controllers/
┃ ┃ ┗ 📜 auth.controller.js        ⭐ الكنترولر الرئيسي (login)
┃ ┃
┃ ┣ 📂 routes/
┃ ┃ ┗ 📜 auth.routes.js            🛣️ المسارات
┃ ┃
┃ ┣ 📂 models/
┃ ┃ ┣ 📜 user.model.js              👤 نموذج المستخدم
┃ ┃ ┗ 📜 OTP.model.js               🔐 نموذج OTP
┃ ┃
┃ ┣ 📂 middlewares/
┃ ┃ ┗ 📜 validate.middleware.js    ✔️ التحقق من البيانات
┃ ┃
┃ ┣ 📂 validators/
┃ ┃ ┗ 📜 auth.validator.js         📋 قواعد التحقق
┃ ┃
┃ ┣ 📂 utils/
┃ ┃ ┣ 📜 api-error.js               ❌ معالجة الأخطاء
┃ ┃ ┣ 📜 api-response.js            ✅ تنسيق الاستجابات
┃ ┃ ┣ 📜 generate-code.js           🔢 توليد OTP
┃ ┃ ┣ 📜 email-event.js             📧 نظام Events للبريد
┃ ┃ ┗ 📜 jwt.js                     🎫 إدارة JWT Tokens
┃ ┃
┃ ┗ 📜 app.js                        🚀 التطبيق الرئيسي
┃
┣ 📜 .env                             ⚙️ المتغيرات البيئية
┣ 📜 package.json
┗ 📜 README.md
```

---

## 🎮 الكود الكامل مع الشرح

### **1️⃣ المسار (Route)** - `auth.routes.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="80" alt="Routes">
</div>

```javascript
import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema } from "../validators/auth.validator.js";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

// 🔑 مسار تسجيل الدخول مع Validation Middleware
router.post("/login", validate(loginSchema, "body"), login);

export default router;
```

**📌 الشرح:**
- `validate()` - Middleware للتحقق من البيانات قبل الوصول للكنترولر
- `loginSchema` - قواعد التحقق (email + password)
- `"body"` - التحقق من `req.body`

---

### **2️⃣ الكنترولر (Controller)** - `auth.controller.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920235.png" width="80" alt="Controller">
</div>

```javascript
import bcrypt from "bcryptjs";
import { emailEvent } from "../utils/email-event.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import generateCode from "../utils/generate-code.js";
import { generateOTPToken } from "../utils/jwt.js";
import User from "../models/user.model.js";
import OTP from "../models/OTP.model.js";

export const login = async (req, res, next) => {
  // ========================================
  // 📥 الخطوة 1: استخراج البيانات من Request
  // ========================================
  const { email, password } = req.body;

  // ========================================
  // 🔍 الخطوة 2: البحث عن المستخدم في قاعدة البيانات
  // ========================================
  const user = await User.findOne({ email });

  // التحقق من وجود المستخدم
  if (!user) {
    // إرجاع خطأ 401 Unauthorized
    return next(new ApiError("in-valid login Data", 401));
  }

  // ========================================
  // 🔐 الخطوة 3: مقارنة كلمة المرور
  // ========================================
  const match = await bcrypt.compare(password, user.password);

  // إذا كانت كلمة المرور خاطئة
  if (!match) {
    return next(new ApiError("in-valid login Data", 401));
  }

  // ========================================
  // 🔢 الخطوة 4: توليد رمز OTP جديد
  // ========================================
  const code = generateCode(); // مثال: 846291 (6 أرقام)
  
  // حفظ الـ OTP في قاعدة البيانات
  await OTP.create({ 
    userId: user._id, 
    code 
  });

  // ========================================
  // 📧 الخطوة 5: إرسال OTP عبر البريد الإلكتروني
  // ========================================
  // استخدام Event Emitter لإرسال البريد بشكل غير متزامن
  emailEvent.emit("sendConfirmEmail", { email, code });

  // ========================================
  // ✉️ الخطوة 6: التحقق من تأكيد البريد الإلكتروني
  // ========================================
  if (!user.isVerified) {
    // منع الدخول إذا لم يؤكد المستخدم بريده
    return next(
      new ApiError("user is not verified check your email", 403)
    );
  }

  // ========================================
  // 🎫 الخطوة 7: إنشاء OTP Token
  // ========================================
  const token = generateOTPToken(String(user._id));

  // ========================================
  // 🍪 الخطوة 8: إعدادات الـ Cookie
  // ========================================
  const cookieOptions = {
    httpOnly: true,     // لا يمكن الوصول له من JavaScript
    secure: true,       // يعمل فقط على HTTPS
    sameSite: "Strict", // حماية من CSRF attacks
    maxAge: 5 * 60 * 1000, // 5 دقائق
  };

  // حفظ الـ Token في Cookie
  res.cookie("OTP_verification_token", token, cookieOptions);

  // ========================================
  // ✅ الخطوة 9: إرجاع الاستجابة
  // ========================================
  return res
    .status(200)
    .json(
      new ApiResponse({ 
        message: "please check your email", 
        success: true 
      })
    );
};
```

---

## 🔐 آلية العمل التفصيلية

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2910/2910791.png" width="150" alt="Workflow">
</div>

```
┌─────────────────────────────────────────────────────────┐
│  1. المستخدم يدخل البريد وكلمة المرور                 │
│     ↓                                                    │
│  2. Frontend يرسل POST Request لـ /login               │
│     ↓                                                    │
│  3. Express Router يستقبل الطلب                        │
│     ↓                                                    │
│  4. Validation Middleware يتحقق من البيانات           │
│     ├─❌ إذا فشل → Error 400 Bad Request              │
│     └─✅ إذا نجح → ينتقل للكنترولر                   │
│     ↓                                                    │
│  5. Controller: البحث عن المستخدم بالبريد             │
│     ├─❌ غير موجود → Error 401 Unauthorized           │
│     └─✅ موجود → المتابعة                             │
│     ↓                                                    │
│  6. مقارنة كلمة المرور بـ BCrypt                       │
│     ├─❌ خاطئة → Error 401 Unauthorized               │
│     └─✅ صحيحة → المتابعة                             │
│     ↓                                                    │
│  7. توليد رمز OTP جديد (6 أرقام)                      │
│     ↓                                                    │
│  8. حفظ الـ OTP في قاعدة البيانات                     │
│     ↓                                                    │
│  9. Event Emitter يرسل OTP للبريد الإلكتروني         │
│     ↓                                                    │
│  10. التحقق من isVerified                             │
│     ├─❌ false → Error 403 Forbidden                  │
│     └─✅ true → المتابعة                              │
│     ↓                                                    │
│  11. إنشاء OTP JWT Token                               │
│     ↓                                                    │
│  12. حفظ الـ Token في Secure Cookie                    │
│     ↓                                                    │
│  13. إرجاع Response 200 OK                             │
│     ↓                                                    │
│  14. Frontend يعرض رسالة "تحقق من بريدك"              │
│     ↓                                                    │
│  15. المستخدم يدخل OTP من البريد                       │
│     ↓                                                    │
│  16. Backend يتحقق من OTP → يصدر Access Token         │
└─────────────────────────────────────────────────────────┘
```

---

## 🆚 الفرق بين Login و Signup

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920277.png" width="100" alt="Comparison">
</div>

| العنصر | 🔑 Login | 📝 Signup |
|:---:|:---|:---|
| **الهدف** | الدخول لحساب موجود | إنشاء حساب جديد |
| **البيانات المطلوبة** | email + password فقط | name, email, password, phone, etc. |
| **العملية الرئيسية** | التحقق من البيانات | إنشاء وحفظ بيانات جديدة |
| **التشفير** | مقارنة bcrypt.compare | تشفير bcrypt.hash |
| **التحقق من البريد** | التأكد أنه مؤكد (isVerified) | إرسال OTP للتأكيد |
| **OTP** | يرسل عند كل دخول | يرسل مرة واحدة للتأكيد |
| **Status Code** | 200 OK | 201 Created |
| **الأخطاء الشائعة** | 401 Unauthorized, 403 Forbidden | 409 Conflict |
| **الـ Token** | OTP Token مؤقت | OTP Token مؤقت |
| **الخطوة التالية** | إدخال OTP → Access Token | تأكيد البريد → Login |

---

## 🛠️ الملفات المطلوبة

### **3️⃣ User Model** - `user.model.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/1183/1183672.png" width="80" alt="User Model">
</div>

```javascript
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male'
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  date_of_birth: {
    type: Date,
    required: false
  },
  isVerified: {
    type: Boolean,
    default: false  // ⭐ مهم جداً لـ Login
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true
});

const User = mongoose.models.User || model("User", userSchema);
export default User;
```

---

### **4️⃣ OTP Model** - `OTP.model.js`

```javascript
import mongoose, { Schema, model } from "mongoose";

const otpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  code: {
    type: String,
    required: true,
    length: 6
  },
  type: {
    type: String,
    enum: ['login', 'signup', 'reset-password'],
    default: 'login'  // ⭐ نوع الـ OTP
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3  // حد أقصى 3 محاولات
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // ينتهي بعد 5 دقائق
  }
});

// Index للبحث السريع
otpSchema.index({ userId: 1, type: 1, createdAt: -1 });

const OTP = mongoose.models.OTP || model("OTP", otpSchema);
export default OTP;
```

---

### **5️⃣ Login Validator** - `auth.validator.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="80" alt="Validation">
</div>

```javascript
import Joi from 'joi';

// Schema للـ Login
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required'
    })
});

// Schema للـ OTP Verification
export const verifyOTPSchema = Joi.object({
  code: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.length': 'OTP must be 6 digits',
      'string.pattern.base': 'OTP must contain only numbers',
      'any.required': 'OTP code is required'
    })
});
```

---

### **6️⃣ Email Event System** - `email-event.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="80" alt="Email">
</div>

```javascript
import { EventEmitter } from 'events';
import nodemailer from 'nodemailer';
import logger from './logger.js';

export const emailEvent = new EventEmitter();

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Event: إرسال OTP للـ Login
 */
emailEvent.on('sendConfirmEmail', async ({ email, code }) => {
  try {
    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 رمز تسجيل الدخول - Login OTP Code',
      html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              direction: rtl;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              color: #2196F3;
              margin-bottom: 30px;
            }
            .code-box {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 10px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .code {
              font-size: 42px;
              font-weight: bold;
              letter-spacing: 15px;
              color: white;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .info {
              background: #f9f9f9;
              border-right: 4px solid #2196F3;
              padding: 15px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #666;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
            }
            .warning {
              background: #fff3cd;
              border-right: 4px solid #ffc107;
              padding: 15px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 تسجيل دخول آمن</h1>
              <p>طلب تسجيل دخول جديد</p>
            </div>
            
            <p>مرحباً،</p>
            <p>تم طلب تسجيل دخول لحسابك. استخدم الرمز التالي لإكمال عملية الدخول:</p>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <div class="info">
              <p><strong>⏱️ مدة الصلاحية:</strong> هذا الرمز صالح لمدة 5 دقائق فقط</p>
              <p><strong>🔒 الأمان:</strong> لا تشارك هذا الرمز مع أي شخص</p>
            </div>
            
            <div class="warning">
              <p><strong>⚠️ تحذير أمني:</strong></p>
              <p>إذا لم تقم بطلب تسجيل الدخول، يرجى تجاهل هذا البريد وتغيير كلمة المرور فوراً.</p>
            </div>
            
            <div class="footer">
              <p>© 2024 ${process.env.APP_NAME}. جميع الحقوق محفوظة.</p>
              <p>هذا بريد إلكتروني تلقائي، يرجى عدم الرد عليه.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Login OTP email sent successfully', { email });
    
  } catch (error) {
    logger.error('Failed to send login OTP email', { 
      email, 
      error: error.message 
    });
  }
});

// Event للتنبيه عن محاولة دخول مشبوهة
emailEvent.on('sendLoginAlert', async ({ email, ip, device }) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.APP_NAME} Security" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🚨 تنبيه أمني: محاولة تسجيل دخول جديدة',
      html: `
        <h1>🚨 تنبيه أمني</h1>
        <p>تم تسجيل محاولة دخول جديدة لحسابك:</p>
        <ul>
          <li><strong>عنوان IP:</strong> ${ip}</li>
          <li><strong>الجهاز:</strong> ${device}</li>
          <li><strong>الوقت:</strong> ${new Date().toLocaleString('ar-EG')}</li>
        </ul>
        <p>إذا لم تكن أنت من قام بذلك، يرجى تغيير كلمة المرور فوراً.</p>
      `
    });
    
    logger.info('Login alert sent', { email });
  } catch (error) {
    logger.error('Failed to send login alert', { email, error: error.message });
  }
});
```

---

## ⚙️ Environment Variables

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/3588/3588315.png" width="100" alt="Environment">
</div>

```env
# ========================================
# 🗄️ MongoDB Configuration
# ========================================
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# ========================================
# 🔐 Encryption & Hashing
# ========================================
SALT=10
ENCRYPT=your-crypto-secret-key-32chars

# ========================================
# 🎫 JWT Secrets
# ========================================
JWT_OTP_SECRET=your-otp-secret-minimum-32-characters

# ========================================
# 📧 Email Configuration
# ========================================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# ========================================
# 🌐 Application Settings
# ========================================
APP_NAME=E-Commerce Platform
NODE_ENV=development
PORT=3000
```

---

## 🔄 دليل Git المفصل

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/4494/4494740.png" width="100" alt="Git Guide">
</div>

### **📋 السيناريو 1: استنساخ والعمل على Login Branch**

```bash
# ========================================
# 1️⃣ استنساخ المشروع
# ========================================
git clone https://github.com/your-username/e-commerce-auth.git
cd e-commerce-auth

# ========================================
# 2️⃣ جلب جميع الفروع
# ========================================
git fetch --all

# عرض الفروع المتاحة
git branch -a
# Output:
# * main
#   remotes/origin/login
#   remotes/origin/signup

# ========================================
# 3️⃣ الانتقال لفرع Login
# ========================================
git checkout login

# أو إنشاء نسخة محلية
git checkout -b login origin/login

# ========================================
# 4️⃣ تثبيت الحزم
# ========================================
npm install

# ========================================
# 5️⃣ إعداد Environment
# ========================================
cp .env.example .env
# عدل .env بمعلوماتك

# ========================================
# 6️⃣ تشغيل المشروع
# ========================================
npm run dev

# يجب أن ترى:
# ✅ Database Connected
# 🚀 Server running at: http://localhost:3000
```

---

### **📋 السيناريو 2: دمج Login في Dev**

```bash
# ========================================
# 1️⃣ إنشاء/الانتقال لفرع Dev
# ========================================
git checkout main
git checkout -b dev

# ========================================
# 2️⃣ دمج Login Branch
# ========================================
git merge origin/login --no-ff -m "Merge login controller with OTP"

# إذا حدثت conflicts:
# 1. افتح الملف المتعارض
# 2. احتفظ بكلا الـ Controllers (login + signup)
#
