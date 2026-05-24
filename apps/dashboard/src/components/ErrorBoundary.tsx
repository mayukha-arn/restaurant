/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the component tree and displays a fallback UI.
 * Useful for catching errors from React Query and other async operations.
 */

import React, { ReactNode, Component, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-box">
            <h1 className="error-boundary-title">Oops! Something went wrong</h1>
            <p className="error-boundary-message">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button className="error-boundary-button" onClick={this.resetError}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
