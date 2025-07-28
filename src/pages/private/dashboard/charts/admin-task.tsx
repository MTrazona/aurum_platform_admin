import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Banknote, ShieldCheck, Hourglass } from "lucide-react";
import type { JSX } from "react";

type AdminTask = {
  icon: JSX.Element;
  label: string;
  count: number;
  color: string;
};

type Props = {
  pendingBankApprovals: number;
  pendingTransactionApprovals: number;
  pendingUsdauRequests: number;
  pendingKycVerifications?: number;
};

export const AdminTasksOverviewCard = ({
  pendingBankApprovals,
  pendingTransactionApprovals,
  pendingUsdauRequests,
  pendingKycVerifications = 0,
}: Props) => {
  const tasks: AdminTask[] = [
    {
      icon: <Banknote className="w-5 h-5 text-blue-500" />,
      label: "Pending Bank Approvals",
      count: pendingBankApprovals,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      label: "Pending Transaction Approvals",
      count: pendingTransactionApprovals,
      color: "bg-green-500/10 text-green-500",
    },
    {
      icon: <Hourglass className="w-5 h-5 text-orange-400" />,
      label: "Pending USDAU Requests",
      count: pendingUsdauRequests,
      color: "bg-orange-400/10 text-orange-400",
    },
    {
      icon: <BadgeCheck className="w-5 h-5 text-purple-500" />,
      label: "Pending KYC Verifications",
      count: pendingKycVerifications,
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <Card className="w-full stat-color rounded-xl">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          🗂️ Admin Tasks Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.map((task, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${task.color}`}>{task.icon}</div>
              <p className="text-sm font-medium text-muted-foreground">{task.label}</p>
            </div>
            <div className="text-sm font-semibold px-3 py-1 rounded-full bg-white/10 text-white dark:text-white">
              {task.count}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
