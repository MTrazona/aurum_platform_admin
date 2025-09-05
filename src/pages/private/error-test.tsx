import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useError } from '@/context/error-context';
import { NetworkError, ServerError, NotFoundError, PermissionError } from '@/components/error-ui';

// Component that throws an error for testing
const ErrorThrower: React.FC = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error('This is a test error thrown by the ErrorThrower component');
  }

  return (
    <Button onClick={() => setShouldThrow(true)} variant="destructive">
      Throw JavaScript Error
    </Button>
  );
};

export default function ErrorTestPage() {
  const { showError, showGlobalError } = useError();

  const handleNetworkError = () => {
    const error = new Error('Network Error');
    (error as any).code = 'NETWORK_ERROR';
    showError(error);
  };

  const handleServerError = () => {
    const error = new Error('Internal Server Error');
    (error as any).response = { status: 500 };
    showError(error);
  };

  const handleNotFoundError = () => {
    const error = new Error('Not Found');
    (error as any).response = { status: 404 };
    showError(error);
  };

  const handlePermissionError = () => {
    const error = new Error('Forbidden');
    (error as any).response = { status: 403 };
    showError(error);
  };

  const handleTimeoutError = () => {
    const error = new Error('Request timeout');
    (error as any).response = { status: 408 };
    showError(error);
  };

  const handleGenericError = () => {
    showGlobalError('This is a generic error message', 'generic');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Error Handling Test Page</h1>
        <p className="text-gray-600">
          This page demonstrates the error handling system. Click the buttons below to test different error scenarios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Network Errors</CardTitle>
            <CardDescription>Test network-related error handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleNetworkError} variant="outline" className="w-full">
              Simulate Network Error
            </Button>
            <Button onClick={handleTimeoutError} variant="outline" className="w-full">
              Simulate Timeout Error
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server Errors</CardTitle>
            <CardDescription>Test server-side error handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleServerError} variant="outline" className="w-full">
              Simulate Server Error (500)
            </Button>
            <Button onClick={handleNotFoundError} variant="outline" className="w-full">
              Simulate Not Found (404)
            </Button>
            <Button onClick={handlePermissionError} variant="outline" className="w-full">
              Simulate Permission Error (403)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generic Errors</CardTitle>
            <CardDescription>Test general error handling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={handleGenericError} variant="outline" className="w-full">
              Simulate Generic Error
            </Button>
            <ErrorThrower />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Error UI Components</CardTitle>
            <CardDescription>Preview different error UI components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <NetworkError onRetry={() => console.log('Retry clicked')} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Server Error UI</CardTitle>
            <CardDescription>Preview server error component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ServerError onRetry={() => console.log('Retry clicked')} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Not Found Error UI</CardTitle>
            <CardDescription>Preview not found error component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <NotFoundError onRetry={() => console.log('Retry clicked')} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permission Error UI</CardTitle>
            <CardDescription>Preview permission error component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <PermissionError onRetry={() => console.log('Retry clicked')} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
