/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomDataTable from "@/components/custom-data-table";
import type { TransactionsType } from "@/types/buy-request.types";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { transactionColumnDefs } from "./column-def";
import { Button } from "@/components/ui/button";

interface TransactionsDataTableProps {
  transactions: TransactionsType[];
  isLoading: boolean;
}

const TransactionsDataTable: React.FC<TransactionsDataTableProps> = ({
  transactions,
  isLoading,
}) => {
  const [selectedType, setSelectedType] = useState<string>("all");
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

  const handleTypeChange = (value: string) => {
    setSelectedType(value);

    if (!gridParamsRef.current) return;

    const api = gridParamsRef.current.api;

    if (value === "all") {
      api.setFilterModel(null);
    } else {
      api.setFilterModel({
        transactionType: {
          type: "equals",
          filter: value,
        },
      });
    }

    api.onFilterChanged();
  };

  const handleGridReady = (params: any) => {
    gridParamsRef.current = params;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="type-filter" className="text-white">
            Filter by Transaction Type:
          </Label>
          <Select value={selectedType} onValueChange={handleTypeChange}>
            <SelectTrigger
              className="w-[200px] bg-white cursor-pointer"
              id="type-filter"
            >
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
              <SelectItem value="gca">GCA</SelectItem>
              <SelectItem value="gae">GAE</SelectItem>
              <SelectItem value="gae extra">GAE EXTRA</SelectItem>
              <SelectItem value="gae ph">GAE PH</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setSelectedType("all");
              setSearchText("");
              if (gridParamsRef.current) {
                const api = gridParamsRef.current.api;
                api.setFilterModel(null);
                api.setGridOption("quickFilterText", "");
                api.onFilterChanged();
              }
            }}
            className="bg-white text-black cursor-border border border-gray-300 hover:bg-gray-100"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      <CustomDataTable
        columnDefs={transactionColumnDefs}
        rowData={transactions}
        loading={isLoading}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default TransactionsDataTable;
