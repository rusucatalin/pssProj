import InputField from "components/input/InputField";
import React, { useState } from "react";
import { CryptoData } from "services/coingeckoService";

interface TaxCalculationProps {
  cryptoData: CryptoData;
  taxRate: number;
}

const TaxCalculation: React.FC<TaxCalculationProps> = ({
  cryptoData,
  taxRate,
}) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [cryptoAmount, setCryptoAmount] = useState<string>("");

  const handleCryptoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCryptoAmount(e.target.value);
  };

  const calculateTax = () => {
    const cryptoPrice = cryptoData[selectedCrypto]?.price || 0;
    const totalIncome = parseFloat(cryptoAmount) * cryptoPrice;
    const tax = totalIncome * taxRate;
    return { totalIncome, tax };
  };

  const { totalIncome, tax } = calculateTax();

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Tax Calculation</h2>
      <div className="mb-4">
        <label htmlFor="crypto-select" className="block text-sm font-medium">
          Select Cryptocurrency
        </label>
        <select
          id="crypto-select"
          value={selectedCrypto}
          onChange={handleCryptoChange}
          className="mt-2 w-full rounded-md border p-2"
        >
          <option value="">-- Select --</option>
          {Object.entries(cryptoData).map(([key, value]) => (
            <option key={key} value={key}>
              {value.symbol.toUpperCase()} - ${value.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <InputField
        id="crypto-amount"
        label="Enter Amount"
        extra=""
        placeholder="Enter crypto amount"
        variant="default"
        type="number"
        value={cryptoAmount}
        onChange={handleAmountChange}
      />

      <div className="mt-4">
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TaxCalculation;
