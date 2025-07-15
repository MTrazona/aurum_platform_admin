/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Certificate {
  goldCertificateLink?: string;
  paymentVoucherLink?: string;
}

export interface ReferralReward {
  id: number;
  documentId: string;
  transactionType: string;
  ranking: string;
  commission: string;
  commissionAmount: string;
  createdAt: string;
  fromUserId: number;
  locale: string | null;
  publishedAt: string;
  referralCommission: string;
  transactionAmount: string;
  updatedAt: string;
}

export interface LoginAttempt {
  loginStatus: string;
}

export interface Customer {
  firstName: string;
  lastName: string;
}

export interface TransactionData {
  adminWhoPaid: any | null;
  amountAdmin: any | null;
  amountReceivedAdmin: any | null;
  approvedByTermination: any | null;
  approvedByTerminationDate: any | null;
  balanceAdmin: any | null;
  bankCustomer: any | null;
  bookingNote: string;
  certificates: Certificate[];
  contractEndDate: string | null;
  contractStartDate: string;
  conversionID: string;
  createdAt: string;
  customer: Customer;
  datePaid: string | null;
  depositDateAdmin: string | null;
  depositDateUser: string | null;
  depositedAmount: string | null;
  direct_deposit_reward: string | null;
  documentId: string;
  fromCurrency: string;
  fromValue: string;
  gaeDownPayment: string | null;
  gaeToBePaid: string | null;
  gaeTotal: string | null;
  gaeTotalUnitValue: string | null;
  goldPrice: string;
  goldPriceLME: string;
  goldPriceTermination: string | null;
  gssTransaction: string | null;
  id: number;
  isPaid: boolean;
  isRemit: boolean;
  locale: string | null;
  managementFeeAdvance: string | null;
  managementFeeRate: string | null;
  managementFeeTerminate: string | null;
  payID: string | null;
  paymentMethodAdmin: string | null;
  paymentMethodUser: string | null;
  prepayments: any[];
  publishedAt: string;
  receiptImageLinkAdmin: string | null;
  receiptImageLinkUser: string | null;
  receiptImageLinkUserList: string | null;
  referenceNumberAdmin: string | null;
  referenceNumberUser: string | null;
  referral_rewards: ReferralReward[];
  rejectReason: string | null;
  rejectReasonOthers: string | null;
  remainingBookingNote: string | null;
  remainingFromValue: string | null;
  remainingToValue: string | null;
  remit: string | null;
  requestDateForTermination: string | null;
  statusOfTermination: string | null;
  terminateCertificate: string | null;
  terminatedAmount: string | null;
  terminatedCurrency: string | null;
  terminatedPnl: string | null;
  terminatedTxn: string | null;
  terminatedUnit: string | null;
  toCurrency: string;
  toValue: string;
  totalAmountPay: string | null;
  trDate: string;
  transactionCode: string;
  transactionFee: string;
  transactionStatus: string;
  transactionType: string;
  transaction_payments: any[];
  transferQmbHash: string | null;
  txnID: string;
  unitGaeUser: string | null;
  updatedAt: string;
  usdRate: string;
}
