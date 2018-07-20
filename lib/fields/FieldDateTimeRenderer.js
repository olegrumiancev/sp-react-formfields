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
import 'rc-time-picker/assets/index.css';
import * as React from 'react';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import * as moment from 'moment';
import TimePicker from 'rc-time-picker';
import './FieldDateTimeRenderer.css';
var FieldDateTimeRenderer = (function (_super) {
    __extends(FieldDateTimeRenderer, _super);
    function FieldDateTimeRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.timeFormat = 'HH:mm';
        _this.getStateObjectFromISO = function (isoDate) {
            if (isoDate) {
                var fullDateTime = new Date(Date.parse(isoDate));
                var datePart = null;
                var timePart = null;
                timePart = moment(isoDate);
                fullDateTime.setHours(0);
                fullDateTime.setMinutes(0);
                datePart = fullDateTime;
                return {
                    currentDateValue: datePart,
                    currentTimeValue: timePart
                };
            }
            return null;
        };
        _this.onDateChange = function (newValue) {
            _this.setState({ currentDateValue: newValue }, function () {
                _this.trySetChangedValue(_this.getCompositeDateForSaving());
            });
        };
        _this.onTimeChange = function (newValue) {
            var val = newValue ? moment(newValue.toISOString()) : null;
            _this.setState({ currentTimeValue: val }, function () {
                _this.trySetChangedValue(_this.getCompositeDateForSaving());
            });
        };
        _this.getCompositeDateForSaving = function () {
            var baseDate = _this.state.currentDateValue;
            if (!baseDate) {
                baseDate = new Date(Date.now());
            }
            if (_this.props.DateTimeIsTimePresent && _this.state.currentTimeValue) {
                var m = _this.state.currentTimeValue;
                baseDate.setHours(m.hours());
                baseDate.setMinutes(m.minutes());
            }
            else {
                baseDate.setHours(0);
                baseDate.setMinutes(0);
            }
            baseDate.setSeconds(0);
            baseDate.setMilliseconds(0);
            return baseDate.toISOString();
        };
        var stateObj = _this.getStateObjectFromISO(props.FormFieldValue);
        if (stateObj) {
            _this.state = __assign({}, _this.state, stateObj);
        }
        return _this;
    }
    FieldDateTimeRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldDateTimeRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldDateTimeRenderer.prototype.renderDispForm = function () {
        if (this.props.FormFieldValue) {
            var d = new Date(Date.parse(this.props.FormFieldValue));
            var result = d.toLocaleDateString();
            if (this.props.DateTimeIsTimePresent) {
                result += " " + d.toLocaleTimeString();
            }
            return (React.createElement(Label, null, result));
        }
        return null;
    };
    FieldDateTimeRenderer.prototype.renderNewOrEditForm = function () {
        var datePickerStyle = this.props.DateTimeIsTimePresent ?
            { display: 'inline-block' } :
            { width: '100%', display: 'block' };
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { style: datePickerStyle },
                React.createElement(DatePicker, { onSelectDate: this.onDateChange, value: this.state.currentDateValue == null ? null : this.state.currentDateValue })),
            !this.props.DateTimeIsTimePresent ? null :
                (React.createElement("div", { style: { width: '100px', display: 'inline-block' } },
                    React.createElement(TimePicker, { style: { width: '50px', margin: '10px', display: 'inline-block' }, showSecond: false, defaultValue: this.state.currentTimeValue ? this.state.currentTimeValue : moment(), onChange: this.onTimeChange })))));
    };
    return FieldDateTimeRenderer;
}(BaseFieldRenderer));
export { FieldDateTimeRenderer };
//# sourceMappingURL=FieldDateTimeRenderer.js.map