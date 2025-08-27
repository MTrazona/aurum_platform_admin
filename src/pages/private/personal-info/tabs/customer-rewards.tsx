/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CustomerRewardDetail } from "@/types/personalinfo";
import StatusChip from "@/components/status-chip";
import CustomDataTable from "@/components/custom-data-table";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: CustomerRewardDetail[] | undefined;
  loading?: boolean;
}

export default function CustomerRewardsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((c) => ({
        id: c.id,
        monthOf: safeDate(c.monthOf),
        type: safeStr(c.typeOfTransaction),
        amount: safeStr(c.amountReceive),
        status: safeStr(c.statusOf),
        distributed: safeDate(c.dateDistributed),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "monthOf", headerName: "Month", filter: true },
      { field: "type", headerName: "Type", filter: true },
      { field: "amount", headerName: "Amount", filter: true },
      { field: "status", headerName: "Status", filter: true,
        cellRenderer: (p:any) => <StatusChip status={p?.value} /> },
      { field: "distributed", headerName: "Distributed On", filter: true },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
