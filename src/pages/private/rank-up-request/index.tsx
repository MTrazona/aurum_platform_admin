import useRequestsPromotion from "@/hooks/request-promote";
import RankPromotionDataTable from "./table";
import Breadcrumb from "@/components/routes-bread-crumb";
import StatCard from "@/components/stat-card";
import { useRankPromotionStats } from "@/utils/calculate-promotion-stats";

const RankUpRequestsPage = () => {
  const { data = [], isLoading } = useRequestsPromotion();
  const {
    totalStats,
    approvedStats,
    pendingStats,
    declinedStats,
  } = useRankPromotionStats(data);

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <h1 className="text-xl font-semibold text-white">Rank Up Requests</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title={totalStats.title}
          value={totalStats.value}
          percentageChange={totalStats.percentageChange}
          description={totalStats.description}
          bars={totalStats.bars}
          color={totalStats.color}
        />
        <StatCard
          title={approvedStats.title}
          value={approvedStats.value}
          percentageChange={approvedStats.percentageChange}
          description={approvedStats.description}
          bars={approvedStats.bars}
          color={approvedStats.color}
        />
        <StatCard
          title={pendingStats.title}
          value={pendingStats.value}
          percentageChange={pendingStats.percentageChange}
          description={pendingStats.description}
          bars={pendingStats.bars}
          color={pendingStats.color}
        />
        <StatCard
          title={declinedStats.title}
          value={declinedStats.value}
          percentageChange={declinedStats.percentageChange}
          description={declinedStats.description}
          bars={declinedStats.bars}
          color={declinedStats.color}
        />
      </div>

      <RankPromotionDataTable
        data={data}
        isLoading={isLoading}
        onView={(v) => v}
      />
    </div>
  );
};

export default RankUpRequestsPage;
