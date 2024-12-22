import { db } from "config/firebaseConfig";
import { ref, get, onValue } from "firebase/database";

export type RowObj = {
  id: string;
  crypto: string;
  amount: number;
  price: number;
  timestamp: number;
};

interface PortfolioFetcher {
  fetch(userId: string, setData: (data: RowObj[]) => void): () => void;
}

class FirebasePortfolioFetcher implements PortfolioFetcher {
  fetch(userId: string, setData: (data: RowObj[]) => void): () => void {
    const portfolioRef = ref(db, `users/${userId}/portfolio`);

    const unsubscribe = onValue(portfolioRef, (snapshot) => {
      if (snapshot.exists()) {
        const portfolioData = snapshot.val();
        const data = Object.entries(portfolioData).map(([id, item]: any) => ({
          id,
          crypto: item.crypto,
          amount: item.amount,
          price: item.price,
          timestamp: item.timestamp,
        }));
        setData(data);
      } else {
        console.warn("No portfolio data found for user:", userId);
        setData([]);
      }
    });

    return unsubscribe;
  }
}

class LoggingPortfolioFetcher implements PortfolioFetcher {
  constructor(private fetcher: PortfolioFetcher) {}

  fetch(userId: string, setData: (data: RowObj[]) => void): () => void {
    console.log(`Fetching portfolio for user: ${userId}`);
    const unsubscribe = this.fetcher.fetch(userId, setData);
    return unsubscribe;
  }
}

class SortedPortfolioFetcher implements PortfolioFetcher {
  constructor(private fetcher: PortfolioFetcher) {}

  fetch(userId: string, setData: (data: RowObj[]) => void): () => void {
    const unsubscribe = this.fetcher.fetch(userId, (data) => {
      const sortedData = data.sort((a, b) => a.crypto.localeCompare(b.crypto));
      setData(sortedData);
    });
    return unsubscribe;
  }
}

export const createPortfolioFetcher = (): PortfolioFetcher => {
  const baseFetcher = new FirebasePortfolioFetcher();
  const loggingFetcher = new LoggingPortfolioFetcher(baseFetcher);
  return new SortedPortfolioFetcher(loggingFetcher);
};
