import api from "@/config/axios";
import { handleApiError } from "@/utils/handle-error";

export interface RemarksGCAPayload {
  id: string | number;
  remarks: string;
  remarkstatus: string[];
}

export interface ReleaseGCAPayload {
  id: string | number;
  receiptImageLinkAdmin: File;
  releaseDateAdmin: Date;
}

export interface UpdateGCAPayload {
  id: string | number;
  transactionStatus: string;
  narrative: string;
  rejectReason?: string;
}



export const remarksGCARequest = async (data: RemarksGCAPayload) => {
  try {
    const res = await api.post(`/submit-remarks/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateGCARequest = async (data: UpdateGCAPayload) => {
  try {
    const res = await api.put(`/request-approval-convert/${data.id}`, data);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const viewDepositSlip = async (id: string | number) => {
  try {
    const res = await api.get(`/deposit-slip/${id}`);
    return res.data.url;
  } catch (error) {
    handleApiError(error);
  }
};

export const releaseGCARequest = async (data: ReleaseGCAPayload) => {
  try {
    const res = await api.put(`/execute-eightyfive-fiat/${data.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
