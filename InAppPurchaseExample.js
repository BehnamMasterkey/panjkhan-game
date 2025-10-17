import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as InAppPurchases from 'expo-in-app-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCT_ID = 'panjkhan.level5';
const STORAGE_KEY = 'panjkhan_unlocked_level5';

export default function InAppPurchaseExample() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    (async () => {
      await InAppPurchases.connectAsync();
      InAppPurchases.setPurchaseListener(async ({ responseCode, results }) => {
        if (responseCode === InAppPurchases.IAPResponseCode.OK) {
          for (const purchase of results) {
            if (!purchase.acknowledged && purchase.productId === PRODUCT_ID) {
              await AsyncStorage.setItem(STORAGE_KEY, 'true');
              setIsUnlocked(true);
              Alert.alert('خرید موفق', 'مرحلهٔ پنجم برای شما باز شد. ممنون از حمایت شما ❤️');
              await InAppPurchases.finishTransactionAsync(purchase, false);
            }
          }
        }
      });
      const unlocked = await AsyncStorage.getItem(STORAGE_KEY);
      if (unlocked === 'true') setIsUnlocked(true);
    })();

    return () => { InAppPurchases.disconnectAsync(); };
  }, []);

  async function buyLevel5() {
    try {
      const { responseCode, results } = await InAppPurchases.getProductsAsync([PRODUCT_ID]);
      if (responseCode === InAppPurchases.IAPResponseCode.OK && results.length > 0) {
        await InAppPurchases.purchaseItemAsync(PRODUCT_ID);
      } else {
        Alert.alert('خطا', 'محصول پیدا نشد. لطفاً اتصال اینترنت و تنظیمات کنسول را بررسی کنید.');
      }
    } catch (e) {
      console.warn(e);
      Alert.alert('خطا', 'مشکلی در شروع فرایند خرید پیش آمد.');
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>وضعیت مرحلهٔ ۵: {isUnlocked ? 'باز شده' : 'قفل'}</Text>
      {!isUnlocked ? (
        <View style={{ marginTop: 12 }}>
          <Text style={{ marginBottom: 8 }}>
            برای حمایت از سازنده و دسترسی به مرحلهٔ نهایی، می‌توانید با پرداخت اندکی از ما پشتیبانی کنید.
          </Text>
          <Button title="خرید مرحلهٔ پنجم — حمایت از سازنده" onPress={buyLevel5} />
        </View>
      ) : (
        <Text style={{ marginTop: 12 }}>از بازی لذت ببر — مرحلهٔ پنجم باز است 🎉</Text>
      )}
    </View>
  );
}