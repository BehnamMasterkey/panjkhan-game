# راهنمای خرید درون برنامه — بازی پنج‌خان

این راهنما مخصوص فعال کردن مرحلهٔ پنجم بازی است.

## ۱. شناسه محصول
- نام محصول: Level 5
- Product ID: `panjkhan.level5`

## ۲. Expo / React Native
- نصب:
  ```bash
  expo install expo-in-app-purchases
  npm install @react-native-async-storage/async-storage
  ```
- استفاده:
  - کد نمونه `InAppPurchaseExample.js` را در پروژه قرار دهید.
  - متن فارسی نمایش خرید:
    > «با حمایت کوچک شما از سازنده و ترویج فرهنگ کهن ایران، بازی ادامه می‌یابد — از همراهی‌تان سپاسگزاریم.»

- تست:
  - در Google Play: Internal Testing با حساب تست ساخته شده.
  - بعد از خرید موفق، مرحلهٔ پنجم باز می‌شود.

## ۳. Unity
- نصب Unity IAP:
  - Window → Unity Services → IAP
  - یا Package Manager → In-App Purchasing
- استفاده:
  - کد نمونه: `IAPManager.cs`
  - متن فارسی مشابه Expo برای modal خرید استفاده شود.
- تست:
  - Sandbox testing برای Android / iOS

## ۴. نکات
- برای امنیت بیشتر، می‌توان اعتبار خرید را در سرور تایید کرد.
- پرداخت کم‌فشار و حمایتی است، نه تبلیغی.