
import CustomDataTable from "@/components/custom-data-table";
import type { Group } from "@/types/personalinfo";
import { safeStr, safeDate } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: Group[] | undefined;
  loading?: boolean;
}

export default function GroupSharedSavingsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((g) => ({
        id: g.id,
        name: safeStr(g.groupName),
        lockedTokens: safeStr(g.lockedTokens),
        currency: safeStr(g.currency),
        status: safeStr(g.groupStatus),
        balance: safeStr(g.groupBalance),
        startDate: safeDate(g.startDate),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "name", headerName: "Group", filter: true },
      { field: "lockedTokens", headerName: "Locked", filter: true },
      { field: "currency", headerName: "CCY", width: 90 },
      { field: "status", headerName: "Status", filter: true },
      { field: "balance", headerName: "Balance", filter: true },
      { field: "startDate", headerName: "Start", filter: true },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
