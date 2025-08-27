
import CustomDataTable from "@/components/custom-data-table";
import type { ReferralReward } from "@/types/personalinfo";
import { safeDate, safeStr, safeNum } from "@/utils/format-helper";
import { useMemo } from "react";

interface Props {
  data: ReferralReward[] | undefined;
  loading?: boolean;
}

export default function ReferralRewardsTab({ data = [], loading }: Props) {
  const rows = useMemo(
    () =>
      data.map((r) => ({
        id: r.id,
        createdAt: safeDate(r.createdAt),
        type: safeStr(r.transactionType),
        ranking: safeStr(r.ranking),
        commission: safeStr(r.commission),
        txnAmount: safeStr(r.transactionAmount),
        refCommission: safeStr(r.referralCommission),
        commissionAmount: safeStr(r.commissionAmount),
        fromUserId: safeNum(r.fromUserId),
      })),
    [data]
  );

  const cols = useMemo(
    () => [
      { field: "createdAt", headerName: "Date", filter: true },
      { field: "type", headerName: "Txn Type", filter: true },
      { field: "ranking", headerName: "Rank", filter: true },
      { field: "commission", headerName: "Commission", filter: true },
      { field: "txnAmount", headerName: "Txn Amount", filter: true },
      { field: "refCommission", headerName: "Ref %", filter: true },
      { field: "commissionAmount", headerName: "Commission Amt", filter: true },
      { field: "fromUserId", headerName: "From User ID", filter: true },
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={rows} loading={loading} />;
}
