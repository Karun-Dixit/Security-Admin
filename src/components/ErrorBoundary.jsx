import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error if needed
    if (window && window.console) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error && this.state.error.response && this.state.error.response.status === 403) {
        return (
          <div className="p-8 text-center text-red-600">
            <h2 className="text-2xl font-bold mb-4">Session Expired or CSRF Error</h2>
            <p>Please refresh the page or re-login to continue.</p>
          </div>
        );
      }
      return (
        <div className="p-8 text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <p>{this.state.error?.message || 'An unexpected error occurred.'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
