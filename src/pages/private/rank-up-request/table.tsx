/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { RankPromotionRequest } from "@/types/promotion-request.types";
import { useEffect, useRef, useState } from "react";
import { rankPromotionColumnDefs } from "./column-def";

interface Props {
  data: RankPromotionRequest[];
  isLoading: boolean;
  onView: (row: RankPromotionRequest) => void;
}

export default function RankPromotionDataTable({ data, isLoading, onView }: Props) {
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

      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <CustomDataTable
          rowData={data}
          columnDefs={rankPromotionColumnDefs(onView)}
          loading={isLoading}
          onGridReady={handleGridReady}
        />
      </div>
    </div>
  );
}
