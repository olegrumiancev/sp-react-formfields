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
import { PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import TermPicker from './TermPicker';
import TermParent from './TermParent';
import FieldErrorMessage from './ErrorMessage';
import SPTermStorePickerService from './SPTermStorePickerService';
import { BaseFieldRenderer } from '../BaseFieldRenderer';
import './TaxonomyPicker.css';
export var COLLAPSED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII=';
export var EXPANDED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII=';
export var GROUP_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC9SURBVDhPY2CgNXh1qEkdiJ8D8X90TNBuJM0V6IpBhoHFgIxebKYTIwYzAMNpxGhGdsFwNoBgNEFjAWsYgOSKiorMgPgbEP/Hgj8AxXpB0Yg1gQAldYuLix8/efLkzn8s4O7du9eAan7iM+DV/v37z546der/jx8/sJkBdhVOA5qbm08ePnwYrOjQoUOkGwDU+AFowLmjR4/idwGukAYaYAkMgxfPnj27h816kDg4DPABoAI/IP6DIxZA4l0AOd9H3QXl5+cAAAAASUVORK5CYII=';
export var TERMSET_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPrZLRCcAgDERdpZMIjuQA7uWH4CqdxMY0EQtNjKWB0A/77sxF55SKMTalk8a61lqCFqsLiwKac84ZRUUBi7MoYHVmAfjfjzE6vJqZQfie0AcwBQVW8ATi7AR7zGGGNSE6Q2cyLSPIjRswjO7qKhcPDN2hK46w05wZMcEUIG+HrzzcrRsQBIJ5hS8C9fGAPmRwu/9RFxW6L8CM4Ry8AAAAAElFTkSuQmCC';
export var TERM_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACzSURBVDhPY2AYNKCoqIgTiOcD8X8S8F6wB4Aa1IH4akNDw+mPHz++/E8EuHTp0jmQRSDNCcXFxa/XrVt3gAh9KEpgBvx/9OjRLVI1g9TDDYBp3rlz5//Kysr/IJoYgGEASPPatWsbQDQxAMOAbdu2gZ0FookBcAOePHlyhxgN6GqQY+Hdhg0bDpJqCNgAaDrQAnJuNDY2nvr06dMbYgw6e/bsabgBUEN4yEiJ2wdNViLfIQC3sTh2vtJcswAAAABJRU5ErkJggg==';
var FieldTaxonomyRenderer = (function (_super) {
    __extends(FieldTaxonomyRenderer, _super);
    function FieldTaxonomyRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.isFieldMounted = false;
        _this.previousValues = [];
        _this.cancel = true;
        var unprocessedCurrentValue = [];
        if (props.FormFieldValue) {
            if (props.IsMulti) {
                unprocessedCurrentValue = props.FormFieldValue.results;
            }
            else {
                unprocessedCurrentValue = [props.FormFieldValue];
            }
        }
        _this.state = {
            currentValue: [],
            unprocessedInitialValue: unprocessedCurrentValue,
            termSetAndTerms: null,
            loaded: false,
            openPanel: false,
            errorMessage: ''
        };
        _this.onOpenPanel = _this.onOpenPanel.bind(_this);
        _this.onClosePanel = _this.onClosePanel.bind(_this);
        _this.onSave = _this.onSave.bind(_this);
        _this.termsChanged = _this.termsChanged.bind(_this);
        _this.termsFromPickerChanged = _this.termsFromPickerChanged.bind(_this);
        _this.trySetValue = _this.trySetValue.bind(_this);
        return _this;
    }
    FieldTaxonomyRenderer.prototype.componentDidMount = function () {
        var _this = this;
        this.isFieldMounted = true;
        if (!this.state.termSetAndTerms) {
            this.termsService = new SPTermStorePickerService(this.props);
            this.termsService.getAllTerms(this.props.TaxonomyTermSetId).then(function (response) {
                if (response !== null) {
                    if (_this.isFieldMounted) {
                        _this.setState({
                            termSetAndTerms: response,
                            loaded: true
                        }, function () {
                            _this.trySetProcessedValue();
                        });
                    }
                }
            });
        }
        else {
            this.trySetProcessedValue();
        }
    };
    FieldTaxonomyRenderer.prototype.componentWillUnmount = function () {
        this.isFieldMounted = false;
    };
    FieldTaxonomyRenderer.prototype.renderNewForm = function (props) {
        return this.renderNewOrEditForm(props);
    };
    FieldTaxonomyRenderer.prototype.renderEditForm = function (props) {
        return this.renderNewOrEditForm(props);
    };
    FieldTaxonomyRenderer.prototype.renderDispForm = function () {
        if (this.props.FormFieldValue && this.props.FormFieldValue.length > 0) {
            return (React.createElement(React.Fragment, null, this.props.FormFieldValue.map(function (v) { return React.createElement("div", { key: v.key }, v.name); })));
        }
        return null;
    };
    FieldTaxonomyRenderer.prototype.renderNewOrEditForm = function (props) {
        var _this = this;
        return (React.createElement("div", null,
            !this.state.loaded ?
                React.createElement(Spinner, { type: SpinnerType.normal }) :
                React.createElement("table", { className: "termFieldTable" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { className: "termFieldRowPicker" },
                                React.createElement(TermPicker, { disabled: false, fieldProps: props, allTerms: this.state.termSetAndTerms ? this.state.termSetAndTerms.Terms : [], value: this.state.currentValue, isTermSetSelectable: false, onChanged: this.termsFromPickerChanged, allowMultipleSelections: props.IsMulti, disabledTermIds: null, disableChildrenOfDisabledParents: null })),
                            React.createElement("td", { className: "termFieldRowIcon" },
                                React.createElement(IconButton, { iconProps: { iconName: 'Tag' }, onClick: this.onOpenPanel }))))),
            React.createElement(FieldErrorMessage, { errorMessage: this.state.errorMessage }),
            React.createElement(Panel, { isOpen: this.state.openPanel, hasCloseButton: true, onDismiss: this.onClosePanel, isLightDismiss: true, type: PanelType.medium, headerText: this.state.termSetAndTerms ? this.state.termSetAndTerms.Name : '', onRenderFooterContent: function () {
                    return (React.createElement("div", { className: "actions" },
                        React.createElement(PrimaryButton, { iconProps: { iconName: 'Save' }, text: 'Save', value: 'Save', onClick: _this.onSave }),
                        React.createElement(DefaultButton, { iconProps: { iconName: 'Cancel' }, text: 'Cancel', value: 'Cancel', onClick: _this.onClosePanel })));
                } }, this.state.openPanel && this.state.loaded && this.state.termSetAndTerms && (React.createElement("div", { key: this.state.termSetAndTerms.Id },
                React.createElement(TermParent, { anchorId: props.TaxonomyAnchorId, autoExpand: null, termset: this.state.termSetAndTerms, isTermSetSelectable: false, activeNodes: this.state.currentValue, disabledTermIds: null, disableChildrenOfDisabledParents: null, changedCallback: this.termsChanged, multiSelection: props.IsMulti ? true : false }))))));
    };
    FieldTaxonomyRenderer.prototype.trySetProcessedValue = function () {
        var _this = this;
        if (!this.state.termSetAndTerms) {
            return;
        }
        var currentValue = this.state.currentValue;
        if (this.state.unprocessedInitialValue) {
            currentValue = this.state.unprocessedInitialValue.reduce(function (prevResults, iv) {
                var terms = _this.state.termSetAndTerms.Terms.filter(function (t) { return t.key === iv.TermGuid || t.key === iv.key; });
                if (terms && terms.length > 0) {
                    prevResults.push(terms[0]);
                }
                return prevResults;
            }, []);
            if (currentValue.length === 0) {
                if (this.props.FormFieldValue.results) {
                    currentValue = this.props.FormFieldValue.results;
                }
                else {
                    currentValue = this.props.FormFieldValue;
                }
            }
        }
        else {
            currentValue = this.props.FormFieldValue;
        }
        if (this.isFieldMounted) {
            this.setState({ currentValue: currentValue }, function () {
                _this.trySetValue(_this.state.currentValue);
            });
        }
    };
    FieldTaxonomyRenderer.prototype.onOpenPanel = function () {
        this.previousValues = this.state.currentValue.slice();
        this.cancel = true;
        this.setState({ openPanel: true });
    };
    FieldTaxonomyRenderer.prototype.onClosePanel = function () {
        var _this = this;
        var newState = {
            openPanel: false
        };
        if (this.cancel) {
            newState.currentValue = this.previousValues;
        }
        this.setState(newState, function () {
            _this.trySetValue(_this.state.currentValue);
        });
    };
    FieldTaxonomyRenderer.prototype.onSave = function () {
        this.cancel = false;
        this.onClosePanel();
    };
    FieldTaxonomyRenderer.prototype.termsChanged = function (term, checked) {
        var currentValue = this.state.currentValue;
        if (typeof term === 'undefined' || term === null) {
            return;
        }
        var termItem = term;
        if (checked) {
            if (this.props.IsMulti) {
                currentValue.push(termItem);
            }
            else {
                currentValue = [termItem];
            }
        }
        else {
            currentValue = currentValue.filter(function (item) { return item.key !== term.key; });
        }
        this.setState({
            currentValue: currentValue
        });
    };
    FieldTaxonomyRenderer.prototype.termsFromPickerChanged = function (terms) {
        var _this = this;
        this.setState({ currentValue: terms }, function () {
            _this.trySetValue(terms);
        });
    };
    FieldTaxonomyRenderer.prototype.trySetValue = function (terms) {
        var toSet = [];
        if (terms) {
            for (var _i = 0, terms_1 = terms; _i < terms_1.length; _i++) {
                var term = terms_1[_i];
                toSet.push("-1;#" + term.name + "|" + term.key);
            }
        }
        this.trySetChangedValue(terms);
    };
    return FieldTaxonomyRenderer;
}(BaseFieldRenderer));
export { FieldTaxonomyRenderer };
//# sourceMappingURL=TaxonomyPicker.js.map