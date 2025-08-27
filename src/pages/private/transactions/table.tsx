/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomDataTable from "@/components/custom-data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TransactionsType } from "@/types/buy-request.types";
import React, { useEffect, useRef, useState } from "react";
import { transactionColumnDefs } from "./column-def";

interface TransactionsDataTableProps {
  transactions: TransactionsType[];
  isLoading: boolean;
  onViewClick: (transaction: TransactionsType) => void
}

const TransactionsDataTable: React.FC<TransactionsDataTableProps> = ({
  transactions,
  isLoading,
  onViewClick
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const gridParamsRef = useRef<any>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (gridParamsRef.current) {
        gridParamsRef.current!.api.setGridOption("quickFilterText", searchText);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText]);


  const handleGridReady = (params: any) => {
    gridParamsRef.current = params;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
    

        <div className="flex items-center gap-2">
          <Label htmlFor="quick-search" className="text-white">
            Search:
          </Label>
          <Input
            id="quick-search"
            placeholder="Search all columns..."
            className="w-[250px] bg-white text-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <CustomDataTable
        columnDefs={transactionColumnDefs(onViewClick)}
        rowData={transactions}
        loading={isLoading}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default TransactionsDataTable;
