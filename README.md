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
# عدل ملف .env بمعلوماتك

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

> ⚠️ **ملاحظة مهمة:** تأكد من استبدال `<username>` و `<password>` بمعلومات MongoDB الخاصة بك

---

## 🔄 استراتيجية Git Workflow - دليل شامل

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/4494/4494740.png" width="120" alt="Git Workflow">
</div>

### 📖 فهم هيكلية الـ Branches

> ⚠️ **نقطة مهمة جداً للمطورين الجدد**

هذا المشروع يستخدم **Branch-Based Development Strategy** حيث:

```
📌 Branch: main
├── ✅ الهيكلة الأساسية (Models, Routes, Config)
├── ❌ Controllers فارغة أو غير مكتملة
└── ✅ ملفات الإعداد الأساسية

📌 Branch: login
└── ✅ Login Controller كامل + Route

📌 Branch: signup  
└── ✅ Signup Controller كامل + Route
```

**لماذا هذه الاستراتيجية؟**
- ✅ فصل واضح للميزات
- ✅ سهولة المراجعة والاختبار
- ✅ تجنب التعارضات
- ✅ إمكانية العمل الجماعي

---

## 🎯 دليل البدء خطوة بخطوة

### **📥 السيناريو 1: استنساخ المشروع وجمع كل الأكواد**

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920349.png" width="80" alt="Development Guide">
</div>

#### **المرحلة الأولى: الإعداد الأولي**

```bash
# ========================================
# 1️⃣ استنساخ المشروع من GitHub
# ========================================
git clone https://github.com/your-username/e-commerce-auth.git
cd e-commerce-auth

# عرض الفرع الحالي
git branch
# Output: * main

# ========================================
# 2️⃣ جلب جميع الفروع من Remote
# ========================================
git fetch --all

# عرض جميع الفروع (المحلية والبعيدة)
git branch -a
# Output:
# * main
#   remotes/origin/HEAD -> origin/main
#   remotes/origin/main
#   remotes/origin/login
#   remotes/origin/signup
```

#### **المرحلة الثانية: إنشاء فرع Dev**

```bash
# ========================================
# 3️⃣ إنشاء فرع dev من main
# ========================================
git checkout -b dev

# تأكيد إنشاء الفرع
git branch
# Output:
# * dev
#   main

echo "✅ تم إنشاء فرع dev بنجاح"
```

#### **المرحلة الثالثة: دمج Login Controller**

```bash
# ========================================
# 4️⃣ دمج Login Branch في Dev
# ========================================

# التأكد من أنك على فرع dev
git checkout dev

# دمج login branch
git merge origin/login --no-ff -m "Merge login controller"

# --no-ff: يحافظ على سجل واضح للدمج
# -m: رسالة الـ commit

# إذا ظهرت رسالة نجاح:
echo "✅ تم دمج Login Controller بنجاح"

# ========================================
# 🔴 إذا حدثت تعارضات (Conflicts)
# ========================================

# ستظهر رسالة مثل:
# CONFLICT (content): Merge conflict in src/controllers/auth.controller.js
# Automatic merge failed; fix conflicts and then commit the result.

# الخطوات:
# 1. افتح الملف المتعارض في محرر الأكواد
# 2. ابحث عن العلامات:

<<<<<<< HEAD
// الكود من فرع dev
=======
// الكود من فرع login
>>>>>>> origin/login

# 3. احذف العلامات واختر الكود الصحيح
# 4. احفظ الملف
# 5. أضف الملفات المعدلة:

git add src/controllers/auth.controller.js
git commit -m "Resolve merge conflicts in login controller"

echo "✅ تم حل التعارضات وإكمال الدمج"
```

#### **المرحلة الرابعة: دمج Signup Controller**

```bash
# ========================================
# 5️⃣ دمج Signup Branch في Dev
# ========================================

# التأكد من أنك على فرع dev
git checkout dev

# دمج signup branch
git merge origin/signup --no-ff -m "Merge signup controller"

# معالجة التعارضات إن وجدت (نفس الخطوات السابقة)

git add .
git commit -m "Complete auth system with login and signup"

echo "✅ تم دمج Signup Controller بنجاح"
```

#### **المرحلة الخامسة: التحقق والاختبار**

```bash
# ========================================
# 6️⃣ فحص الملفات المدمجة
# ========================================

# عرض محتوى مجلد controllers
ls -la src/controllers/
# يجب أن ترى: auth.controller.js

# عرض محتوى الملف
cat src/controllers/auth.controller.js
# يجب أن يحتوي على login و signup functions

# ========================================
# 7️⃣ تثبيت الحزم والتشغيل
# ========================================

# تثبيت جميع الحزم المطلوبة
npm install

# إنشاء ملف .env من .env.example
cp .env.example .env

# افتح .env وعدل القيم:
# nano .env
# أو
# code .env

# تشغيل المشروع
npm run dev

# يجب أن ترى:
# ✅ Database Connected Successfully
# 🚀 Server running at: http://localhost:3000
```

#### **المرحلة السادسة: اختبار API**

```bash
# ========================================
# 8️⃣ اختبار Signup
# ========================================
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
  }'

# Response المتوقع:
# {
#   "message": "تم إنشاء الحساب بنجاح...",
#   "user": {...}
# }

# ========================================
# 9️⃣ اختبار Login
# ========================================
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'

# Response المتوقع:
# {
#   "message": "done",
#   "token": "eyJhbGciOiJIUzI1NiIs..."
# }

echo "✅ جميع الاختبارات نجحت!"
```

#### **المرحلة السابعة: دمج في Main (اختياري)**

```bash
# ========================================
# 🔟 دمج Dev في Main (بعد التأكد من كل شيء)
# ========================================

# الانتقال لـ main
git checkout main

# دمج dev في main
git merge dev --no-ff -m "Complete authentication system v1.0"

# رفع التغييرات لـ GitHub
git push origin main

# رفع فرع dev أيضاً
git push -u origin dev

echo "🎉 تم! المشروع جاهز بالكامل"
```

---

## 🔀 سيناريوهات إضافية

### **📌 السيناريو 2: إضافة ميزة جديدة**

```bash
# البدء من dev
git checkout dev
git pull origin dev  # أحدث نسخة

# إنشاء فرع للميزة الجديدة
git checkout -b feature/password-reset

# بعد كتابة الكود
git add .
git commit -m "Add password reset functionality"
git push -u origin feature/password-reset

# دمج في dev
git checkout dev
git merge feature/password-reset
git push origin dev
```

### **📌 السيناريو 3: تحديث من Remote**

```bash
# على فرع dev
git checkout dev

# جلب وتحديث من origin
git pull origin dev

# إذا كان لديك تغييرات محلية
git stash                 # حفظ مؤقت
git pull origin dev       # تحديث
git stash pop            # استعادة التغييرات
```

---

## 🛠️ حل المشاكل الشائعة بالتفصيل

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2920/2920233.png" width="100" alt="Troubleshooting">
</div>

### **❌ مشكلة 1: "Merge Conflict" عند الدمج**

**الأعراض:**
```bash
Auto-merging src/controllers/auth.controller.js
CONFLICT (content): Merge conflict in src/controllers/auth.controller.js
Automatic merge failed; fix conflicts and then commit the result.
```

**الحل التفصيلي:**

```bash
# 1. افتح الملف المتعارض
code src/controllers/auth.controller.js
# أو
nano src/controllers/auth.controller.js

# 2. ستجد شيء مثل:
<<<<<<< HEAD
export const login = async (req, res) => {
  // كود من dev
}
=======
export const signup = async (req, res) => {
  // كود من signup
}
>>>>>>> origin/signup

# 3. اختر ما تريد (أو ادمج يدوياً):
export const login = async (req, res) => {
  // كود login
}

export const signup = async (req, res) => {
  // كود signup
}

# 4. احفظ الملف واحذف العلامات (<<<<, ====, >>>>)

# 5. أضف الملف
git add src/controllers/auth.controller.js

# 6. أكمل الـ merge
git commit -m "Resolve merge conflict: combine login and signup"

# ✅ تم الحل!
```

### **❌ مشكلة 2: "fatal: refusing to merge unrelated histories"**

**الحل:**
```bash
git merge origin/login --allow-unrelated-histories
```

### **❌ مشكلة 3: الفروع لا تظهر**

```bash
# حل 1: تحديث الفروع
git fetch --all --prune

# حل 2: عرض الفروع البعيدة فقط
git branch -r

# حل 3: تتبع فرع بعيد
git checkout --track origin/login
```

### **❌ مشكلة 4: خطأ في دمج أخير**

```bash
# إلغاء آخر merge
git merge --abort

# أو التراجع عن آخر commit
git reset --hard HEAD~1

# أو استخدام reflog للعودة لنقطة محددة
git reflog
git reset --hard HEAD@{2}
```

---

## 📋 Checklist الدمج الآمن

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/709/709510.png" width="80" alt="Checklist">
</div>

قبل دمج أي فرع، تأكد من:

```bash
# ✅ 1. جلب آخر التحديثات
git fetch --all

# ✅ 2. التأكد من الفرع الحالي
git branch
# يجب أن ترى * بجانب dev

# ✅ 3. التأكد من عدم وجود تغييرات غير محفوظة
git status
# يجب أن ترى: nothing to commit, working tree clean

# ✅ 4. عمل backup (اختياري)
git branch backup-$(date +%Y%m%d)

# ✅ 5. الدمج
git merge origin/branch-name

# ✅ 6. الاختبار
npm run dev
# تأكد أن كل شيء يعمل

# ✅ 7. Commit النهائي
git add .
git commit -m "Descriptive message"

# ✅ 8. Push
git push origin dev
```

---

## 📡 نقاط النهاية API

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="80" alt="API Endpoints">
</div>

### 1️⃣ إنشاء حساب جديد (Signup)

```http
POST /signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "محمد أحمد",
  "email": "mohamed@example.com",
  "password": "SecurePass123",
  "gender": "male",
  "address": "القاهرة، مصر"
}
```

**Success Response (201):**
```json
{
  "message": "تم إنشاء الحساب بنجاح. يرجى تأكيد البريد الإلكتروني.",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "محمد أحمد",
    "email": "mohamed@example.com",
    "gender": "male",
    "confirmEmail": false,
    "role": "user"
  }
}
```

---

### 2️⃣ تسجيل الدخول (Login)

```http
POST /login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "mohamed@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "message": "done",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 🎓 أوامر Git الأساسية

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2620/2620522.png" width="80" alt="Git Commands">
</div>

| الأمر | الوصف | مثال |
|:------|:------|:-----|
| `git status` | عرض حالة الملفات | `git status` |
| `git branch` | عرض/إنشاء فروع | `git branch dev` |
| `git checkout` | التنقل بين الفروع | `git checkout dev` |
| `git fetch` | جلب التحديثات | `git fetch --all` |
| `git merge` | دمج الفروع | `git merge origin/login` |
| `git pull` | جلب ودمج | `git pull origin dev` |
| `git push` | رفع التغييرات | `git push origin dev` |
| `git log` | عرض السجل | `git log --oneline --graph` |
| `git stash` | حفظ مؤقت | `git stash save "WIP"` |
| `git reset` | التراجع | `git reset --hard HEAD~1` |

---

## 💡 نصائح ذهبية للمطورين

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" width="80" alt="Tips">
</div>

### **🔐 الأمان والتنظيم:**

1. **لا تعمل مباشرة على Main**
   ```bash
   # ❌ خطأ
   git checkout main
   # edit files...
   git commit -m "changes"
   
   # ✅ صحيح
   git checkout -b feature/my-feature
   # edit files...
   git commit -m "Add my feature"
   ```

2. **اعمل Commit بانتظام مع أوصاف واضحة**
   ```bash
   # ❌ سيء
   git commit -m "update"
   git commit -m "fix"
   
   # ✅ جيد
   git commit -m "Add email validation to signup"
   git commit -m "Fix: Resolve password hashing issue"
   ```

3. **استخدم .gitignore**
   ```bash
   # أضف في .gitignore
   node_modules/
   .env
   logs/
   *.log
   .DS_Store
   ```

4. **اختبر قبل Merge**
   ```bash
   npm run test
   npm run dev
   # تأكد أن كل شيء يعمل
   ```

---

## 📚 موارد إضافية

<div align="center">
<img src="https://cdn-icons-png.flaticon.com/512/2702/2702154.png" width="80" alt="Resources">
</div>

- [📖 Git Documentation](https://git-scm.com/doc)
- [🎓 Git Tutorial - Atlassian](https://www.atlassian.com/git/tutorials)
- [📺 Git & GitHub Crash Course](https://www.youtube.com/watch?v=SWYqp7iY_Tc)
- [🔧 GitHub CLI](https://cli.github.com/)

---

## 🤝 المساهمة في المشروع

<div align="center">
<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" width="100" alt="Contribute">
</div>

نرحب بكل المساهمات! إليك الخطوات:

1. 🍴 Fork المشروع
2. 🌿 `git checkout -b feature/amazing-feature`
3. ✍️ `git commit -m 'Add amazing feature'`
4. 📤 `git push origin feature/amazing-feature`
5. 🔀 افتح Pull Request

---

## 📄 الترخيص

هذا المشروع مرخص تحت **MIT License**

---

## 👨‍💻 المطور

<div align="center">

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Man%20Technologist.png" width="100" alt="Developer">

**Mohamed Developer**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohamed-dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mohamed)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohamed@example.com)

</div>

---

<div align="center">


**v1.0.0** | نوفمبر 2024

<img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" width="25"> **إذا أعجبك المشروع، لا تنسَ إضافة نجمة!** <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Star.png" width="25">

**نظام توثيق احترافي آمن وموثوق لمشروعك القادم** 🚀

</div>
