/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import StatusChip from "@/components/status-chip";
import type { GroupSharedTransaction } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: GroupSharedTransaction[] | undefined;
  loading?: boolean;
}

export default function GroupSharedTxTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((g) => ({
        id: g.id,
        createdAt: safeDate(g.createdAt),
        transHash: safeStr(g.transHash),
        initialContri: safeStr(g.initialContri),
        status: safeStr(g.TransactionStatus),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "createdAt", headerName: "Date", filter: true },
      { field: "transHash", headerName: "Tx Hash", filter: true },
      { field: "initialContri", headerName: "Initial Contri", filter: true },
      { field: "status", headerName: "Status", filter: true,
        cellRenderer: (p:any) => <StatusChip status={p?.value} /> },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
