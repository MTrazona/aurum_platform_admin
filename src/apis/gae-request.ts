import api from "@/config/axios";
import { handleApiError } from "@/utils/handle-error";

export interface RemarksGAEPayload {
  id: string | number;
  remarks: string;
  remarkstatus: string[];
}
export interface UpdateGAEPayload {
  id: string | number;
  narrative: string;
  transactionStatus: string;
  depositamount: string | number;
  rejectReason?: string;  
}

export const remarksGAERequest = async (data: RemarksGAEPayload) => {
  try {
    const res = await api.post(`/submit-remarks/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateGAERequest = async (data: UpdateGAEPayload) => {
  try {
    const res = await api.post(`/submit-approve-request/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};