import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Checkbox from "components/checkbox";
import { createPortfolioFetcher } from "services/fetchPortfolio";

type RowObj = {
  id: string;
  crypto: string;
  amount: number;
  price: number;
  timestamp: number;
};

const columnHelper = createColumnHelper<RowObj>();

function CheckTable({ userId }: { userId: string }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [tableData, setTableData] = useState<RowObj[]>([]);

  const portfolioFetcher = createPortfolioFetcher();

  useEffect(() => {
    const unsubscribe = portfolioFetcher.fetch(userId, setTableData);

    return () => unsubscribe();
  }, [userId, portfolioFetcher]);

  const columns = [
    columnHelper.accessor("crypto", {
      id: "crypto",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Crypto
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <Checkbox
            defaultChecked={false}
            colorScheme="brandScheme"
            me="10px"
          />
          <p className="ml-3 text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("amount", {
      id: "amount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Amount
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("price", {
      id: "price",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Price</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("timestamp", {
      id: "timestamp",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Time</p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {new Date(info.getValue()).toLocaleString()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Portfolio Table
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                  >
                    <div className="items-center justify-between text-xs text-gray-200">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: "",
                        desc: "",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-[150px] border-white/0 py-3 pr-4"
                  >
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

export default CheckTable;
