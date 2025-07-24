/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomDataTable from "@/components/custom-data-table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { bankRequestColumnDefs } from "./column-def";
import type { BankAccountVerification } from "@/types/bank-request.types";

interface BankRequestDataTableProps {
  banks: BankAccountVerification[];
  isLoading: boolean;
  viewRequest: (value: BankAccountVerification) => void;
}

const BankRequestDataTable: React.FC<BankRequestDataTableProps> = ({
  banks,
  isLoading,
  viewRequest,
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
        statusOfVerification: {
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
            Filter by Transaction Status:
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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
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
      </div>

      <CustomDataTable
        columnDefs={bankRequestColumnDefs(viewRequest)}
        rowData={banks}
        loading={isLoading}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default BankRequestDataTable;
