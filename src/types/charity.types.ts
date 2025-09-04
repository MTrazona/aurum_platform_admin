export interface Charity {
  id: number;
  // User/Contact Information
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  
  // Charity Information
  charityName: string;
  description: string;
  imageUrl: string;
  location: string;
  charityType: string;
  
  // System fields
  status: CharityStatus;
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
  // User/Contact Information
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  
  // Charity Information
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
