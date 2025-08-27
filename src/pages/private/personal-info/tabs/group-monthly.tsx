/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import StatusChip from "@/components/status-chip";
import type { GroupMonthlyTransaction } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: GroupMonthlyTransaction[] | undefined;
  loading?: boolean;
}

export default function GroupMonthlyTxTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((g) => ({
        id: g.id,
        paymentDate: safeDate(g.paymentDate),
        amount: safeStr(g.amount),
        status: safeStr(g.transactionStatus),
        memberTxHash: safeStr(g.memberTxHash),
        groupTxHash: safeStr(g.groupTxHash),
        gcaTxHash: safeStr(g.gcaTxHash),
        notes: safeStr(g.bookingNotes),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "paymentDate", headerName: "Payment Date", filter: true },
      { field: "amount", headerName: "Amount", filter: true },
      { field: "status", headerName: "Status", filter: true,
        cellRenderer: (p:any) => <StatusChip status={p?.value} /> },
      { field: "memberTxHash", headerName: "Member Tx", filter: true },
      { field: "groupTxHash", headerName: "Group Tx", filter: true },
      { field: "gcaTxHash", headerName: "GCA Tx", filter: true },
      { field: "notes", headerName: "Notes", filter: true, flex: 1 },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
