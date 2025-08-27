import type { Group } from "@/types/personalinfo";
import { safeStr, safeDate } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PaginatedCardGrid from "@/components/paginated-card-grid";

interface Props {
  data: Group[] | undefined;
}

export default function GroupSharedSavingsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Group Shared Savings</CardTitle>
          <CardDescription>No shared savings found.</CardDescription>
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
            <CardTitle className="text-sm">{safeStr(g.groupName)}</CardTitle>
            <CardDescription>{safeStr(g.groupStatus)} • {safeDate(g.startDate)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Locked:</span> {safeStr(g.lockedTokens)}</div>
              <div><span className="text-muted-foreground">Balance:</span> {safeStr(g.groupBalance)}</div>
              <div><span className="text-muted-foreground">CCY:</span> {safeStr(g.currency)}</div>
            </div>
          </CardContent>
        </Card>
      )}
    />
  );
}
