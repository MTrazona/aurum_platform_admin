// src/hooks/usePrices.ts
import { getCurrentGoldPrice, getUsdtValueAPI } from "@/apis/token_price";
import { useQuery } from "@tanstack/react-query";

type CombinedPriceData = {
  standardGoldValue: number;
  standardUsdtValue: number;
  buySellingPrice: number;
  convertSellingPrice: number;
  gaeSellingPrice: number;
  gaePHSellingPrice: number;
};

export const usePrices = () => {
  return useQuery<CombinedPriceData>({
    queryKey: ["combined-prices"],
    queryFn: async () => {
      const [gold, usdt] = await Promise.all([
        getCurrentGoldPrice(),
        getUsdtValueAPI(),
      ]);

      const standardGoldValue = gold?.pricePerGram ?? 100;
      const standardUsdtValue = typeof usdt?.rate === "string"
        ? parseFloat(usdt.rate)
        : usdt?.rate ?? 56;

      return {
        standardGoldValue,
        standardUsdtValue,
        buySellingPrice: standardGoldValue * 1.025,
        convertSellingPrice: standardGoldValue * 1.07,
        gaeSellingPrice: standardGoldValue * 1.035,
        gaePHSellingPrice: standardGoldValue * 1.05,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
