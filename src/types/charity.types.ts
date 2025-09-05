export interface DonateReceiver {
  id: number;
  donateDate: string;
  donateStatus: string;
  amount: string;
  createdAt: string;
  txnTransfer: string | null;
  sender: {
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
}

export interface CharityInfo {
  charityName: string;
  description: string;
  imageUrl: string | null;
  location: string;
  is_active: boolean;
  charityType: string;
  createdAt: string;
}

export interface Charity {
  id: number;
  // User/Contact Information
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  
  // Nested charity information
  charity: CharityInfo;
  
  // Donation data
  donateReceiver: DonateReceiver[];
}

export type CharityCategory = 
  | "Education"
  | "Healthcare"
  | "Environment"
  | "Poverty Relief"
  | "Animal Welfare"
  | "Disaster Relief"
  | "Arts & Culture"
  | "Human Rights"
  | "Other";

export type CharityStatus = 
  | "Active"
  | "Inactive"
  | "Pending"
  | "Suspended";

export interface CreateCharityRequest {
  // User/Contact Information
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  
  // Charity Information (flat structure to match API payload)
  charityName: string;
  description: string;
  imageUrl: string;
  location: string;
  charityType: string;
}

export interface UpdateCharityRequest extends Partial<CreateCharityRequest> {
  status?: CharityStatus;
}

export interface CharityFilters {
  search?: string;
  country?: string;
}
