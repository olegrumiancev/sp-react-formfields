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
import { BasePicker } from 'office-ui-fabric-react/lib/Pickers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
var TermBasePicker = (function (_super) {
    __extends(TermBasePicker, _super);
    function TermBasePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TermBasePicker;
}(BasePicker));
export { TermBasePicker };
var TermPicker = (function (_super) {
    __extends(TermPicker, _super);
    function TermPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.tagPicker = null;
        _this.onRenderItem = _this.onRenderItem.bind(_this);
        _this.onRenderSuggestionsItem = _this.onRenderSuggestionsItem.bind(_this);
        _this.onFilterChanged = _this.onFilterChanged.bind(_this);
        _this.onGetTextFromItem = _this.onGetTextFromItem.bind(_this);
        _this.state = {
            terms: _this.props.value
        };
        return _this;
    }
    TermPicker.prototype.componentWillReceiveProps = function (newProps) {
        var _this = this;
        var isUpdateNeeded = false;
        if (this.state.terms === undefined || newProps.value === undefined) {
            isUpdateNeeded = true;
        }
        else if (this.state.terms.length === newProps.value.length) {
            for (var i = 0; i < newProps.value.length; i++) {
                if (this.state.terms[i].key !== newProps.value[i].key) {
                    isUpdateNeeded = true;
                    break;
                }
            }
        }
        else {
            isUpdateNeeded = true;
        }
        if (isUpdateNeeded) {
            var toSet = newProps.value === undefined || newProps.value === null ? [] : newProps.value;
            this.setState({ terms: toSet }, function () {
                if (_this.tagPicker) {
                    _this.tagPicker.setState({ items: _this.state.terms });
                }
            });
        }
    };
    TermPicker.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(TermBasePicker, { disabled: this.props.disabled, onResolveSuggestions: this.onFilterChanged, onRenderSuggestionsItem: this.onRenderSuggestionsItem, getTextFromItem: this.onGetTextFromItem, onRenderItem: this.onRenderItem, defaultSelectedItems: this.state.terms, onChange: function (items) {
                    _this.setState({ terms: items });
                    _this.props.onChanged(items);
                }, itemLimit: !this.props.allowMultipleSelections ? 1 : undefined, className: "termBasePicker", ref: function (r) { return _this.tagPicker = r; } })));
    };
    TermPicker.prototype.onRenderItem = function (term) {
        return (React.createElement("div", { className: "pickedTermRoot", key: term.index, "data-selection-index": term.index, "data-is-focusable": !term.disabled && true },
            React.createElement("span", { className: "pickedTermText" }, term.item.name),
            !term.disabled && (React.createElement("span", { className: "pickedTermCloseIcon", onClick: term.onRemoveItem },
                React.createElement(Icon, { iconName: 'Cancel' })))));
    };
    TermPicker.prototype.onRenderSuggestionsItem = function (term) {
        var termParent = term.termSetName;
        var termTitle = term.name + " [" + term.termSetName + "]";
        if (term.path.indexOf(';') !== -1) {
            var splitPath = term.path.split(';');
            termParent = splitPath[splitPath.length - 2];
            splitPath.pop();
            termTitle = term.name + " [" + term.termSetName + ":" + splitPath.join(':') + "]";
        }
        return (React.createElement("div", { className: "termSuggestion", title: termTitle },
            React.createElement("div", null, term.name),
            React.createElement("div", { className: "termSuggestionSubTitle" },
                " ",
                'in',
                " ",
                termParent ? termParent : 'TaxonomyPickerTermSetLabel')));
    };
    TermPicker.prototype.onFilterChanged = function (filterText, tagList) {
        return __awaiter(this, void 0, void 0, function () {
            var filteredTerms;
            return __generator(this, function (_a) {
                if (filterText !== '') {
                    filteredTerms = this.props.allTerms.filter(function (t) { return t.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1; });
                    return [2, filteredTerms];
                }
                else {
                    return [2, Promise.resolve([])];
                }
                return [2];
            });
        });
    };
    TermPicker.prototype.onGetTextFromItem = function (item) {
        return item.name;
    };
    return TermPicker;
}(React.Component));
export default TermPicker;
//# sourceMappingURL=TermPicker.js.map