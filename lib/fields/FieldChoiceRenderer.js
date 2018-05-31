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
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';
var FieldChoiceRenderer = (function (_super) {
    __extends(FieldChoiceRenderer, _super);
    function FieldChoiceRenderer(props) {
        var _this = _super.call(this, props) || this;
        var vals = [];
        if (_this.props.FormFieldValue != null) {
            if (_this.props.IsMulti) {
                vals = _this.props.FormFieldValue.results;
            }
            else {
                vals.push(_this.props.FormFieldValue);
            }
        }
        _this.state = __assign({}, _this.state, { currentValue: vals });
        return _this;
    }
    FieldChoiceRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldChoiceRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldChoiceRenderer.prototype.renderDispForm = function () {
        var _this = this;
        if (this.props.IsMulti && this.props.FormFieldValue != null) {
            return (this.props.FormFieldValue.results.map(function (fv, i) { return React.createElement(Label, { key: _this.props.InternalName + "_" + i }, fv); }));
        }
        return (React.createElement(Label, null, this.props.FormFieldValue));
    };
    FieldChoiceRenderer.prototype.renderNewOrEditForm = function () {
        var _this = this;
        return (React.createElement(Dropdown, { key: "dropdown_" + this.props.InternalName, multiSelect: this.props.IsMulti, onChanged: function (newValue) { return _this.saveFieldDataInternal(newValue); }, options: this.props.Choices.map(function (c) { return ({ key: c, text: c, selected: _this.state.currentValue.includes(c) }); }), placeHolder: this.props.IsMulti ? 'Select options' : 'Select an option' }));
    };
    FieldChoiceRenderer.prototype.saveFieldDataInternal = function (newValue) {
        var _this = this;
        if (this.props.IsMulti) {
            this.setState({ currentValue: this.constructNewState(newValue.key, newValue.selected) }, function () {
                _this.trySetChangedValue({ results: _this.state.currentValue });
            });
        }
        else {
            this.setState({ currentValue: [newValue.key] }, function () {
                _this.trySetChangedValue(_this.state.currentValue.length > 0 ? _this.state.currentValue[0] : undefined);
            });
        }
    };
    FieldChoiceRenderer.prototype.constructNewState = function (value, toAdd) {
        var result = this.state.currentValue;
        if (toAdd) {
            var filtered = this.state.currentValue.filter(function (i) { return i === value; });
            if (!this.state.currentValue.includes(value)) {
                result = [value].concat(this.state.currentValue);
            }
        }
        else {
            result = [];
            for (var _i = 0, _a = this.state.currentValue; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i !== value) {
                    result.push(i);
                }
            }
        }
        return result;
    };
    return FieldChoiceRenderer;
}(BaseFieldRenderer));
export { FieldChoiceRenderer };
//# sourceMappingURL=FieldChoiceRenderer.js.map