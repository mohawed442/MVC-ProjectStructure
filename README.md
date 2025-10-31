# 🌿 MVC Helper — README

> مشروع خفيف يشبه إطار عمل (helper/framework) لبنية **MVC** مع صفحة تسجيل دخول و تسجيل حساب فقط — تصميم عصري، ألوان مريحة، وأنيميشن بسيط للواجهة.

---

## ✨ نظرة عامة

هذا المشروع مُصمم كمساعد (micro-framework style) يسرّع بناء تطبيقات صغيرة بالمعمارية `MVC`. الهدف: **بنية منظمة**، صفحتين فقط (`login`, `signup`) داخل مجلد `main`، وتوصيل بسيط بقاعدة بيانات باستخدام موديل مستخدم يحتوي على `name`, `email`, `password`.

الـ login يرجع **JSON Web Token (JWT)** في الاستجابة بعد نجاح المصادقة.

---

## 🧭 المميزات

* بنية MVC واضحة (Controllers / Models / Views / Routes)
* صفحتان جاهزتان: `signup` و `login` داخل `main/`
* موديل مستخدم بسيط: `name`, `email`, `password`
* تسجيل (signup) مع حقول: الاسم — البريد — كلمة المرور (+ حقول إضافية اختيارية)
* تسجيل دخول (login) يرجع توكن في الـ response
* تأثيرات أنيميشن خفيفة في الواجهة لتجربة مستخدم جذابة
* ألوان مريحة للعين وواجهة نظيفة

---

## 🌈 ألوان مقترحة (Palette)

* خلفية عامة: `#F6F8FA` (very light)
* بطاقات / كارتس: `#FFFFFF`
* تباين أساسي: `#0F172A` (dark navy)
* ألوان accents: `#4F46E5` (indigo), `#06B6D4` (teal)
* لون ثانوي مريح: `#64748B` (slate)

> هذه الألوان مريحة وطبيعية للشاشات وتعمل جيدًا مع أنيميشن بسيط.

---

## 🗂️ هيكلة المشروع (Structure)

```
MVC-ProjectStructure/
├─ src/
│  ├─ main/                # صفحات الواجهة (login, signup)
│  │  ├─ login/            # صفحة login
│  │  │  ├─ index.html
│  │  │  └─ styles.css
│  │  └─ signup/           # صفحة signup
│  │     ├─ index.html
│  │     └─ styles.css
│  ├─ controllers/
│  │  └─ auth.controller.js
│  ├─ models/
│  │  └─ user.model.js
│  ├─ routes/
│  │  └─ auth.routes.js
│  ├─ config/
│  │  └─ db.js
│  └─ app.js
├─ .env
├─ package.json
└─ README.md
```

---

## 🧩 نموذج الـ User (Mongoose example)

```js
// src/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
```

---

## 🔌 Routes / API

### POST `/api/auth/signup`

* body: `{ name, email, password, ...optional }`
* يعمل: ينشئ مستخدم جديد (بعد هاش لكلمة المرور)
* استجابة مثال:

```json
{
  "success": true,
  "message": "User created",
  "user": { "id": "...", "name": "Ali", "email": "a@b.com" }
}
```

### POST `/api/auth/login`

* body: `{ email, password }`
* يعمل: يتحقق من البيانات، ويرسل **JWT** في الاستجابة
* استجابة مثال:

```json
{
  "success": true,
  "token": "eyJhbGciOi...",
  "user": { "id": "...", "name": "Ali", "email": "a@b.com" }
}
```

---

## 🧾 مثال بسيط للـ Controller

```js
// src/controllers/auth.controller.js
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash });
  res.json({ success: true, user: { id: user._id, name: user.name, email: user.email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
};
```

---

## 🎨 واجهة المستخدم — تصميم جذاب مع أنيميشن

* الواجهة مبسطة: كارت مركزي يحتوي على فورم، حواف مستديرة، ظل خفيف.
* أنيميشن: دخول تدريجي (fade-in + slide-up) للبطاقة، وتأثير على الأزرار عند المرور (hover) مع ترجمة خفيفة.

### مثال CSS للـ Card & Animation (ضعه في `main/*/styles.css`)

```css
/* palette-based variables */
:root{
  --bg: #F6F8FA;
  --card: #FFFFFF;
  --accent: #4F46E5;
  --muted: #64748B;
}

body{background:var(--bg);font-family:Inter, system-ui, Arial;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}

.auth-card{background:var(--card);width:360px;padding:28px;border-radius:14px;box-shadow:0 8px 30px rgba(15,23,42,0.08);opacity:0;transform:translateY(18px);animation:cardIn .6s cubic-bezier(.2,.9,.2,1) forwards}

@keyframes cardIn{to{opacity:1;transform:translateY(0)}}

.button{display:inline-block;padding:10px 16px;border-radius:10px;border:none;background:var(--accent);color:white;font-weight:600;cursor:pointer;transition:transform .18s ease, box-shadow .18s ease}
.button:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(79,70,229,0.18)}

.input{width:100%;padding:10px 12px;border-radius:8px;border:1px solid #E6E9EE;margin-bottom:12px}
```

> يُمكنك إضافة GIF متحرك في أعلى README كـ banner لتسليط الضوء على الأنيميشن.

---

## 🚀 التشغيل محليًا

1. انسخ الريبو

```bash
git clone <repo-url>
cd MVC-ProjectStructure
```

2. ثبت الحزم

```bash
npm install
```

3. جهّز ملف `.env`:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=some_secret
PORT=3000
```

4. شغّل الخادم

```bash
npm run dev
```

---

## ✅ نصائح

* لا تنسَ عمل هاش لكلمات المرور دائماً.
* أفصل الصوتيات والوظائف الثقيلة خارج الكونترولر إن احتجت.
* لو تريد دعم حقلَي ملف (avatar) أو تاريخ الميلاد — أضفهم للموديل وواجهة الـ signup.

---

## ✍️ خاتمة

هذا `README.md` مهيأ ليقدّم المشروع كمكوّن مساعد/إطار عمل صغير. لو تحب أعدّل الألوان أو أدرج صورة متحركة (GIF) جاهزة — أقدر أعدّل الملف فورًا.

---

*صُنع بمحبة — لو عايز نسخه إنجليزي أو إصدار جاهز للنشر على GitHub أعطني إشارة.*
