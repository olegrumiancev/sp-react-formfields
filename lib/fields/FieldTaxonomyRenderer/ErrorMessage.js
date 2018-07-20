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
import { Icon } from 'office-ui-fabric-react/lib/Icon';
var FieldErrorMessage = (function (_super) {
    __extends(FieldErrorMessage, _super);
    function FieldErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldErrorMessage.prototype.render = function () {
        if (this.props.errorMessage !== 'undefined' && this.props.errorMessage !== null && this.props.errorMessage !== '') {
            return (React.createElement("div", { "aria-live": 'assertive' },
                React.createElement("p", { className: "ms-TextField-errorMessage " + 'errorMessage' },
                    React.createElement(Icon, { iconName: 'Error', className: "errorIcon" }),
                    React.createElement("span", { "data-automation-id": 'error-message' }, this.props.errorMessage))));
        }
        else {
            return null;
        }
    };
    return FieldErrorMessage;
}(React.Component));
export default FieldErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map