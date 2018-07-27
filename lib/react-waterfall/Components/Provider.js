var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
var EnhancedProvider = function (setProvider, Provider, initialState) {
    return (function (_super) {
        __extends(EnhancedProvider, _super);
        function EnhancedProvider(props) {
            var _this = _super.call(this, props) || this;
            _this.state = props.initialState || initialState;
            setProvider(_this);
            return _this;
        }
        EnhancedProvider.prototype.render = function () {
            return React.createElement(Provider, { value: this.state }, this.props.children);
        };
        return EnhancedProvider;
    }(React.Component));
};
export default EnhancedProvider;
//# sourceMappingURL=Provider.js.map