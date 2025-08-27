/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CustomDataTable from "@/components/custom-data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TransactionsType } from "@/types/buy-request.types";
import React, { useMemo, useState } from "react";
import { transactionColumnDefs } from "./column-def";
import useUsersHooks from "@/hooks/use-users";
import UserSearchCommand from "@/components/features/user-search-command";

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
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const { data: users = [] } = useUsersHooks();

  const userOptions = useMemo(() => {
    return users.map((u) => ({
      value: u.email,
      label: `${u.firstName} ${u.lastName} (${u.email})`,
    }));
  }, [users]);

  const filteredTransactions = useMemo(() => {
    let result = transactions;
    if (selectedUser !== "all") {
      result = result.filter((t: any) => t?.customer?.email === selectedUser);
    }
    const q = searchText.trim().toLowerCase();
    if (q) {
      result = result.filter((t) => {
        const combined = `${t.transactionCode} ${t.transactionType} ${t.transactionStatus} ${t.fromValue} ${t.toValue} ${(t as any)?.customer?.email ?? ""}`.toLowerCase();
        return combined.includes(q);
      });
    }
    return result;
  }, [transactions, selectedUser, searchText]);

  const handleUserChange = (value: string) => {
    setSelectedUser(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 ml-auto">
          <UserSearchCommand
            users={users}
            buttonText="Search Users for Filter (⌘K)"
            onSelect={(u) => handleUserChange(u.email)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="user-filter" className="text-white">
            Filter by User:
          </Label>
          <Select value={selectedUser} onValueChange={handleUserChange}>
            <SelectTrigger className="w-[320px] bg-white cursor-pointer" id="user-filter">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {userOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
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
        columnDefs={transactionColumnDefs(onViewClick)}
        rowData={filteredTransactions}
        loading={isLoading}
      />
    </div>
  );
};

export default TransactionsDataTable;
