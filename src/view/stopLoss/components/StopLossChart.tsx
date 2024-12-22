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
    const maxVariation = currentPrice * 0.02;

    for (let i = 0; i < points; i++) {
      const randomVariation = (Math.random() - 0.5) * maxVariation;
      data.push({
        time: i,
        price: currentPrice + randomVariation,
      });
    }
    return data;
  };

  const data = generateData();

  const minValue = Math.min(
    stopLossPrices.percentage,
    stopLossPrices.fixed,
    ...data.map((d) => d.price),
  );
  const maxValue = Math.max(...data.map((d) => d.price));

  const yAxisPadding = (maxValue - minValue) * 0.1;

  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toFixed(1);
  };

  return (
    <div className="w-full h-[300px] bg-white rounded-lg shadow-sm p-4">
      <div className="font-bold mb-2">{symbol} Stop Loss Chart</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" hide />
          <YAxis
            domain={[minValue - yAxisPadding, maxValue + yAxisPadding]}
            tickFormatter={formatYAxis}
            tickCount={8}
            width={80}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
          <ReferenceLine
            y={stopLossPrices.percentage}
            stroke="red"
            strokeDasharray="3 3"
            label={{
              value: "Stop Loss %",
              fill: "red",
              position: "right",
              fontSize: 12,
            }}
          />
          <ReferenceLine
            y={stopLossPrices.fixed}
            stroke="#ff9800"
            strokeDasharray="3 3"
            label={{
              value: "Stop Loss Fixed",
              fill: "#ff9800",
              position: "right",
              fontSize: 12,
            }}
          />
          <ReferenceLine
            y={currentPrice}
            stroke="#82ca9d"
            strokeDasharray="3 3"
            label={{
              value: "Current",
              fill: "#82ca9d",
              position: "right",
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StopLossChart;
