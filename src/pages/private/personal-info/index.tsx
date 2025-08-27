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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusChip from "@/components/status-chip";
import {
  dateStringFormatter,
  formatNumber,
  formatTransactionCode,
  safeStr,
} from "@/utils/format-helper";

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
        <TabsList>
          <TabsTrigger value="details">
            {personalInfo.firstName} {personalInfo.lastName}'s Profile
          </TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="gds">Group Decentralized Staking</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            {/* Left summary column */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <div className="rounded-xl bg-[#1E1E20]/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Account Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">KYC</span>
                    <StatusChip status={personalInfo.kycVerified || "Unknown"} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Email</span>
                    <StatusChip status={personalInfo.isVerifyEmail ? "Verified" : "Not Verified"} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Login Status</span>
                    <StatusChip status={personalInfo.login_attempt?.loginStatus || "Unknown"} />
                  </div>
                  {personalInfo.blocked && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">Account</span>
                      <StatusChip status="Blocked" />
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-[#1E1E20]/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Security</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">MFA</span>
                    <StatusChip status={personalInfo.mfa_set_enable?.mfaEnabled ? "Active" : "Inactive"} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Provider</span>
                    <span className="text-white">{safeStr(personalInfo.provider)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#1E1E20]/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Bank Verifications</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Total Records</span>
                    <span className="text-white">{personalInfo.bank_verifications?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Approved</span>
                    <span className="text-white">
                      {personalInfo.bank_verifications?.filter((b) => b.statusOfVerification === "Approved").length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Pending</span>
                    <span className="text-white">
                      {personalInfo.bank_verifications?.filter((b) => b.statusOfVerification === "Pending").length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right details column */}
            <div className="col-span-1 lg:col-span-5 space-y-4">
              <div className="rounded-xl bg-[#1E1E20]/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/70">Full Name</p>
                    <p className="text-white">
                      {safeStr(personalInfo.personal_information?.firstName)} {safeStr(personalInfo.personal_information?.lastName)}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/70">Username</p>
                    <p className="text-white">{safeStr(String(personalInfo.username))}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Email</p>
                    <div className="flex items-center gap-2 text-white">
                      <span className="truncate">{personalInfo.email}</span>
                      <button onClick={() => handleCopy(personalInfo.email)} className="text-gray-400 hover:text-gray-200">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-white/70">Phone</p>
                    <p className="text-white">{safeStr(personalInfo.phoneNumber)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Country</p>
                    <p className="text-white">{safeStr(personalInfo.country)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">User Hash</p>
                    <div className="flex items-center gap-2 text-white">
                      <span className="truncate">{safeStr(personalInfo.userHash)}</span>
                      {personalInfo.userHash && (
                        <button onClick={() => handleCopy(personalInfo.userHash)} className="text-gray-400 hover:text-gray-200">
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-[#1E1E20]/20 p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Identity & Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/70">ID Type</p>
                    <p className="text-white">{safeStr(personalInfo.personal_information?.idType as any)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">ID Number</p>
                    <p className="text-white">{safeStr(personalInfo.personal_information?.idNumber as any)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Address</p>
                    <p className="text-white">{safeStr(personalInfo.personal_information?.address as any)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">City</p>
                    <p className="text-white">{safeStr(personalInfo.personal_information?.city as any)}</p>
                  </div>
                  <div>
                    <p className="text-white/70">Postal Code</p>
                    <p className="text-white">{safeStr(personalInfo.personal_information?.postalCode as any)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <div className="rounded-xl bg-[#1E1E20]/20 p-4">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
              <p className="text-xs text-white/70">A consolidated list of transactions associated with this user.</p>
            </div>
            {personalInfo.transactions && personalInfo.transactions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalInfo.transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-white">{formatTransactionCode(tx.transactionCode)}</TableCell>
                      <TableCell className="text-white">{String(tx.transactionType)}</TableCell>
                      <TableCell className="text-white">
                        {String(tx.fromCurrency)} {formatNumber(tx.fromValue)}
                      </TableCell>
                      <TableCell className="text-white">
                        {String(tx.toCurrency)} {formatNumber(tx.toValue)}
                      </TableCell>
                      <TableCell className="text-white">
                        <StatusChip status={String(tx.transactionStatus)} />
                      </TableCell>
                      <TableCell className="text-white">{dateStringFormatter(tx.createdAt as unknown as string)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="text-white/70">Showing {personalInfo.transactions.length} transaction(s)</TableCaption>
              </Table>
            ) : (
              <div className="text-sm text-white/70">No transactions found for this user.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="referrals" className="mt-4">
          <div className="rounded-xl bg-[#1E1E20]/20 p-4">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-white">Referral Rewards</h3>
              <p className="text-xs text-white/70">Transactions and commissions earned through referrals.</p>
            </div>
            {personalInfo.referral_rewards && personalInfo.referral_rewards.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Ranking</TableHead>
                    <TableHead>Commission</TableHead>
                    <TableHead>Transaction Amount</TableHead>
                    <TableHead>Referral Commission</TableHead>
                    <TableHead>Commission Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalInfo.referral_rewards.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-white">{String(r.transactionType)}</TableCell>
                      <TableCell className="text-white">{String(r.ranking)}</TableCell>
                      <TableCell className="text-white">{String(r.commission)}</TableCell>
                      <TableCell className="text-white">USDT {formatNumber(r.transactionAmount)}</TableCell>
                      <TableCell className="text-white">{formatNumber(r.referralCommission)}</TableCell>
                      <TableCell className="text-white">USDT {formatNumber(r.commissionAmount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption className="text-white/70">Showing {personalInfo.referral_rewards.length} referral record(s)</TableCaption>
              </Table>
            ) : (
              <div className="text-sm text-white/70">No referral rewards found for this user.</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="gds" className="mt-4">
          <div className="space-y-4">
            <div className="rounded-xl bg-[#1E1E20]/20 p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-white">Groups</h3>
                <p className="text-xs text-white/70">Group Decentralized Staking memberships and balances.</p>
              </div>
              {personalInfo.group && personalInfo.group.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Monthly Contri</TableHead>
                      <TableHead>Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personalInfo.group.map((g) => (
                      <TableRow key={g.id}>
                        <TableCell className="text-white">{g.groupName}</TableCell>
                        <TableCell className="text-white">{g.groupStatus}</TableCell>
                        <TableCell className="text-white">{g.members}</TableCell>
                        <TableCell className="text-white">{g.monthlyContri}</TableCell>
                        <TableCell className="text-white">{g.groupBalance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption className="text-white/70">Showing {personalInfo.group.length} group(s)</TableCaption>
                </Table>
              ) : (
                <div className="text-sm text-white/70">No groups found for this user.</div>
              )}
            </div>

            <div className="rounded-xl bg-[#1E1E20]/20 p-4">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-white">Group Shared Transactions</h3>
                <p className="text-xs text-white/70">Activity within the user's group savings.</p>
              </div>
              {personalInfo.group_shared_transactions && personalInfo.group_shared_transactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tx Hash</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Initial Contri</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personalInfo.group_shared_transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="text-white">{t.transHash}</TableCell>
                        <TableCell className="text-white">{t.TransactionStatus}</TableCell>
                        <TableCell className="text-white">{t.initialContri}</TableCell>
                        <TableCell className="text-white">{dateStringFormatter(t.createdAt as unknown as string)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption className="text-white/70">Showing {personalInfo.group_shared_transactions.length} shared transaction(s)</TableCaption>
                </Table>
              ) : (
                <div className="text-sm text-white/70">No group shared transactions found.</div>
              )}
            </div>
          </div>
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
