/* eslint-disable @typescript-eslint/no-explicit-any */
import StatusChip from "@/components/status-chip";
import type { GroupSharedTransaction } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";

interface Props {
  data: GroupSharedTransaction[] | undefined;
}

export default function GroupSharedTxTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Group Shared Transactions</CardTitle>
          <CardDescription>No shared transactions found.</CardDescription>
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
            <CardTitle className="text-sm">{safeDate(g.createdAt)}</CardTitle>
            <CardDescription>Initial {safeStr(g.initialContri)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Tx Hash:</span> {safeStr(g.transHash)}</div>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Status:</span> <StatusChip status={safeStr(g.TransactionStatus)} /></div>
          </CardContent>
        </Card>
      )}
    />
  );
}
