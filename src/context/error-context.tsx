import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useErrorHandler, ErrorState } from '@/hooks/use-error-handler';

interface ErrorContextType {
  errorState: ErrorState;
  showError: (error: unknown) => void;
  clearError: () => void;
  showGlobalError: (message: string, type?: ErrorState['errorType']) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const { errorState, handleError, clearError } = useErrorHandler();

  const showError = useCallback((error: unknown) => {
    handleError(error);
  }, [handleError]);

  const showGlobalError = useCallback((message: string, type: ErrorState['errorType'] = 'generic') => {
    handleError(new Error(message));
  }, [handleError]);

  return (
    <ErrorContext.Provider
      value={{
        errorState,
        showError,
        clearError,
        showGlobalError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
