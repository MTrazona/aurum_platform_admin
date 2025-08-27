
import CustomDataTable from "@/components/custom-data-table";
import type { CustomerRank } from "@/types/personalinfo";
import { safeStr, safeDate } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: CustomerRank[] | undefined;
  loading?: boolean;
}

export default function ReferralsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((r) => ({
        id: r.id,
        doc: safeStr(r.documentId),
        date: safeDate(r.createdAt),
        rankStatus: safeStr(r.rankStatus),
        refCode: safeStr(r.referrerCode),
        userType: safeStr(r.userType),
        description: safeStr(r.description),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "date", headerName: "Date", filter: true },
      { field: "doc", headerName: "Document ID", filter: true },
      { field: "rankStatus", headerName: "Rank Status", filter: true },
      { field: "refCode", headerName: "Referrer Code", filter: true },
      { field: "userType", headerName: "User Type", filter: true },
      { field: "description", headerName: "Description", filter: true, flex: 1 },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
