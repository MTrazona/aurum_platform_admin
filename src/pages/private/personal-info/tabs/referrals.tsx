import type React from "react";
import CustomDataTable from "@/components/custom-data-table";
import type { ReferralReward } from "@/types/personalinfo";
import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { dateStringFormatter, formatNumber } from "@/utils/format-helper";

type ReferralsTabProps = {
  referrals: ReferralReward[];
  loading?: boolean;
};

const columnDefs: ColDef<ReferralReward>[] = [
  { headerName: "Ranking", field: "ranking", sortable: true, filter: "agTextColumnFilter" },
  { headerName: "Transaction Type", field: "transactionType", sortable: true, filter: "agTextColumnFilter" },
  {
    headerName: "Commission",
    field: "commission",
    sortable: true,
    filter: "agTextColumnFilter",
    cellRenderer: ({ data }: ICellRendererParams<ReferralReward>) => (data ? data.commission : null),
  },
  {
    headerName: "Transaction Amount",
    field: "transactionAmount",
    sortable: true,
    filter: "agNumberColumnFilter",
    cellRenderer: ({ data }: ICellRendererParams<ReferralReward>) => (data ? `$ ${formatNumber(data.transactionAmount)}` : null),
  },
  {
    headerName: "Referral Commission",
    field: "referralCommission",
    sortable: true,
    filter: "agNumberColumnFilter",
    cellRenderer: ({ data }: ICellRendererParams<ReferralReward>) => (data ? `${formatNumber(data.referralCommission)}%` : null),
  },
  {
    headerName: "Commission Amount",
    field: "commissionAmount",
    sortable: true,
    filter: "agNumberColumnFilter",
    cellRenderer: ({ data }: ICellRendererParams<ReferralReward>) => (data ? `$ ${formatNumber(data.commissionAmount)}` : null),
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    valueFormatter: (p) => (p.value ? dateStringFormatter(p.value as string) : ""),
  },
];

const ReferralsTab: React.FC<ReferralsTabProps> = ({ referrals, loading = false }) => {
  return (
    <div className="space-y-4">
      <CustomDataTable columnDefs={columnDefs} rowData={referrals || []} loading={loading} />
    </div>
  );
};

export default ReferralsTab;

