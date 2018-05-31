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
import { FormFieldsStore } from '../store';
import { BaseFieldRenderer, FieldTextRenderer, FieldChoiceRenderer, FieldLookupRenderer, FieldUserRenderer } from './index';
var FormField = (function (_super) {
    __extends(FormField, _super);
    function FormField(props) {
        return _super.call(this, props) || this;
    }
    FormField.prototype.render = function () {
        var _this = this;
        console.log("render in formfield");
        return (React.createElement(FormFieldsStore.Consumer, { mapStateToProps: function (state) { return ({
                Fields: state.Fields,
                IsLoading: state.IsLoading,
                CurrentMode: state.CurrentMode
            }); } }, function (_a) {
            var Fields = _a.Fields, IsLoading = _a.IsLoading, CurrentMode = _a.CurrentMode, actions = _a.actions;
            if (!Fields) {
                return null;
            }
            var fieldInfo = Fields.filter(function (f) { return f.InternalName === _this.props.InternalName; });
            if (!fieldInfo || fieldInfo.length < 1) {
                return null;
            }
            console.log(fieldInfo[0]);
            return (_this.createFieldRenderer(fieldInfo[0], _this.setFieldData));
        }));
    };
    FormField.prototype.componentDidMount = function () {
        var _this = this;
        var fieldInfo = FormFieldsStore.getState().Fields.filter(function (f) { return f.InternalName === _this.props.InternalName; });
        if (fieldInfo && fieldInfo.length > 0) {
            this.setState({ fieldInfo: fieldInfo[0] });
        }
    };
    FormField.prototype.setFieldData = function (internalName, newValue) {
        FormFieldsStore.actions.setFieldData(internalName, newValue);
    };
    FormField.prototype.createFieldRenderer = function (fieldProps, onFieldDataChangeCallback) {
        var defaultElement = null;
        defaultElement = (React.createElement(BaseFieldRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName })));
        if (fieldProps.Type === 'Text') {
            return React.createElement(FieldTextRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, saveChangedFieldData: onFieldDataChangeCallback }));
        }
        if (fieldProps.Type.match(/user/gi)) {
            return React.createElement(FieldUserRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, saveChangedFieldData: onFieldDataChangeCallback }));
        }
        if (fieldProps.Type.match(/choice/gi)) {
            return React.createElement(FieldChoiceRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, saveChangedFieldData: onFieldDataChangeCallback }));
        }
        if (fieldProps.Type.match(/lookup/gi)) {
            return React.createElement(FieldLookupRenderer, __assign({}, fieldProps, { key: fieldProps.InternalName, saveChangedFieldData: onFieldDataChangeCallback }));
        }
        return defaultElement;
    };
    return FormField;
}(React.Component));
export { FormField };
//# sourceMappingURL=FormField.js.map