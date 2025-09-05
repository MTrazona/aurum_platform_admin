import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { ErrorUI } from './error-ui';

// interface WithErrorBoundaryProps {
//   children: React.ReactNode;
//   fallback?: React.ReactNode;
//   onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
// }

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const WrappedComponent = (props: P) => {
    const defaultFallback = (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <ErrorUI
          type="generic"
          title="Page Error"
          message="Something went wrong while loading this page. Please try refreshing or contact support if the problem persists."
          showRetry={true}
        />
      </div>
    );

    return (
      <ErrorBoundary fallback={fallback || defaultFallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for page-level error handling
export const usePageErrorHandler = () => {
  const [pageError, setPageError] = React.useState<{
    hasError: boolean;
    error: Error | null;
  }>({
    hasError: false,
    error: null,
  });

  const handlePageError = React.useCallback((error: Error) => {
    setPageError({
      hasError: true,
      error,
    });
  }, []);

  const clearPageError = React.useCallback(() => {
    setPageError({
      hasError: false,
      error: null,
    });
  }, []);

  return {
    pageError,
    handlePageError,
    clearPageError,
  };
};
