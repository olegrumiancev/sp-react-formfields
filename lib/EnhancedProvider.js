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
import { FormFieldsStore } from './store';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { unescapeHTML } from './utils';
import { ResponsiveMode } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';
require('./fields/styles.css');
export var enhanceProvider = function (InitialProviderComponent) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            return _super.call(this, props) || this;
        }
        class_1.prototype.render = function () {
            var ConnectedDialogComponent = FormFieldsStore.connect(function (state) { return state; })(DialogComponent);
            return (React.createElement(InitialProviderComponent, __assign({}, this.props),
                React.createElement(ConnectedDialogComponent, null),
                this.props.children));
        };
        return class_1;
    }(React.Component));
};
var DialogComponent = function (state) {
    if (!state || !state.GlobalMessage) {
        return null;
    }
    return (React.createElement(Dialog, { hidden: false, onDismiss: function () { return FormFieldsStore.actions.setFormMessage(null, null); }, dialogContentProps: {
            type: DialogType.normal,
            isMultiline: true,
            responsiveMode: ResponsiveMode.large,
            title: 'Message',
            subText: state && state.GlobalMessage ? unescapeHTML(state.GlobalMessage.Text) : ''
        }, modalProps: {
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
        } },
        React.createElement(DialogFooter, null,
            React.createElement(PrimaryButton, { onClick: function () {
                    if (state.GlobalMessage.DialogCallback) {
                        state.GlobalMessage.DialogCallback(state);
                    }
                    FormFieldsStore.actions.setFormMessage(null, null);
                }, text: 'OK' }))));
};
//# sourceMappingURL=EnhancedProvider.js.map