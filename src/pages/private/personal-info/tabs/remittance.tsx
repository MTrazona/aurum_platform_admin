import type { Remits } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";

interface Props {
  data: Remits[] | undefined;
}

export default function RemitsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Remittances</CardTitle>
          <CardDescription>No remittances found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <PaginatedCardGrid
      items={data}
      renderItem={(r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeDate(r.remitDate)}</CardTitle>
            <CardDescription>Ref #{safeStr(r.referrenceNumber)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Transfer Tx:</span> {safeStr(r.txnTransfer)}</div>
              <div><span className="text-muted-foreground">Currency:</span> {safeStr(r.recieveCurrency)}</div>
            </div>
            <div><span className="text-muted-foreground">Status:</span> {safeStr(r.remitStatus)}</div>
          </CardContent>
        </Card>
      )}
    />
  );
}
