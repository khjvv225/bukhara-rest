# 🍽️ Zarafat Restoran - Premium Sayt va Admin Panel

To'liq funksional restoran saytining tizimi. Müşteriler menyu, bron qilish, buyurtma berish va admin panel orqali hamma narsani boshqara oladi.

## ✨ Asosiy Xususiyatlar

### 👥 Foydalanuvchi Uchun
- 🍽️ **Menyu Ko'rish** - Kategoriyalar bo'yicha filterlash
- 🛒 **Savat Boshqaruvi** - Taomlarni qo'shish/o'chirish
- 📅 **Stol Band Qilish** - Vaqt, tadbir turi, mehmon soni tanlash
- 🚀 **Buyurtma Berish** - Yetkazib berish yoki shaxsan olish
- 📞 **Kontakt Ma'lumotlari** - Telefon, manzil, ish vaqti

### 👨‍💼 Admin Uchun
- 📊 **Dashboard** - Bugungi statistika (buyurtmalar, bronlar, daromad)
- 📋 **Buyurtmalar Boshqaruvi** - Holati o'zgartirish (Kutmoqda, Tasdiqlandi, Tugallandi)
- 📅 **Stol Bronlari** - Bronlarni tekshirish va tasdiqlash
- 🍴 **Menyu Boshqaruvi** - Taom qo'shish, o'chirish, o'zgartirish
- 🪑 **Stollar Boshqaruvi** - Stol qo'shish/o'chirish
- 📊 **Statistika va Hisobotlar** - Taom kategoriyalari, daromad analizi

## 🚀 Ishga Tushirish

### 1. Fayllarni Tekshirish
Katalogda quyidagi fayllar bo'lishi kerak:
```
- index.html (Asosiy sahifa)
- admin.html (Admin panel)
- styles.css (Barcha stillar)
- script.js (Foydalanuvchi funksiyalari)
- admin-script.js (Admin funksiyalari)
- README.md (Bu fayl)
```

### 2. Brauzerda Ochish
Faylni brauzerda ochish uchun:
```
file:///C:/Users/User/Desktop/bukharrest/index.html
```

### 3. Admin Panelga Kirish
Saytning navigatsiyasida "Admin" tugmasini bosing yoki:
```
file:///C:/Users/User/Desktop/bukharrest/admin.html
```

## 📖 Qo'llanma

### Menyu Ko'rish va Buyurtma Berish
1. Bosh sahifada "Menyu Ko'rish" tugmasini bosing
2. Kategoriyalar bo'yicha filterlash
3. "Qo'shish" tugmasini bosib savatga qo'shish
4. "Savat va Buyurtma" bo'limiga o'ting
5. Buyurtma shakli to'ldiring va jo'nating

### Stol Band Qilish
1. "Stol Band Qilish" bo'limiga o'ting
2. Sizning ma'lumotlaringizni kiriting
3. Sana, vaqt, mehmonlar sonini tanlang
4. Tadbir turini tanlang (odiy bron, nikoh, tug'ilgan kun va boshqa)
5. "Bronni Tasdiqlash" tugmasini bosing

### Admin Panelda Boshqarish

#### Dashboard
- Bugungi buyurtmalar, bronlar, daromad ko'rish
- Jami mehmonlar statistikasi

#### Buyurtmalar
- Barcha buyurtmalarni ko'rish
- Holati o'zgartirish: Kutmoqda → Tasdiqlandi → Tugallandi
- Buyurtmani o'chirish

#### Bronlar
- Stol bronlarini ko'rish
- Bron statusini o'zgartirish
- Bron ma'lumotlarini tahrirlash

#### Menyu
- Yangi taom qo'shish
- Taom tahrirlash (nom, narx, tavsilot)
- Taom o'chirish
- Kategoriyalar: Asosiy taom, Ochildi taom, Shirinlik, Ichimlik

#### Stollar
- Yangi stol qo'shish (raqami, o'rindiq soni, joylashuvi)
- Stol o'chirish
- Stol holatini ko'rish (mavjud/band)

#### Statistika
- Kategoriyalar bo'yicha buyurtma statistikasi
- Oymaning umumiy daromadi
- Anda analizi

## 🗄️ Ma'lumotlar Saqlash

Barcha ma'lumotlar brauzer's **localStorage** da saqlanadi:
- `menu` - Menyu elementlari
- `tables` - Stol ma'lumotlari
- `bookings` - Stol bronlari
- `orders` - Buyurtmalar

## 🎨 Dizayn

- **Rang Sxemasi**: Qo'hna restoran uslubi (Qo'ng'ir, Tilla, Qizil)
- **Responsive**: Mobil, Planshet, Desktop uchun optimallashtirilgan
- **Animatsiyalar**: Silliq o'tilishlar va hover effektlari
- **Ikonkalar**: Font Awesome 6.4.0 kutubxonasidan

## 🛠️ Texnik Detallar

- **HTML5** - Semantik tuzilma
- **CSS3** - Modern stili (Flexbox, Grid)
- **JavaScript (ES6)** - Interaktiv funksionallik
- **localStorage** - Ma'lumotlar saqlash
- **Responsive Design** - Barcha qurilmalar uchun

## 📋 Default Menyu

1. **Asosiy Taomlar**
   - Manti ($8.50)
   - Palov ($7.50)
   - Shurva ($6.50)

2. **Ochildi Taomlar**
   - Somsa ($3.50)
   - Shami Kabob ($4.50)

3. **Shirinliklar**
   - Halva ($3.00)

4. **Ichimliklar**
   - Choy ($1.50)
   - Ayran ($2.00)

## ⚙️ Boshqaruv

### Buyurtma Holatlari
- **Kutmoqda** (Pending) - Yangi buyurtma
- **Tasdiqlandi** (Confirmed) - Admin tasdiqladi
- **Tugallandi** (Completed) - Tugallash tasdiqini berdi
- **Bekor Qilindi** (Cancelled) - Bekor qilindi

### Stol Holatlari
- **Mavjud** (Available) - Stol bo'sh
- **Band Qilindi** (Occupied) - Stol band

## 🔐 Xavfsizlik

- Barcha ma'lumotlar brauzerning localStorage'da saqlanadi
- Production uchun backend serveri talab qiladi
- Admin panelga parol himoyasi qo'shilishi mumkin

## 🚀 Kengaytirish Imkoniyatlari

- ✅ Backend serveri (Node.js, Python, yoki boshqa)
- ✅ Database (MongoDB, MySQL, yoki boshqa)
- ✅ To'lov tizimlari (Stripe, PayPal)
- ✅ Email yuborish
- ✅ SMS xabarlash
- ✅ Parol himoyasi
- ✅ Multi-language support
- ✅ Mobile app

## 📞 Kontakt

- **Telefon**: +998 71 123-45-67
- **Manzil**: Toshkent, Amir Temur ko'chasi, 123
- **Ish Vaqti**: 11:00 - 23:00

## 📄 Litsenziya

Shaxsiy va tijorat ishlanmalarida foydalanish uchun bemalol.

---

**Zarafat Restoran** - Sizning Tadbir va Ovqat Xizmati! 🍽️✨
