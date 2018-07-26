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
var _this = this;
import { sp } from '@pnp/sp';
import createStore from 'react-waterfall';
import { FormMode } from './interfaces';
import { getFieldPropsByInternalName } from './utils';
import { FieldPropsManager } from './managers/FieldPropsManager';
import { ValidationManager } from './managers/ValidationManager';
import { enhanceProvider } from './EnhancedProvider';
var exposedState = null;
var configurePnp = function (webUrl) {
    sp.setup({
        sp: {
            headers: {
                Accept: 'application/json;odata=verbose'
            },
            baseUrl: webUrl
        }
    });
};
var storeConfig = {
    initialState: {
        SPWebUrl: null,
        CurrentMode: 0,
        CurrentListId: null,
        IsLoading: true
    },
    actionsCreators: {
        initStore: function (state, actions, sPWebUrl, currentListId, currentMode, currentItemId) { return __awaiter(_this, void 0, void 0, function () {
            var _a, list, listData, listFields, toSelect, toExpand, _i, listFields_1, f, fieldInfos, eTag, itemMetadata, item, attachmentMetadata, _b, listFields_2, fm, _c, _d, _e, listFields_3, fm, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        configurePnp(sPWebUrl);
                        list = sp.web.lists.getById(currentListId);
                        return [4, list.select('DefaultViewUrl').get()];
                    case 1:
                        listData = _h.sent();
                        return [4, list
                                .fields
                                .filter('ReadOnlyField eq false and Hidden eq false and Title ne \'Content Type\'').get()];
                    case 2:
                        listFields = _h.sent();
                        toSelect = [];
                        toExpand = [];
                        for (_i = 0, listFields_1 = listFields; _i < listFields_1.length; _i++) {
                            f = listFields_1[_i];
                            if (f.TypeAsString.match(/user/gi)) {
                                toSelect.push(f.EntityPropertyName + "/Title");
                                toSelect.push(f.EntityPropertyName + "/Id");
                                toExpand.push(f.EntityPropertyName);
                            }
                            else if (f.TypeAsString.match(/lookup/gi)) {
                                toSelect.push(f.EntityPropertyName + "/Title");
                                toSelect.push(f.EntityPropertyName + "/Id");
                                if (f.LookupField) {
                                    toSelect.push(f.EntityPropertyName + "/" + f.LookupField);
                                }
                                toExpand.push(f.EntityPropertyName);
                            }
                            else {
                                toSelect.push(f.EntityPropertyName);
                            }
                        }
                        fieldInfos = [];
                        eTag = '*';
                        if (!(currentMode !== FormMode.New)) return [3, 9];
                        itemMetadata = list.items.getById(currentItemId);
                        return [4, (_a = itemMetadata.select.apply(itemMetadata, toSelect)).expand.apply(_a, toExpand).get()];
                    case 3:
                        item = _h.sent();
                        eTag = item.__metadata.etag;
                        return [4, itemMetadata.attachmentFiles.get()];
                    case 4:
                        attachmentMetadata = _h.sent();
                        console.log(item);
                        _b = 0, listFields_2 = listFields;
                        _h.label = 5;
                    case 5:
                        if (!(_b < listFields_2.length)) return [3, 8];
                        fm = listFields_2[_b];
                        _d = (_c = fieldInfos).push;
                        return [4, FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, currentListId, item, sp)];
                    case 6:
                        _d.apply(_c, [_h.sent()]);
                        _h.label = 7;
                    case 7:
                        _b++;
                        return [3, 5];
                    case 8:
                        if (item.Attachments) {
                            fieldInfos.filter(function (f) { return f.InternalName === 'Attachments'; })[0].FormFieldValue = attachmentMetadata;
                        }
                        return [3, 13];
                    case 9:
                        _e = 0, listFields_3 = listFields;
                        _h.label = 10;
                    case 10:
                        if (!(_e < listFields_3.length)) return [3, 13];
                        fm = listFields_3[_e];
                        _g = (_f = fieldInfos).push;
                        return [4, FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, currentListId, null, sp)];
                    case 11:
                        _g.apply(_f, [_h.sent()]);
                        _h.label = 12;
                    case 12:
                        _e++;
                        return [3, 10];
                    case 13: return [2, {
                            PnPSPRest: sp,
                            SPWebUrl: sPWebUrl,
                            CurrentListId: currentListId,
                            CurrentListDefaultViewUrl: listData.DefaultViewUrl,
                            CurrentItemId: currentItemId,
                            CurrentMode: currentMode,
                            Fields: fieldInfos,
                            IsLoading: false,
                            ShowValidationErrors: false,
                            ETag: eTag
                        }];
                }
            });
        }); },
        setFormMode: function (state, actions, mode) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(state);
                state.CurrentMode = mode;
                state.Fields.forEach(function (f) { return f.CurrentMode = mode; });
                return [2, __assign({}, state)];
            });
        }); },
        setItemId: function (state, actions, itemId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                state.CurrentItemId = itemId;
                return [2, __assign({}, state)];
            });
        }); },
        setLoading: function (state, actions, isLoading) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                state.IsLoading = isLoading;
                return [2, __assign({}, state)];
            });
        }); },
        setEtag: function (state, actions, etag) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                state.ETag = etag;
                return [2, __assign({}, state)];
            });
        }); },
        setShowValidationErrors: function (state, actions, show) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                state.ShowValidationErrors = show;
                state.Fields = state.Fields.map(function (f) {
                    f.ShowValidationErrors = show;
                    return f;
                });
                return [2, __assign({}, state)];
            });
        }); },
        setFieldData: function (state, actions, internalName, newValue) { return __awaiter(_this, void 0, void 0, function () {
            var fieldProps;
            return __generator(this, function (_a) {
                fieldProps = getFieldPropsByInternalName(state.Fields, internalName);
                if (fieldProps) {
                    fieldProps.FormFieldValue = newValue;
                }
                return [2, __assign({}, state)];
            });
        }); },
        setFieldValidationState: function (state, actions, internalName, isValid, validationErrors) { return __awaiter(_this, void 0, void 0, function () {
            var fieldProps;
            return __generator(this, function (_a) {
                fieldProps = getFieldPropsByInternalName(state.Fields, internalName);
                if (fieldProps) {
                    fieldProps.IsValid = isValid;
                    fieldProps.ValidationErrors = validationErrors;
                }
                return [2, __assign({}, state)];
            });
        }); },
        addNewAttachmentInfo: function (state, actions, fileInfo) { return __awaiter(_this, void 0, void 0, function () {
            var attachmentProps;
            return __generator(this, function (_a) {
                attachmentProps = getFieldPropsByInternalName(state.Fields, 'Attachments');
                if (attachmentProps) {
                    if (!attachmentProps.AttachmentsNewToAdd) {
                        attachmentProps.AttachmentsNewToAdd = [];
                    }
                    attachmentProps.AttachmentsNewToAdd.push(fileInfo);
                }
                return [2, __assign({}, state)];
            });
        }); },
        removeNewAttachmentInfo: function (state, actions, fileInfo) { return __awaiter(_this, void 0, void 0, function () {
            var attachmentProps;
            return __generator(this, function (_a) {
                attachmentProps = getFieldPropsByInternalName(state.Fields, 'Attachments');
                if (attachmentProps && attachmentProps.AttachmentsNewToAdd) {
                    attachmentProps.AttachmentsNewToAdd = attachmentProps.AttachmentsNewToAdd.filter(function (a) { return a.name !== fileInfo.name; });
                }
                return [2, __assign({}, state)];
            });
        }); },
        addOrRemoveExistingAttachmentDeletion: function (state, actions, attachmentName) { return __awaiter(_this, void 0, void 0, function () {
            var attachmentProps;
            return __generator(this, function (_a) {
                attachmentProps = getFieldPropsByInternalName(state.Fields, 'Attachments');
                if (!attachmentProps.AttachmentsExistingToDelete) {
                    attachmentProps.AttachmentsExistingToDelete = [];
                }
                if (attachmentProps.AttachmentsExistingToDelete.indexOf(attachmentName) !== -1) {
                    attachmentProps.AttachmentsExistingToDelete = attachmentProps.AttachmentsExistingToDelete.filter(function (a) { return a !== attachmentName; });
                }
                else {
                    attachmentProps.AttachmentsExistingToDelete.push(attachmentName);
                }
                return [2, __assign({}, state)];
            });
        }); },
        clearHelperAttachmentProperties: function (state) { return __awaiter(_this, void 0, void 0, function () {
            var attachmentProps;
            return __generator(this, function (_a) {
                attachmentProps = getFieldPropsByInternalName(state.Fields, 'Attachments');
                if (attachmentProps) {
                    attachmentProps.AttachmentsExistingToDelete = null;
                    attachmentProps.AttachmentsNewToAdd = null;
                }
                return [2, __assign({}, state)];
            });
        }); },
        setFieldPropValue: function (state, actions, internalName, propName, propValue) { return __awaiter(_this, void 0, void 0, function () {
            var fieldProps;
            return __generator(this, function (_a) {
                fieldProps = getFieldPropsByInternalName(state.Fields, internalName);
                if (fieldProps) {
                    fieldProps[propName] = propValue;
                }
                return [2, __assign({}, state)];
            });
        }); },
        addValidatorToField: function (state, actions, validator, internalName) {
            var validatorParams = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                validatorParams[_i - 4] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var fieldProps;
                return __generator(this, function (_a) {
                    fieldProps = getFieldPropsByInternalName(state.Fields, internalName);
                    if (fieldProps) {
                        if (!fieldProps.Validators) {
                            fieldProps.Validators = [];
                        }
                        fieldProps.Validators.push(function () {
                            return validator.apply(void 0, [internalName].concat(validatorParams));
                        });
                    }
                    return [2, __assign({}, state)];
                });
            });
        },
        clearValidatorsFromField: function (state, actions, internalName) { return __awaiter(_this, void 0, void 0, function () {
            var fieldProps;
            return __generator(this, function (_a) {
                fieldProps = getFieldPropsByInternalName(state.Fields, internalName);
                if (fieldProps) {
                    fieldProps.Validators = [];
                }
                return [2, __assign({}, state)];
            });
        }); },
        validateForm: function (state) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (state.Fields) {
                    state.Fields.forEach(function (f) {
                        var result = ValidationManager.validateField(f);
                        f.IsValid = result.IsValid;
                        f.ValidationErrors = result.ValidationErrors;
                    });
                }
                return [2, __assign({}, state)];
            });
        }); },
        setFormMessage: function (state, actions, message, callback) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (message === null || message === '') {
                    state.GlobalMessage = null;
                }
                else {
                    state.GlobalMessage = {
                        Text: message,
                        DialogCallback: callback
                    };
                }
                return [2, __assign({}, state)];
            });
        }); }
    }
};
var initedStore = createStore(storeConfig);
initedStore.subscribe(function (action, state, args) {
    exposedState = state;
});
var getFieldControlValuesForPost = function () { return __awaiter(_this, void 0, void 0, function () {
    var state, toReturn, _i, _a, fp, result, result, validField, term;
    return __generator(this, function (_b) {
        state = exposedState;
        toReturn = {};
        for (_i = 0, _a = state.Fields; _i < _a.length; _i++) {
            fp = _a[_i];
            if (fp.InternalName === 'Attachments') {
                continue;
            }
            if (fp.Type.match(/user/gi) || fp.Type.match(/lookup/gi)) {
                result = null;
                if (fp.FormFieldValue != null) {
                    if (!fp.IsMulti) {
                        result = parseInt(fp.FormFieldValue.Id);
                    }
                    else {
                        if (fp.FormFieldValue.results != null && fp.FormFieldValue.results.length > 0) {
                            result = { results: fp.FormFieldValue.results.map(function (r) { return r.Id; }) };
                        }
                        else {
                            result = { results: [] };
                        }
                    }
                }
                else {
                    if (!fp.IsMulti) {
                        result = 0;
                    }
                    else {
                        result = { results: [] };
                    }
                }
                toReturn[fp.EntityPropertyName + "Id"] = result;
            }
            else if (fp.Type.match(/taxonomy/gi)) {
                result = null;
                validField = fp.InternalName;
                if (fp.FormFieldValue && fp.FormFieldValue.length > 0) {
                    if (fp.IsMulti) {
                        result = fp.FormFieldValue.map(function (term) { return "-1;#" + term.name + "|" + term.key; }).join(';#') + ';';
                        validField = fp.TaxonomyUpdateFieldEntityPropertyName;
                    }
                    else {
                        term = fp.FormFieldValue[0];
                        result = {
                            __metadata: { type: 'SP.Taxonomy.TaxonomyFieldValue' },
                            Label: term.name,
                            TermGuid: term.key,
                            WssId: -1
                        };
                    }
                }
                toReturn[validField] = result;
            }
            else {
                toReturn[fp.EntityPropertyName] = fp.FormFieldValue;
            }
        }
        return [2, toReturn];
    });
}); };
var getFieldControlValuesForValidatedUpdate = function () { return __awaiter(_this, void 0, void 0, function () {
    var state, toReturn, _i, _a, fp, fieldValue, results, d;
    return __generator(this, function (_b) {
        state = exposedState;
        toReturn = [];
        for (_i = 0, _a = state.Fields; _i < _a.length; _i++) {
            fp = _a[_i];
            fieldValue = null;
            if (fp.InternalName === 'Attachments') {
                continue;
            }
            if (fp.Type.match(/lookup/gi)) {
                if (fp.FormFieldValue != null) {
                    if (!fp.IsMulti) {
                        fieldValue = fp.FormFieldValue.Id.toString();
                    }
                    else {
                        if (fp.FormFieldValue.results != null && fp.FormFieldValue.results.length > 0) {
                            fieldValue = fp.FormFieldValue.results.map(function (r) { return r.Id + ";#"; }).join(';#');
                        }
                    }
                }
            }
            else if (fp.Type.match(/user/gi)) {
                if (fp.FormFieldValue != null) {
                    if (!fp.IsMulti) {
                        fieldValue = "[" + JSON.stringify({ Key: fp.FormFieldValue.key }) + "]";
                    }
                    else {
                        if (fp.FormFieldValue.results != null && fp.FormFieldValue.results.length > 0) {
                            results = fp.FormFieldValue.results.map(function (r) {
                                return JSON.stringify({ Key: r.key });
                            }).join(',');
                            fieldValue = "[" + results + "]";
                        }
                    }
                }
            }
            else if (fp.Type.match(/taxonomy/gi)) {
                if (fp.FormFieldValue && fp.FormFieldValue.length > 0) {
                    fieldValue = fp.FormFieldValue.map(function (term) { return term.name + "|" + term.key; }).join(';');
                }
            }
            else if (fp.Type.match(/multichoice/gi)) {
                if (fp.FormFieldValue && fp.FormFieldValue.results && fp.FormFieldValue.results.length > 0) {
                    fieldValue = fp.FormFieldValue.results.join(';#');
                }
            }
            else if (fp.Type.match(/datetime/gi)) {
                d = fp.FormFieldValue === null || fp.FormFieldValue === undefined ? new Date(1900, 0, 1) : new Date(Date.parse(fp.FormFieldValue));
                fieldValue = d.format('dd/MM/yyyy HH:mm');
            }
            else if (fp.Type.match(/number/gi)) {
                if (fp.FormFieldValue) {
                    if (fp.NumberIsPercent) {
                        fieldValue = (fp.FormFieldValue * 100).toString();
                    }
                    else {
                        fieldValue = fp.FormFieldValue;
                    }
                }
            }
            else {
                fieldValue = fp.FormFieldValue;
            }
            if (fieldValue === undefined || fieldValue === null) {
                fieldValue = null;
            }
            else {
                fieldValue = fieldValue.toString();
            }
            toReturn.push({
                ErrorMessage: null,
                FieldName: fp.EntityPropertyName,
                FieldValue: fieldValue,
                HasException: false
            });
        }
        return [2, toReturn];
    });
}); };
var getNewAttachmentsToSave = function () {
    var toReturn = new Promise(function (resolve, reject) {
        var state = exposedState;
        var filtered = state.Fields.filter(function (f) { return f.InternalName === 'Attachments'; });
        var attachmentProps = filtered && filtered.length > 0 ? filtered[0] : null;
        if (attachmentProps.AttachmentsNewToAdd) {
            var individualFilePromises_1 = [];
            attachmentProps.AttachmentsNewToAdd.forEach(function (na) {
                var individualFilePromise = new Promise(function (individualPromiseResolve, individualPromiseReject) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var res = reader.result;
                        individualPromiseResolve({
                            name: na.name,
                            content: res
                        });
                    };
                    reader.onabort = function () { return individualPromiseResolve(null); };
                    reader.onerror = function () { return individualPromiseResolve(null); };
                    reader.readAsArrayBuffer(na);
                });
                individualFilePromises_1.push(individualFilePromise);
            });
            Promise.all(individualFilePromises_1).then(function (attFileInfos) {
                resolve(attFileInfos);
            }).catch(function (e) {
                resolve(null);
            });
        }
        else {
            resolve(null);
        }
    });
    return toReturn;
};
var validateForm = function () {
    initedStore.actions.validateForm();
    var globalState = exposedState;
    var isValid = true;
    if (globalState && globalState.Fields) {
        isValid = globalState.Fields.filter(function (f) { return !f.IsValid; }).length === 0;
    }
    return isValid;
};
var saveFormData = function () { return __awaiter(_this, void 0, void 0, function () {
    var _a, toResolve, globalState_1, formDataRegularFields, itemCollection, action, currentEtag, currentItemId, initialAdding, res, errors, attachmentProps_1, attachments, list, addMultipleResult, attachmentData, e_1, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                toResolve = {};
                _b.label = 1;
            case 1:
                _b.trys.push([1, 15, , 16]);
                globalState_1 = exposedState;
                return [4, getFieldControlValuesForValidatedUpdate()];
            case 2:
                formDataRegularFields = _b.sent();
                itemCollection = globalState_1.PnPSPRest.web.lists.getById(globalState_1.CurrentListId).items;
                action = null;
                currentEtag = globalState_1.ETag;
                currentItemId = globalState_1.CurrentItemId;
                if (!(globalState_1.CurrentMode === FormMode.New)) return [3, 4];
                return [4, itemCollection.add()];
            case 3:
                initialAdding = _b.sent();
                console.log(initialAdding);
                if (initialAdding && initialAdding.data && initialAdding.data.Id) {
                    currentItemId = parseInt(initialAdding.data.Id);
                    console.log(currentItemId);
                    FormFieldsStore.actions.setItemId(currentItemId);
                }
                _b.label = 4;
            case 4:
                action = itemCollection.getById(currentItemId).configure({
                    headers: {
                        'If-Match': "" + currentEtag
                    }
                }).validateUpdateListItem(formDataRegularFields);
                return [4, action];
            case 5:
                res = _b.sent();
                if (res.ValidateUpdateListItem.results.some(function (f) { return f.HasException; })) {
                    errors = res.ValidateUpdateListItem.results.reduce(function (prev, current) {
                        if (current.HasException) {
                            var props = getFieldPropsByInternalName(globalState_1.Fields, current.FieldName);
                            prev.push(props.Title + ": " + current.ErrorMessage);
                        }
                        return prev;
                    }, []).join('<br />');
                    throw new Error(errors);
                }
                _b.label = 6;
            case 6:
                _b.trys.push([6, 13, , 14]);
                toResolve.IsSuccessful = true;
                if (res && res.data && res.data.Id) {
                    toResolve.ItemId = parseInt(res.data.Id);
                }
                else {
                    toResolve.ItemId = currentItemId;
                }
                if (res && res.data && res.data['odata.etag']) {
                    toResolve.ETag = res.data['odata.etag'];
                }
                else {
                    toResolve.ETag = globalState_1.ETag;
                }
                attachmentProps_1 = getFieldPropsByInternalName(globalState_1.Fields, 'Attachments');
                if (!attachmentProps_1) return [3, 12];
                return [4, getNewAttachmentsToSave()];
            case 7:
                attachments = _b.sent();
                if (!(attachments !== null && attachments.length > 0)) return [3, 10];
                list = globalState_1.PnPSPRest.web.lists.getById(globalState_1.CurrentListId);
                return [4, list.items.getById(toResolve.ItemId).attachmentFiles.addMultiple(attachments)];
            case 8:
                addMultipleResult = _b.sent();
                return [4, globalState_1.PnPSPRest.web.lists.getById(globalState_1.CurrentListId)
                        .items.getById(toResolve.ItemId).attachmentFiles.get()];
            case 9:
                attachmentData = _b.sent();
                attachmentProps_1.FormFieldValue = attachmentData;
                _b.label = 10;
            case 10:
                if (!(attachmentProps_1.AttachmentsExistingToDelete && attachmentProps_1.AttachmentsExistingToDelete.length > 0)) return [3, 12];
                return [4, (_a = globalState_1.PnPSPRest.web
                        .lists.getById(globalState_1.CurrentListId)
                        .items.getById(toResolve.ItemId)
                        .attachmentFiles).deleteMultiple.apply(_a, attachmentProps_1.AttachmentsExistingToDelete)];
            case 11:
                _b.sent();
                if (attachmentProps_1.FormFieldValue) {
                    attachmentProps_1.FormFieldValue = attachmentProps_1.FormFieldValue.filter(function (v) { return !attachmentProps_1.AttachmentsExistingToDelete.includes(v.FileName); });
                }
                _b.label = 12;
            case 12:
                initedStore.actions.clearHelperAttachmentProperties();
                return [3, 14];
            case 13:
                e_1 = _b.sent();
                toResolve.IsSuccessful = false;
                toResolve.Error = e_1.message.match(/precondition/gi) ? 'Save conflict - current changes would override recent edit(-s) made since this form was opened. Please reload the page and try again.' : e_1.message;
                toResolve.ItemId = -1;
                toResolve.ETag = null;
                return [3, 14];
            case 14: return [3, 16];
            case 15:
                e_2 = _b.sent();
                toResolve.IsSuccessful = false;
                toResolve.Error = e_2.toString();
                toResolve.ItemId = -1;
                toResolve.ETag = null;
                return [3, 16];
            case 16: return [2, toResolve];
        }
    });
}); };
var saveFormDataExternal = function () { return __awaiter(_this, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                initedStore.actions.setLoading(true);
                return [4, saveFormData()];
            case 1:
                res = _a.sent();
                if (res.IsSuccessful) {
                    initedStore.actions.setEtag(res.ETag);
                    initedStore.actions.setItemId(res.ItemId);
                }
                initedStore.actions.setLoading(false);
                return [2, res];
        }
    });
}); };
var loadingEnabledStateChange = function (action) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    initedStore.actions.setLoading(true);
    action.apply(void 0, args);
    initedStore.actions.setLoading(false);
};
var setFormModeExternal = function (formMode) {
    initedStore.actions.setLoading(true);
    initedStore.actions.setFormMode(formMode);
    initedStore.actions.setLoading(false);
};
export var FormFieldsStore = {
    Provider: enhanceProvider(initedStore.Provider),
    connect: initedStore.connect,
    actions: {
        getState: function () {
            return exposedState;
        },
        initStore: initedStore.actions.initStore,
        setLoading: initedStore.actions.setLoading,
        setFormMode: function (arg) { loadingEnabledStateChange(initedStore.actions.setFormMode, arg); },
        setItemId: initedStore.actions.setItemId,
        setFieldData: initedStore.actions.setFieldData,
        addNewAttachmentInfo: initedStore.actions.addNewAttachmentInfo,
        removeNewAttachmentInfo: initedStore.actions.removeNewAttachmentInfo,
        addOrRemoveExistingAttachmentDeletion: function (arg) { loadingEnabledStateChange(initedStore.actions.addOrRemoveExistingAttachmentDeletion, arg); },
        clearHelperAttachmentProperties: initedStore.actions.clearHelperAttachmentProperties,
        getFieldControlValuesForPost: getFieldControlValuesForPost,
        getNewAttachmentsToSave: getNewAttachmentsToSave,
        saveFormData: saveFormDataExternal,
        validateForm: validateForm,
        setShowValidationErrors: initedStore.actions.setShowValidationErrors,
        addValidatorToField: initedStore.actions.addValidatorToField,
        setFieldValidationState: initedStore.actions.setFieldValidationState,
        clearValidatorsFromField: initedStore.actions.clearValidatorsFromField,
        setFieldPropValue: initedStore.actions.setFieldPropValue,
        setFormMessage: initedStore.actions.setFormMessage
    }
};
//# sourceMappingURL=store.js.map