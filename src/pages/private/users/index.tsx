import StatCard from "@/components/stat-card";
import useUsersHooks from "@/hooks/use-users";
import { calculateUserGrowth } from "@/utils/calculate-user-growth";

import { WalletAddressModal } from "@/components/dialog/wallet-address";
import Breadcrumb from "@/components/routes-bread-crumb";
import { Ban, Clock3, ShieldCheck, Users } from "lucide-react";
import UsersDataTable from "./table";
import UserSearchCommand from "@/components/features/user-search-command";

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    walletAddress,
    isWalletAddressOpen,
    fetchWalletAddress,
    handleBlockedUnblock,
    handleLockedUnlock,
    closeWalletAddressModal,
  } = useUsersHooks();

  const verifiedUsers = users.filter(
    (user) => user.kycVerified?.toUpperCase() === "VERIFIED"
  );
  const notVerifiedUsers = users.filter(
    (user) => user.kycVerified?.toUpperCase() === "NOT VERIFIED"
  );
  const pendingUsers = users.filter(
    (user) => user.kycVerified?.toUpperCase() === "PENDING"
  );

  const { percentage, bars } = calculateUserGrowth(users);
  const { percentage: verifiedPercent, bars: verifiedBars } =
    calculateUserGrowth(verifiedUsers);
  const { percentage: notVerifiedPercent, bars: notVerifiedBars } =
    calculateUserGrowth(notVerifiedUsers);
  const { percentage: pendingPercent, bars: pendingBars } =
    calculateUserGrowth(pendingUsers);

  return (
    <div className="p-4 space-y-6">
      <Breadcrumb />

      <div className="flex justify-between items-center gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          percentageChange={percentage}
          bars={bars}
          description="Growth This Month"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Verified Users"
          value={verifiedUsers.length}
          percentageChange={verifiedPercent}
          bars={verifiedBars}
          description="Verification Increase"
          icon={ShieldCheck}
          color="green"
        />
        <StatCard
          title="Not Verified Users"
          value={notVerifiedUsers.length}
          percentageChange={notVerifiedPercent}
          bars={notVerifiedBars}
          description="Not Verified Growth"
          icon={Ban}
          color="red"
        />
        <StatCard
          title="Pending Users"
          value={pendingUsers.length}
          percentageChange={pendingPercent}
          bars={pendingBars}
          description="Pending Activity"
          icon={Clock3}
          color="orange"
        />
      </div>
      <div className="flex justify-end">
        <UserSearchCommand users={users} />
      </div>
      <UsersDataTable
        isLoading={isLoading}
        users={users}
        fetchWalletAddress={fetchWalletAddress}
        handleBlockedUnblock={handleBlockedUnblock}
        handleLockedUnlock={handleLockedUnlock}
      />
      <WalletAddressModal
        isOpen={isWalletAddressOpen}
        walletAddress={walletAddress}
        onClose={closeWalletAddressModal}
      />
    </div>
  );
}
