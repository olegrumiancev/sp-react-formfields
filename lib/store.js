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
import { initStore } from 'react-waterfall';
import { FormMode } from './interfaces';
import { FieldPropsManager } from './managers/FieldPropsManager';
var store = {
    initialState: {
        SPWebUrl: null,
        CurrentMode: 0,
        CurrentListId: null,
        IsLoading: true
    },
    actions: {
        initStore: function (state, sPWebUrl, currentListId, currentMode, currentItemId) { return __awaiter(_this, void 0, void 0, function () {
            var list, listFields, toSelect, toExpand, _i, listFields_1, f, fieldInfos, itemMetadata, item_1, attachmentMetadata, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        configurePnp(sPWebUrl);
                        list = sp.web.lists.getById(currentListId);
                        return [4, list
                                .fields
                                .filter('ReadOnlyField eq false and Hidden eq false and Title ne \'Content Type\'').get()];
                    case 1:
                        listFields = _b.sent();
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
                                toExpand.push(f.EntityPropertyName);
                            }
                            else {
                                toSelect.push(f.EntityPropertyName);
                            }
                        }
                        fieldInfos = [];
                        if (!(currentMode !== FormMode.New)) return [3, 4];
                        itemMetadata = list.items.getById(currentItemId);
                        return [4, (_a = itemMetadata.select.apply(itemMetadata, toSelect)).expand.apply(_a, toExpand).get()];
                    case 2:
                        item_1 = _b.sent();
                        return [4, itemMetadata.attachmentFiles.get()];
                    case 3:
                        attachmentMetadata = _b.sent();
                        console.log(item_1);
                        fieldInfos = listFields.map(function (fm) {
                            return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, item_1, sp);
                        });
                        if (item_1.Attachments) {
                            console.log(attachmentMetadata);
                            fieldInfos.filter(function (f) { return f.InternalName === 'Attachments'; })[0].FormFieldValue = attachmentMetadata;
                        }
                        return [3, 5];
                    case 4:
                        fieldInfos = listFields.map(function (fm) {
                            return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, null, sp);
                        });
                        _b.label = 5;
                    case 5: return [2, {
                            PnPSPRest: sp,
                            SPWebUrl: sPWebUrl,
                            CurrentListId: currentListId,
                            CurrentItemId: currentItemId,
                            CurrentMode: currentMode,
                            Fields: fieldInfos,
                            IsLoading: false
                        }];
                }
            });
        }); },
        setFormMode: function (state, mode) {
            console.log("setting global store form mode");
            state.CurrentMode = mode;
            state.Fields.forEach(function (f) { return f.CurrentMode = mode; });
            return state;
        },
        setItemId: function (state, itemId) {
            state.CurrentItemId = itemId;
            return state;
        },
        setFieldData: function (state, internalName, newValue) {
            var filtered = state.Fields.filter(function (f) { return f.InternalName === internalName; });
            if (filtered && filtered.length > 0) {
                filtered[0].FormFieldValue = newValue;
            }
            return state;
        },
        addNewAttachmentInfo: function (state, fileInfo) {
            if (!state.NewAttachments) {
                state.NewAttachments = [];
            }
            state.NewAttachments.push(fileInfo);
            return state;
        },
        removeNewAttachmentInfo: function (state, fileInfo) {
            state.NewAttachments = state.NewAttachments.filter(function (a) { return a.name !== fileInfo.name; });
            return state;
        },
        addOrRemoveExistingAttachmentDeletion: function (state, attachmentName) {
            if (!state.ExistingAttachmentsToDelete) {
                state.ExistingAttachmentsToDelete = [];
            }
            if (state.ExistingAttachmentsToDelete.indexOf(attachmentName) !== -1) {
                state.ExistingAttachmentsToDelete = state.ExistingAttachmentsToDelete.filter(function (a) { return a !== attachmentName; });
            }
            else {
                state.ExistingAttachmentsToDelete.push(attachmentName);
            }
            var filtered = state.Fields.filter(function (f) { return f.InternalName === 'Attachments'; });
            if (filtered && filtered.length > 0) {
                filtered[0].ExistingAttachmentsToDelete = state.ExistingAttachmentsToDelete;
            }
            console.log(state);
            return state;
        }
    }
};
var getFieldControlValuesForPost = function () {
    var state = initedStore.getState();
    var toReturn = {};
    for (var _i = 0, _a = state.Fields; _i < _a.length; _i++) {
        var fp = _a[_i];
        if (fp.InternalName === 'Attachments') {
            continue;
        }
        if (fp.Type.match(/user/gi) || fp.Type.match(/lookup/gi)) {
            var result = null;
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
        else {
            toReturn[fp.EntityPropertyName] = fp.FormFieldValue;
        }
    }
    return toReturn;
};
var getNewAttachmentsToSave = function () {
    var toReturn = new Promise(function (resolve, reject) {
        var state = initedStore.getState();
        if (state.NewAttachments) {
            var individualFilePromises_1 = [];
            state.NewAttachments.forEach(function (na) {
                var individualFilePromise = new Promise(function (individualPromiseResolve, individualPromiseReject) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        var fileAsBinaryString = reader.result;
                        individualPromiseResolve({
                            name: na.name,
                            content: fileAsBinaryString
                        });
                    };
                    reader.onabort = function () { return individualPromiseResolve(null); };
                    reader.onerror = function () { return individualPromiseResolve(null); };
                    reader.readAsBinaryString(na);
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
var saveFormData = function () {
    var result = new Promise(function (resolve, reject) {
        var toResolve = {};
        var globalState = FormFieldsStore.actions.getState();
        var formDataRegularFields = FormFieldsStore.actions.getFieldControlValuesForPost();
        var itemCollection = globalState.PnPSPRest.web.lists.getById(globalState.CurrentListId).items;
        var action = null;
        if (globalState.CurrentMode === FormMode.New) {
            action = itemCollection.add(formDataRegularFields);
        }
        else {
            action = itemCollection.getById(globalState.CurrentItemId).update(formDataRegularFields);
        }
        console.log(formDataRegularFields);
        action.then(function (res) {
            console.log(JSON.stringify(res));
            toResolve.IsSuccessful = true;
            if (res.data.Id) {
                toResolve.ItemId = parseInt(res.data.Id);
            }
            else {
                toResolve.ItemId = globalState.CurrentItemId;
            }
            FormFieldsStore.actions.setItemId(toResolve.ItemId);
            FormFieldsStore.actions.getNewAttachmentsToSave().then(function (attachments) {
                console.log(attachments);
                if (attachments === null || attachments.length === 0) {
                    resolve(toResolve);
                }
                else {
                    var list = globalState.PnPSPRest.web.lists.getById(globalState.CurrentListId);
                    list.items.getById(toResolve.ItemId).attachmentFiles.addMultiple(attachments).then(function (addMultipleResult) {
                        console.log(addMultipleResult);
                        var filtered = globalState.Fields.filter(function (f) { return f.InternalName === 'Attachments'; });
                        globalState.PnPSPRest.web.lists.getById(globalState.CurrentListId)
                            .items.getById(toResolve.ItemId).attachmentFiles.get().then(function (attachments) {
                            filtered[0].FormFieldValue = attachments;
                        });
                        resolve(toResolve);
                    }).catch(function (e) {
                        console.log(e);
                        toResolve.IsSuccessful = false;
                        toResolve.ErrorObject = e;
                        resolve(toResolve);
                    });
                }
            }).catch(function (e) {
                console.log(e);
                toResolve.IsSuccessful = false;
                toResolve.ErrorObject = e;
                resolve(toResolve);
            });
            resolve(toResolve);
        }).catch(function (e) {
            toResolve.IsSuccessful = false;
            toResolve.ErrorObject = e;
            toResolve.ItemId = -1;
            resolve(toResolve);
        });
    });
    return result;
};
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
var initedStore = initStore(store);
export var FormFieldsStore = {
    Provider: initedStore.Provider,
    Consumer: initedStore.Consumer,
    actions: {
        getState: initedStore.getState,
        initStore: initedStore.actions.initStore,
        setFormMode: initedStore.actions.setFormMode,
        setItemId: initedStore.actions.setItemId,
        setFieldData: initedStore.actions.setFieldData,
        addNewAttachmentInfo: initedStore.actions.addNewAttachmentInfo,
        removeNewAttachmentInfo: initedStore.actions.removeNewAttachmentInfo,
        addOrRemoveExistingAttachmentDeletion: initedStore.actions.addOrRemoveExistingAttachmentDeletion,
        getFieldControlValuesForPost: getFieldControlValuesForPost,
        getNewAttachmentsToSave: getNewAttachmentsToSave,
        saveFormData: saveFormData
    }
};
//# sourceMappingURL=store.js.map