import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

interface StopLossPrices {
  percentage: number;
  fixed: number;
}

interface StopLossChartProps {
  currentPrice: number;
  symbol: string;
  stopLossPrices: StopLossPrices;
}

const StopLossChart: React.FC<StopLossChartProps> = ({
  currentPrice,
  symbol,
  stopLossPrices,
}) => {
  const generateData = () => {
    const data = [];
    const points = 10;

    for (let i = 0; i < points; i++) {
      const randomVariation = (Math.random() - 0.5) * (currentPrice * 0.05);
      data.push({
        time: i,
        price: currentPrice + randomVariation,
      });
    }
    return data;
  };

  const data = generateData();

  return (
    <div className="min-w-[50%] h-[300px] bg-white rounded-lg shadow-sm p-12">
      <div className="font-bold mb-2">{symbol} Stop Loss Chart</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" hide />
          <YAxis
            domain={[
              Math.min(stopLossPrices.percentage, stopLossPrices.fixed) * 0.95,
              currentPrice * 1.05,
            ]}
          />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <ReferenceLine
            y={stopLossPrices.percentage}
            stroke="red"
            strokeDasharray="3 3"
            label={{
              value: "Percentage Stop Loss",
              fill: "red",
              position: "right",
            }}
          />
          <ReferenceLine
            y={stopLossPrices.fixed}
            stroke="#ff9800"
            strokeDasharray="3 3"
            label={{
              value: "Fixed Stop Loss",
              fill: "#ff9800",
              position: "right",
            }}
          />
          <ReferenceLine
            y={currentPrice}
            stroke="#82ca9d"
            strokeDasharray="3 3"
            label={{ value: "Current", fill: "#82ca9d", position: "right" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StopLossChart;
