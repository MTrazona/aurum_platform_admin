/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CustomerRewardDetail } from "@/types/personalinfo";
import StatusChip from "@/components/status-chip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";
import { safeDate, safeStr } from "@/utils/format-helper";
 

interface Props {
  data: CustomerRewardDetail[] | undefined;
  loading?: boolean;
}

export default function CustomerRewardsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Customer Rewards</CardTitle>
          <CardDescription>No customer rewards found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <PaginatedCardGrid
      items={data}
      renderItem={(c) => (
        <Card key={c.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeStr(c.typeOfTransaction)}</CardTitle>
            <CardDescription>{safeDate(c.monthOf)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Amount:</span> {safeStr(c.amountReceive)}</div>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Status:</span> <StatusChip status={safeStr(c.statusOf)} /></div>
            <div><span className="text-muted-foreground">Distributed:</span> {safeDate(c.dateDistributed)}</div>
          </CardContent>
        </Card>
      )}
    />
  );
}
