import { db } from "config/firebaseConfig";
import { ref, push } from "firebase/database";
import { fetchCryptoData } from "services/coingeckoService";

/**
 * Adds an item to the user's portfolio in the Realtime Database.
 * @param userId - The user's UID.
 * @param crypto - The cryptocurrency data to add.
 * @param amount - The amount of cryptocurrency purchased.
 */
export const addToPortfolio = async (
  userId: string,
  crypto: string,
  amount: number,
) => {
  try {
    const cryptoData = await fetchCryptoData();

    const selectedCrypto = cryptoData[crypto];
    if (!selectedCrypto) {
      throw new Error("Crypto data not found.");
    }

    const totalPrice = selectedCrypto.price * amount;

    const portfolioRef = ref(db, `users/${userId}/portfolio`);
    await push(portfolioRef, {
      crypto,
      amount,
      price: totalPrice,
      timestamp: Date.now(),
    });

    console.log("Item added to portfolio.");
  } catch (error) {
    console.error("Error adding to portfolio:", error);
  }
};
