/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import StatusChip from "@/components/status-chip";
import type { UsdauRequest } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: UsdauRequest[] | undefined;
  loading?: boolean;
}

export default function UsdauRequestsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((u) => ({
        id: u.id,
        date: safeDate(u.dateRequest),
        amount: safeStr(u.amountRequest),
        wallet: safeStr(u.walletAddress),
        fromValue: safeStr(u.fromValue),
        usdRate: safeStr(u.usdRate),
        fee: safeStr(u.fee),
        status: safeStr(u.requestStatus),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "date", headerName: "Date", filter: true },
      { field: "amount", headerName: "Amount", filter: true },
      { field: "wallet", headerName: "Wallet Address", filter: true, flex: 1 },
      { field: "fromValue", headerName: "From Value", filter: true },
      { field: "usdRate", headerName: "USD Rate", filter: true },
      { field: "fee", headerName: "Fee", filter: true },
      { field: "status", headerName: "Status", filter: true,
        cellRenderer: (p:any) => <StatusChip status={p?.value} /> },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
