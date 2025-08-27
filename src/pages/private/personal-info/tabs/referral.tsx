import type { CustomerRank } from "@/types/personalinfo";
import { safeStr, safeDate } from "@/utils/format-helper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  data: CustomerRank[] | undefined;
}

export default function ReferralsTab({ data = [] }: Props) {
  if (!data?.length) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Referrals</CardTitle>
          <CardDescription>No referrals found.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
      {data.map((r) => (
        <Card key={r.id}>
          <CardHeader>
            <CardTitle className="text-sm">{safeStr(r.rankStatus) || "Referral"}</CardTitle>
            <CardDescription>{safeDate(r.createdAt)}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-[#3C4056] space-y-1">
            <div><span className="text-muted-foreground">Document:</span> {safeStr(r.documentId)}</div>
            <div><span className="text-muted-foreground">Ref Code:</span> {safeStr(r.referrerCode)}</div>
            <div><span className="text-muted-foreground">User Type:</span> {safeStr(r.userType)}</div>
            <div className="line-clamp-2"><span className="text-muted-foreground">Description:</span> {safeStr(r.description)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
