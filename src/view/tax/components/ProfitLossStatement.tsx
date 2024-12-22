import React from "react";
import { CryptoData } from "services/coingeckoService";

const ProfitLossStatement: React.FC<ProfitLossStatementProps> = ({
  cryptoData,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Profit/Loss Statement</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Symbol</th>
            <th className="px-4 py-2 text-right">Price</th>
            <th className="px-4 py-2 text-right">Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cryptoData).map(([key, value]) => (
            <tr key={key}>
              <td className="px-4 py-2">{value.symbol}</td>
              <td className="px-4 py-2 text-right">
                ${value.price.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-right">
                {value.change_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfitLossStatement;
