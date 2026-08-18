---
clickup: CU-DEMO101
layers: [BE]
status: approved
approved_by: pm@uyqur-lab
---

# Hello endpointi

## Muammo
Klient jamoalari uchun ishlaydigan minimal endpoint kerak.

## Foydalanuvchi hikoyasi
Klient dev sifatida men API tirikligini bitta so'rov bilan tekshirmoqchiman.

## Qabul mezonlari

- AC-1 [BE] EVENT: QACHONKI `GET /api/hello` chaqirilsa, 200 va `message` maydoni qaytadi
- AC-2 [BE] UNWANTED: AGAR noma'lum yo'l so'ralsa, U HOLDA 404 va `error` maydoni qaytadi
- AC-3 [BE] manual: server `npm start` bilan lokal ishga tushadi

## API kontrakti
```
GET /api/hello → 200 { "message": "Hello, Uyqur!" }
GET /*         → 404 { "error": "not_found" }
```

## Ko'lamdan tashqari
- Autentifikatsiya, ma'lumotlar bazasi

## Test ma'lumotlari
Talab qilinmaydi — bog'liqliksiz.
