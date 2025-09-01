export interface Charity {
  id: number;
  name: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  address: string;
  country: string;
  category: CharityCategory;
  status: CharityStatus;
  imageUrl?: string;
  donationGoal?: number;
  currentDonations?: number;
  createdAt: string;
  updatedAt: string;
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
  name: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  address: string;
  country: string;
  category: CharityCategory;
  imageUrl?: string;
  donationGoal?: number;
}

export interface UpdateCharityRequest extends Partial<CreateCharityRequest> {
  status?: CharityStatus;
}

export interface CharityFilters {
  search?: string;
  category?: CharityCategory;
  status?: CharityStatus;
  country?: string;
}
