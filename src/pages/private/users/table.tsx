/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomDataTable from "@/components/custom-data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/types/customer.types";
import React, { useEffect, useRef, useState } from "react";
import { usersColumnDefs } from "./column-def";

interface UsersDataTableProps {
  users: User[];
  isLoading: boolean;
  fetchWalletAddress: (userHash: string) => Promise<void>;
  handleBlockedUnblock: (userHash: string, status: boolean) => Promise<void>;
  handleLockedUnlock: (userHash: string, status: boolean) => Promise<void>;
}

const UsersDataTable: React.FC<UsersDataTableProps> = ({
  users,
  isLoading,
  fetchWalletAddress,
  handleBlockedUnblock,
  handleLockedUnlock,
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
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
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
        columnDefs={usersColumnDefs({
          fetchWalletAddress,
          handleBlockedUnblock,
          handleLockedUnlock,
        })}
        rowData={users}
        loading={isLoading}
        onGridReady={handleGridReady}
      />
    </div>
  );
};

export default UsersDataTable;
