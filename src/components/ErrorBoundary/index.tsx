import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const MyErrorBoundary = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(...errors) => {
        console.log({ errors });
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default MyErrorBoundary;
