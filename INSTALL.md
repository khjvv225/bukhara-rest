# BUKHARA REST - Restaurant Management System

Uzbek tilidagi to'liq restoran boshqaruv tizimi.

## ✨ Xususiyatlari

### 👥 Foydalanuvchi Tizimi
- **Asosiy Sayt** - Taomlarni ko'rish, buyurtma berish, stol bronlash
- **Customer Login** - Telefon raqam + 6 raqamli PIN orqali kirish
- **Customer Dashboard** - O'z buyurtmalari, yetkazib berilishlari, bronlari, profili
- **Admin Panel** - Komplete boshqaruv paneli

### 🍽️ Taom Boshqaruvi
- Taomlar kategoriyalarga bo'lingan (Asosiy, Ochildi, Shirinlik, Ichimlik)
- Admin paneldan taom qo'shish, o'zgartirish, o'chirish
- Barcha narxlar UZS da (1 USD = 12,500 UZS)
- Taom rasmlarini URL orqali qo'shish

### 📦 Buyurtma Tizimi
- Buyurtma berish (dine-in yoki delivery)
- Buyurtma holatini kuzatish (Kutmoqda → Tasdiqlandi → Tugallandi)
- Yetkazib berish manzilini kiritish
- Oylik daromad statistikasi

### 🚚 Yetkazib Berish Tizimi
- Yetkazib berish holati kuzatishi (Tayyorlash → Yo'lda → Yetkazildi)
- Admin paneldan yetkazib berish boshqaruvi
- Customer portaldagi real-time progress bar

### 📅 Stol Bronlashi
- Sana, vaqt, mehmonlar soni tanlash
- Tadbir turi (Tug'ilgan kun, Nikoh, Korxona, va boshqalar)
- Admin paneldan bron boshqaruvi

### 💼 Admin Panel
- **Dashboard** - Bugungi statistika (buyurtmalar, bronlar, daromad)
- **Buyurtmalar** - Barcha buyurtmalarni boshqarish
- **Yetkazib Berish** - Yetkazib berilishni kuzatish va boshqarish
- **Bronlar** - Stol bronlarini boshqarish
- **Menyu** - Taomlarni qo'shish, o'zgartirish, o'chirish
- **Stollar** - Stollarni qo'shish, o'zgartirish
- **Mijozlar** - Mijozlar ro'yhati (jami buyurtmalar, xarajatlar, reyting)
- **Statistika** - Kategoriya bo'yicha tahlil, oylik daromad

### 💾 Data Storage
- LocalStorage yordamida ma'lumotlarni saqlash (servetsiz ishlaydi)
- Bitti brauzer oynasida barcha ma'lumotlar saqlanadi

## 🚀 Ishga Tushirish

### Mahalliy (Local)
```bash
# Python ishlatib
python -m http.server 8000
# Keyin http://localhost:8000 ga o'ting
```

### Netlify orqali Hosting
1. GitHub reposi yaratish
2. Netlify.com ga kirish
3. Repository ulanish
4. Deploy qilish

## 📱 Sahifalar
- `index.html` - Asosiy sayt
- `admin.html` - Admin panel
- `customer-login.html` - Customer login
- `customer-dashboard.html` - Customer cabinet
- `styles.css` - Barcha CSS stillar
- `script.js` - Asosiy JavaScript logikasi
- `admin-script.js` - Admin panel logikasi
- `customer-script.js` - Customer portal logikasi

## 💱 Valyuta
- 1 USD = 12,500 UZS
- Barcha narxlar avtomatik o'giriladi

## 🔐 Default Test Sizni
- **Admin Panel**: `/admin.html`
- **Customer Login**: `/customer-login.html`
- Telefon: `+998901234567` yoki `+998xx1234567`
- PIN: `123456`

## 📄 Litsenziya
MIT

---

**BUKHARA REST** - Tashkent, Uzbekistan 🇺🇿
