<div align="center">

# 🔐 E-Commerce Auth Framework

### *نظام توثيق احترافي بتصميم عصري ومرن*

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXpsY3l1NWhpMmV5MGZ0Y3l1bTlmb2trc3V3b2k5b3U4ZWFlNmpoeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ln7z2eWriiQAllfVcn/giphy.gif" width="250" alt="Framework Animation" />

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## 📖 نظرة عامة

**E-Commerce Auth Framework** هو إطار عمل مصغر للتوثيق والتسجيل، مصمم خصيصاً ليكون نقطة انطلاق مثالية لمشاريع التجارة الإلكترونية. يجمع بين البساطة والقوة، مع هيكلة **MVC** نظيفة وقابلة للتوسع.

### ✨ لماذا هذا المشروع مميز؟

- 🎯 **بسيط وفعال**: صفحتان فقط (Login & Signup) لكن بكود احترافي
- 🏗️ **هيكلة MVC نظيفة**: كل شيء في مكانه الصحيح
- 🔒 **أمان عالي**: تشفير bcrypt و JWT tokens
- 🚀 **جاهز للإنتاج**: يمكنك البناء عليه مباشرة
- 📦 **خفيف الوزن**: لا تعقيدات، فقط الأساسيات القوية

---

## 🎬 معاينة حية

<div align="center">

| 🔑 تسجيل الدخول | 📝 إنشاء حساب |
|:---:|:---:|
| <img src="https://github.com/mohamed-dev/assets/raw/main/login.gif" width="350"/> | <img src="https://github.com/mohamed-dev/assets/raw/main/signup.gif" width="350"/> |

</div>

---

## 🏗️ هيكلية المشروع

```
📦 E-commerce-auth
┣ 📂 src
┃ ┣ 📂 config
┃ ┃ ┗ 📜 connect-mongo.js      # إعدادات الاتصال بقاعدة البيانات
┃ ┣ 📂 controllers
┃ ┃ ┗ 📜 auth.controller.js    # منطق الأعمال للتوثيق
┃ ┣ 📂 models
┃ ┃ ┗ 📜 user.model.js          # نموذج بيانات المستخدم
┃ ┣ 📂 routes
┃ ┃ ┗ 📜 auth.routes.js         # نقاط النهاية API
┃ ┗ 📜 app.js                   # ملف التطبيق الرئيسي
┣ 📜 .env                        # متغيرات البيئة
┣ 📜 package.json
┗ 📜 README.md
```

---

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js (الإصدار 14 أو أحدث)
- MongoDB (محلي أو سحابي)
- npm أو yarn

### خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/your-username/e-commerce-auth.git
cd e-commerce-auth

# 2. تثبيت الحزم
npm install

# 3. إعداد ملف البيئة
cp .env.example .env
# قم بتعديل .env بمعلومات قاعدة البيانات الخاصة بك

# 4. تشغيل السيرفر
npm run dev
```

🎉 **تهانينا!** السيرفر يعمل الآن على `http://localhost:3000`

---

## ⚙️ إعدادات البيئة

قم بإنشاء ملف `.env` في المجلد الرئيسي:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

# JWT Secret Key
JWT_SECRET=your_super_secret_key_here_2024

# Server Port
PORT=3000
```

> 💡 **نصيحة**: استخدم مفتاح JWT قوي ومعقد في بيئة الإنتاج!

---

## 📡 نقاط النهاية API

### 1️⃣ إنشاء حساب جديد

```http
POST /signup
Content-Type: application/json

{
  "name": "محمد أحمد",
  "email": "mohamed@example.com",
  "password": "SecurePass123"
}
```

**الاستجابة الناجحة (201):**
```json
{
  "message": "تم إنشاء الحساب بنجاح",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "محمد أحمد",
    "email": "mohamed@example.com"
  }
}
```

### 2️⃣ تسجيل الدخول

```http
POST /login
Content-Type: application/json

{
  "email": "mohamed@example.com",
  "password": "SecurePass123"
}
```

**الاستجابة الناجحة (200):**
```json
{
  "message": "تم تسجيل الدخول بنجاح",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🔐 نموذج البيانات

### User Schema

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛡️ الأمان

المشروع يتضمن عدة طبقات أمان:

- ✅ **تشفير كلمات المرور**: باستخدام bcrypt مع salt rounds = 10
- ✅ **JWT Tokens**: صالحة لمدة ساعة واحدة
- ✅ **التحقق من البريد الفريد**: منع التسجيل المكرر
- ✅ **Validation**: التحقق من صحة البيانات المدخلة
- ✅ **Environment Variables**: حماية البيانات الحساسة

---

## 🎨 المزايا الرئيسية

<div align="center">

| الميزة | الوصف |
|:---:|:---|
| 🎯 | **هيكلة MVC احترافية** - فصل واضح بين Layers |
| 🔒 | **أمان متقدم** - تشفير وتوثيق قويين |
| ⚡ | **سرعة عالية** - كود محسّن وخفيف |
| 📦 | **سهل التوسع** - بنية قابلة للنمو |
| 🌍 | **دعم متعدد اللغات** - جاهز للعربية والإنجليزية |
| 🔄 | **RESTful API** - معايير صناعية |

</div>

---

## 🌿 Git Workflow

> ⚠️ **هام للمطورين**

يتم تطوير كل كنترولر في فرع منفصل:

```bash
# فرع تسجيل الدخول
git checkout -b feature/login-controller

# فرع إنشاء الحساب
git checkout -b feature/signup-controller

# دمج التغييرات
git checkout main
git merge feature/login-controller
git merge feature/signup-controller
```

---

## 🧪 اختبار API

يمكنك استخدام أدوات مثل:

- **Postman**: [تحميل Postman](https://www.postman.com/)
- **Thunder Client**: إضافة VS Code
- **cURL**: من سطر الأوامر

مثال باستخدام cURL:

```bash
# تسجيل حساب جديد
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"أحمد محمد","email":"ahmed@test.com","password":"123456"}'

# تسجيل الدخول
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed@test.com","password":"123456"}'
```

---

## 🔮 الخطط المستقبلية

- [ ] إضافة التحقق من البريد الإلكتروني
- [ ] نظام استعادة كلمة المرور
- [ ] OAuth 2.0 (Google, Facebook)
- [ ] Two-Factor Authentication (2FA)
- [ ] Rate Limiting لحماية من الهجمات
- [ ] Refresh Tokens للجلسات الطويلة
- [ ] لوحة تحكم إدارية

---

## 📚 الموارد المفيدة

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Bcrypt Best Practices](https://github.com/kelektiv/node.bcrypt.js)

---

## 🤝 المساهمة

نرحب بمساهماتك! إليك كيفية المساعدة:

1. Fork المشروع
2. أنشئ فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت **MIT License** - راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

## 👨‍💻 المطور

<div align="center">

**Mohamed**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohamed-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mohamed)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohamed@example.com)

</div>

---

<div align="center">

### 💙 صُنع بحب في مصر

**الإصدار 1.0.0** | أكتوبر 2024

⭐ إذا أعجبك المشروع، لا تنسَ إضافة نجمة!

---

```ascii
   ___   ___ ___                                    
  / _ | / _ \\ _ \___ __ __  __ _ __ _ _____ 
 / __ |/ ___/ ___/ -_) \ / / _ `/ _` / -_)
/_/ |_/_/  /_/   \___/_\_\ \_,_\__, \___| 
                               |___/       
```

**نظام توثيق آمن وموثوق لمشروعك القادم** 🚀

</div>
