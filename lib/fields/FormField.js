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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { FormFieldsStore } from '../store';
import { getFieldPropsByInternalName } from '../utils';
var FormField = (function (_super) {
    __extends(FormField, _super);
    function FormField(props) {
        var _this = _super.call(this, props) || this;
        _this.loadFieldAsync = function (type) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("Loading " + type + " field...");
                this.importComponentNameFromTypeString(type);
                return [2];
            });
        }); };
        _this.renderAsyncField = function (fieldProps) {
            if (!_this.state.loadedField) {
                return React.createElement("div", null, "Loading...");
            }
            return React.createElement(_this.state.loadedField, __assign({}, fieldProps, { key: fieldProps.InternalName, saveChangedFieldData: FormFieldsStore.actions.setFieldData }));
        };
        _this.registerLoadedField = function (field) {
            _this.setState({
                loadedField: field
            });
        };
        _this.catchLoadedFieldError = function (error, type) {
            console.error("\"" + type + "\" not yet supported, inner msg: " + error);
        };
        _this.state = {
            loadedField: null
        };
        return _this;
    }
    FormField.prototype.render = function () {
        var _this = this;
        var ConnectedFormField = FormFieldsStore.connect(function (state) { return getFieldPropsByInternalName(state.Fields, _this.props.InternalName); })(this.renderAsyncField);
        return React.createElement(ConnectedFormField, null);
    };
    FormField.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentFieldProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentFieldProps = getFieldPropsByInternalName(FormFieldsStore.actions.getState().Fields, this.props.InternalName);
                        return [4, this.loadFieldAsync(currentFieldProps.Type)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    FormField.prototype.importComponentNameFromTypeString = function (type) {
        var _this = this;
        if (type === 'Text') {
            import('./FieldTextRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldTextRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type.match(/choice/gi)) {
            import('./FieldChoiceRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldChoiceRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type.match(/lookup/gi)) {
            import('./FieldLookupRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldLookupRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type === 'Note') {
            import('./FieldMultilineTextRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldMultilineTextRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type === 'Boolean') {
            import('./FieldBooleanRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldBooleanRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type === 'Number') {
            import('./FieldNumberRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldNumberRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type === 'Currency') {
            import('./FieldCurrencyRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldCurrencyRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type === 'URL') {
            import('./FieldUrlRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldUrlRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type === 'DateTime') {
            import('./FieldDateTimeRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldDateTimeRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type.match(/user/gi)) {
            import('./FieldUserRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldUserRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type.match(/TaxonomyFieldType/gi)) {
            import('./FieldTaxonomyRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldTaxonomyRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else if (type.match(/attachments/gi)) {
            import('./FieldAttachmentRenderer')
                .then(function (module) { return _this.registerLoadedField(module.FieldAttachmentRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
        else {
            import('./BaseFieldRenderer')
                .then(function (module) { return _this.registerLoadedField(module.BaseFieldRenderer); }).catch(function (e) { return _this.catchLoadedFieldError(e, type); });
        }
    };
    return FormField;
}(React.Component));
export { FormField };
//# sourceMappingURL=FormField.js.map