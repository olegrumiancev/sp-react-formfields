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
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import './FieldNumberRenderer.css';
import { FormFieldsStore } from '../store';
import { ValidationManager } from '../managers/ValidationManager';
var FieldNumberRenderer = (function (_super) {
    __extends(FieldNumberRenderer, _super);
    function FieldNumberRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.onChanged = function (newValue) {
            var containsDecimal = false;
            var toSave = newValue;
            if (toSave === '') {
                toSave = null;
            }
            else {
                if (toSave.indexOf('.') !== -1) {
                    containsDecimal = true;
                }
                toSave = parseFloat(toSave);
            }
            if (toSave) {
                if (_this.props.NumberIsPercent) {
                    toSave = toSave / 100;
                }
            }
            _this.setState({
                currentValue: newValue,
                decimalEncountered: containsDecimal
            });
            _this.trySetChangedValue(toSave);
        };
        _this.onKeypress = function (ev) {
            if (ev.key.match(/[0-9]|\./) === null) {
                ev.preventDefault();
            }
            if (ev.key.match(/\./) && _this.state.decimalEncountered) {
                ev.preventDefault();
            }
        };
        var val = props.FormFieldValue;
        if (val && props.NumberIsPercent) {
            val = val * 100;
        }
        _this.state = __assign({}, _this.state, { currentValue: val, decimalEncountered: false });
        if (props.Max) {
            FormFieldsStore.actions.addValidatorToField(ValidationManager.defaultValidators.maxValue, props.InternalName, props.Max);
        }
        if (props.Min) {
            FormFieldsStore.actions.addValidatorToField(ValidationManager.defaultValidators.minValue, props.InternalName, props.Min);
        }
        return _this;
    }
    FieldNumberRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldNumberRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldNumberRenderer.prototype.renderDispForm = function () {
        var percent = this.props.NumberIsPercent ? '%' : '';
        return (React.createElement(Label, null,
            this.state.currentValue,
            percent));
    };
    FieldNumberRenderer.prototype.renderNewOrEditForm = function () {
        if (this.props.NumberIsPercent) {
            return (React.createElement(React.Fragment, null,
                React.createElement(TextField, { onChanged: this.onChanged, onKeyPress: this.onKeypress, value: this.state.currentValue == null ? '' : this.state.currentValue, prefix: '%' })));
        }
        else {
            return (React.createElement(React.Fragment, null,
                React.createElement(TextField, { onChanged: this.onChanged, onKeyPress: this.onKeypress, value: this.state.currentValue == null ? '' : this.state.currentValue })));
        }
    };
    return FieldNumberRenderer;
}(BaseFieldRenderer));
export { FieldNumberRenderer };
//# sourceMappingURL=FieldNumberRenderer.js.map