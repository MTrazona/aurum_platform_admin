/* eslint-disable @typescript-eslint/no-explicit-any */
import StatusChip from "@/components/status-chip";
import type { UsdauRequest } from "@/types/personalinfo";
import { safeDate, safeStr } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";

interface Props {
  data: UsdauRequest[] | undefined;
}

export default function UsdauRequestsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>USDAU Requests</CardTitle>
          <CardDescription>No requests found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <PaginatedCardGrid
      items={data}
      renderItem={(u) => (
        <Card key={u.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeDate(u.dateRequest)}</CardTitle>
            <CardDescription>Amount {safeStr(u.amountRequest)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Wallet:</span> {safeStr(u.walletAddress)}</div>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">From Value:</span> {safeStr(u.fromValue)}</div>
              <div><span className="text-muted-foreground">USD Rate:</span> {safeStr(u.usdRate)}</div>
              <div><span className="text-muted-foreground">Fee:</span> {safeStr(u.fee)}</div>
            </div>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Status:</span> <StatusChip status={safeStr(u.requestStatus)} /></div>
          </CardContent>
        </Card>
      )}
    />
  );
}
