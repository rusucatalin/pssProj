import React, { useEffect, useState } from "react";
import Card from "components/card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TransactionServicePrototype from "services/transactionService";

type RowObj = {
  id: string;
  crypto: string;
  amount: number;
  price: number;
  timestamp: number;
  isApproved: string | boolean;
};

const columnHelper = createColumnHelper<RowObj>();

const TransactionTable = ({ userId }: { userId: string }) => {
  const [tableData, setTableData] = useState<RowObj[]>([]);

  useEffect(() => {
    const service = new TransactionServicePrototype(userId);
    const fetchData = async () => {
      const data = await service.fetchTransactionData();
      setTableData(data);
    };
    fetchData();
  }, [userId]);

  const columns = [
    columnHelper.accessor("crypto", {
      header: () => <p className="text-sm font-bold text-gray-600">Crypto</p>,
    }),
    columnHelper.accessor("amount", {
      header: () => <p className="text-sm font-bold text-gray-600">Amount</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">{info.getValue()}</p>
      ),
    }),
    columnHelper.accessor("isApproved", {
      header: () => <p className="text-sm font-bold text-gray-600">Status</p>,
      cell: (info) => {
        const status = info.getValue();

        if (status === true || status === "approved") {
          return (
            <div className="flex items-center">
              <MdCheckCircle className="text-green-500 text-xl" />
              <span className="ml-2 text-sm font-bold text-navy-700">
                Approved
              </span>
            </div>
          );
        } else if (status === "pending") {
          return (
            <div className="flex items-center">
              <MdOutlineError className="text-orange-500 text-xl" />
              <span className="ml-2 text-sm font-bold text-navy-700">
                Pending
              </span>
            </div>
          );
        } else {
          return (
            <div className="flex items-center">
              <MdCancel className="text-red-500 text-xl" />
              <span className="ml-2 text-sm font-bold text-navy-700">
                Rejected
              </span>
            </div>
          );
        }
      },
    }),

    columnHelper.accessor("timestamp", {
      header: () => <p className="text-sm font-bold text-gray-600">Time</p>,
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700">
          {new Date(info.getValue()).toLocaleString()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card extra="w-full h-full px-6 pb-6 sm:overflow-x-auto">
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700">Transaction</div>
      </div>
      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="cursor-pointer border-b-[1px] pt-4 pb-2 pr-4 text-start"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
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
    </Card>
  );
};

export default TransactionTable;
