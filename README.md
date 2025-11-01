<div align="center">

# 📝 Signup System - الدليل الشامل

### *نظام تسجيل متقدم مع OTP والتحقق من البريد الإلكتروني*

<img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" width="200" alt="Signup System" />

[![Branch](https://img.shields.io/badge/Branch-signup-success?style=for-the-badge)](https://github.com/your-repo/tree/signup)
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
<img src="https://user-images.githubusercontent.com/74038190/229223156-0cbdaba9-3128-4d8e-8719-b6b4cf741b67.gif" width="300" alt="Registration">
</div>

### **نظام Signup متقدم يتضمن:**

✅ **تسجيل شامل** - 8 حقول للبيانات الشخصية  
✅ **تشفير متقدم** - BCrypt للكلمات + CryptoJS للهواتف  
✅ **OTP System** - رمز تحقق مؤقت يرسل للبريد  
✅ **Event-Driven** - نظام Events لإرسال البريد  
✅ **Validation** - التحقق من البيانات قبل الحفظ  
✅ **Error Handling** - معالجة احترافية للأخطاء  
✅ **Logger** - تسجيل العمليات  
✅ **JWT Tokens** - 3 أنواع مختلفة من Tokens  
✅ **Secure Cookies** - حفظ آمن للـ Tokens

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
┃ ┃ ┗ 📜 auth.controller.js        ⭐ الكنترولر الرئيسي
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
┃ ┃ ┣ 📜 logger.js                  📝 تسجيل العمليات
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
import { signupSchema } from "../validators/auth.validator.js";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

// 📝 مسار التسجيل مع Validation Middleware
router.post("/signup", validate(signupSchema, "body"), signup);

export default router;
```

**📌 الشرح:**
- `validate()` - Middleware للتحقق من البيانات قبل الوصول للكنترولر
- `signupSchema` - مجموعة القواعد للتحقق (من Joi أو Yup)
- `"body"` - التحقق من `req.body`

---

### **2️⃣ الكنترولر (Controller)** - `auth.controller.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920235.png" width="80" alt="Controller">
</div>

```javascript
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
  // ========================================
  // 📥 الخطوة 1: استخراج البيانات من Request
  // ========================================
  const {
    userName,      // اسم المستخدم الفريد
    fullName,      // الاسم الكامل
    email,         // البريد الإلكتروني
    password,      // كلمة المرور
    phoneNumber,   // رقم الهاتف
    gender,        // الجنس
    bio,           // نبذة تعريفية
    DOB,           // تاريخ الميلاد (Date of Birth)
  } = req.body;

  // ========================================
  // 🔍 الخطوة 2: التحقق من عدم وجود البريد مسبقاً
  // ========================================
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    // إرجاع خطأ 409 Conflict
    return next(new ApiError("This email is already registered", 409));
  }

  // ========================================
  // 🔐 الخطوة 3: تشفير كلمة المرور
  // ========================================
  const hashPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT) // عدد Salt Rounds من .env
  );

  // ========================================
  // 🔒 الخطوة 4: تشفير رقم الهاتف
  // ========================================
  const encryptedPhone = CryptoJS.AES.encrypt(
    phoneNumber,
    process.env.ENCRYPT // مفتاح التشفير من .env
  ).toString();

  // ========================================
  // 💾 الخطوة 5: إنشاء المستخدم في قاعدة البيانات
  // ========================================
  const user = await User.create({
    userName,
    fullName,
    email,
    password: hashPassword,        // كلمة المرور المشفرة
    phoneNumber: encryptedPhone,   // الهاتف المشفر
    gender,
    bio,
    date_of_birth: DOB,
  });

  // ========================================
  // 🔢 الخطوة 6: توليد رمز OTP
  // ========================================
  const code = generateCode(); // مثال: 123456 (6 أرقام)
  
  // حفظ الـ OTP في قاعدة البيانات
  await OTP.create({ 
    userId: user._id, 
    code 
  });

  // ========================================
  // 📧 الخطوة 7: إرسال بريد التحقق
  // ========================================
  // استخدام Event Emitter لإرسال البريد بشكل غير متزامن
  emailEvent.emit("sendConfirmEmail", { email, code });

  // ========================================
  // 🎫 الخطوة 8: إنشاء OTP Token
  // ========================================
  const token = generateOTPToken(String(user._id));

  // ========================================
  // 🍪 الخطوة 9: إعدادات الـ Cookie
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
  // ✅ الخطوة 10: إرجاع الاستجابة
  // ========================================
  return res.status(201).json(
    new ApiResponse({
      message: "The account has been created successfully. Please check your email for verification.",
      status: "success",
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
│  1. المستخدم يملأ نموذج التسجيل                        │
│     ↓                                                    │
│  2. Frontend يرسل POST Request لـ /signup              │
│     ↓                                                    │
│  3. Express Router يستقبل الطلب                        │
│     ↓                                                    │
│  4. Validation Middleware يتحقق من البيانات           │
│     ├─❌ إذا فشل → Error 400 Bad Request              │
│     └─✅ إذا نجح → ينتقل للكنترولر                   │
│     ↓                                                    │
│  5. Controller: التحقق من البريد في Database           │
│     ├─❌ موجود → Error 409 Conflict                   │
│     └─✅ غير موجود → المتابعة                         │
│     ↓                                                    │
│  6. تشفير كلمة المرور بـ BCrypt                        │
│     ↓                                                    │
│  7. تشفير رقم الهاتف بـ CryptoJS                       │
│     ↓                                                    │
│  8. حفظ المستخدم في MongoDB                            │
│     ↓                                                    │
│  9. توليد رمز OTP (6 أرقام عشوائية)                   │
│     ↓                                                    │
│  10. حفظ الـ OTP في جدول OTPs                          │
│     ↓                                                    │
│  11. Event Emitter يرسل البريد الإلكتروني             │
│     ↓                                                    │
│  12. إنشاء OTP JWT Token                               │
│     ↓                                                    │
│  13. حفظ الـ Token في Secure Cookie                    │
│     ↓                                                    │
│  14. إرجاع Response 201 Created                        │
│     ↓                                                    │
│  15. Frontend يعرض رسالة النجاح                        │
│     ↓                                                    │
│  16. Frontend ينتقل لصفحة إدخال OTP                   │
└─────────────────────────────────────────────────────────┘
```

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
    // مشفر بـ CryptoJS
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
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: null
  }
}, { 
  timestamps: true // createdAt, updatedAt
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
    length: 6 // 6 أرقام
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // ينتهي بعد 5 دقائق (300 ثانية)
  }
});

// Index للبحث السريع
otpSchema.index({ userId: 1, createdAt: -1 });

const OTP = mongoose.models.OTP || model("OTP", otpSchema);
export default OTP;
```

---

### **5️⃣ Validation Middleware** - `validate.middleware.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="80" alt="Validation">
</div>

```javascript
/**
 * Middleware للتحقق من البيانات باستخدام Joi
 * @param {Object} schema - Joi schema
 * @param {String} source - مصدر البيانات (body, query, params)
 */
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    // الحصول على البيانات من المصدر المحدد
    const dataToValidate = req[source];

    // التحقق من البيانات
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false, // إرجاع جميع الأخطاء وليس الأول فقط
      stripUnknown: true // حذف الحقول غير المعرفة
    });

    if (error) {
      // تنسيق رسائل الأخطاء
      const errors = error.details.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors
      });
    }

    // استبدال البيانات بالقيم المعدلة من Joi
    req[source] = value;
    next();
  };
};
```

---

### **6️⃣ Signup Validator** - `auth.validator.js`

```javascript
import Joi from 'joi';

export const signupSchema = Joi.object({
  userName: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/) // فقط حروف وأرقام و_
    .required()
    .messages({
      'string.min': 'Username must be at least 3 characters',
      'string.max': 'Username cannot exceed 30 characters',
      'string.pattern.base': 'Username can only contain letters, numbers, and underscores',
      'any.required': 'Username is required'
    }),

  fullName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Full name must be at least 3 characters',
      'any.required': 'Full name is required'
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required'
    }),

  password: Joi.string()
    .min(6)
    .max(100)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) // حرف صغير + كبير + رقم
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.pattern.base': 'Password must contain uppercase, lowercase, and number',
      'any.required': 'Password is required'
    }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/) // 10-15 رقم
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid phone number',
      'any.required': 'Phone number is required'
    }),

  gender: Joi.string()
    .valid('male', 'female', 'other')
    .default('male'),

  bio: Joi.string()
    .max(500)
    .allow('')
    .default(''),

  DOB: Joi.date()
    .max('now') // لا يمكن أن يكون في المستقبل
    .optional()
    .messages({
      'date.max': 'Date of birth cannot be in the future'
    })
});
```

---

### **7️⃣ API Error Class** - `api-error.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920233.png" width="80" alt="Error Handling">
</div>

```javascript
/**
 * Custom Error Class للأخطاء في API
 */
class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // أخطاء متوقعة

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
```

**📌 الاستخدام:**
```javascript
// مثال 1: خطأ 404
throw new ApiError("User not found", 404);

// مثال 2: خطأ 409
return next(new ApiError("Email already exists", 409));

// مثال 3: خطأ 401
throw new ApiError("Unauthorized access", 401);
```

---

### **8️⃣ API Response Class** - `api-response.js`

```javascript
/**
 * Class موحدة لتنسيق الاستجابات
 */
class ApiResponse {
  constructor({ 
    message, 
    status = 'success', 
    data = null, 
    meta = null 
  }) {
    this.status = status;
    this.message = message;
    
    if (data !== null) {
      this.data = data;
    }
    
    if (meta !== null) {
      this.meta = meta;
    }
  }
}

export default ApiResponse;
```

**📌 الاستخدام:**
```javascript
// مثال 1: استجابة بسيطة
return res.json(new ApiResponse({
  message: "Success",
  status: "success"
}));

// مثال 2: استجابة مع بيانات
return res.json(new ApiResponse({
  message: "User found",
  data: { user },
  meta: { total: 1 }
}));
```

---

### **9️⃣ Logger** - `logger.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920299.png" width="80" alt="Logger">
</div>

```javascript
import winston from 'winston';
import path from 'path';

// إنشاء مجلد logs إذا لم يكن موجوداً
const logsDir = path.join(process.cwd(), 'logs');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'auth-service' },
  transports: [
    // كتابة الأخطاء في error.log
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'), 
      level: 'error' 
    }),
    // كتابة كل شيء في combined.log
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log') 
    }),
  ],
});

// في التطوير، اطبع على Console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
```

**📌 الاستخدام:**
```javascript
import logger from '../utils/logger.js';

// معلومات عامة
logger.info('User signup attempt', { email: user.email });

// تحذير
logger.warn('Suspicious activity detected', { ip: req.ip });

// خطأ
logger.error('Database error', { error: err.message, stack: err.stack });
```

---

### **🔟 Generate OTP Code** - `generate-code.js`

```javascript
import crypto from 'crypto';

/**
 * توليد رمز OTP عشوائي من 6 أرقام
 * @returns {String} - رمز مكون من 6 أرقام
 */
const generateCode = () => {
  // توليد رقم عشوائي بين 100000 و 999999
  return crypto.randomInt(100000, 999999).toString();
};

export default generateCode;

// مثال آخر: توليد OTP أبجدي رقمي
export const generateAlphanumericOTP = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return otp;
};
```

---

### **1️⃣1️⃣ Email Event System** - `email-event.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="80" alt="Email">
</div>

```javascript
import { EventEmitter } from 'events';
import nodemailer from 'nodemailer';
import logger from './logger.js';

// إنشاء Event Emitter
export const emailEvent = new EventEmitter();

// إعداد Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // مثال: smtp.gmail.com
  port: process.env.EMAIL_PORT, // 587 أو 465
  secure: process.env.EMAIL_PORT === '465', // true للـ 465
  auth: {
    user: process.env.EMAIL_USER, // بريدك
    pass: process.env.EMAIL_PASS  // كلمة المرور أو App Password
  }
});

/**
 * Event Listener لإرسال بريد التحقق
 */
emailEvent.on('sendConfirmEmail', async ({ email, code }) => {
  try {
    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'تأكيد البريد الإلكتروني - Email Verification',
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
              color: #4CAF50;
              margin-bottom: 30px;
            }
            .code {
              background: #f9f9f9;
              border: 2px dashed #4CAF50;
              padding: 20px;
              text-align: center;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 10px;
              color: #333;
              margin: 30px 0;
            }
            .footer {
              text-align: center;
              color: #666;
              font-size: 14px;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 مرحباً بك!</h1>
              <p>شكراً لتسجيلك في منصتنا</p>
            </div>
            
            <p>يرجى استخدام الرمز التالي لتأكيد بريدك الإلكتروني:</p>
            
            <div class="code">${code}</div>
            
            <p><strong>⏱️ ملاحظة:</strong> هذا الرمز صالح لمدة 5 دقائق فقط.</p>
            
            <p>إذا لم تقم بالتسجيل، يرجى تجاهل هذا البريد.</p>
            
            <div class="footer">
              <p>© 2024 ${process.env.APP_NAME}. جميع الحقوق محفوظة.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    logger.info('Verification email sent successfully', { email });
    
  } catch (error) {
    logger.error('Failed to send verification email', { 
      email, 
      error: error.message 
    });
  }
});

// Event للبريد الترحيبي بعد التأكيد
emailEvent.on('sendWelcomeEmail', async ({ email, userName }) => {
  try {
    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'مرحباً بك في منصتنا!',
      html: `
        <h1>مرحباً ${userName}! 👋</h1>
        <p>تم تأكيد حسابك بنجاح.</p>
        <p>يمكنك الآن الاستمتاع بجميع ميزات المنصة.</p>
      `
    });
    
    logger.info('Welcome email sent', { email });
  } catch (error) {
    logger.error('Failed to send welcome email', { email, error: error.message });
  }
});
```

---

### **1️⃣2️⃣ JWT Utils** - `jwt.js`

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="80" alt="JWT">
</div>

```javascript
import jwt from 'jsonwebtoken';

/**
 * إنشاء OTP Token (صلاحية 5 دقائق)
 * يستخدم للتحقق من البريد الإلكتروني
 */
export const generateOTPToken = (userId) => {
  return jwt.sign(
    { userId, type: 'otp' },
    process.env.JWT_OTP_SECRET,
    { expiresIn: '5m' } // 5 دقائق
  );
};

/**
 * إنشاء Access Token (صلاحية ساعة)
 * يستخدم للوصول للـ API
 */
export const generateAccessToken = (userId, role = 'user') => {
  return jwt.sign(
    { userId, role, type: 'access' },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '1h' } // ساعة واحدة
  );
};

/**
 * إنشاء Refresh Token (صلاحية 30 يوم)
 * يستخدم لتجديد الـ Access Token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' } // 30 يوم
  );
};

/**
 * التحقق من OTP Token
 */
export const verifyOTPToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_OTP_SECRET);
    
    if (decoded.type !== 'otp') {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired OTP token');
  }
};

/**
 * التحقق من Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    if (decoded.type !== 'access') {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * التحقق من Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
```

---

## ⚙️ Environment Variables

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/3588/3588315.png" width="100" alt="Environment">
</div>

### **ملف `.env` الكامل:**

```env
# ========================================
# 🗄️ MongoDB Configuration
# ========================================
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# ========================================
# 🔐 Encryption & Hashing
# ========================================
SALT=10
ENCRYPT=your-crypto-secret-key-here-32chars

# ========================================
# 🎫 JWT Secrets (يجب أن تكون مختلفة!)
# ========================================
JWT_OTP_SECRET=your-otp-secret-key-minimum-32-characters
JWT_ACCESS_SECRET=your-access-secret-key-minimum-32-characters
JWT_REFRESH_SECRET=your-refresh-secret-key-minimum-32-characters

# ========================================
# 📧 Email Configuration (Gmail Example)
# ========================================
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# ========================================
# 🌐 Application Settings
# ========================================
APP_NAME=E-Commerce Platform
NODE_ENV=development
PORT=3000

# ========================================
# 📝 Logger Settings
# ========================================
LOG_LEVEL=info
```

**⚠️ ملاحظات مهمة:**

1. **SALT**: رقم بين 10-12 (10 موصى به للإنتاج)
2. **ENCRYPT**: مفتاح 32 حرف للـ AES encryption
3. **JWT Secrets**: يجب أن تكون مختلفة وقوية (32+ حرف)
4. **EMAIL_PASS**: في Gmail استخدم App Password وليس كلمة المرور العادية

---

## 🔄 دليل Git المفصل

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/4494/4494740.png" width="100" alt="Git Guide">
</div>

### **📋 السيناريو 1: البدء من الصفر**

```bash
# ========================================
# 1️⃣ إنشاء المستودع وإعداده
# ========================================

# إنشاء مجلد المشروع
mkdir e-commerce-auth
cd e-commerce-auth

# تهيئة Git
git init
echo "# E-Commerce Auth System" >> README.md
git add README.md
git commit -m "Initial commit"

# ربط بـ GitHub
git remote add origin https://github.com/your-username/e-commerce-auth.git
git branch -M main
git push -u origin main

# ========================================
# 2️⃣ إنشاء الهيكل الأساسي على Main
# ========================================

# إنشاء هيكل المجلدات
mkdir -p src/{controllers,routes,models,middlewares,validators,utils}

# إنشاء ملفات فارغة
touch src/controllers/auth.controller.js
touch src/routes/auth.routes.js
touch src/models/{user.model.js,OTP.model.js}
touch src/middlewares/validate.middleware.js
touch src/validators/auth.validator.js
touch src/utils/{api-error.js,api-response.js,logger.js,generate-code.js,email-event.js,jwt.js}
touch src/app.js
touch .env.example
touch .gitignore

# كتابة .gitignore
cat > .gitignore << EOF
node_modules/
.env
logs/
*.log
.DS_Store
EOF

# إنشاء package.json
npm init -y

# تثبيت الحزم الأساسية
npm install express mongoose dotenv
npm install bcryptjs crypto-js jsonwebtoken
npm install joi
npm install nodemailer
npm install winston

# Commit الهيكل الأساسي
git add .
git commit -m "Add project structure and dependencies"
git push origin main

# ========================================
# 3️⃣ إنشاء فرع Signup
# ========================================

# إنشاء والانتقال لفرع signup
git checkout -b signup

# الآن اكتب كل الكود في الملفات
# ثم:

git add .
git commit -m "Add complete signup functionality with OTP"
git push -u origin signup

# ========================================
# 4️⃣ العودة لـ Main
# ========================================

git checkout main
```

---

### **📋 السيناريو 2: استنساخ المشروع والعمل عليه**

```bash
# ========================================
# 1️⃣ استنساخ المشروع
# ========================================

git clone https://github.com/your-username/e-commerce-auth.git
cd e-commerce-auth

# عرض جميع الفروع
git branch -a
# Output:
# * main
#   remotes/origin/HEAD -> origin/main
#   remotes/origin/main
#   remotes/origin/signup
#   remotes/origin/login

# ========================================
# 2️⃣ إنشاء فرع Dev لجمع كل شيء
# ========================================

# إنشاء فرع dev من main
git checkout -b dev

# جلب آخر التحديثات
git fetch --all

# ========================================
# 3️⃣ دمج فرع Signup
# ========================================

# دمج signup في dev
git merge origin/signup -m "Merge signup functionality"

# إذا حدثت تعارضات:
# 1. افتح الملفات المتعارضة
# 2. ابحث عن العلامات:
<<<<<<< HEAD
// كود من dev
=======
// كود من signup
>>>>>>> origin/signup

# 3. احتفظ بما تريد واحذف العلامات
# 4. ثم:
git add .
git commit -m "Resolve merge conflicts"

# ========================================
# 4️⃣ دمج فرع Login (إذا كان موجوداً)
# ========================================

git merge origin/login -m "Merge login functionality"

# معالجة التعارضات إن وجدت

# ========================================
# 5️⃣ تثبيت الحزم واختبار
# ========================================

npm install
cp .env.example .env
# عدل .env بمعلوماتك

# تشغيل المشروع
npm run dev

# ========================================
# 6️⃣ بعد التأكد من عمل كل شيء
# ========================================

# دمج dev في main
git checkout main
git merge dev -m "Merge complete auth system"

# رفع التحديثات
git push origin main

# رفع فرع dev أيضاً
git checkout dev
git push -u origin dev
```

---

### **📋 السيناريو 3: إضافة ميزة جديدة**

```bash
# ========================================
# مثال: إضافة ميزة تأكيد OTP
# ========================================

# ابدأ من dev
git checkout dev
git pull origin dev

# إنشاء فرع للميزة الجديدة
git checkout -b feature/verify-otp

# اكتب الكود الجديد
# مثال: إضافة verifyOTP controller

# بعد الانتهاء
git add .
git commit -m "Add OTP verification endpoint"
git push -u origin feature/verify-otp

# دمج في dev
git checkout dev
git merge feature/verify-otp
git push origin dev

# إذا كل شيء يعمل، دمج في main
git checkout main
git merge dev
git push origin main
```

---

### **🛠️ أوامر Git المفيدة**

<div align="center">

| الأمر | الوصف | مثال |
|:------|:------|:-----|
| `git status` | عرض حالة الملفات | `git status` |
| `git log --oneline` | عرض سجل الـ Commits | `git log --oneline --graph` |
| `git diff` | عرض التغييرات | `git diff HEAD` |
| `git stash` | حفظ التغييرات مؤقتاً | `git stash save "WIP"` |
| `git stash pop` | استرجاع التغييرات | `git stash pop` |
| `git reset` | التراجع عن Commits | `git reset --soft HEAD~1` |
| `git revert` | عكس Commit معين | `git revert abc123` |
| `git cherry-pick` | نسخ Commit محدد | `git cherry-pick def456` |
| `git tag` | إنشاء Tag للإصدار | `git tag v1.0.0` |

</div>

---

## 🧪 اختبار النظام الكامل

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2666/2666505.png" width="100" alt="Testing">
</div>

### **1️⃣ اختبار Signup**

```bash
# باستخدام cURL
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "johndoe",
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Pass123!",
    "phoneNumber": "01234567890",
    "gender": "male",
    "bio": "Software developer",
    "DOB": "1990-01-15"
  }'
```

**✅ الاستجابة المتوقعة:**
```json
{
  "status": "success",
  "message": "The account has been created successfully. Please check your email for verification."
}
```

**🔍 تحقق من:**
- [ ] ✅ Status Code = 201
- [ ] ✅ Cookie موجود في Headers
- [ ] ✅ OTP في قاعدة البيانات
- [ ] ✅ بريد إلكتروني مرسل
- [ ] ✅ كلمة المرور مشفرة
- [ ] ✅ رقم الهاتف مشفر

---

### **2️⃣ اختبار Validation**

```bash
# محاولة تسجيل ببريد غير صالح
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "test",
    "fullName": "Test",
    "email": "invalid-email",
    "password": "123",
    "phoneNumber": "123"
  }'
```

**❌ الاستجابة المتوقعة:**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    },
    {
      "field": "phoneNumber",
      "message": "Please enter a valid phone number"
    }
  ]
}
```

---

### **3️⃣ اختبار البريد المكرر**

```bash
# محاولة التسجيل بنفس البريد مرتين
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "johndoe2",
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Pass123!",
    "phoneNumber": "01234567890"
  }'
```

**❌ الاستجابة المتوقعة:**
```json
{
  "status": "fail",
  "message": "This email is already registered",
  "statusCode": 409
}
```

---

### **4️⃣ فحص قاعدة البيانات**

```javascript
// في MongoDB Compass أو mongosh

// 1. فحص المستخدم
db.users.findOne({ email: "john@example.com" })

// 2. التحقق من تشفير كلمة المرور
// يجب أن تبدأ بـ $2b$ (BCrypt)

// 3. فحص OTP
db.otps.find({ userId: ObjectId("...") }).sort({ createdAt: -1 })

// 4. التحقق من TTL Index
db.otps.getIndexes()
// يجب أن يظهر index على createdAt مع expireAfterSeconds: 300
```

---

### **5️⃣ فحص الـ Cookies**

```javascript
// في Browser Console بعد Signup

// عرض جميع الـ Cookies
document.cookie

// يجب أن ترى:
// OTP_verification_token=eyJhbGciOiJIUzI1NiIs...

// فحص خصائص الـ Cookie في DevTools -> Application -> Cookies
// ✅ HttpOnly: true
// ✅ Secure: true
// ✅ SameSite: Strict
// ✅ Expires: بعد 5 دقائق من الآن
```

---

### **6️⃣ فحص البريد الإلكتروني**

**تحقق من:**
- [ ] ✅ البريد وصل للـ Inbox
- [ ] ✅ رمز OTP من 6 أرقام
- [ ] ✅ التصميم صحيح (HTML)
- [ ] ✅ المرسل صحيح

---

### **7️⃣ فحص Logs**

```bash
# عرض آخر 20 سطر من combined.log
tail -n 20 logs/combined.log

# يجب أن ترى:
# [2024-10-31 15:30:00] info: User signup attempt {"email":"john@example.com"}
# [2024-10-31 15:30:01] info: Verification email sent successfully {"email":"john@example.com"}

# فحص أخطاء
tail -n 20 logs/error.log
```

---

## 🐛 حل المشاكل الشائعة

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920233.png" width="100" alt="Troubleshooting">
</div>

### **❌ مشكلة 1: خطأ في إرسال البريد**

**الأعراض:**
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```

**الحل:**
```bash
# 1. تفعيل "Less secure app access" في Gmail
# أو الأفضل:

# 2. استخدام App Password:
# - اذهب لـ Google Account Settings
# - Security -> 2-Step Verification
# - App passwords -> Generate
# - استخدم الـ Password المولد في .env

EMAIL_PASS=abcd efgh ijkl mnop  # بدون مسافات
```

---

### **❌ مشكلة 2: Validation لا يعمل**

**الأعراض:**
```
Signup يتم بدون التحقق من البيانات
```

**الحل:**
```javascript
// تأكد من ترتيب الـ Middlewares في Route

// ❌ خطأ
router.post("/signup", signup, validate(signupSchema, "body"));

// ✅ صحيح
router.post("/signup", validate(signupSchema, "body"), signup);
```

---

### **❌ مشكلة 3: OTP لا ينتهي بعد 5 دقائق**

**الحل:**
```javascript
// في OTP Model، تأكد من:

const otpSchema = new Schema({
  // ...
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300  // ✅ 300 ثانية = 5 دقائق
  }
});

// وتأكد من Index:
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });
```

---

### **❌ مشكلة 4: Cookie لا يتم إرساله**

**الأعراض:**
```
Cookie غير موجود في Browser
```

**الحل:**
```javascript
// 1. في التطوير، غير secure لـ false
const cookieOptions = {
  httpOnly: true,
  secure: false,  // ✅ false في التطوير
  sameSite: "Lax", // ✅ Lax أفضل في التطوير
  maxAge: 5 * 60 * 1000,
};

// 2. تأكد أن Frontend و Backend على نفس الـ Domain
// أو استخدم CORS settings:

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  // ✅ مهم للـ Cookies
}));
```

---

### **❌ مشكلة 5: رقم الهاتف لا يفك تشفيره**

**الحل:**
```javascript
// لفك تشفير رقم الهاتف:

import CryptoJS from 'crypto-js';

const decryptedPhone = CryptoJS.AES.decrypt(
  user.phoneNumber,
  process.env.ENCRYPT
).toString(CryptoJS.enc.Utf8);

console.log(decryptedPhone); // 01234567890
```

---

## 📊 Package.json النهائي

```json
{
  "name": "e-commerce-auth",
  "version": "2.0.0",
  "description": "Advanced authentication system with OTP verification",
  "main": "src/app.js",
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js",
    "test": "jest",
    "lint": "eslint src/"
  },
  "keywords": ["auth", "jwt", "otp", "email-verification"],
  "author": "Mohamed Developer",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "crypto-js": "^4.2.0",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.11.0",
    "nodemailer": "^6.9.7",
    "winston": "^3.11.0",
    "dotenv": "^16.3.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0",
    "eslint": "^8.52.0"
  }
}
```

---

## 🎯 الخلاصة والخطوات التالية

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/5968/5968836.png" width="100" alt="Success">
</div>

### **✅ ما تم إنجازه:**

- [x] نظام تسجيل شامل بـ 8 حقول
- [x] تشفير متقدم (BCrypt + CryptoJS)
- [x] نظام OTP كامل
- [x] إرسال بريد إلكتروني
- [x] JWT Tokens (3 أنواع)
- [x] Validation احترافي
- [x] Error Handling شامل
- [x] Logging System
- [x] Secure Cookies

### **🔮 الخطوات التالية:**

1. **إضافة Verify OTP Endpoint**
```javascript
router.post("/verify-otp", verifyOTP);
```

2. **إضافة Resend OTP**
```javascript
router.post("/resend-otp", resendOTP);
```

3. **إضافة Login Controller**
```javascript
router.post("/login", login);
```

4. **إضافة Logout**
```javascript
router.post("/logout", logout);
```

5. **إضافة Refresh Token**
```javascript
router.post("/refresh-token", refreshAccessToken);
```

---

<div align="center">

### 📝 Signup System v2.0.0

**آمن • متقدم • جاهز للإنتاج**

---

**Branch:** `signup`  
**Status:** ✅ Production Ready  
**Last Updated:** November 2024

**Created by:** Mohamed Developer

[![Back to Main](https://img.shields.io/badge/Back_to-Main_README-blue?style=for-the-badge)](../README.md)
[![Login Branch](https://img.shields.io/badge/View-Login_Branch-success?style=for-the-badge)](../login/README.md)
[![Report Issue](https://img.shields.io/badge/Report-Issue-red?style=for-the-badge)](https://github.com/your-repo/issues)

**⭐ إذا أعجبك المشروع، لا تنسَ إضافة نجمة على GitHub!**

</div>
