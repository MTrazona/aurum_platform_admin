/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { BadgeDollarSign, Users } from "lucide-react";

import { fetchUsersInfoById } from "@/apis/users";
import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dateStringFormatter } from "@/utils/format-helper";

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
        <div className="rounded-xl bg-white p-6">
          <p className="text-sm text-gray-500">
            {loading ? "Loading user info…" : "No user found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between text-white items-center">
        <div>
          <p className="font-semibold text-white/80 text-xl">
            Customer ID : {personalInfo?.documentId}
          </p>
          <p className="text-white/40">{dateStringFormatter(personalInfo?.createdAt)}</p>
        </div>
        <Button variant="destructive">Blocked User</Button>
      </div>

      {/* Body */}
      <div className="grid grid-cols-7 mt-4 gap-4 min-h-screen">
        {/* Left summary panel */}
        <div className="col-span-2 flex flex-col">
          <div className="h-[600px] pt-12 px-[24px] rounded-xl bg-white">
            <div className="flex w-full flex-col justify-center items-center">
              <img
                className="w-36 h-36 rounded-lg mb-4 object-cover"
                src={personalInfo?.personal_information?.profileLink || "/no-avatar.png"}
                alt=""
              />
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
            </ul>
          </div>
        </div>

        {/* Right: Tabs with tables */}
        <div className="col-span-5">
          <div className="rounded-xl bg-white p-4">
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="flex flex-wrap gap-2">
                <TabsTrigger value="transactions">Transactions ({counts.transactions})</TabsTrigger>
                <TabsTrigger value="referrals">Referrals ({counts.referrals})</TabsTrigger>
                {/* <TabsTrigger value="referralRewards">Referral Rewards ({counts.referralRewards})</TabsTrigger>
                <TabsTrigger value="customerRewards">Customer Rewards ({counts.customerRewards})</TabsTrigger>
                <TabsTrigger value="ddRewards">Direct Deposit Rewards ({counts.directDepositRewards})</TabsTrigger>
                <TabsTrigger value="groups">Groups ({counts.groups})</TabsTrigger>
                <TabsTrigger value="groupShared">Group Shared Savings ({counts.groupSharedSavings})</TabsTrigger>
                <TabsTrigger value="groupMonthly">Group Monthly Tx ({counts.groupMonthly})</TabsTrigger>
                <TabsTrigger value="groupSharedTx">Group Shared Tx ({counts.groupSharedTx})</TabsTrigger>
                <TabsTrigger value="usdau">USDAU Requests ({counts.usdauRequests})</TabsTrigger>
                <TabsTrigger value="bankVer">Bank Verifications ({counts.bankVerifications})</TabsTrigger>
                <TabsTrigger value="remitsSender">Remits (Sender) ({counts.remitsSender})</TabsTrigger>
                <TabsTrigger value="remitsReceiver">Remits (Receiver) ({counts.remitsReceiver})</TabsTrigger>
                <TabsTrigger value="transferSender">Transfer USDAU (Sent) ({counts.transferSender})</TabsTrigger>
                <TabsTrigger value="transferReceiver">Transfer USDAU (Recv) ({counts.transferReceiver})</TabsTrigger> */}
              </TabsList>

              <TabsContent value="transactions">
                <TransactionsTab data={personalInfo.transactions} loading={loading} />
              </TabsContent>

              <TabsContent value="referrals">
                <ReferralsTab data={personalInfo.referralsFK} loading={loading} />
              </TabsContent>

              <TabsContent value="referralRewards">
                <ReferralRewardsTab data={personalInfo.referral_rewards} loading={loading} />
              </TabsContent>

              <TabsContent value="customerRewards">
                <CustomerRewardsTab data={personalInfo.customer_reward_details} loading={loading} />
              </TabsContent>

              <TabsContent value="ddRewards">
                <DirectDepositRewardsTab data={personalInfo.direct_deposit_rewards} loading={loading} />
              </TabsContent>

              <TabsContent value="groups">
                <GroupsTab data={personalInfo.group} loading={loading} />
              </TabsContent>

              <TabsContent value="groupShared">
                <GroupSharedSavingsTab data={personalInfo.group_shared_savings} loading={loading} />
              </TabsContent>

              <TabsContent value="groupMonthly">
                <GroupMonthlyTxTab data={personalInfo.group_monthly_transactions} loading={loading} />
              </TabsContent>

              <TabsContent value="groupSharedTx">
                <GroupSharedTxTab data={personalInfo.group_shared_transactions} loading={loading} />
              </TabsContent>

              <TabsContent value="usdau">
                <UsdauRequestsTab data={personalInfo.usdau_requests} loading={loading} />
              </TabsContent>

              <TabsContent value="bankVer">
                <BankVerificationsTab data={personalInfo.bank_verifications} loading={loading} />
              </TabsContent>

              <TabsContent value="remitsSender">
                <RemitsTab data={personalInfo.remitsSender} loading={loading} />
              </TabsContent>

              <TabsContent value="remitsReceiver">
                <RemitsTab data={personalInfo.remitsReceiver} loading={loading} />
              </TabsContent>

              <TabsContent value="transferSender">
                <TransferUsdauTab data={personalInfo.transferUsdauSender} loading={loading} />
              </TabsContent>

              <TabsContent value="transferReceiver">
                <TransferUsdauTab data={personalInfo.transferUsdauReceiver} loading={loading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
