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
import { FormMode } from '../interfaces';
import { FormFieldsStore } from '../store';
import ErrorBoundary from '../ErrorBoundary';
var BaseFieldRenderer = (function (_super) {
    __extends(BaseFieldRenderer, _super);
    function BaseFieldRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            valueForSaving: null
        };
        return _this;
    }
    BaseFieldRenderer.prototype.render = function () {
        return (React.createElement(ErrorBoundary, null,
            this.props.CurrentMode === FormMode.New ? this.renderNewForm() : null,
            this.props.CurrentMode === FormMode.Edit ? this.renderEditForm() : null,
            this.props.CurrentMode === FormMode.Display ? this.renderDispForm() : null));
    };
    BaseFieldRenderer.prototype.setFieldMode = function (mode) {
        var _this = this;
        console.log("set field mode for " + this.props.InternalName + ", mode from " + this.state.currentMode + " to " + mode);
        console.log(this);
        this.setState({ currentMode: mode }, function () {
            console.log(_this);
        });
    };
    BaseFieldRenderer.prototype.isValid = function () {
        return true;
    };
    BaseFieldRenderer.prototype.getValue = function () {
        return this.state.valueForSaving;
    };
    BaseFieldRenderer.prototype.renderNewForm = function () {
        return (React.createElement("div", null,
            "+ Not implemented, field type: ",
            this.props.Type,
            ", form mode: new"));
    };
    BaseFieldRenderer.prototype.renderEditForm = function () {
        return (React.createElement("div", null,
            "+ Not implemented, field type: ",
            this.props.Type,
            ", form mode: edit"));
    };
    BaseFieldRenderer.prototype.renderDispForm = function () {
        return (React.createElement("div", null,
            "++ Not implemented, field type: ",
            this.props.Type,
            ", form mode: disp"));
    };
    BaseFieldRenderer.prototype.trySetChangedValue = function (newValue) {
        if (this.props != null && this.props.saveChangedFieldData != null) {
            this.props.saveChangedFieldData(this.props.InternalName, newValue);
        }
        this.setState({ valueForSaving: newValue });
        FormFieldsStore.actions.setFieldData(this.props.InternalName, newValue);
    };
    return BaseFieldRenderer;
}(React.Component));
export { BaseFieldRenderer };
//# sourceMappingURL=BaseFieldRenderer.js.map