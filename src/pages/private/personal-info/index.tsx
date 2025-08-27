/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Globe,
  Hash,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  ShieldX,
  Unlock,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  fetchUsersInfoById,
  getWalletAddress,
  UnblockedBlockUser,
  UnlockLockedUser,
} from "@/apis/users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { WalletAddressModal } from "@/components/dialog/wallet-address";

import type { PersonalInfo } from "@/types/personalinfo";
import DetailsTab from "./tabs/details";
import TransactionsTab from "./tabs/transactions";
import ReferralsTab from "./tabs/referrals";
import GDSTab from "./tabs/gds";

const PersonalInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [actionLoading, setActionLoading] = useState<{
    block?: boolean;
    unlock?: boolean;
  }>({});

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
    await navigator.clipboard.writeText(text);
  };

  const handleViewWallet = async () => {
    if (!personalInfo?.userHash) return;
    const addr = await getWalletAddress(personalInfo.userHash);
    setWalletAddress(addr);
    setIsWalletOpen(true);
  };

  const handleToggleBlock = async () => {
    if (!personalInfo?.userHash) return;
    setActionLoading((p) => ({ ...p, block: true }));
    try {
      await UnblockedBlockUser({
        userHash: personalInfo.userHash,
        status: personalInfo.blocked,
      });
      setPersonalInfo((prev) =>
        prev ? { ...prev, blocked: !prev.blocked } : prev
      );
    } catch (e) {
      console.log(e);
    } finally {
      setActionLoading((p) => ({ ...p, block: false }));
    }
  };

  const handleUnlock = async () => {
    if (!personalInfo?.userHash) return;
    setActionLoading((p) => ({ ...p, unlock: true }));
    try {
      await UnlockLockedUser({
        userHash: personalInfo.userHash,
        status: false,
      });
      setPersonalInfo((prev) =>
        prev
          ? {
              ...prev,
              login_attempt: { ...prev.login_attempt, loginStatus: "Active" },
            }
          : prev
      );
    } catch (e) {
      console.log(e);
    } finally {
      setActionLoading((p) => ({ ...p, unlock: false }));
    }
  };


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
      <div className="rounded-xl text-white bg-[#1E1E20]/20 p-6 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <img
            className="w-16 h-16 rounded-lg object-cover"
            src={
              personalInfo?.personal_information?.profileLink ||
              "/no-avatar.png"
            }
            alt="avatar"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xl font-semibold  truncate">
                {personalInfo?.personal_information?.firstName}{" "}
                {personalInfo?.personal_information?.lastName}
              </p>
              {personalInfo.kycVerified?.toUpperCase() === "VERIFIED" ? (
                <Badge
                  className="bg-green-100 text-green-700 border-green-200"
                  variant="outline"
                >
                  <ShieldCheck className="w-4 h-4 mr-1" /> KYC Verified
                </Badge>
              ) : (
                <Badge
                  className="bg-yellow-100 text-yellow-700 border-yellow-200"
                  variant="outline"
                >
                  <ShieldX className="w-4 h-4 mr-1" /> KYC{" "}
                  {personalInfo.kycVerified}
                </Badge>
              )}
              {personalInfo.isVerifyEmail ? (
                <Badge
                  variant="outline"
                  className="border-green-200 text-green-700"
                >
                  Email Verified
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-yellow-200 text-yellow-700"
                >
                  Email Not Verified
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-blue-700 border-blue-200"
              >
                {personalInfo.login_attempt?.loginStatus || "Unknown"}
              </Badge>
              {personalInfo.blocked && (
                <Badge
                  variant="outline"
                  className="text-red-700 border-red-200"
                >
                  Blocked
                </Badge>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-white">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" /> {personalInfo.email}{" "}
                <button
                  onClick={() => handleCopy(personalInfo.email)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <Hash className="w-4 h-4" /> ID: {personalInfo.documentId}{" "}
                <button
                  onClick={() => handleCopy(String(personalInfo.documentId))}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4" /> {personalInfo.country}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" /> {personalInfo.phoneNumber || "—"}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" /> Username:{" "}
                {String(personalInfo.username)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleViewWallet}
              variant="outline"
              className="cursor-pointer bg-primary"
            >
              View Wallet
            </Button>
            <Button
              onClick={handleToggleBlock}
              disabled={!!actionLoading.block}
              variant={personalInfo.blocked ? "secondary" : "destructive"}
              className="cursor-pointer"
            >
              {personalInfo.blocked ? "Unblock" : "Block"}
            </Button>
            {personalInfo.login_attempt?.loginStatus !== "Active" ? (
              <Button
                onClick={handleUnlock}
                disabled={!!actionLoading.unlock}
                className="cursor-pointer"
              >
                <Unlock className="w-4 h-4 mr-1" /> Unlock
              </Button>
            ) : (
              <Button
                variant="outline"
                className="bg-primary !text-white cursor-not-allowed"
              >
                <Lock className="w-4 h-4 mr-1" /> Locked
              </Button>
            )}
          </div>
        </div>
      </div>
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="max-w-full overflow-x-auto">
          <TabsTrigger value="details">{personalInfo.firstName} {personalInfo.lastName}'s Profile</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="gds">Group Decentralized Staking</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <DetailsTab personalInfo={personalInfo as PersonalInfo} />
        </TabsContent>
        <TabsContent value="transactions" className="mt-4">
          <TransactionsTab transactions={personalInfo.transactions || []} loading={loading} />
        </TabsContent>
        <TabsContent value="referrals" className="mt-4">
          <ReferralsTab referrals={personalInfo.referral_rewards || []} loading={loading} />
        </TabsContent>
        <TabsContent value="gds" className="mt-4">
          <GDSTab groups={personalInfo.group || []} loading={loading} />
        </TabsContent>
      </Tabs>
      <WalletAddressModal
        isOpen={isWalletOpen}
        walletAddress={walletAddress}
        onClose={() => setIsWalletOpen(false)}
      />
    </div>
  );
};

export default PersonalInfoPage;
