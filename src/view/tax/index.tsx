import React, { useEffect, useState } from "react";
import { CryptoData, fetchCryptoData } from "services/coingeckoService";
import ProfitLossStatement from "./components/ProfitLossStatement";
import TaxCalculation from "./components/TaxCalculation";

const Tax: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCryptoData();
        setCryptoData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Tax Reporting Tools</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cryptoData && (
          <TaxCalculation cryptoData={cryptoData} taxRate={0.15} />
        )}
        {cryptoData && <ProfitLossStatement cryptoData={cryptoData} />}
      </div>
    </div>
  );
};

export default Tax;
