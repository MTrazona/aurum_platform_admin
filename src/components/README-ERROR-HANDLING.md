# Error Handling System

This document explains the comprehensive error handling system implemented in the application to replace white screen errors with proper UI feedback.

## Overview

The error handling system consists of several components working together:

1. **Error Boundary** - Catches JavaScript errors and displays fallback UI
2. **Error UI Components** - Reusable error display components
3. **Error Context** - Global error state management
4. **Error Hooks** - Utilities for handling errors in components
5. **Enhanced Error Utilities** - Improved error processing functions

## Components

### 1. ErrorBoundary (`src/components/error-boundary.tsx`)

A React Error Boundary that catches JavaScript errors anywhere in the component tree and displays a fallback UI.

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Features:**
- Catches JavaScript errors
- Displays user-friendly error UI
- Provides retry, go home, and reload options
- Shows error details in development mode
- Custom fallback UI support

### 2. Error UI Components (`src/components/error-ui.tsx`)

Reusable error display components for different error types:

```tsx
import { ErrorUI, NetworkError, ServerError, NotFoundError, PermissionError, InlineError } from '@/components/error-ui';

// Generic error UI
<ErrorUI 
  type="network" 
  message="Custom error message" 
  onRetry={handleRetry} 
/>

// Specific error types
<NetworkError onRetry={handleRetry} />
<ServerError onRetry={handleRetry} />
<NotFoundError onRetry={handleRetry} />
<PermissionError onRetry={handleRetry} />

// Inline error for forms
<InlineError message="Validation error" onDismiss={handleDismiss} />
```

**Error Types:**
- `network` - Connection issues
- `server` - Server-side errors (5xx)
- `not-found` - Resource not found (404)
- `permission` - Access denied (403)
- `timeout` - Request timeout
- `generic` - General errors

### 3. Error Context (`src/context/error-context.tsx`)

Global error state management using React Context:

```tsx
import { useError } from '@/context/error-context';

function MyComponent() {
  const { showError, clearError, showGlobalError } = useError();

  const handleApiCall = async () => {
    try {
      await apiCall();
    } catch (error) {
      showError(error); // Shows global error toast
    }
  };

  const handleCustomError = () => {
    showGlobalError('Custom error message', 'network');
  };
}
```

### 4. Error Hooks (`src/hooks/use-error-handler.ts`)

Custom hooks for error handling:

```tsx
import { useErrorHandler, useApiErrorHandler } from '@/hooks/use-error-handler';

function MyComponent() {
  const { errorState, handleError, clearError, handleAsyncError } = useErrorHandler();
  const { errorState: apiErrorState, handleApiError, clearError: clearApiError } = useApiErrorHandler();

  // Handle async operations
  const result = await handleAsyncError(async () => {
    return await fetchData();
  });

  // Handle API errors specifically
  const handleApiCall = async () => {
    try {
      await apiCall();
    } catch (error) {
      handleApiError(error);
    }
  };
}
```

### 5. Enhanced Error Utilities (`src/utils/handle-error.ts`)

Improved error processing functions:

```tsx
import { handleApiError, isNetworkError, isServerError, getErrorMessage } from '@/utils/handle-error';

try {
  await apiCall();
} catch (error) {
  const apiError = handleApiError(error);
  console.log(apiError.message, apiError.status);
  
  if (isNetworkError(error)) {
    // Handle network error
  }
  
  if (isServerError(error)) {
    // Handle server error
  }
  
  const message = getErrorMessage(error);
}
```

## Usage Examples

### 1. Basic Error Handling in Components

```tsx
import { useError } from '@/context/error-context';
import { InlineError } from '@/components/error-ui';

function LoginForm() {
  const { showError } = useError();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      setError('Login failed');
      showError(error); // Also shows global error toast
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <InlineError message={error} onDismiss={() => setError(null)} />}
      {/* form fields */}
    </form>
  );
}
```

### 2. Page-Level Error Handling

```tsx
import { withErrorBoundary } from '@/components/with-error-boundary';

const MyPage = withErrorBoundary(() => {
  return <div>Page content</div>;
});
```

### 3. API Error Handling

```tsx
import { useApiErrorHandler } from '@/hooks/use-error-handler';

function DataComponent() {
  const { errorState, handleApiError, clearError } = useApiErrorHandler();

  const fetchData = async () => {
    try {
      const data = await api.getData();
      return data;
    } catch (error) {
      handleApiError(error);
      return null;
    }
  };

  if (errorState.hasError) {
    return <ErrorUI type={errorState.errorType} message={errorState.message} onRetry={clearError} />;
  }

  return <div>Data content</div>;
}
```

### 4. Global Error Toast

The global error toast automatically appears when errors are shown via the error context:

```tsx
import { GlobalErrorToast } from '@/components/global-error-toast';

function App() {
  return (
    <ErrorProvider>
      {/* Your app content */}
      <GlobalErrorToast />
    </ErrorProvider>
  );
}
```

## Error Types and HTTP Status Codes

| Error Type | HTTP Status | Description |
|------------|-------------|-------------|
| `network` | - | Network connection issues |
| `server` | 500, 502, 503, 504 | Server-side errors |
| `not-found` | 404 | Resource not found |
| `permission` | 401, 403 | Authentication/authorization errors |
| `timeout` | 408 | Request timeout |
| `generic` | 400, 422, etc. | General client errors |

## Best Practices

1. **Use Error Boundaries** - Wrap major sections of your app with error boundaries
2. **Handle Errors Locally** - Use inline errors for form validation and local state
3. **Use Global Errors** - Use the error context for API errors and critical failures
4. **Provide Retry Options** - Always give users a way to recover from errors
5. **Show Appropriate Messages** - Use specific error types to show relevant messages
6. **Log Errors** - Errors are automatically logged to console in development

## Testing

Use the error test page (`/error-test`) to test different error scenarios:

- Network errors
- Server errors
- Permission errors
- JavaScript errors
- Generic errors

## Migration Guide

To migrate existing error handling:

1. Replace `console.error` with `showError(error)` from error context
2. Replace basic error divs with `InlineError` or `ErrorUI` components
3. Wrap components with `ErrorBoundary` or use `withErrorBoundary` HOC
4. Use `useErrorHandler` or `useApiErrorHandler` hooks for async operations
5. Update error messages to use the enhanced error utilities

This system ensures users never see white screens and always have clear feedback about what went wrong and how to recover.
