import type { Group } from "@/types/personalinfo";
import { safeStr, safeDate } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: Group[] | undefined;
}

export default function GroupsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Groups</CardTitle>
          <CardDescription>No groups found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
      {data.map((g) => (
        <Card key={g.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeStr(g.groupName)}</CardTitle>
            <CardDescription>{safeStr(g.groupType)} • {safeStr(g.groupStatus)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Wallet:</span> {safeStr(g.groupWallet)}</div>
            <div className="grid grid-cols-2 gap-2">
              <div><span className="text-muted-foreground">Members:</span> {safeStr(g.noMembers)}</div>
              <div><span className="text-muted-foreground">Months:</span> {safeStr(g.months)}</div>
              <div><span className="text-muted-foreground">Balance:</span> {safeStr(g.groupBalance)}</div>
              <div><span className="text-muted-foreground">CCY:</span> {safeStr(g.currency)}</div>
            </div>
            <div><span className="text-muted-foreground">Monthly Contri:</span> {safeStr(g.monthlyContri)}</div>
            <div className="grid grid-cols-3 gap-2"><div><span className="text-muted-foreground">Start:</span> {safeDate(g.startDate)}</div><div><span className="text-muted-foreground">End:</span> {safeDate(g.endDate)}</div><div><span className="text-muted-foreground">Maturity:</span> {safeDate(g.maturityDate)}</div></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
