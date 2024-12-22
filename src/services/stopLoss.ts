import { CryptoData } from "./coingeckoService";

// Abstract interface for Stop-Loss calculation (Bridge)
export interface StopLossStrategy {
  calculate(crypto: CryptoData[string]): string;
}

// Composite Pattern component
export interface StopLossComponent {
  suggestStopLoss(): string;
}
