import type { TransferUsdau } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";

interface Props {
  data: TransferUsdau[] | undefined;
}

export default function TransferUsdauTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Transfer USDAU</CardTitle>
          <CardDescription>No transfers found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <PaginatedCardGrid
      items={data}
      renderItem={(t) => (
        <Card key={t.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeDate(t.transferDate)}</CardTitle>
            <CardDescription>Amount {safeStr(t.amount)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Txn ID:</span> {safeStr(t.tnxID)}</div>
          </CardContent>
        </Card>
      )}
    />
  );
}
