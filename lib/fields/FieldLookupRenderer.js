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
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import { handleError } from '../utils';
var FieldLookupRenderer = (function (_super) {
    __extends(FieldLookupRenderer, _super);
    function FieldLookupRenderer(props) {
        var _this = _super.call(this, props) || this;
        var vals = [];
        if (_this.props.FormFieldValue != null) {
            if (_this.props.IsMulti) {
                vals = _this.props.FormFieldValue.results;
            }
            else {
                vals.push(_this.props.FormFieldValue);
            }
        }
        _this.state = __assign({}, _this.state, { selectedItems: vals.map(function (v) { return ({ key: v.ID, name: v[_this.props.LookupField] }); }), allLookupItems: null });
        _this.allItemsLoading = false;
        return _this;
    }
    FieldLookupRenderer.prototype.renderNewForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldLookupRenderer.prototype.renderEditForm = function () {
        return this.renderNewOrEditForm();
    };
    FieldLookupRenderer.prototype.renderDispForm = function () {
        var _this = this;
        return (this.state.selectedItems.map(function (fv, i) { return React.createElement(Label, { key: _this.props.InternalName + "_" + i }, fv.name); }));
    };
    FieldLookupRenderer.prototype.renderNewOrEditForm = function () {
        var _this = this;
        return (React.createElement(TagPicker, { className: "lookupTagPickerInput", itemLimit: this.props.IsMulti ? 100 : 1, pickerSuggestionsProps: {
                suggestionsHeaderText: 'Suggested items',
                noResultsFoundText: 'No matches found',
                loadingText: 'Results are loading, please wait...'
            }, onResolveSuggestions: function (filter, selectedItems) { return _this.resolveTagSuggestions(filter, selectedItems); }, defaultSelectedItems: this.state.selectedItems, onChange: function (items) { return _this.processTagItemsChange(items == null ? [] : items); }, resolveDelay: 750, ref: function (c) { return _this.tagPicker = c; } }));
    };
    FieldLookupRenderer.prototype.processTagItemsChange = function (items) {
        this.setState({ selectedItems: items });
    };
    FieldLookupRenderer.prototype.resolveTagSuggestions = function (filterText, selectedItems) {
        var _this = this;
        var results = [];
        console.log(this.tagPicker);
        if (filterText) {
            if (this.state.allLookupItems == null) {
                this.allItemsLoading = true;
                if (!this.state.allItemsLoading) {
                    var toSelect_1 = [this.props.LookupField];
                    if (this.props.LookupField !== 'ID') {
                        toSelect_1.push('ID');
                    }
                    this.getPnpWeb(this.props.LookupWebId).then(function (web) {
                        (_a = web.lists.getById(_this.props.LookupListId).items).select.apply(_a, toSelect_1).getAll().then(function (items) {
                            _this.allItemsLoading = false;
                            var transformedItems = items.map(function (i) { return ({
                                key: i.ID.toString(),
                                name: i[_this.props.LookupField].toString()
                            }); });
                            _this.setState({ allLookupItems: transformedItems }, function () {
                                _this.tagPicker.dismissSuggestions();
                                var suggestions = _this.getPossibleSuggestionsInternal(filterText, selectedItems);
                                _this.tagPicker.suggestionStore.updateSuggestions(suggestions);
                                _this.tagPicker.setState({ suggestionsVisible: true });
                            });
                        }).catch(function (e) {
                            handleError(e);
                            _this.allItemsLoading = false;
                        });
                        var _a;
                    });
                }
            }
            else {
                this.tagPicker.focus();
                this.tagPicker.setState({ isFocused: false });
                results = this.getPossibleSuggestionsInternal(filterText, selectedItems);
            }
        }
        return results;
    };
    FieldLookupRenderer.prototype.getPossibleSuggestionsInternal = function (filterText, selectedItems) {
        var _this = this;
        return this.state.allLookupItems
            .filter(function (item) { return item.name != null && item.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0; })
            .filter(function (item) { return !_this.selectedItemsContainTag(item, selectedItems); });
    };
    FieldLookupRenderer.prototype.getPnpWeb = function (webId) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            if (webId) {
                _this.props.pnpSPRest.site.openWebById(_this.props.LookupWebId).then(function (webResult) {
                    resolve(webResult.web);
                }).catch(function (e) { return handleError(e); });
            }
            else {
                resolve(_this.props.pnpSPRest.web);
            }
        });
        return promise;
    };
    FieldLookupRenderer.prototype.selectedItemsContainTag = function (tag, tagList) {
        if (!tagList || !tagList.length || tagList.length === 0) {
            return false;
        }
        return tagList.filter(function (compareTag) { return compareTag.key === tag.key; }).length > 0;
    };
    FieldLookupRenderer.prototype.saveFieldDataInternal = function (newValue) {
        var _this = this;
        if (this.props.IsMulti) {
            this.setState({ selectedItems: this.constructNewState(newValue.key, newValue.selected) }, function () {
                _this.trySetChangedValue({ results: _this.state.selectedItems });
            });
        }
        else {
            this.setState({ selectedItems: [newValue.key] }, function () {
                _this.trySetChangedValue(_this.state.selectedItems.length > 0 ? _this.state.selectedItems[0] : undefined);
            });
        }
    };
    FieldLookupRenderer.prototype.constructNewState = function (value, toAdd) {
        var result = this.state.selectedItems;
        if (toAdd) {
            var filtered = this.state.selectedItems.filter(function (i) { return i === value; });
            if (!this.state.selectedItems.includes(value)) {
                result = [value].concat(this.state.selectedItems);
            }
        }
        else {
            result = [];
            for (var _i = 0, _a = this.state.selectedItems; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i !== value) {
                    result.push(i);
                }
            }
        }
        return result;
    };
    return FieldLookupRenderer;
}(BaseFieldRenderer));
export { FieldLookupRenderer };
//# sourceMappingURL=FieldLookupRenderer.js.map