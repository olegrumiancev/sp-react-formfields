var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import Prevent from '../Components/Prevent';
var connect = function (Consumer) { return function (mapStateToProps) { return function (WrappedComponent) {
    var renderComponent = function (props) { return React.createElement(WrappedComponent, __assign({}, props)); };
    var ConnectedComponent = function (props) { return (React.createElement(Consumer, null, function (state) {
        var filteredState = mapStateToProps(state || {});
        return (React.createElement(Prevent, __assign({ renderComponent: renderComponent }, props, filteredState)));
    })); };
    ConnectedComponent['displayName'] = "Connect(" + (WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Unknown') + ")";
    return ConnectedComponent;
}; }; };
export default connect;
//# sourceMappingURL=connect.js.map