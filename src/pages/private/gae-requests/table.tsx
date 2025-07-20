/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomDataTable from "@/components/custom-data-table";
import { gaeRequestColumnDefs } from "./column-def";
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

interface GAEDataTableProps {
  gae: TransactionsType[];
  isLoading: boolean;
  viewRequest: (value: TransactionsType) => void;
}

const GAEDataTable: React.FC<GAEDataTableProps> = ({
  gae,
  isLoading,
  viewRequest,
}) => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  const gridParamsRef = useRef<any>(null); // store full grid params

  // ✅ Debounced Quick Filter (AG Grid v31+)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (gridParamsRef.current) {
        gridParamsRef.current!.api.setGridOption("quickFilterText", searchText);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchText]);

  // ✅ Dropdown filter using AG Grid filter model
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
    gridParamsRef.current = params; // ✅ store full params (AG Grid v31+)
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Dropdown Filter */}
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
              <SelectItem value="gae">GAE</SelectItem>
              <SelectItem value="gae extra">GAE Extra</SelectItem>
              <SelectItem value="gae ph">GAE PH</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filter Input */}
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

      {/* AG Grid Table */}
      <CustomDataTable
        columnDefs={gaeRequestColumnDefs(viewRequest)}
        rowData={gae}
        loading={isLoading}
        paginationPageSize={10}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default GAEDataTable;
