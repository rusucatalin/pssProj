import { db } from "config/firebaseConfig";
import { ref, push } from "firebase/database";
import { fetchCryptoData } from "services/coingeckoService";

/**
 * Adds an item to the user's portfolio in the Realtime Database and records the transaction history.
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
    const isApproved = amount > 0 && totalPrice > 0;

    const portfolioRef = ref(db, `users/${userId}/portfolio`);
    if (isApproved) {
      await push(portfolioRef, {
        crypto,
        amount,
        price: totalPrice,
        timestamp: Date.now(),
      });
    }

    const transactionRef = ref(db, `users/${userId}/transactionHistory`);
    await push(transactionRef, {
      crypto,
      amount,
      price: totalPrice,
      isApproved,
      timestamp: Date.now(),
    });

    if (isApproved) {
      console.log("Item added to portfolio and transaction recorded.");
    } else {
      console.warn(
        "Transaction recorded but not approved due to invalid input.",
      );
    }
  } catch (error) {
    console.error("Error adding to portfolio:", error);
  }
};
