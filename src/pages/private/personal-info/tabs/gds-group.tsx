import CustomDataTable from "@/components/custom-data-table";
import type { Group } from "@/types/personalinfo";
import { safeStr, safeDate } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: Group[] | undefined;
  loading?: boolean;
}

export default function GroupsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((g) => ({
        id: g.id,
        name: safeStr(g.groupName),
        wallet: safeStr(g.groupWallet),
        type: safeStr(g.groupType),
        status: safeStr(g.groupStatus),
        currency: safeStr(g.currency),
        noMembers: safeStr(g.noMembers),
        months: safeStr(g.months),
        balance: safeStr(g.groupBalance),
        startDate: safeDate(g.startDate),
        endDate: safeDate(g.endDate),
        maturityDate: safeDate(g.maturityDate),
        monthlyContri: safeStr(g.monthlyContri),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "name", headerName: "Group", filter: true },
      { field: "wallet", headerName: "Wallet", filter: true },
      { field: "type", headerName: "Type", filter: true },
      { field: "status", headerName: "Status", filter: true },
      { field: "currency", headerName: "CCY", width: 90 },
      { field: "noMembers", headerName: "#", width: 90 },
      { field: "months", headerName: "Months", width: 100 },
      { field: "balance", headerName: "Balance", filter: true },
      { field: "monthlyContri", headerName: "Monthly Contri", filter: true },
      { field: "startDate", headerName: "Start", filter: true },
      { field: "endDate", headerName: "End", filter: true },
      { field: "maturityDate", headerName: "Maturity", filter: true },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
