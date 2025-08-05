export interface LoginAttempt {
  id: number;
  documentId: string;
  maximumAttempt: number;
  dateTime: string;
  loginStatus: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  attemptStatus: string;
}

export interface User {
  id: string;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  country: string;
  phoneNumber: string;
  kycVerified: string;
  userHash: string;
  firstName: string;
  middleName: string;
  lastName: string;
  refCode: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  isAcceptTerm: boolean;
  isVerifyEmail: boolean | null;
  verifiedCode: string;
  suffixName: string | null;
  is_password_updated: boolean | null;
  login_attempt: LoginAttempt;
  customer_rank: CustomerRank;
}

export interface RankCode {
  id: number;
  documentId: string;
  rankName: string;
  rankDescription: string;
  createBy: string | null;
  createdDate: string; 
  rankID: string;
  rankColor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface CustomerRank {
  id: number;
  documentId: string;
  promostionDate: string; // ISO date string
  rankStatus: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  rank_code: RankCode;
}

export interface UserStatusPayload {
  userHash: string;
  status: boolean;
}
