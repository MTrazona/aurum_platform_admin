import CustomDataTable from "@/components/custom-data-table";
import type { Remits } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: Remits[] | undefined;
  loading?: boolean;
}

export default function RemitsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((r) => ({
        id: r.id,
        remitDate: safeDate(r.remitDate),
        txnTransfer: safeStr(r.txnTransfer),
        currency: safeStr(r.recieveCurrency),
        refNo: safeStr(r.referrenceNumber),
        status: safeStr(r.remitStatus),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "remitDate", headerName: "Date", filter: true },
      { field: "txnTransfer", headerName: "Transfer Tx", filter: true, flex: 1 },
      { field: "currency", headerName: "CCY", width: 90 },
      { field: "refNo", headerName: "Reference #", filter: true },
      { field: "status", headerName: "Status", filter: true },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
