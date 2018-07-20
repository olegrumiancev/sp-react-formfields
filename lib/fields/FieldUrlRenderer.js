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
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import './FieldUrlRenderer.css';
import { FormFieldsStore } from '../store';
import { getFieldPropsByInternalName } from '../utils';
var FieldUrlRenderer = (function (_super) {
    __extends(FieldUrlRenderer, _super);
    function FieldUrlRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.getSplitValues = function (val) {
            if (val == null || val.indexOf(', ') === -1) {
                return null;
            }
            var splitIndex = val.indexOf(', ');
            var urlPart = val.substring(0, splitIndex);
            var descPart = val.substring(splitIndex + 2);
            return [urlPart, descPart];
        };
        _this.onValueChange = function (newValue, isUrl) {
            if (isUrl) {
                _this.setState({ urlPart: newValue }, function () {
                    if (_this.state.urlPart === null || _this.state.urlPart === '') {
                        _this.trySetChangedValue('');
                    }
                    else {
                        _this.trySetChangedValue(_this.state.urlPart + ", " + (_this.state.descPart ? _this.state.descPart : _this.state.urlPart));
                    }
                });
            }
            else {
                _this.setState({ descPart: newValue }, function () {
                    if (_this.state.urlPart) {
                        _this.trySetChangedValue(_this.state.urlPart + ", " + (_this.state.descPart ? _this.state.descPart : _this.state.urlPart));
                    }
                });
            }
        };
        _this.validateUrlLength = function (internalName) {
            var globalState = FormFieldsStore.actions.getState();
            var fieldProps = getFieldPropsByInternalName(globalState.Fields, internalName);
            if (!fieldProps) {
                return "Could not find a field by internal name '" + internalName + "'";
            }
            if (typeof fieldProps.FormFieldValue !== 'string') {
                return null;
            }
            var val = _this.getSplitValues(fieldProps.FormFieldValue);
            if (!val) {
                return null;
            }
            var urlPart = val[0];
            var descPart = val[1];
            var urlValidityErrorText = fieldProps.Title + " URL is in invalid format";
            var urlVaidity = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
            var urlLengthErrorText = fieldProps.Title + " URL part must not be more than 255 characters";
            var descLengthErrorText = fieldProps.Title + " description part must not be more than 255 characters";
            var combinedError = '';
            if (!urlPart.match(urlVaidity)) {
                combinedError += urlValidityErrorText;
            }
            if (urlPart.length > 255) {
                if (combinedError.length > 0) {
                    combinedError += '. ';
                }
                combinedError += urlLengthErrorText;
            }
            if (descPart.length > 255) {
                if (combinedError.length > 0) {
                    combinedError += '. ';
                }
                combinedError += descLengthErrorText;
            }
            return combinedError.length > 0 ? combinedError : null;
        };
        var urlPart = undefined;
        var descPart = undefined;
        if (props.FormFieldValue) {
            if (typeof props.FormFieldValue === 'string') {
                var vals = _this.getSplitValues(props.FormFieldValue);
                urlPart = vals[0];
                descPart = vals[1];
            }
            else {
                urlPart = props.FormFieldValue.Url;
                descPart = props.FormFieldValue.Description;
            }
        }
        _this.state = __assign({}, _this.state, { urlPart: urlPart,
            descPart: descPart });
        FormFieldsStore.actions.addValidatorToField(_this.validateUrlLength, props.InternalName);
        return _this;
    }
    FieldUrlRenderer.prototype.componentDidMount = function () {
        if (this.state.urlPart !== undefined) {
            this.trySetChangedValue(this.state.urlPart + ", " + this.state.descPart);
        }
        else {
            this.trySetChangedValue('');
        }
    };
    FieldUrlRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldUrlRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldUrlRenderer.prototype.renderDispForm = function () {
        if (this.state.urlPart) {
            if (this.props.UrlRenderAsPicture) {
                return (React.createElement("div", { className: 'url-field-picture' },
                    React.createElement("a", { target: '_blank', href: this.state.urlPart },
                        React.createElement("img", { src: this.state.urlPart, alt: this.state.descPart }))));
            }
            else {
                return React.createElement("a", { target: '_blank', href: this.state.urlPart }, this.state.descPart);
            }
        }
        else {
            return null;
        }
    };
    FieldUrlRenderer.prototype.renderNewOrEditForm = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(TextField, { onChanged: function (newValue) { return _this.onValueChange(newValue, true); }, value: this.state.urlPart == null ? '' : this.state.urlPart, placeholder: "Enter a URL" }),
            React.createElement(TextField, { onChanged: function (newValue) { return _this.onValueChange(newValue, false); }, value: this.state.descPart == null ? '' : this.state.descPart, placeholder: "Enter display text" })));
    };
    return FieldUrlRenderer;
}(BaseFieldRenderer));
export { FieldUrlRenderer };
//# sourceMappingURL=FieldUrlRenderer.js.map