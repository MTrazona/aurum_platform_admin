export interface PromotionRequirement {
  type: string;
  fromRank: string;
  required: number;
  actual: number;
  progress: string;
  passed: boolean;
}

export interface PromotionDetails {
  totalSales: number;
  totalReferrals: number;
  requirementsMet: PromotionRequirement[];
}

export interface RankPromotionRequest {
  id: number;
  dateRequest: string;
  currentRank: string;
  nextRank: string;
  requestStatus: string;
  approvedOrDeclineDate: string | null;
  userRequest: string;
  promotionDetails: PromotionDetails;
}
