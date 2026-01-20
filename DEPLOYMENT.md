# BUKHARA REST - Deployment Qo'llanmasi

## 🌐 Hosting Variantlari

### 1️⃣ **Netlify** (Eng oson) ⭐ TAVSIYA ETILGAN

#### Step 1: GitHub repozitoriy yaratish
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bukhara-rest.git
git push -u origin main
```

#### Step 2: Netlify'ga ulanish
1. [Netlify.com](https://netlify.com) ga o'ting
2. "Sign up" ni bosing (GitHub bilan)
3. "New site from Git" ni tanlang
4. Repozitoriyni tanlang
5. Deploy qilish tugmasini bosing
6. **HOTLINE! Sayt avtomatik deploy bo'ladi**

#### Step 3: Domain ulash (ixtiyoriy)
- Netlify settings → Domain management
- Custom domain qo'shing yoki Netlify subdomain ishlating

---

### 2️⃣ **Vercel** (Vercel.com)

#### Step 1: Vercel'ga ulanish
1. [Vercel.com](https://vercel.com) ga o'ting
2. GitHub bilan kirish
3. "Import Project" ni bosing
4. Repozitoriyni tanlang

#### Step 2: Deploy qilish
- Vercel avtomatik deploy qiladi
- URL: `bukhara-rest.vercel.app` (shuni o'zgartirishingiz mumkin)

---

### 3️⃣ **GitHub Pages**

#### Step 1: Repository Settings
```
Settings → Pages → Source: Deploy from a branch → main
```

#### Step 2: Push qiling
```bash
git push origin main
```

#### Step 3: URL
- `https://YOUR_USERNAME.github.io/bukhara-rest`

---

### 4️⃣ **Heroku** (Nodejs server bilan)

#### Step 1: Heroku CLI o'rnatish
```bash
npm install -g heroku
```

#### Step 2: Heroku'ya ulanish
```bash
heroku login
heroku create bukhara-rest
git push heroku main
```

---

### 5️⃣ **Railway.app** (Yangi, chiroyli)

#### Step 1: Railway'ga ulanish
1. [Railway.app](https://railway.app) ga o'ting
2. GitHub bilan ulanish

#### Step 2: Deploy
- Repozitoriyni tanlang
- Avtomatik deploy!

---

## 🔧 Mahalliy Ishga Tushirish

### Python bilan (eng oson)
```bash
cd bukharrest
python -m http.server 8000
# http://localhost:8000 ga o'ting
```

### Node.js bilan
```bash
npm install -g http-server
http-server
```

### Live Server (VS Code extension)
- VS Code'da "Live Server" extensionini o'rnatish
- `index.html` ni o'ng click qilish
- "Open with Live Server"

---

## 📊 Mahalliy Testing

### Test Hisoblari
- **Telefon**: +998901234567 yoki +998xx1234567
- **PIN**: 123456
- **Taomlar**: Avtomatik qo'shiladi (8 ta default)

### Tekshirish ro'yxati
✅ Asosiy sahifa ochiladi
✅ Taomlarni ko'rish mumkin
✅ Buyurtma berish mumkin
✅ Customer login ishlaydi
✅ Admin panel ochiladi
✅ Admin menyu tahrir qilishi mumkin
✅ Yetkazib berish holatini kuzatish mumkin

---

## 🚨 Muammolar va Echimlar

### "Not Found" xatosi
- `netlify.toml` faylini tekshiring
- Redirect redirects qo'shilgan bo'lsa, olib tashlang

### LocalStorage bo'sh
- Browser dev tools → Application → Clear Storage
- Yangi ma'lumotlarni qo'shing

### CSS yuklanmadi
- Cache-ni tozalang (Ctrl+Shift+R)
- Fayl yo'llarini tekshiring

---

## 📈 Production Tavsiyalari

1. **HTTPS** - Netlify/Vercel avtomatik qiladi
2. **CDN** - Rasm optimizatsiyasi
3. **Analytics** - Google Analytics qo'shish
4. **Backup** - Regular git push qilish
5. **SSL** - Avtomatik (Netlify/Vercel)

---

## 🔐 Security

### Ma'lumotlar Xavfsizligi
- **LocalStorage** faqat browser'da saqlanadi
- **Server yoq** - server bilan bog'liq xavf yoq
- **PIN** - haqiqiy production'da hash qilish kerak

### Production'da Tavsiyalar
1. Backend server yaratish (Node.js, Python)
2. Database qo'shish (MongoDB, PostgreSQL)
3. JWT authentication
4. API endpoints himoyasi
5. CORS settings

---

## 💡 Keyingi Bosqichlar

- [ ] Backend API yaratish
- [ ] Database integratsiyasi
- [ ] Payment gateway (Payme, Click)
- [ ] Email/SMS notifikatsiyalar
- [ ] Admin dashboard analytics
- [ ] Mobile app (React Native)

---

## 📞 Support

Muammolar bo'lsa:
1. Console xatolarini tekshiring (F12)
2. localStorage'ni tozalang
3. Cache'ni tozalang (Ctrl+Shift+Del)
4. Brauzer'ni o'zgartiring

**Muvaffaqiyatli hosting! 🎉**
