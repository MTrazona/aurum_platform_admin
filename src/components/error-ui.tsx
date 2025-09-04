import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  RefreshCw, 
  Wifi, 
  Server, 
  FileX, 
  ShieldAlert,
  Clock,
  X
} from 'lucide-react';

export interface ErrorUIProps {
  title?: string;
  message?: string;
  type?: 'network' | 'server' | 'not-found' | 'permission' | 'timeout' | 'generic';
  onRetry?: () => void;
  onDismiss?: () => void;
  showRetry?: boolean;
  showDismiss?: boolean;
  className?: string;
}

const errorConfig = {
  network: {
    icon: Wifi,
    title: 'Connection Error',
    message: 'Unable to connect to the server. Please check your internet connection and try again.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  server: {
    icon: Server,
    title: 'Server Error',
    message: 'The server encountered an error. Please try again later or contact support if the problem persists.',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  'not-found': {
    icon: FileX,
    title: 'Not Found',
    message: 'The requested resource could not be found. It may have been moved or deleted.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  permission: {
    icon: ShieldAlert,
    title: 'Access Denied',
    message: 'You do not have permission to access this resource. Please contact your administrator.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  timeout: {
    icon: Clock,
    title: 'Request Timeout',
    message: 'The request took too long to complete. Please try again.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  generic: {
    icon: AlertTriangle,
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
};

export const ErrorUI: React.FC<ErrorUIProps> = ({
  title,
  message,
  type = 'generic',
  onRetry,
  onDismiss,
  showRetry = true,
  showDismiss = false,
  className = '',
}) => {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="text-center">
        <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${config.bgColor}`}>
          <Icon className={`h-6 w-6 ${config.color}`} />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title || config.title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {message || config.message}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          {showRetry && onRetry && (
            <Button 
              onClick={onRetry}
              className="w-full"
              variant="default"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {showDismiss && onDismiss && (
            <Button 
              onClick={onDismiss}
              variant="outline"
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Dismiss
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Inline error component for forms and smaller spaces
export const InlineError: React.FC<{
  message: string;
  onDismiss?: () => void;
  className?: string;
}> = ({ message, onDismiss, className = '' }) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 hover:bg-destructive/20"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

// Loading error component
export const LoadingError: React.FC<{
  onRetry?: () => void;
  message?: string;
  className?: string;
}> = ({ onRetry, message = 'Failed to load data', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Loading Error</h3>
      <p className="mb-4 text-gray-600">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  );
};

// Network error component
export const NetworkError: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className = '' }) => {
  return (
    <ErrorUI
      type="network"
      onRetry={onRetry}
      showRetry={!!onRetry}
      className={className}
    />
  );
};

// Server error component
export const ServerError: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className = '' }) => {
  return (
    <ErrorUI
      type="server"
      onRetry={onRetry}
      showRetry={!!onRetry}
      className={className}
    />
  );
};

// Not found error component
export const NotFoundError: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className = '' }) => {
  return (
    <ErrorUI
      type="not-found"
      onRetry={onRetry}
      showRetry={!!onRetry}
      className={className}
    />
  );
};

// Permission error component
export const PermissionError: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className = '' }) => {
  return (
    <ErrorUI
      type="permission"
      onRetry={onRetry}
      showRetry={!!onRetry}
      className={className}
    />
  );
};
