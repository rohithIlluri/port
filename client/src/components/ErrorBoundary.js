import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white p-6 border border-red-200 rounded-none shadow-minimal text-center">
          <div className="text-red-500 text-sm mb-2">⚠️ Something went wrong</div>
          <p className="text-black/70 text-xs mb-4">
            {this.state.error && this.state.error.toString()}
          </p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="px-4 py-2 text-xs bg-black text-black rounded-none hover:bg-black/80 transition-colors focus:ring-2 focus:ring-black/20 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;