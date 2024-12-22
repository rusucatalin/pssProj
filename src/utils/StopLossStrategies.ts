import { CryptoData } from "services/coingeckoService";

export interface StopLossStrategy {
  calculate(crypto: CryptoData[string]): string;
}

export class PercentageStopLossStrategy implements StopLossStrategy {
  constructor(private percentage: number) {}

  calculate(crypto: CryptoData[string]): string {
    const stopLossPrice = crypto.price * (1 - this.percentage / 100);
    return `Stop-loss at ${stopLossPrice.toFixed(2)} USD for ${crypto.symbol}`;
  }
}

export class FixedValueStopLossStrategy implements StopLossStrategy {
  constructor(private value: number) {}

  calculate(crypto: CryptoData[string]): string {
    const stopLossPrice = crypto.price - this.value;
    return `Stop-loss at ${stopLossPrice.toFixed(2)} USD for ${crypto.symbol}`;
  }
}
