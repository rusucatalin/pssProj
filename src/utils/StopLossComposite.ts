import { CryptoData } from "services/coingeckoService";
import { StopLossStrategy } from "./StopLossStrategies";

export interface StopLossComponent {
  suggestStopLoss(): string;
}

export class CryptoStopLoss implements StopLossComponent {
  constructor(
    private crypto: CryptoData[string],
    private strategy: StopLossStrategy,
  ) {}

  suggestStopLoss(): string {
    return this.strategy.calculate(this.crypto);
  }
}

export class StopLossGroup implements StopLossComponent {
  private components: StopLossComponent[] = [];

  add(component: StopLossComponent): void {
    this.components.push(component);
  }

  suggestStopLoss(): string {
    return this.components
      .map((component) => component.suggestStopLoss())
      .join("\n");
  }
}
