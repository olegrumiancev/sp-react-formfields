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
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { EXPANDED_IMG, COLLAPSED_IMG, TERMSET_IMG, TERM_IMG } from './TaxonomyPicker';
import Term from './Term';
var TermParent = (function (_super) {
    __extends(TermParent, _super);
    function TermParent(props) {
        var _this = _super.call(this, props) || this;
        _this._terms = _this.props.termset.Terms;
        _this.state = {
            loaded: true,
            expanded: true
        };
        _this._handleClick = _this._handleClick.bind(_this);
        return _this;
    }
    TermParent.prototype.componentWillMount = function () {
        var _this = this;
        if (this.props.anchorId) {
            var anchorTerm_1 = this._terms.filter(function (t) { return t.key.toLowerCase() === _this.props.anchorId.toLowerCase(); }).shift();
            if (anchorTerm_1) {
                this._anchorName = anchorTerm_1.name;
                var anchorTerms = this._terms.filter(function (t) { return t.path.substring(0, anchorTerm_1.path.length) === anchorTerm_1.path && t.key !== anchorTerm_1.key; });
                anchorTerms = anchorTerms.map(function (term) {
                    term.pathDepth = term.pathDepth - anchorTerm_1.pathDepth;
                    return term;
                });
                this._terms = anchorTerms;
            }
        }
    };
    TermParent.prototype.render = function () {
        var _this = this;
        var styleProps = {
            display: this.state.expanded ? 'block' : 'none'
        };
        var termElm = React.createElement("div", null);
        if (this.state.loaded) {
            if (this._terms.length > 0) {
                var disabledPaths_1 = [];
                termElm = (React.createElement("div", { style: styleProps }, this._terms.map(function (term) {
                    var disabled = false;
                    if (_this.props.disabledTermIds && _this.props.disabledTermIds.length > 0) {
                        disabled = _this.props.disabledTermIds.indexOf(term.key) !== -1;
                        if (disabled) {
                            disabledPaths_1.push(term.path);
                        }
                    }
                    if (_this.props.disableChildrenOfDisabledParents) {
                        var parentPath = disabledPaths_1.filter(function (p) { return term.path.indexOf(p) !== -1; });
                        disabled = parentPath && parentPath.length > 0;
                    }
                    return React.createElement(Term, { key: term.key, term: term, termset: _this.props.termset.Id, activeNodes: _this.props.activeNodes, changedCallback: _this.props.changedCallback, multiSelection: _this.props.multiSelection, disabled: disabled });
                })));
            }
            else {
                termElm = React.createElement("div", { className: 'listItem' + " " + 'term' }, "No terms found");
            }
        }
        else {
            termElm = React.createElement(Spinner, { type: SpinnerType.normal });
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: 'listItem' + " " + 'termset' + " " + ((!this.props.anchorId && this.props.isTermSetSelectable) ? 'termSetSelectable' : ''), onClick: this._handleClick },
                React.createElement("img", { src: this.state.expanded ? EXPANDED_IMG : COLLAPSED_IMG, alt: "TaxonomyPickerExpandTitle", title: "TaxonomyPickerExpandTitle" }),
                React.createElement("img", { src: this.props.anchorId ? TERM_IMG : TERMSET_IMG, alt: "TaxonomyPickerMenuTermSet", title: "TaxonomyPickerMenuTermSet" }),
                this.props.anchorId ?
                    this._anchorName :
                    this.props.termset.Name),
            React.createElement("div", { style: styleProps }, termElm)));
    };
    TermParent.prototype._handleClick = function () {
        this.setState({
            expanded: !this.state.expanded
        });
    };
    return TermParent;
}(React.Component));
export default TermParent;
//# sourceMappingURL=TermParent.js.map