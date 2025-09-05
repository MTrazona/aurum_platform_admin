import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorType: 'network' | 'server' | 'not-found' | 'permission' | 'timeout' | 'generic';
  message: string;
}

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
    errorType: 'generic',
    message: '',
  });

  const clearError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
      errorType: 'generic',
      message: '',
    });
  }, []);

  const handleError = useCallback((error: unknown) => {
    console.error('Error caught by useErrorHandler:', error);

    let errorType: ErrorState['errorType'] = 'generic';
    let message = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const responseMessage = error.response?.data?.message || error.message;

      switch (status) {
        case 400:
          errorType = 'generic';
          message = responseMessage || 'Bad request. Please check your input.';
          break;
        case 401:
          errorType = 'permission';
          message = 'You are not authorized to perform this action.';
          break;
        case 403:
          errorType = 'permission';
          message = 'Access denied. You do not have permission to access this resource.';
          break;
        case 404:
          errorType = 'not-found';
          message = 'The requested resource was not found.';
          break;
        case 408:
          errorType = 'timeout';
          message = 'Request timeout. Please try again.';
          break;
        case 429:
          errorType = 'server';
          message = 'Too many requests. Please wait a moment and try again.';
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorType = 'server';
          message = responseMessage || 'Server error. Please try again later.';
          break;
        default:
          if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
            errorType = 'network';
            message = 'Network error. Please check your connection.';
          } else {
            errorType = 'generic';
            message = responseMessage || 'An error occurred while processing your request.';
          }
      }
    } else if (error instanceof Error) {
      message = error.message;
      
      // Check for specific error types based on message
      if (error.message.includes('Network Error') || error.message.includes('fetch')) {
        errorType = 'network';
      } else if (error.message.includes('timeout')) {
        errorType = 'timeout';
      } else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
        errorType = 'permission';
      }
    } else if (typeof error === 'string') {
      message = error;
    }

    setErrorState({
      hasError: true,
      error: error instanceof Error ? error : new Error(String(error)),
      errorType,
      message,
    });
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    onError?: (error: Error) => void
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error);
      if (onError && error instanceof Error) {
        onError(error);
      }
      return null;
    }
  }, [handleError]);

  return {
    errorState,
    handleError,
    clearError,
    handleAsyncError,
  };
};

// Hook for handling API errors specifically
export const useApiErrorHandler = () => {
  const { errorState, handleError, clearError } = useErrorHandler();

  const handleApiError = useCallback((error: unknown) => {
    // Enhanced API error handling
    if (error instanceof AxiosError) {
      const data = error.response?.data;

      // Handle specific API error formats
      if (data && typeof data === 'object') {
        if ('errors' in data && Array.isArray(data.errors)) {
          // Handle validation errors
          const validationErrors = data.errors.map((err: any) => err.message || err).join(', ');
          handleError(new Error(validationErrors));
          return;
        }
        
        if ('error' in data && typeof data.error === 'string') {
          handleError(new Error(data.error));
          return;
        }
      }
    }

    handleError(error);
  }, [handleError]);

  return {
    errorState,
    handleApiError,
    clearError,
  };
};
