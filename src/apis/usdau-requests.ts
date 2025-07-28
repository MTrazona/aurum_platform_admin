import api from "@/config/axios";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import type { AxiosError } from "axios";

interface ApproveUsdauRequestParams {
  id: string | number;
  status: "Approved" | "Declined" | string;
}
interface ApproveUsdauResponse {
  success: boolean;
  message: string;
}

interface ErrorResponse {
  message: string;
}

export const getUSDAURequests = async (): Promise<USDAUTransactions[]> => {
  try {
    const res = await api.get("/get-usdau-request-admin");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getUSDAURequests Error:", error.message);
    } else {
      console.error("getUSDAURequests Unknown error:", error);
    }
    return [];
  }
};

export const approveUsdauRequest = async ({
  id,
  status,
}: ApproveUsdauRequestParams): Promise<ApproveUsdauResponse> => {
  try {
    const response = await api.put<ApproveUsdauResponse>(
      `/approve-usdau-request/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    const axiosErr = error as AxiosError<ErrorResponse>;

    throw new Error(
      axiosErr.response?.data?.message || "Failed to approve USDAU request"
    );
  }
};
