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
require('core-js/shim');
import * as React from 'react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { FormMode } from './interfaces';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { FormHeader } from './FormHeader';
import { FormField } from './fields/FormField';
import { FormFieldsStore } from './store';
var ListForm = (function (_super) {
    __extends(ListForm, _super);
    function ListForm(props) {
        var _this = _super.call(this, props) || this;
        _this.localContext = SP.ClientContext.get_current();
        initializeIcons();
        _this.state = __assign({}, props);
        return _this;
    }
    ListForm.prototype.render = function () {
        var _this = this;
        var ListFormStateless = FormFieldsStore.connect(function (state) {
            var enhancedState = __assign({}, state, { children: _this.props.children, getButtonsByFormMode: _this.getButtonsByFormMode });
            return enhancedState;
        })(ListFormInternal);
        return (React.createElement("div", { className: 'formContainer' },
            React.createElement(FormFieldsStore.Provider, null,
                React.createElement(ListFormStateless, null))));
    };
    ListForm.prototype.componentDidMount = function () {
        FormFieldsStore.actions.initStore(this.state.SpWebUrl, this.state.CurrentListId, this.state.CurrentMode, this.state.CurrentItemId);
    };
    ListForm.prototype.getButtonsByFormMode = function (mode) {
        var commandBarItemSave = {
            className: 'ms-bgColor-neutral',
            key: 'save',
            name: 'Save',
            iconProps: {
                iconName: 'Save'
            },
            onClick: function (ev) {
                ev.preventDefault();
                var isValid = FormFieldsStore.actions.validateForm();
                if (isValid) {
                    FormFieldsStore.actions.saveFormData().then(function (res) {
                        if (res.IsSuccessful) {
                            FormFieldsStore.actions.setFormMode(FormMode.Display);
                        }
                        else {
                            FormFieldsStore.actions.setFormMessage(res.Error ? res.Error.toString() : 'Error has occurred while saving, reload the page and try again', function () {
                            });
                        }
                    });
                }
                else {
                    FormFieldsStore.actions.setShowValidationErrors(true);
                }
            }
        };
        var commandBarItemEdit = {
            className: 'ms-bgColor-neutral',
            key: 'edit',
            name: 'Edit',
            iconProps: {
                iconName: 'Edit'
            },
            onClick: function (ev) {
                ev.preventDefault();
                FormFieldsStore.actions.setFormMode(FormMode.Edit);
            }
        };
        return mode === FormMode.Display ? [commandBarItemEdit] : [commandBarItemSave];
    };
    return ListForm;
}(React.Component));
export { ListForm };
export var ListFormInternal = function (props) {
    return React.createElement("div", null,
        React.createElement(FormHeader, { CurrentMode: props.CurrentMode, Fields: props.Fields }),
        props.IsLoading ?
            React.createElement("div", { className: 'formContainer', style: { padding: '5em' } },
                React.createElement(Spinner, { title: 'Loading...' })) :
            React.createElement(React.Fragment, null,
                React.createElement(CommandBar, { isSearchBoxVisible: false, key: 'commandBar', items: props.getButtonsByFormMode(props.CurrentMode), farItems: [
                        {
                            className: 'ms-bgColor-neutral',
                            key: 'close',
                            name: 'Close',
                            iconProps: {
                                iconName: 'RemoveFilter'
                            },
                            onClick: function (ev) {
                                ev.preventDefault();
                                if (props.closeForm) {
                                    props.closeForm();
                                }
                                else {
                                    window.location.href = props.CurrentListDefaultViewUrl;
                                }
                            }
                        }
                    ] }),
                props.children ? props.children : props.Fields.map(function (f) { return (React.createElement("div", { className: 'formRow', key: "formRow_" + f.InternalName },
                    React.createElement("div", { className: 'rowLabel', key: "formLabelContainer_" + f.InternalName },
                        React.createElement(Label, { key: "label_" + f.InternalName },
                            f.Title,
                            f.IsRequired ? React.createElement("span", { key: "label_required_" + f.InternalName, style: { color: 'red' } }, " *") : null)),
                    React.createElement("div", { className: 'rowField', key: "formFieldContainer_" + f.InternalName },
                        React.createElement(FormField, { key: "formfield_" + f.InternalName, InternalName: f.InternalName, FormMode: f.CurrentMode })))); })));
};
//# sourceMappingURL=ListForm.js.map