// import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  const getErrorInfo = () => {
    if (error?.status === 404) {
      return {
        title: 'Page Not Found',
        message: 'The page you are looking for does not exist or has been moved.',
        type: 'not-found' as const,
      };
    }

    if (error?.status === 403) {
      return {
        title: 'Access Denied',
        message: 'You do not have permission to access this page.',
        type: 'permission' as const,
      };
    }

    return {
      title: 'Something went wrong',
      message: error?.message || error?.statusText || 'An unexpected error occurred.',
      type: 'generic' as const,
    };
  };

  const errorInfo = getErrorInfo();

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {errorInfo.title}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {errorInfo.message}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && error && (
            <div className="rounded-md bg-gray-100 p-3">
              <div className="text-sm font-medium text-gray-700 mb-2">Error Details:</div>
              <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Link>
            </Button>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleReload}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Page
              </Button>
              
              <Button 
                onClick={() => window.history.back()}
                variant="outline"
                className="flex-1"
              >
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
