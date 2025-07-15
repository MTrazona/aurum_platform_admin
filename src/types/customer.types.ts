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
}

export interface UserStatusPayload {
  userHash: string;
  status: boolean;
}