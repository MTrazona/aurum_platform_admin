export interface SignInData {
  identifier: string;
  password: string;
}

export interface UserType {
  id: number;
  documentId: string;
  userType: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface AdminAccount {
  id: number;
  documentId: string;
  name: string;
  username: string;
  blocked: boolean;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  loanAmount: number | null;
  userType: UserType;
}

export interface AuthResponse {
  jwt: string;
  adminAccount: AdminAccount;
}
