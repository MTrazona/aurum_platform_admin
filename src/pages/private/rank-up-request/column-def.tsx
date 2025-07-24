import { dateStringFormatter } from "@/utils/format-helper";
import type { RankPromotionRequest } from "@/types/promotion-request.types";
import type { ColDef, ValueGetterParams, ValueFormatterParams } from "ag-grid-community";
import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";

export const rankPromotionColumnDefs = (
  onView: (row: RankPromotionRequest) => void
): ColDef<RankPromotionRequest>[] => [
  {
    headerName: "ID",
    field: "id",
    width: 80,
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "User",
    field: "userRequest",
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Current Rank",
    field: "currentRank",
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Next Rank",
    field: "nextRank",
    sortable: true,
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Total Sales",
    valueGetter: (params: ValueGetterParams<RankPromotionRequest>) =>
      params.data?.promotionDetails?.totalSales ?? 0,
    sortable: true,
    filter: "agNumberColumnFilter",
    
  },
  {
    headerName: "Total Referrals",
    valueGetter: (params: ValueGetterParams<RankPromotionRequest>) =>
      params.data?.promotionDetails?.totalReferrals ?? 0,
    sortable: true,
    filter: "agNumberColumnFilter",
  },
  {
    headerName: "Status",
    field: "requestStatus",
    sortable: true,
    filter: "agTextColumnFilter",
    cellRenderer: ({ value }: { value: string }) => <StatusChip status={value} />,
  },
  {
    headerName: "Date Requested",
    field: "dateRequest",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    valueFormatter: (params: ValueFormatterParams<RankPromotionRequest>) =>
      dateStringFormatter(params.value),
  },
  {
    headerName: "Actions",
    pinned: "right",
    width: 120,
    cellRenderer: ({ data }: { data: RankPromotionRequest }) => (
      <Button
        className="px-3 py-1 bg-primary w-full cursor-pointer text-white rounded hover:opacity-90"
        onClick={() => onView(data)}
      >
        View
      </Button>
    ),
  },
];
