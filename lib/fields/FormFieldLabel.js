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
import { FormFieldsStore } from '../store';
import { getFieldPropsByInternalName } from '../utils';
import { Label } from 'office-ui-fabric-react/lib/Label';
var FormFieldLabel = (function (_super) {
    __extends(FormFieldLabel, _super);
    function FormFieldLabel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    FormFieldLabel.prototype.render = function () {
        var _this = this;
        var ConnectedFormFieldLabel = FormFieldsStore.connect(function (state) { return getFieldPropsByInternalName(state.Fields, _this.props.InternalName); })(FormFieldLabelInternal);
        return React.createElement(ConnectedFormFieldLabel, null);
    };
    return FormFieldLabel;
}(React.Component));
export { FormFieldLabel };
var FormFieldLabelInternal = function (f) { return (React.createElement(Label, { key: "label_" + f.InternalName },
    f.Title,
    f.IsRequired ? React.createElement("span", { key: "label_required_" + f.InternalName, style: { color: 'red' } }, " *") : null)); };
//# sourceMappingURL=FormFieldLabel.js.map