import { EventEmitter } from "events";
import { fetchCryptoData } from "./coingeckoService";

class CryptoObserver extends EventEmitter {
  async fetchData() {
    try {
      const cryptoData = await fetchCryptoData();
      this.emit("dataUpdated", cryptoData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

export const cryptoObserver = new CryptoObserver();
