import api from "@/config/axios";
import type {
    GoldPrice,
    GoldPriceResponse,
    UsdtPrice,
} from "@/types/price.types";

export const getCurrentGoldPrice = async (): Promise<GoldPrice | undefined> => {
  try {
    const res = await api.get<GoldPriceResponse>("/gold-prices");
    return res.data.goldPrice;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getUsdtValueAPI Error:", error.message);
    } else {
      console.error("getUsdtValueAPI Unknown error", error);
    }
    return undefined;
  }
};

export const getUsdtValueAPI = async (): Promise<UsdtPrice | undefined> => {
  try {
    const response = await api.get<UsdtPrice>("/currency/usdt-to-php", {
      isPublic: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getUsdtValueAPI Error:", error.message);
    } else {
      console.error("getUsdtValueAPI Unknown error", error);
    }
    return undefined;
  }
};
