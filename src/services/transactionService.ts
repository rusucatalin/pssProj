import { getDatabase, ref, get } from "firebase/database";

class TransactionServicePrototype {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }

  clone(): TransactionServicePrototype {
    return new TransactionServicePrototype(this.userId);
  }

  async fetchTransactionData(): Promise<any[]> {
    const db = getDatabase();
    const transactionRef = ref(db, `users/${this.userId}/transactionHistory`);
    const snapshot = await get(transactionRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    }
    return [];
  }
}

export default TransactionServicePrototype;
