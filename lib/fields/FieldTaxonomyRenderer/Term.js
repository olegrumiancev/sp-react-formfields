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
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
var Term = (function (_super) {
    __extends(Term, _super);
    function Term(props) {
        var _this = _super.call(this, props) || this;
        var active = [];
        if (_this.props.activeNodes) {
            active = _this.props.activeNodes.filter(function (item) { return item.key === _this.props.term.key; });
        }
        _this.state = {
            selected: active.length > 0
        };
        _this._handleChange = _this._handleChange.bind(_this);
        return _this;
    }
    Term.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        var _this = this;
        if (!this.props.multiSelection) {
            var active = nextProps.activeNodes.filter(function (item) { return item.key === _this.props.term.key; });
            this.setState({ selected: active.length > 0 });
        }
    };
    Term.prototype.render = function () {
        var styleProps = {
            marginLeft: (this.props.term.pathDepth * 30) + "px"
        };
        return (React.createElement("div", { className: 'listItem' + " " + 'term', style: styleProps },
            React.createElement(Checkbox, { checked: this.state.selected, disabled: this.props.term.isDeprecated || this.props.disabled, className: this.props.term.isDeprecated ? "termDisabled" : "termEnabled", label: this.props.term.name, onChange: this._handleChange })));
    };
    Term.prototype._handleChange = function (ev, isChecked) {
        this.setState({
            selected: isChecked
        });
        this.props.changedCallback(this.props.term, isChecked);
    };
    return Term;
}(React.Component));
export default Term;
//# sourceMappingURL=Term.js.map