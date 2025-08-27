import type { ReferralReward } from "@/types/personalinfo";
import { safeDate, safeStr, safeNum } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: ReferralReward[] | undefined;
}

export default function ReferralRewardsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Referral Rewards</CardTitle>
          <CardDescription>No rewards found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
      {data.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeStr(r.transactionType)} • {safeStr(r.ranking)}</CardTitle>
            <CardDescription>{safeDate(r.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Txn Amount:</span> {safeStr(r.transactionAmount)}</div>
            <div><span className="text-muted-foreground">Ref %:</span> {safeStr(r.referralCommission)}</div>
            <div><span className="text-muted-foreground">Commission:</span> {safeStr(r.commission)} ({safeStr(r.commissionAmount)})</div>
            <div><span className="text-muted-foreground">From User ID:</span> {safeNum(r.fromUserId)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
