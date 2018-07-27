// @flow
/* eslint-disable no-undef */

import * as React from 'react';

const EnhancedProvider = (
  setProvider,
  Provider,
  initialState
) =>
  class EnhancedProvider extends React.Component<any, any> {
    constructor(props) {
      super(props);
      this.state = props.initialState || initialState;
      setProvider(this);
    }

    render() {
      return <Provider value={this.state}>{this.props.children}</Provider>;
    }
  };

export default EnhancedProvider;
