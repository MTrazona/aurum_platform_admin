/* eslint-disable @typescript-eslint/no-explicit-any */
import StatusChip from "@/components/status-chip";
import type { GroupMonthlyTransaction } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";

interface Props {
  data: GroupMonthlyTransaction[] | undefined;
}

export default function GroupMonthlyTxTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Group Monthly Transactions</CardTitle>
          <CardDescription>No monthly transactions found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <PaginatedCardGrid
      items={data}
      renderItem={(g) => (
        <Card key={g.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeDate(g.paymentDate)}</CardTitle>
            <CardDescription>Amount {safeStr(g.amount)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Status:</span> <StatusChip status={safeStr(g.transactionStatus)} /></div>
            <div className="grid grid-cols-1 gap-1">
              <div><span className="text-muted-foreground">Member Tx:</span> {safeStr(g.memberTxHash)}</div>
              <div><span className="text-muted-foreground">Group Tx:</span> {safeStr(g.groupTxHash)}</div>
              <div><span className="text-muted-foreground">GCA Tx:</span> {safeStr(g.gcaTxHash)}</div>
            </div>
            <div><span className="text-muted-foreground">Notes:</span> {safeStr(g.bookingNotes)}</div>
          </CardContent>
        </Card>
      )}
    />
  );
}
