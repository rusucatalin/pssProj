import React, { useEffect, useState } from "react";
import { CryptoData, fetchCryptoData } from "services/coingeckoService";
import { StopLossGroup, CryptoStopLoss } from "utils/StopLossComposite";
import {
  PercentageStopLossStrategy,
  FixedValueStopLossStrategy,
} from "utils/StopLossStrategies";
import StopLossChart from "../stopLoss/components/StopLossChart";

interface StopLossPrices {
  percentage: number;
  fixed: number;
}

const StopLoss = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [stopLossSuggestions, setStopLossSuggestions] = useState<string>("");
  const [stopLossPrices, setStopLossPrices] = useState<
    Record<string, StopLossPrices>
  >({});

  useEffect(() => {
    const loadCryptoData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);

        const stopLossGroup = new StopLossGroup();
        const prices: Record<string, StopLossPrices> = {};

        Object.values(data).forEach((crypto) => {
          const percentageStrategy = new PercentageStopLossStrategy(5);
          const fixedValueStrategy = new FixedValueStopLossStrategy(50);

          const percentageStopLoss = new CryptoStopLoss(
            crypto,
            percentageStrategy,
          );
          const fixedValueStopLoss = new CryptoStopLoss(
            crypto,
            fixedValueStrategy,
          );

          stopLossGroup.add(percentageStopLoss);
          stopLossGroup.add(fixedValueStopLoss);

          prices[crypto.symbol] = {
            percentage: crypto.price * 0.95,
            fixed: crypto.price - 50,
          };
        });

        setStopLossPrices(prices);
        setStopLossSuggestions(stopLossGroup.suggestStopLoss());
      } catch (error) {
        console.error("Error loading crypto data:", error);
      }
    };
    loadCryptoData();
  }, []);

  const renderCryptoCard = (id: string, crypto: CryptoData[string]) => (
    <div key={id} className="bg-gray-50 rounded-lg p-4">
      <StopLossChart
        currentPrice={crypto.price}
        symbol={crypto.symbol}
        stopLossPrices={stopLossPrices[crypto.symbol]}
      />
      <div className="mt-4 text-sm space-y-1">
        <div>Current Price: ${crypto.price.toFixed(2)}</div>
        <div>
          Percentage Stop Loss: $
          {stopLossPrices[crypto.symbol]?.percentage.toFixed(2)}
        </div>
        <div>
          Fixed Stop Loss: ${stopLossPrices[crypto.symbol]?.fixed.toFixed(2)}
        </div>
        <div>24h Change: {crypto.change_24h.toFixed(2)}%</div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Stop-Loss Analysis</h1>

      {/* <div className="mb-6 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Stop Loss Suggestions</h2>
        <pre>{stopLossSuggestions}</pre>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {cryptoData &&
          Object.entries(cryptoData).map(([id, crypto]) =>
            renderCryptoCard(id, crypto),
          )}
      </div>
    </div>
  );
};

export default StopLoss;
