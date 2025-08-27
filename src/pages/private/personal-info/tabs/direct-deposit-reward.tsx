/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import StatusChip from "@/components/status-chip";
import type { DirectDepositReward } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: DirectDepositReward[] | undefined;
  loading?: boolean;
}

export default function DirectDepositRewardsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((d) => ({
        id: d.id,
        createdAt: safeDate(d.createdAt),
        username: safeStr(d.username),
        amount: safeStr(d.transactionAmount),
        type: safeStr(d.transactionType),
        rewardStatus: safeStr(d.rewardStatus),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "createdAt", headerName: "Date", filter: true },
      { field: "username", headerName: "Username", filter: true },
      { field: "amount", headerName: "Amount", filter: true },
      { field: "type", headerName: "Type", filter: true },
      { field: "rewardStatus", headerName: "Status", filter: true,
        cellRenderer: (p:any) => <StatusChip status={p?.value} /> },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
