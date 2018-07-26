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
import { FormMode } from './interfaces';
import { Label } from 'office-ui-fabric-react/lib/Label';
var FormHeader = (function (_super) {
    __extends(FormHeader, _super);
    function FormHeader(props) {
        return _super.call(this, props) || this;
    }
    FormHeader.prototype.render = function () {
        if (!this.props.Fields) {
            return null;
        }
        var headerText;
        var titleFieldInfo = this.props.Fields.filter(function (f) { return f.InternalName === 'Title'; });
        if (this.props.CurrentMode === FormMode.New) {
            headerText = 'New item';
        }
        else {
            headerText = "form for " + (titleFieldInfo == null || titleFieldInfo.length < 1 || titleFieldInfo[0].FormFieldValue == null ? '(no title)' : titleFieldInfo[0].FormFieldValue);
            headerText = (this.props.CurrentMode === FormMode.Edit ? 'Edit' : 'Display') + " " + headerText;
        }
        return (React.createElement(Label, { className: 'formHeader' }, headerText));
    };
    return FormHeader;
}(React.Component));
export { FormHeader };
//# sourceMappingURL=FormHeader.js.map