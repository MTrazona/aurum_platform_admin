import React, { useEffect } from 'react';
import { useError } from '@/context/error-context';
import { ErrorUI } from '@/components/error-ui';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const GlobalErrorToast: React.FC = () => {
  const { errorState, clearError } = useError();

  useEffect(() => {
    if (errorState.hasError) {
      // Auto-dismiss after 10 seconds for non-critical errors
      const timer = setTimeout(() => {
        if (errorState.errorType !== 'permission' && errorState.errorType !== 'server') {
          clearError();
        }
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [errorState.hasError, errorState.errorType, clearError]);

  if (!errorState.hasError) {
    return null;
  }

  return (
    <Dialog open={errorState.hasError} onOpenChange={(open) => !open && clearError()}>
      <DialogContent className="sm:max-w-md">
        <ErrorUI
          type={errorState.errorType}
          message={errorState.message}
          onRetry={clearError}
          onDismiss={clearError}
          showRetry={errorState.errorType !== 'permission'}
          showDismiss={true}
        />
      </DialogContent>
    </Dialog>
  );
};
