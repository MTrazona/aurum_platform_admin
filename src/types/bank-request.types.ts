export interface BankAccountVerification {
  id: number;
  accountHolderName: string;
  accountNumber: string;
  accountCountry: string;
  bankName: string;
  currency: string;

  accountBSBNumber: string | null;
  accountFedABANumber: string | null;
  accountSwiftCode: string | null;

  attachmentOne: string | null;
  attachmentTwo: string | null;

  bankCustomer: number; // possibly a foreign key ID
  customer: number | null;

  dateEntry: string; // ISO string
  dateVerified: string | null;

  kycVerified: "Verified" | "Unverified" | string;
  statusOfVerification: "Approved" | "Rejected" | "Pending" | string;
  rejectedReason: string | null;
  rejectedReasonOptional: string | null;
}
