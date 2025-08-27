/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import StatusChip from "@/components/status-chip";
import type { BankVerification } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: BankVerification[] | undefined;
  loading?: boolean;
}

export default function BankVerificationsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((b) => ({
        id: b.id,
        dateEntry: safeDate(b.dateEntry),
        bankName: safeStr(b.bankName),
        accountNumber: safeStr(b.accountNumber),
        currency: safeStr(b.currency),
        status: safeStr(b.statusOfVerification),
        dateVerified: safeDate(b.dateVerified),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "dateEntry", headerName: "Date Entry", filter: true },
      { field: "bankName", headerName: "Bank", filter: true },
      { field: "accountNumber", headerName: "Acct #", filter: true },
      { field: "currency", headerName: "CCY", width: 90 },
      { field: "status", headerName: "Status", filter: true,
        cellRenderer: (p:any) => <StatusChip status={p?.value} /> },
      { field: "dateVerified", headerName: "Verified On", filter: true },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
