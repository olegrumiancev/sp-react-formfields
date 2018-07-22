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
var _this = this;
import { FormMode } from '../interfaces';
import { sp } from '@pnp/sp';
export var FieldPropsManager = {
    createFieldRendererPropsFromFieldMetadata: function (fieldMetadata, formMode, currentListId, spListItem, spRest) { return __awaiter(_this, void 0, void 0, function () {
        var fieldProps;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (fieldMetadata == null) {
                        return [2, null];
                    }
                    fieldProps = {
                        SchemaXml: new DOMParser().parseFromString(fieldMetadata.SchemaXml, 'text/xml'),
                        CurrentListId: currentListId,
                        CurrentMode: formMode,
                        Title: fieldMetadata.Title,
                        InternalName: fieldMetadata.InternalName,
                        EntityPropertyName: fieldMetadata.EntityPropertyName,
                        IsHidden: fieldMetadata.Hidden,
                        IsRequired: fieldMetadata.Required,
                        IsMulti: fieldMetadata.TypeAsString.match(/multi/gi),
                        Type: fieldMetadata.TypeAsString,
                        Description: fieldMetadata.Description,
                        DefaultValue: fieldMetadata.DefaultValue,
                        pnpSPRest: spRest == null ? sp : spRest,
                        ValidationErrors: [],
                        IsValid: true,
                        Validators: [],
                        ShowValidationErrors: false
                    };
                    if (spListItem != null && spListItem[fieldProps.InternalName] != null && spListItem[fieldProps.InternalName].__deferred == null) {
                        fieldProps.FormFieldValue = spListItem[fieldProps.InternalName];
                    }
                    return [4, addFieldTypeSpecificProperties(fieldProps, fieldMetadata)];
                case 1:
                    fieldProps = _a.sent();
                    return [2, fieldProps];
            }
        });
    }); }
};
var addFieldTypeSpecificProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    var result, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                result = fieldProps;
                _a = fieldProps.Type;
                switch (_a) {
                    case 'Text': return [3, 1];
                    case 'Note': return [3, 3];
                    case 'Choice': return [3, 5];
                    case 'MultiChoice': return [3, 5];
                    case 'Lookup': return [3, 7];
                    case 'LookupMulti': return [3, 7];
                    case 'User': return [3, 9];
                    case 'UserMulti': return [3, 9];
                    case 'Number': return [3, 11];
                    case 'DateTime': return [3, 13];
                    case 'TaxonomyFieldType': return [3, 15];
                    case 'TaxonomyFieldTypeMulti': return [3, 15];
                    case 'Currency': return [3, 17];
                    case 'URL': return [3, 19];
                    case 'Attachments': return [3, 21];
                }
                return [3, 22];
            case 1: return [4, addTextFieldProperties(fieldProps, fieldMetadata)];
            case 2:
                result = _b.sent();
                return [3, 23];
            case 3: return [4, addMultilineTextFieldProperties(fieldProps, fieldMetadata)];
            case 4:
                result = _b.sent();
                return [3, 23];
            case 5: return [4, addChoiceFieldProperties(fieldProps, fieldMetadata)];
            case 6:
                result = _b.sent();
                return [3, 23];
            case 7: return [4, addLookupFieldProperties(fieldProps, fieldMetadata)];
            case 8:
                result = _b.sent();
                return [3, 23];
            case 9: return [4, addUserFieldProperties(fieldProps, fieldMetadata)];
            case 10:
                result = _b.sent();
                return [3, 23];
            case 11: return [4, addNumberFieldProperties(fieldProps, fieldMetadata)];
            case 12:
                result = _b.sent();
                return [3, 23];
            case 13: return [4, addDateTimeFieldProperties(fieldProps, fieldMetadata)];
            case 14:
                result = _b.sent();
                return [3, 23];
            case 15: return [4, addTaxonomyFieldProperties(fieldProps, fieldMetadata)];
            case 16:
                result = _b.sent();
                return [3, 23];
            case 17: return [4, addCurrencyFieldProperties(fieldProps, fieldMetadata)];
            case 18:
                result = _b.sent();
                return [3, 23];
            case 19: return [4, addUrlFieldProperties(fieldProps, fieldMetadata)];
            case 20:
                result = _b.sent();
                return [3, 23];
            case 21: return [3, 23];
            case 22: return [3, 23];
            case 23: return [2, result];
        }
    });
}); };
var addUrlFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fieldProps.UrlRenderAsPicture = fieldMetadata.DisplayFormat === 1;
        return [2, fieldProps];
    });
}); };
var addCurrencyFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fieldProps.CurrencyLocaleId = fieldMetadata.CurrencyLocaleId;
        if (fieldProps.CurrentMode === FormMode.New && fieldProps.DefaultValue) {
            fieldProps.FormFieldValue = fieldProps.DefaultValue;
        }
        if (fieldMetadata.MaximumValue) {
            fieldProps.Max = fieldMetadata.MaximumValue;
        }
        if (fieldMetadata.MinimumValue) {
            fieldProps.Min = fieldMetadata.MinimumValue;
        }
        return [2, fieldProps];
    });
}); };
var addTaxonomyFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    var relatedNoteField;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fieldProps.TaxonomyAnchorId = fieldMetadata.AnchorId;
                fieldProps.TaxonomyIsOpen = fieldMetadata.Open;
                fieldProps.TaxonomyTermSetId = fieldMetadata.TermSetId;
                fieldProps.IsMulti = fieldMetadata.AllowMultipleValues;
                if (!fieldMetadata.TextField) return [3, 2];
                return [4, fieldProps.pnpSPRest.web.lists.getById(fieldProps.CurrentListId).fields.getById(fieldMetadata.TextField).usingCaching().get()];
            case 1:
                relatedNoteField = _a.sent();
                fieldProps.TaxonomyUpdateFieldEntityPropertyName = relatedNoteField.EntityPropertyName;
                _a.label = 2;
            case 2: return [2, fieldProps];
        }
    });
}); };
var addUserFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (fieldMetadata.SchemaXml.match(/UserSelectionMode="PeopleAndGroups"/gi)) {
            fieldProps.UserSelectionMode = 'PeopleAndGroups';
        }
        else {
            fieldProps.UserSelectionMode = 'PeopleOnly';
        }
        return [2, fieldProps];
    });
}); };
var addTextFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (fieldProps.CurrentMode === FormMode.New && fieldProps.DefaultValue) {
            fieldProps.FormFieldValue = fieldProps.DefaultValue;
        }
        if (fieldMetadata.MaxLength) {
            fieldProps.Max = fieldMetadata.MaxLength;
        }
        return [2, fieldProps];
    });
}); };
var addMultilineTextFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fieldProps.IsRichText = fieldMetadata.RichText;
        return [2, fieldProps];
    });
}); };
var addDateTimeFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    var date;
    return __generator(this, function (_a) {
        fieldProps.DateTimeIsTimePresent = fieldMetadata.DisplayFormat === 1;
        if (fieldProps.CurrentMode === FormMode.New && fieldProps.DefaultValue) {
            if (fieldProps.DefaultValue.toLowerCase() === '[today]') {
                date = new Date(Date.now());
                date.setHours(0);
                date.setMinutes(0);
                date.setHours(0);
                date.setMilliseconds(0);
                fieldProps.FormFieldValue = date.toISOString();
            }
            else if (fieldProps.DefaultValue.toLowerCase() === '[now]') {
                fieldProps.FormFieldValue = new Date(Date.now()).toISOString();
            }
        }
        return [2, fieldProps];
    });
}); };
var addNumberFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fieldProps.NumberIsPercent = fieldMetadata.SchemaXml.match(/percentage="true"/gi) !== null;
        if (fieldProps.CurrentMode === FormMode.New && fieldProps.DefaultValue) {
            fieldProps.FormFieldValue = fieldProps.DefaultValue;
        }
        if (fieldMetadata.MaximumValue) {
            fieldProps.Max = fieldMetadata.MaximumValue;
        }
        if (fieldMetadata.MinimumValue) {
            fieldProps.Min = fieldMetadata.MinimumValue;
        }
        return [2, fieldProps];
    });
}); };
var addChoiceFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fieldProps.Choices = fieldMetadata.Choices == null ? undefined : fieldMetadata.Choices.results;
        if (fieldProps.CurrentMode === FormMode.New && fieldProps.DefaultValue) {
            if (fieldProps.IsMulti) {
                fieldProps.FormFieldValue = { results: [fieldProps.DefaultValue] };
            }
            else {
                fieldProps.FormFieldValue = fieldProps.DefaultValue;
            }
        }
        fieldProps.FillInChoice = fieldMetadata.FillInChoice;
        return [2, fieldProps];
    });
}); };
var addLookupFieldProperties = function (fieldProps, fieldMetadata) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fieldProps.LookupListId = fieldMetadata.LookupList == null ? undefined : fieldMetadata.LookupList,
            fieldProps.LookupWebId = fieldMetadata.LookupWebId == null ? undefined : fieldMetadata.LookupWebId,
            fieldProps.LookupField = fieldMetadata.LookupField == null || fieldMetadata.LookupField === '' ? 'Title' : fieldMetadata.LookupField;
        return [2, fieldProps];
    });
}); };
//# sourceMappingURL=FieldPropsManager.js.map