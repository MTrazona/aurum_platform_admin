/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BadgeDollarSign, Users, Mail, Copy, ShieldCheck, ShieldX, Lock, Unlock, Globe, Phone, Hash } from "lucide-react";

import { fetchUsersInfoById, getWalletAddress, UnblockedBlockUser, UnlockLockedUser } from "@/apis/users";
import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
// import { dateStringFormatter } from "@/utils/format-helper";
import { WalletAddressModal } from "@/components/dialog/wallet-address";

import type { PersonalInfo } from "@/types/personalinfo";
import BankVerificationsTab from "./tabs/bank-verification";
import CustomerRewardsTab from "./tabs/customer-rewards";
import DirectDepositRewardsTab from "./tabs/direct-deposit-reward";
import GroupsTab from "./tabs/gds-group";
import GroupMonthlyTxTab from "./tabs/group-monthly";
import GroupSharedTxTab from "./tabs/group-shared";
import GroupSharedSavingsTab from "./tabs/gss";
import ReferralsTab from "./tabs/referral";
import ReferralRewardsTab from "./tabs/referral-rewards";
import RemitsTab from "./tabs/remittance";
import TransactionsTab from "./tabs/transaction";
import TransferUsdauTab from "./tabs/transfer-usdau";
import UsdauRequestsTab from "./tabs/usdau-request";

const PersonalInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [actionLoading, setActionLoading] = useState<{ block?: boolean; unlock?: boolean }>({});

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchUsersInfoById(id);
        setPersonalInfo(res ?? null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  const handleViewWallet = async () => {
    if (!personalInfo?.userHash) return;
    try {
      const addr = await getWalletAddress(personalInfo.userHash);
      setWalletAddress(addr);
      setIsWalletOpen(true);
    } catch (e) {
      // silently fail
    }
  };

  const handleToggleBlock = async () => {
    if (!personalInfo?.userHash) return;
    setActionLoading((p) => ({ ...p, block: true }));
    try {
      await UnblockedBlockUser({ userHash: personalInfo.userHash, status: personalInfo.blocked });
      setPersonalInfo((prev) => (prev ? { ...prev, blocked: !prev.blocked } : prev));
    } catch (e) {
    } finally {
      setActionLoading((p) => ({ ...p, block: false }));
    }
  };

  const handleUnlock = async () => {
    if (!personalInfo?.userHash) return;
    setActionLoading((p) => ({ ...p, unlock: true }));
    try {
      await UnlockLockedUser({ userHash: personalInfo.userHash, status: false });
      setPersonalInfo((prev) => (prev ? { ...prev, login_attempt: { ...prev.login_attempt, loginStatus: "Active" } } : prev));
    } catch (e) {
    } finally {
      setActionLoading((p) => ({ ...p, unlock: false }));
    }
  };

  // Quick counts for tabs (memoized so we don’t recompute on every render)
  const counts = useMemo(
    () => ({
      transactions: personalInfo?.transactions?.length ?? 0,
      referrals: personalInfo?.referralsFK?.length ?? 0,
      referralRewards: personalInfo?.referral_rewards?.length ?? 0,
      customerRewards: personalInfo?.customer_reward_details?.length ?? 0,
      directDepositRewards: personalInfo?.direct_deposit_rewards?.length ?? 0,
      groups: personalInfo?.group?.length ?? 0,
      groupSharedSavings: personalInfo?.group_shared_savings?.length ?? 0,
      groupMonthly: personalInfo?.group_monthly_transactions?.length ?? 0,
      groupSharedTx: personalInfo?.group_shared_transactions?.length ?? 0,
      usdauRequests: personalInfo?.usdau_requests?.length ?? 0,
      bankVerifications: personalInfo?.bank_verifications?.length ?? 0,
      remitsSender: personalInfo?.remitsSender?.length ?? 0,
      remitsReceiver: personalInfo?.remitsReceiver?.length ?? 0,
      transferSender: personalInfo?.transferUsdauSender?.length ?? 0,
      transferReceiver: personalInfo?.transferUsdauReceiver?.length ?? 0,
      reports: personalInfo?.report_consultants?.length ?? 0,
    }),
    [personalInfo]
  );

  // After hooks, it's safe to render a loading/empty state if needed
  if (!personalInfo) {
    return (
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-7 rounded-xl bg-white p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/5" />
                </div>
              </div>
            </div>
            <div className="col-span-2 rounded-xl bg-white p-6 space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
            <div className="col-span-5 rounded-xl bg-white p-6">
              <Skeleton className="h-10 w-2/3" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-6">
            <p className="text-sm text-gray-500">No user found.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="rounded-xl bg-white p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <img
            className="w-16 h-16 rounded-lg object-cover"
            src={personalInfo?.personal_information?.profileLink || "/no-avatar.png"}
            alt="avatar"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xl font-semibold text-[#3C4056] truncate">
                {personalInfo?.personal_information?.firstName} {personalInfo?.personal_information?.lastName}
              </p>
              {personalInfo.kycVerified?.toUpperCase() === "VERIFIED" ? (
                <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline"><ShieldCheck className="w-4 h-4 mr-1" /> KYC Verified</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200" variant="outline"><ShieldX className="w-4 h-4 mr-1" /> KYC {personalInfo.kycVerified}</Badge>
              )}
              {personalInfo.isVerifyEmail ? (
                <Badge variant="outline" className="border-green-200 text-green-700">Email Verified</Badge>
              ) : (
                <Badge variant="outline" className="border-yellow-200 text-yellow-700">Email Not Verified</Badge>
              )}
              <Badge variant="outline" className="text-blue-700 border-blue-200">{personalInfo.login_attempt?.loginStatus || "Unknown"}</Badge>
              {personalInfo.blocked && (
                <Badge variant="outline" className="text-red-700 border-red-200">Blocked</Badge>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#3C4056]">
              <div className="flex items-center gap-1"><Mail className="w-4 h-4" /> {personalInfo.email} <button onClick={() => handleCopy(personalInfo.email)} className="text-gray-400 hover:text-gray-600"><Copy className="w-4 h-4" /></button></div>
              <div className="flex items-center gap-1"><Hash className="w-4 h-4" /> ID: {personalInfo.documentId} <button onClick={() => handleCopy(String(personalInfo.documentId))} className="text-gray-400 hover:text-gray-600"><Copy className="w-4 h-4" /></button></div>
              <div className="flex items-center gap-1"><Globe className="w-4 h-4" /> {personalInfo.country}</div>
              <div className="flex items-center gap-1"><Phone className="w-4 h-4" /> {personalInfo.phoneNumber || "—"}</div>
              <div className="flex items-center gap-1"><Users className="w-4 h-4" /> Username: {String(personalInfo.username)}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleViewWallet} variant="outline" className="cursor-pointer">View Wallet</Button>
            <Button onClick={handleToggleBlock} disabled={!!actionLoading.block} variant={personalInfo.blocked ? "secondary" : "destructive"} className="cursor-pointer">
              {personalInfo.blocked ? "Unblock" : "Block"}
            </Button>
            {personalInfo.login_attempt?.loginStatus !== "Active" ? (
              <Button onClick={handleUnlock} disabled={!!actionLoading.unlock} className="cursor-pointer"><Unlock className="w-4 h-4 mr-1" /> Unlock</Button>
            ) : (
              <Button disabled variant="outline" className="cursor-not-allowed"><Lock className="w-4 h-4 mr-1" /> Locked</Button>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 min-h-screen">
        {/* Left summary panel */}
        <div className="col-span-2 flex flex-col">
          <div className="pt-8 px-[24px] rounded-xl bg-white">
            <div className="flex w-full flex-col justify-center items-center">
              <img className="w-36 h-36 rounded-lg mb-4 object-cover" src={personalInfo?.personal_information?.profileLink || "/no-avatar.png"} alt="" />
              <p className="text-lg font-semibold text-[#3C4056]">
                {personalInfo?.personal_information?.firstName}{" "}
                {personalInfo?.personal_information?.lastName}
              </p>
              <p className="text-md text-[#8b8e9c]">
                Customer ID #{personalInfo?.documentId}
              </p>
            </div>

            <div className="flex items-center justify-around my-4">
              <div className="flex items-center gap-2">
                <div className="bg-golden w-max rounded-sm p-2">
                  <BadgeDollarSign size={32} />
                </div>
                <div>
                  <p className="text-[#3C4056] font-semibold">{counts.transactions}</p>
                  <p className="text-[#676a7b]">Transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-golden w-max rounded-sm p-2">
                  <Users />
                </div>
                <div>
                  <p className="text-[#3C4056] font-semibold">{counts.referrals}</p>
                  <p className="text-[#676a7b]">Referrals</p>
                </div>
              </div>
            </div>

            <h1 className="font-semibold text-xl text-[#3C4056] mt-2 mb-4">Details</h1>
            <Separator />
            <ul className="py-4 text-[#3C4056] space-y-2">
              <li>
                <p className="font-semibold">
                  Username:{" "}
                  <span className="font-normal text-black">{personalInfo?.username}</span>
                </p>
              </li>
              <li>
                <p className="font-semibold">
                  Email:{" "}
                  <span className="font-normal text-black">{personalInfo?.email}</span>
                </p>
              </li>
              <li>
                <p className="font-semibold">
                  Provider:{" "}
                  <span className="font-normal text-black">{personalInfo?.provider || "—"}</span>
                </p>
              </li>
              <li className="flex items-center gap-2">
                <p className="font-semibold">KYC:</p>
                <StatusChip status={personalInfo?.kycVerified} />
              </li>
              <li>
                <p className="font-semibold">
                  Contact:{" "}
                  <span className="font-normal text-black">
                    {personalInfo?.personal_information?.mobilePhone || "—"}
                  </span>
                </p>
              </li>
              <li>
                <p className="font-semibold">
                  Citizenship:{" "}
                  <span className="font-normal text-black">
                    {personalInfo?.personal_information?.citizenship || "—"}
                  </span>
                </p>
              </li>
              <li>
                <p className="font-semibold">
                  Country:{" "}
                  <span className="font-normal text-black">{personalInfo?.country}</span>
                </p>
              </li>
              <li>
                <p className="font-semibold">
                  MFA Enabled:{" "}
                  <span className="font-normal text-black">{personalInfo?.mfa_set_enable?.mfaEnabled ? "Yes" : "No"}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Key sections (reduced tabs) */}
        <div className="col-span-5 space-y-4">
          <div className="rounded-xl bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-[#3C4056]">Recent Transactions ({counts.transactions})</h2>
            </div>
            <TransactionsTab data={personalInfo.transactions} loading={loading} />
          </div>

          <Collapsible>
            <div className="rounded-xl bg-white p-4">
              <CollapsibleTrigger asChild>
                <button className="w-full text-left font-semibold text-lg text-[#3C4056]">Referrals ({counts.referrals})</button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4">
                  <ReferralsTab data={personalInfo.referralsFK} loading={loading} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible>
            <div className="rounded-xl bg-white p-4">
              <CollapsibleTrigger asChild>
                <button className="w-full text-left font-semibold text-lg text-[#3C4056]">Rewards ({counts.referralRewards + counts.customerRewards + counts.directDepositRewards})</button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  <ReferralRewardsTab data={personalInfo.referral_rewards} loading={loading} />
                  <CustomerRewardsTab data={personalInfo.customer_reward_details} loading={loading} />
                  <DirectDepositRewardsTab data={personalInfo.direct_deposit_rewards} loading={loading} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible>
            <div className="rounded-xl bg-white p-4">
              <CollapsibleTrigger asChild>
                <button className="w-full text-left font-semibold text-lg text-[#3C4056]">Groups ({counts.groups}) & Shared ({counts.groupSharedSavings})</button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  <GroupsTab data={personalInfo.group} loading={loading} />
                  <GroupSharedSavingsTab data={personalInfo.group_shared_savings} loading={loading} />
                  <GroupMonthlyTxTab data={personalInfo.group_monthly_transactions} loading={loading} />
                  <GroupSharedTxTab data={personalInfo.group_shared_transactions} loading={loading} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <Collapsible>
            <div className="rounded-xl bg-white p-4">
              <CollapsibleTrigger asChild>
                <button className="w-full text-left font-semibold text-lg text-[#3C4056]">Requests & Transfers</button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-4 space-y-4">
                  <UsdauRequestsTab data={personalInfo.usdau_requests} loading={loading} />
                  <BankVerificationsTab data={personalInfo.bank_verifications} loading={loading} />
                  <RemitsTab data={personalInfo.remitsSender} loading={loading} />
                  <RemitsTab data={personalInfo.remitsReceiver} loading={loading} />
                  <TransferUsdauTab data={personalInfo.transferUsdauSender} loading={loading} />
                  <TransferUsdauTab data={personalInfo.transferUsdauReceiver} loading={loading} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </div>
      <WalletAddressModal isOpen={isWalletOpen} walletAddress={walletAddress} onClose={() => setIsWalletOpen(false)} />
    </div>
  );
};

export default PersonalInfoPage;
