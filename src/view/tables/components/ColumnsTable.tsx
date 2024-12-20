import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { fetchCryptoData } from "services/coingeckoService";

type RowObj = {
  rank: number;
  coin: string;
  symbol: string;
  price: number;
  h1: number;
  h24: number;
  d7: number;
  volume24h: number;
  marketCap: number;
};

const columnHelper = createColumnHelper<RowObj>();

function CryptoTable() {
  const [data, setData] = useState<RowObj[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const cryptoData = await fetchCryptoData();

        const formattedData: RowObj[] = Object.entries(cryptoData).map(
          ([key, item], index) => ({
            rank: index + 1,
            coin: key,
            symbol: item.symbol.toUpperCase(),
            price: item.price,
            h1: item.change_1h || 0,
            h24: item.change_24h || 0,
            d7: item.change_7d || 0,
            volume24h: item.volume,
            marketCap: item.marketCap,
          }),
        );

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
    const interval = setInterval(getData, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => {
    const formattedValue = Math.abs(value).toFixed(1);
    const color = value >= 0 ? "text-green-500" : "text-red-500";
    const arrow = value >= 0 ? "▲" : "▼";
    return (
      <span className={color}>
        {arrow} {formattedValue}%
      </span>
    );
  };

  const columns = [
    columnHelper.accessor("rank", {
      id: "rank",
      header: () => <p className="text-sm font-bold">#</p>,
      cell: (info) => <p className="text-sm">{info.getValue()}</p>,
    }),
    columnHelper.accessor("coin", {
      id: "coin",
      header: () => <p className="text-sm font-bold">Coin</p>,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <div>
            <p className="text-sm font-medium">{info.getValue()}</p>
            <span className="text-xs text-gray-500">
              {info.row.original.symbol}
            </span>
          </div>
          {/* <button className="ml-2 px-3 py-1 text-xs text-green-500 border border-green-500 rounded-full">
            Buy
          </button> */}
        </div>
      ),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => <p className="text-sm font-bold">Price</p>,
      cell: (info) => (
        <p className="text-sm">{formatNumber(info.getValue())}</p>
      ),
    }),
    columnHelper.accessor("h24", {
      id: "24h",
      header: () => <p className="text-sm font-bold">24h</p>,
      cell: (info) => formatPercentage(info.getValue()),
    }),
    columnHelper.accessor("volume24h", {
      id: "volume24h",
      header: () => <p className="text-sm font-bold">24h Volume</p>,
      cell: (info) => (
        <p className="text-sm">{formatNumber(info.getValue())}</p>
      ),
    }),
    columnHelper.accessor("marketCap", {
      id: "marketCap",
      header: () => <p className="text-sm font-bold">Market Cap</p>,
      cell: (info) => (
        <p className="text-sm">{formatNumber(info.getValue())}</p>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <header className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-bold">Cryptocurrency Prices</h4>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-4 text-start cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getIsSorted() && (
                        <span>
                          {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoTable;
