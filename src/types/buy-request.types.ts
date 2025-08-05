/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Certificate {
  goldCertificateLink: string | null;
  paymentVoucherLink?: string | null;
}

export interface BankCustomer {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface TransactionsType {
  id: number;
  documentId: string;
  trDate: string;
  transactionCode: string;
  remarks: string;
  narrative: string;
  trackingNumber: string;
  remarkStatus:string;
  txnID: string | null;
  transactionType: string;
  transactionStatus: string;
  rejectReason: string | null;
  fromCurrency: string;
  fromValue: string;
  toCurrency: string;
  toValue: string;
  usdRate: string;
  transactionFee: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  goldPrice: string;
  paymentMethodUser: string;
  receiptImageLinkUser: string;
  referenceNumberUser: string;
  depositDateUser: string;
  paymentMethodAdmin: string | null;
  amountAdmin: string | null;
  depositDateAdmin: string | null;
  receiptImageLinkAdmin: string | null;
  referenceNumberAdmin: string | null;
  totalAmountPay: string | null;
  conversionID: string | null;
  bookingNote: string | null;
  contractStartDate: string | null;
  balanceAdmin: string | null;
  amountReceivedAdmin: string | null;
  managementFeeTerminate: string | null;
  managementFeeAdvance: string | null;
  managementFeeRate: string | null;
  unitGaeUser: string | null;
  gaeToBePaid: string | null;
  gaeDownPayment: string | null;
  gaeTotal: string | null;
  contractEndDate: string | null;
  depositedAmount: string;
  gaeTotalUnitValue: string | null;
  goldPriceLME: string;
  isPaid: boolean;
  datePaid: string | null;
  adminWhoPaid: string | null;
  payID: string | null;
  rejectReasonOthers: string | null;
  goldPriceTermination: string | null;
  requestDateForTermination: string | null;
  approvedByTermination: string | null;
  statusOfTermination: string | null;
  approvedByTerminationDate: string | null;
  isRemit: boolean;
  terminatedPnl: string | null;
  terminatedTxn: string | null;
  terminatedAmount: string | null;
  terminatedCurrency: string | null;
  terminateCertificate: string | null;
  receiptImageLinkUserList: string | null;
  transferQmbHash: string | null;
  terminatedUnit: string | null;
  remainingToValue: string | null;
  remainingBookingNote: string | null;
  remainingFromValue: string | null;
  prepayments: any[];
  gssTransaction: any | null;
  remit: any | null;
  referral_rewards: any[];
  direct_deposit_reward: any | null;
  transaction_payments: any[]; // Add specific type if known
  customer: any | null;
  certificates: Certificate[];
  bankCustomer: BankCustomer;
}
