// @flow
/* eslint-disable no-undef */

import { PureComponent } from 'react';

export default class Prevent extends PureComponent<any, any> {
  render() {
    const { renderComponent, ...rest } = this.props;
    return renderComponent(rest);
  }
}
