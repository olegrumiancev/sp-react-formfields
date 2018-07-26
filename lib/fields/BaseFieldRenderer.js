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
import { ValidationManager } from '../managers/ValidationManager';
var BaseFieldRenderer = (function (_super) {
    __extends(BaseFieldRenderer, _super);
    function BaseFieldRenderer(props) {
        var _this = _super.call(this, props) || this;
        var initialState = {
            valueForSaving: null,
            isValid: false,
            validationErrors: [],
            validators: []
        };
        FormFieldsStore.actions.clearValidatorsFromField(props.InternalName);
        if (props.IsRequired) {
            FormFieldsStore.actions.addValidatorToField(ValidationManager.defaultValidators.required, props.InternalName);
        }
        _this.state = initialState;
        return _this;
    }
    BaseFieldRenderer.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement(ErrorBoundary, null,
                this.props.CurrentMode === FormMode.New ? this.renderNewForm(this.props) : null,
                this.props.CurrentMode === FormMode.Edit ? this.renderEditForm(this.props) : null,
                this.props.CurrentMode === FormMode.Display ? this.renderDispForm(this.props) : null),
            this.props.ShowValidationErrors && !this.props.IsValid ? this.renderValidationErrors(this.props.ValidationErrors) : null));
    };
    BaseFieldRenderer.prototype.setFieldMode = function (mode) {
        this.setState({ currentMode: mode }, function () {
            FormFieldsStore.actions.setFormMode(mode);
        });
    };
    BaseFieldRenderer.prototype.validate = function () {
        FormFieldsStore.actions.validateForm();
        var validatedProps = ValidationManager.validateField(this.props);
        this.setState({
            isValid: validatedProps.IsValid,
            validationErrors: validatedProps.ValidationErrors
        });
        return validatedProps.IsValid;
    };
    BaseFieldRenderer.prototype.getValue = function () {
        return this.state.valueForSaving;
    };
    BaseFieldRenderer.prototype.renderNewForm = function (props) {
        return (React.createElement("div", null,
            "Not implemented, field type: ",
            props.Type,
            ", form mode: new"));
    };
    BaseFieldRenderer.prototype.renderEditForm = function (props) {
        return (React.createElement("div", null,
            "Not implemented, field type: ",
            props.Type,
            ", form mode: edit"));
    };
    BaseFieldRenderer.prototype.renderDispForm = function (props) {
        return (React.createElement("div", null,
            "Not implemented, field type: ",
            props.Type,
            ", form mode: disp"));
    };
    BaseFieldRenderer.prototype.renderValidationErrors = function (validationErrors) {
        if (!validationErrors) {
            return null;
        }
        var errorStyle = {
            color: 'red'
        };
        return (React.createElement(React.Fragment, null, validationErrors.map(function (err, i) { return React.createElement("div", { key: "err_" + i, style: errorStyle }, err); })));
    };
    BaseFieldRenderer.prototype.trySetChangedValue = function (newValue) {
        var _this = this;
        if (this.props != null && this.props.saveChangedFieldData != null) {
            this.props.saveChangedFieldData(this.props.InternalName, newValue);
        }
        FormFieldsStore.actions.setFieldData(this.props.InternalName, newValue);
        this.setState({ valueForSaving: newValue }, function () {
            _this.validate();
        });
    };
    return BaseFieldRenderer;
}(React.Component));
export { BaseFieldRenderer };
//# sourceMappingURL=BaseFieldRenderer.js.map