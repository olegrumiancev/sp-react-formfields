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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { BaseFieldRenderer } from './BaseFieldRenderer';
var FieldBooleanRenderer = (function (_super) {
    __extends(FieldBooleanRenderer, _super);
    function FieldBooleanRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = __assign({}, _this.state, { currentValue: props.FormFieldValue });
        return _this;
    }
    FieldBooleanRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldBooleanRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldBooleanRenderer.prototype.renderDispForm = function () {
        if (this.props.FormFieldValue) {
            return React.createElement(Icon, { iconName: 'CheckboxComposite' });
        }
        else {
            return React.createElement(Icon, { iconName: 'Checkbox' });
        }
    };
    FieldBooleanRenderer.prototype.renderNewOrEditForm = function () {
        var _this = this;
        return (React.createElement(Toggle, { onChanged: function (newValue) {
                _this.setState({ currentValue: newValue });
                _this.trySetChangedValue(newValue);
            }, checked: this.state.currentValue }));
    };
    return FieldBooleanRenderer;
}(BaseFieldRenderer));
export { FieldBooleanRenderer };
//# sourceMappingURL=FieldBooleanRenderer.js.map