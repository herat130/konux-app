import React from 'react';
import ErrorPage from './ErrorPage';

/**
 * In case of any ui error / Exception on each component
 * the app will not break,Instead it will show this Error Page
 */

interface IErrorBoundaryState {
  error: boolean;
}

export default class ErrorBoundary extends React.Component<any, IErrorBoundaryState> {

  state = {
    error: false,
  };


  componentDidCatch(error: any, info: any) {
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
