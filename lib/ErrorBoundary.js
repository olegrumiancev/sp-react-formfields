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
var ErrorBoundary = (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hasError: false,
            msg: null
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, info) {
        this.setState({ hasError: true, msg: error });
        console.log(error, info);
    };
    ErrorBoundary.prototype.render = function () {
        if (this.state.hasError) {
            return (React.createElement(React.Fragment, null,
                React.createElement("h1", null, "Something went wrong..."),
                React.createElement("h3", null,
                    "Message: ",
                    this.state.msg.toString())));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map