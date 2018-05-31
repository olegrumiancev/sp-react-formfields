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
import { BaseFieldRenderer } from './BaseFieldRenderer';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { NormalPeoplePicker, ValidationState } from 'office-ui-fabric-react/lib/Pickers';
var FieldUserRenderer = (function (_super) {
    __extends(FieldUserRenderer, _super);
    function FieldUserRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.validateInput = function (input) {
            if (input.indexOf('@') !== -1) {
                return ValidationState.valid;
            }
            else if (input.length > 1) {
                return ValidationState.warning;
            }
            else {
                return ValidationState.invalid;
            }
        };
        _this.onItemsChange = function (items) {
            _this.setState({ currentSelectedItems: items }, function () {
                _this.saveDataInternal();
            });
        };
        _this.onRemoveSuggestion = function (item) {
            var _a = _this.state, peopleList = _a.peopleList, mruState = _a.mostRecentlyUsed;
            var indexPeopleList = peopleList.indexOf(item);
            var indexMostRecentlyUsed = mruState.indexOf(item);
            if (indexPeopleList >= 0) {
                var newPeople = peopleList.slice(0, indexPeopleList).concat(peopleList.slice(indexPeopleList + 1));
                _this.setState({ peopleList: newPeople });
            }
            if (indexMostRecentlyUsed >= 0) {
                var newSuggestedPeople = mruState.slice(0, indexMostRecentlyUsed).concat(mruState.slice(indexMostRecentlyUsed + 1));
                _this.setState({ mostRecentlyUsed: newSuggestedPeople });
            }
        };
        _this.onFilterChanged = function (filterText, currentPersonas, limitResults) {
            if (filterText) {
                var p = new Promise(function (resolve, reject) {
                    _this.props.pnpSPRest.profiles.clientPeoplePickerSearchUser({
                        QueryString: filterText,
                        MaximumEntitySuggestions: 10,
                        AllowMultipleEntities: false,
                        PrincipalSource: 15,
                        PrincipalType: 15,
                        AllUrlZones: true,
                        AllowEmailAddresses: true
                    }).then(function (entries) {
                        var promises = [];
                        var resolvedPersonas = [];
                        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                            var entry = entries_1[_i];
                            if (entry.IsResolved) {
                                var pp = _this.props.pnpSPRest.web.ensureUser(entry.Key);
                                promises.push(pp);
                                pp.then(function (result) {
                                    resolvedPersonas.push({
                                        primaryText: result.data.Title,
                                        id: result.data.Id.toString()
                                    });
                                });
                            }
                        }
                        Promise.all(promises).then(function () {
                            resolve(resolvedPersonas);
                        }).catch(function (e) { return reject(e); });
                    }).catch(function (e) { return reject(e); });
                });
                p.catch(function (e) {
                    console.info(e);
                });
                return p;
            }
            else {
                return [];
            }
        };
        _this.saveDataInternal = function () {
            var result = _this.state.currentSelectedItems.map(function (persona) {
                return {
                    Title: persona.primaryText,
                    Id: persona.id
                };
            });
            if (_this.props.IsMulti) {
                result = { results: result };
            }
            else {
                if (_this.state.currentSelectedItems.length > 0) {
                    result = {
                        Title: _this.state.currentSelectedItems[0].primaryText,
                        Id: _this.state.currentSelectedItems[0].id
                    };
                }
                else {
                    result = null;
                }
            }
            _this.trySetChangedValue(result);
        };
        var vals = [];
        if (_this.props.FormFieldValue != null) {
            if (_this.props.IsMulti) {
                vals = _this.props.FormFieldValue.results;
            }
            else {
                vals.push(_this.props.FormFieldValue);
            }
        }
        var selectedValues = [];
        for (var _i = 0, vals_1 = vals; _i < vals_1.length; _i++) {
            var v = vals_1[_i];
            if (v != null) {
                selectedValues.push({
                    primaryText: v.Title,
                    id: v.Id.toString()
                });
            }
        }
        _this.state = {
            peopleList: [],
            currentSelectedItems: selectedValues,
            mostRecentlyUsed: []
        };
        return _this;
    }
    FieldUserRenderer.prototype.componentDidMount = function () {
        this.saveDataInternal();
    };
    FieldUserRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldUserRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldUserRenderer.prototype.renderDispForm = function () {
        if (this.props.FormFieldValue == null) {
            return null;
        }
        return (React.createElement("div", null, this.state.currentSelectedItems.map(function (m, i) {
            return React.createElement(Label, { key: m.id + "_" + i }, m.primaryText);
        })));
    };
    FieldUserRenderer.prototype.renderNewOrEditForm = function () {
        return (React.createElement("div", null,
            React.createElement(NormalPeoplePicker, { itemLimit: this.props.IsMulti ? undefined : 1, selectedItems: this.state.currentSelectedItems, onResolveSuggestions: this.onFilterChanged, getTextFromItem: this.getTextFromItem, pickerSuggestionsProps: { searchingText: 'Searching more..' }, className: 'ms-PeoplePicker', key: this.props.InternalName + "_normalpicker", onRemoveSuggestion: this.onRemoveSuggestion, onValidateInput: this.validateInput, removeButtonAriaLabel: 'Remove', onChange: this.onItemsChange, searchingText: 'Searching...', inputProps: {
                    placeholder: 'Enter a name or email address'
                }, resolveDelay: 300 })));
    };
    FieldUserRenderer.prototype.getTextFromItem = function (persona) {
        return persona.primaryText;
    };
    return FieldUserRenderer;
}(BaseFieldRenderer));
export { FieldUserRenderer };
//# sourceMappingURL=FieldUserRenderer.js.map