import React, { Component, ErrorInfo } from 'react';
import MainAppError from './Modal/MainAppError';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true, error });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <MainAppError resetError={this.resetError} msg={this.state.error ? this.state.error.message : ''}/>
      )
    }

    return this.props.children;
  };
};

export default ErrorBoundary;
