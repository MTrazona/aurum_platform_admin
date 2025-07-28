import useDashboard from "@/hooks/use-dashboard";
import { LiveUsersChart } from "./charts/live-user-charts";
import { StatCard } from "./charts/stat-card";
import { TransactionsMetricsChart } from "./charts/transaction-metric-charts";
import { TopConsultantsCard } from "./charts/top-consultants";
import { SessionDevicesChart } from "./charts/session-devices-charts";
import { AdminTasksOverviewCard } from "./charts/admin-task";
import { AdminBlockchainBalances } from "./charts/admin-balances";
import Breadcrumb from "@/components/routes-bread-crumb";

export default function DashboardPage() {
  const { rf, userCountByCountry, buySell, convert, gae } = useDashboard();

  const consultants = [
    {
      name: "Jane Delacruz",
      avatarUrl: "/avatars/jane.png",
      groupSales: 12457,
      referralInvites: 132,
    },
    {
      name: "Mark Villar",
      avatarUrl: "/avatars/mark.png",
      groupSales: 13021,
      referralInvites: 95,
    },
    {
      name: "Alice Corpuz",
      avatarUrl: "/avatars/alice.png",
      groupSales: 10547,
      referralInvites: 73,
    },
    {
      name: "Nathan Cruz",
      avatarUrl: "/avatars/nathan.png",
      groupSales: 18547,
      referralInvites: 86,
    },
    {
      name: "Zyra Santos",
      avatarUrl: "/avatars/zyra.png",
      groupSales: 16784,
      referralInvites: 95,
    },
  ];
  return (
    <div className="p-4 grid grid-cols-7 gap-6">
      <div className="col-span-7">
        <Breadcrumb />
      </div>
      <div className="col-span-5 flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-4">
          {rf.map((v, i) => (
            <StatCard
              key={i}
              value={v.value ?? 0}
              label={v.label}
              icon={v.icon}
              description={v.description}
            />
          ))}
        </div>
        <div className="">
          <TransactionsMetricsChart
            buySell={buySell ?? []}
            convert={convert ?? []}
            gae={gae ?? []}
          />
        </div>
        <div className="w-full grid grid-cols-5 gap-x-6">
          <div className="col-span-3">
            <AdminBlockchainBalances
              data={{
                usdtBalance: "999998986415875.112879144476241524",
                qmgtBalance: "998878474943942.904131622059600085",
                ftmBalance: "0.403521740079984182",
                usdtTotalSupply: "1000000000000000.0",
                qmgtTotalSupply: "1000000000000000.0",
              }}
            />
          </div>
          <div className="col-span-2">
            <TopConsultantsCard consultants={consultants} />
          </div>
        </div>
      </div>
      <div className="col-span-2 space-y-6">
        <LiveUsersChart userCountByCountry={userCountByCountry} />

        <AdminTasksOverviewCard
          pendingBankApprovals={5}
          pendingTransactionApprovals={8}
          pendingUsdauRequests={3}
          pendingKycVerifications={7}
        />
        <div>
          <SessionDevicesChart />
        </div>
      </div>
    </div>
  );
}
