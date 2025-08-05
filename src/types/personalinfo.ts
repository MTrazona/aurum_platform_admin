/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ValidInput123 {
  personalInfo: PersonalInfo;
}

export interface PersonalInfo {
  id: number;
  documentId: string;
  username: Username;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: null;
  confirmationToken: null;
  confirmed: boolean;
  blocked: boolean;
  country: string;
  phoneNumber: string;
  pin: string;
  kycVerified: string;
  userHash: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  firstName: string;
  middleName: null;
  lastName: string;
  refCode: string;
  isAcceptTerm: boolean;
  resetToken: null;
  resetTokenExpiresAt: null;
  isVerifyEmail: boolean;
  verifiedCode: null;
  suffixName: string;
  is_password_updated: boolean;
  personal_information: PersonalInformation;
  referralsFK: CustomerRank[];
  transactions: Transaction[];
  userType: CustomerRank;
  bank_verifications: BankVerification[];
  customer_rank: CustomerRank;
  customer_aun_wallet: CustomerAunWallet;
  customer_aun_transactions: any[];
  customer_reward_details: CustomerRewardDetail[];
  group_shared_savings: Group[];
  group: Group[];
  group_pending_join_requests: any[];
  group_shared_transactions: GroupSharedTransaction[];
  referral_rewards: ReferralReward[];
  redeem_reward_requests: any[];
  group_monthly_transactions: GroupMonthlyTransaction[];
  direct_deposit_rewards: DirectDepositReward[];
  remitsSender: Remits[];
  remitsReceiver: Remits[];
  login_attempt: LoginAttempt;
  remit_receivers: CustomerRank[];
  remit_receivers_receivers: CustomerRank[];
  usdau_requests: UsdauRequest[];
  mfa_set_enable: MfaSetEnable;
  rank_promotion_requests: any[];
  customer_rank_promote_requests: any[];
  transferUsdauSender: TransferUsdau[];
  transferUsdauReceiver: TransferUsdau[];
  report_consultants: ReportConsultant[];
  audit_trail_enchanceds: any[];
  mfa_verifications: any[];
}

export interface BankVerification {
  id: number;
  documentId: string;
  dateEntry: Date;
  accountCountry: string;
  accountBSBNumber: null | string;
  bankName: string;
  accountFedABANumber: null | string;
  accountNumber: string;
  accountSwiftCode: null | string;
  accountHolderName: string;
  currency: Currency;
  statusOfVerification: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  attachmentOne: string;
  attachmentTwo: null;
  dateVerified: Date | null;
  bankCustomer: number;
  rejectedReason: null | string;
  rejectedReasonOptional: null;
  approvedDate: null;
}

export enum Currency {
  PHP = "PHP",
  Qmgt = "QMGT",
  Usdau = "USDAU",
  Usdc = "USDC",
  Usdt = "USDT",
}

export interface CustomerAunWallet {
  id: number;
  documentId: string;
  aunBalance: string;
  aunSold: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  totalOfVestingToSell: null;
}

export interface CustomerRank {
  id: number;
  documentId: string;
  promostionDate?: Date;
  rankStatus?: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  refDate?: Date;
  referrerCode?: string;
  userType?: string;
  description?: string;
}

export interface CustomerRewardDetail {
  id: number;
  documentId: string;
  monthOf: Date;
  typeOfTransaction: "Staking";
  amountReceive: string;
  statusOf: StatusOf;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  dateDistributed: Date | null;
}

export enum StatusOf {
  Distributed = "Distributed",
  Vesting = "Vesting",
}

export interface DirectDepositReward {
  id: number;
  documentId: string;
  username: Username;
  transactionAmount: string;
  transactionType: DirectDepositRewardTransactionType;
  rewardStatus: RewardStatus;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export enum RewardStatus {
  Approved = "approved",
  Declined = "declined",
  Pending = "pending",
}

export enum DirectDepositRewardTransactionType {
  Convert = "CONVERT",
  Gae = "GAE",
}

export enum Username {
  Chadinducil = "chadinducil",
  Darren = "darren",
}

export interface Group {
  id: number;
  documentId: string;
  groupName: string;
  groupWallet: string;
  transHash: string;
  lockedTokens: string;
  currency: Currency;
  description: string;
  initialContri: string;
  groupStatus: string;
  startDate: Date | null;
  endDate: Date | null;
  maturityDate: Date | null;
  monthlyContri: string;
  members: string;
  amount: null;
  password: null;
  groupType: string;
  maxMember: null;
  minMember: null;
  noMembers: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  months: string;
  groupBalance: string;
  goldSellingPrice: string;
  goldLme: string;
}

export interface GroupMonthlyTransaction {
  id: number;
  documentId: string;
  paymentDate: Date | null;
  amount: null | string;
  transactionStatus: TransactionStatusEnum;
  memberTxHash: null | string;
  groupTxHash: null | string;
  gcaTxHash: null | string;
  bookingNotes: null | string;
  loadAmount: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export enum TransactionStatusEnum {
  OnProcess = "On Process",
  Paid = "Paid",
  Pending = "Pending",
}

export interface GroupSharedTransaction {
  id: number;
  documentId: string;
  transHash: string;
  initialContri: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  TransactionStatus: TransactionStatusEnum;
}

export interface LoginAttempt {
  id: number;
  documentId: string;
  maximumAttempt: number;
  dateTime: Date;
  loginStatus: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  attemptStatus: string;
}

export interface MfaSetEnable {
  id: number;
  documentId: string;
  mfaEnabled: boolean;
  mfaSecret: string;
  backupCode: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface PersonalInformation {
  id: number;
  documentId: string;
  firstName: string;
  middleName: null;
  lastName: string;
  annual: null;
  annualIncome: null;
  dateOfBirth: null;
  address: null;
  city: null;
  postalCode: null;
  country: string;
  citizenship: null;
  currency: Currency;
  motherMaidenName: null;
  incomeTaxNumber: null;
  idType: null;
  idNumber: null;
  industry: null;
  occupation: null;
  sourceOfIncome: null;
  altPhoneNumber: null;
  faxNumber: null;
  gender: string;
  maritalStatus: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  employeeName: null;
  mobilePhone: null;
  profileLink: string;
  imageFrontSideLink: null;
  facialPictureLink: null;
  suffixName: null;
  imageUploaded: null;
}

export interface ReferralReward {
  id: number;
  documentId: string;
  transactionType: DirectDepositRewardTransactionType;
  ranking: Ranking;
  commission: Commission;
  transactionAmount: string;
  referralCommission: string;
  commissionAmount: string;
  fromUserId: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export enum Commission {
  The03 = "0.3%",
  The05 = "0.5%",
  The1 = "1%",
  The15 = "1.5%",
  The2 = "2%",
  The20 = "20%",
  The45 = "4.5%",
  The5 = "5%",
  The7 = "7%",
}

export enum Ranking {
  R001 = "R001",
  R002 = "R002",
  R003 = "R003",
  R008 = "R008",
}

export interface Remits {
  id: number;
  documentId: string;
  remitDate: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  txnTransfer: null | string;
  recieveCurrency: Currency | null;
  adminReleaseReciept: null;
  referrenceNumber: null;
  remitStatus: "Approved";
}

export interface ReportConsultant {
  id: number;
  documentId: string;
  nameOfConsultant: string;
  reportReason: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  reportedByName: string;
  reportedByEmail: string;
  statusOfReport: TransactionStatusEnum;
}

export interface Transaction {
  id: number;
  documentId: string;
  trDate: Date;
  transactionCode: string;
  txnID: null | string;
  transactionType: TransactionTransactionType;
  transactionStatus: StatusOfTerminationEnum;
  rejectReason: null;
  fromCurrency: Currency;
  fromValue: string;
  toCurrency: Currency;
  toValue: string;
  usdRate: null | string;
  transactionFee: null | string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  goldPrice: null | string;
  paymentMethodUser: PaymentMethodUser | null;
  receiptImageLinkUser: null | string;
  referenceNumberUser: null | string;
  depositDateUser: Date | null;
  paymentMethodAdmin: null | string;
  amountAdmin: null | string;
  depositDateAdmin: Date | null;
  receiptImageLinkAdmin: null | string;
  referenceNumberAdmin: null | string;
  totalAmountPay: null;
  conversionID: null | string;
  bookingNote: null | string;
  contractStartDate: Date | null;
  balanceAdmin: number | null;
  amountReceivedAdmin: null;
  goldCertificateLink: null | string;
  paymentVoucherLink: null | string;
  managementFeeTerminate: null;
  managementFeeAdvance: null | string;
  managementFeeRate: null;
  unitGaeUser: number | null;
  gaeToBePaid: null | string;
  gaeDownPayment: null | string;
  gaeTotal: null | string;
  contractEndDate: null;
  depositedAmount: null | string;
  gaeTotalUnitValue: null | string;
  goldPriceLME: string;
  isPaid: boolean;
  datePaid: null;
  adminWhoPaid: null;
  payID: null;
  rejectReasonOthers: null;
  goldPriceTermination: null | string;
  requestDateForTermination: Date | null;
  approvedByTermination: null;
  statusOfTermination: StatusOfTerminationEnum | null;
  approvedByTerminationDate: null;
  isRemit: boolean;
  terminatedPnl: null | string;
  terminatedTxn: null;
  terminatedAmount: null | string;
  terminatedCurrency: null;
  terminateCertificate: null | string;
  receiptImageLinkUserList: null;
  transferQmbHash: null;
  terminatedUnit: null | string;
  remainingToValue: null;
  remainingBookingNote: null;
  remainingFromValue: null;
  narrative: null;
  remarks: null;
  remarkStatus: null;
  depositAmount: null;
  refund: null;
  trackingNumber: null;
}

export enum PaymentMethodUser {
  DirectDeposit = "DIRECT DEPOSIT",
  Empty = "",
  PaymentMethodUserDirectDeposit = "directDeposit",
  Usd = "usd",
}

export enum StatusOfTerminationEnum {
  Completed = "Completed",
  Open = "Open",
  Pending = "Pending",
}

export enum TransactionTransactionType {
  Buy = "Buy",
  GAEExtra = "GAE Extra",
  Gae = "GAE",
  GaePh = "GAE PH",
  GoldConvert = "Gold Convert",
  Sell = "Sell",
  SwapQMGTUSDAU = "Swap QMGT USDAU",
}

export interface TransferUsdau {
  id: number;
  documentId: string;
  amount: string;
  transferDate: Date;
  tnxID: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface UsdauRequest {
  id: number;
  documentId: string;
  amountRequest: string;
  dateRequest: Date;
  walletAddress: string;
  fromValue: string;
  usdRate: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  requestStatus: TransactionStatusEnum;
  trans_id: null;
  fee: string;
}
