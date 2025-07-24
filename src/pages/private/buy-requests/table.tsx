/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomDataTable from "@/components/custom-data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TransactionsType } from "@/types/buy-request.types";
import React, { useEffect, useRef, useState } from "react";
import { buyRequestColumnDefs } from "./column-def";

interface BuyDataTableProps {
  buy: TransactionsType[];
  isLoading: boolean;
  viewRequest: (value: TransactionsType) => void;
}

const BuyDataTable: React.FC<BuyDataTableProps> = ({
  buy,
  isLoading,
  viewRequest,
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
        columnDefs={buyRequestColumnDefs(viewRequest)}
        rowData={buy}
        loading={isLoading}
        paginationPageSize={10}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default BuyDataTable;
