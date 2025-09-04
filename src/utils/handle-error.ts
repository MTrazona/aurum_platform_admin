/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export const handleApiError = (error: unknown): ApiError => {
  console.error("API Error:", error);
  
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data;
    
    return {
      message: data?.message || data?.error || error.message || 'An API error occurred',
      status,
      code: error.code,
      details: data,
    };
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }
  
  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  };
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !error.response && error.request;
  }
  return false;
};

export const isServerError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status ? status >= 500 : false;
  }
  return false;
};

export const isClientError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    return status ? status >= 400 && status < 500 : false;
  }
  return false;
};

export const getErrorMessage = (error: unknown): string => {
  const apiError = handleApiError(error);
  return apiError.message;
};