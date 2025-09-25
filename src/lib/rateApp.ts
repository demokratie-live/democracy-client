import * as StoreReview from 'expo-store-review';

export const rateApp = async () => {
  try {
    if (await StoreReview.hasAction()) {
      // Use the in-app review API when available
      await StoreReview.requestReview();
    } else {
      // Fallback to opening the store review page
      const storeUrl = await StoreReview.storeUrl();
      if (storeUrl) {
        await StoreReview.requestReview();
      }
    }
  } catch (error) {
    console.warn('Error requesting app review:', error);
  }
};
