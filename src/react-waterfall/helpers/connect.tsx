// @flow
/* eslint-disable no-undef */

import * as React from 'react';
import Prevent from '../Components/Prevent';

const connect = Consumer => mapStateToProps => WrappedComponent => {
  const renderComponent = props => <WrappedComponent {...props} />;
  const ConnectedComponent = props => (
    <Consumer>
      {state => {
        const filteredState = mapStateToProps(state || {});
        return (
          <Prevent
            renderComponent={renderComponent}
            {...props}
            {...filteredState}
          />
        );
      }}
    </Consumer>
  );

  ConnectedComponent['displayName'] = `Connect(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Unknown'})`;

  return ConnectedComponent;
};

export default connect;
