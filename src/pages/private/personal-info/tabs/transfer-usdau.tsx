import CustomDataTable from "@/components/custom-data-table";
import type { TransferUsdau } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: TransferUsdau[] | undefined;
  loading?: boolean;
}

export default function TransferUsdauTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((t) => ({
        id: t.id,
        date: safeDate(t.transferDate),
        amount: safeStr(t.amount),
        tnxID: safeStr(t.tnxID),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "date", headerName: "Date", filter: true },
      { field: "amount", headerName: "Amount", filter: true },
      { field: "tnxID", headerName: "Txn ID", filter: true, flex: 1 },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
