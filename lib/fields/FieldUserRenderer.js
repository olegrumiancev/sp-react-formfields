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
        _this.isFieldMounted = false;
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
            var result = [];
            var promises = [];
            var _loop_1 = function (entry) {
                console.log(entry);
                if (entry.id === -1) {
                    var pp = _this.props.pnpSPRest.web.ensureUser(entry.key);
                    pp.catch(function (e) {
                    });
                    promises.push(pp);
                    pp.then(function (r) {
                        result.push({
                            text: r.data.Title,
                            id: r.data.Id.toString(),
                            key: r.data.PrincipalType === 4 ? r.data.Title : r.data.LoginName
                        });
                    });
                }
                else {
                    var selected = _this.state.currentSelectedItems.filter(function (i) { return i.id.toString() === entry.id; });
                    console.log(selected);
                    if (selected && selected.length > 0) {
                        selected[0].id = selected[0].id.toString();
                        result.push(selected[0]);
                    }
                }
            };
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var entry = items_1[_i];
                _loop_1(entry);
            }
            Promise.all(promises).then(function () {
                _this.setState({ currentSelectedItems: result }, function () {
                    _this.saveDataInternal();
                });
            }).catch(function (e) {
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
                var scope_1 = 1;
                if (_this.props.UserSelectionMode === 'PeopleAndGroups') {
                    scope_1 |= 4;
                }
                var p = new Promise(function (resolve) {
                    var searchQuery = _this.props.pnpSPRest.utility.searchPrincipals(filterText, scope_1, 15, _this.state.spGroupRestriction ? _this.state.spGroupRestriction : '', 10);
                    searchQuery.then(function (entries) {
                        var result = [];
                        if (entries && entries.SearchPrincipalsUsingContextWeb &&
                            entries.SearchPrincipalsUsingContextWeb.results && entries.SearchPrincipalsUsingContextWeb.results.length > 0) {
                            console.log(entries.SearchPrincipalsUsingContextWeb.results);
                            result = entries.SearchPrincipalsUsingContextWeb.results.map(function (e) { return ({
                                text: e.DisplayName,
                                id: e.PrincipalId,
                                key: e.PrincipalType === 4 ? e.Email : e.LoginName
                            }); });
                        }
                        resolve(result);
                    }).catch(function (e) { return resolve([]); });
                });
                p.catch(function (e) {
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
                    Title: persona.text,
                    Id: persona.id,
                    key: persona.key
                };
            });
            if (_this.props.IsMulti) {
                if (result && result.length > 0) {
                    result = { results: result };
                }
                else {
                    result = null;
                }
            }
            else {
                if (_this.state.currentSelectedItems.length > 0) {
                    result = {
                        Title: _this.state.currentSelectedItems[0].text,
                        Id: _this.state.currentSelectedItems[0].id,
                        key: _this.state.currentSelectedItems[0].key
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
            if (v != null && v.Id !== 0) {
                selectedValues.push({
                    text: v.Title,
                    id: v.Id.toString()
                });
            }
        }
        _this.state = {
            peopleList: [],
            currentSelectedItems: selectedValues,
            mostRecentlyUsed: [],
            spGroupRestriction: null
        };
        return _this;
    }
    FieldUserRenderer.prototype.componentWillUnmount = function () {
        this.isFieldMounted = false;
    };
    FieldUserRenderer.prototype.componentDidMount = function () {
        var _this = this;
        this.isFieldMounted = true;
        var spGroupRestriction = this.props.SchemaXml.documentElement.getAttribute('UserSelectionScope');
        if (spGroupRestriction && spGroupRestriction !== '0' && Number.isNaN(parseInt(spGroupRestriction))) {
            this.props.pnpSPRest.web.siteGroups.getById(parseInt(spGroupRestriction)).get().then(function (res) {
                try {
                    if (_this.isFieldMounted) {
                        _this.setState({ spGroupRestriction: res.LoginName });
                    }
                }
                catch (e) {
                }
            });
        }
        if (this.state.currentSelectedItems && this.state.currentSelectedItems.length > 0) {
            var promises = [];
            var newValues_1 = [];
            for (var _i = 0, _a = this.state.currentSelectedItems; _i < _a.length; _i++) {
                var sv = _a[_i];
                var p = this.props.pnpSPRest.web.siteUsers.getById(sv.id).get();
                promises.push(p);
                p.then(function (r) {
                    newValues_1.push({
                        id: r.Id,
                        key: r.PrincipalType === 4 ? r.Title : r.LoginName,
                        text: r.Title
                    });
                });
            }
            Promise.all(promises).then(function () {
                if (_this.isFieldMounted) {
                    _this.setState({ currentSelectedItems: newValues_1 }, function () {
                        _this.saveDataInternal();
                    });
                }
            });
        }
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
            return React.createElement(Label, { key: m.id + "_" + i }, m.text);
        })));
    };
    FieldUserRenderer.prototype.renderNewOrEditForm = function () {
        return (React.createElement("div", null,
            React.createElement(NormalPeoplePicker, { itemLimit: this.props.IsMulti ? undefined : 1, defaultSelectedItems: this.state.currentSelectedItems, onResolveSuggestions: this.onFilterChanged, getTextFromItem: this.getTextFromItem, pickerSuggestionsProps: {
                    searchingText: 'Searching more...'
                }, className: 'ms-PeoplePicker', key: this.props.InternalName + "_normalpicker", onRemoveSuggestion: this.onRemoveSuggestion, onValidateInput: this.validateInput, removeButtonAriaLabel: 'Remove', onChange: this.onItemsChange, searchingText: 'Searching...', inputProps: {
                    placeholder: 'Enter a name or email address'
                }, resolveDelay: 300 })));
    };
    FieldUserRenderer.prototype.getTextFromItem = function (persona) {
        return persona.text;
    };
    return FieldUserRenderer;
}(BaseFieldRenderer));
export { FieldUserRenderer };
//# sourceMappingURL=FieldUserRenderer.js.map