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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import { PureComponent } from 'react';
var Prevent = (function (_super) {
    __extends(Prevent, _super);
    function Prevent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Prevent.prototype.render = function () {
        var _a = this.props, renderComponent = _a.renderComponent, rest = __rest(_a, ["renderComponent"]);
        return renderComponent(rest);
    };
    return Prevent;
}(PureComponent));
export default Prevent;
//# sourceMappingURL=Prevent.js.map