export interface GoldPriceResponse {
  success: boolean;
  goldPrice: GoldPrice;
}

export interface GoldPrice {
  pricePerOunce: string;
  pricePerGram: number;
  formattedPricePerGram: {
    type: "BigNumber";
    hex: string;
  };
}

export interface UsdtPrice {
  message: string;
  rate: number;
}

export interface CombinedPriceData {
  standardGoldValue: number;
  standardUsdtValue: number;
  buySellingPrice: number;
  convertSellingPrice: number;
  gaeSellingPrice: number;
  gaePHSellingPrice: number;
};
