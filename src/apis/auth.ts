import api from "@/config/axios";
import type { AuthResponse, SignInData } from "@/types/auth.types";
import { getSHA256 } from "@/utils/get-sha-256";

export const signinAuthentication = async (
  data: SignInData
): Promise<AuthResponse> => {
  try {
    const sha256Keys =
      import.meta.env.VITE_ADMIN_SECRET_KEY_ACCESS ||
      "dnU63RdmM6w66cVbxzXgNBzKZ7tsfWY2duZBnVhNmHzE93ZHAKYCQrQtM9tH";
    const generateSha256 = getSHA256(JSON.stringify(data), sha256Keys);
    const response = await api.post(
      `/admin-login?is_admin=${generateSha256}`,
      data
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getUsdtValueAPI Error:", error.message);
    } else {
      console.error("getUsdtValueAPI Unknown error", error);
    }
    throw new Error("An error occurred during authentication.");
  }
};
