var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var id = 0;
export default (function (_a, self) {
    var initialState = _a.initialState;
    var reduxDevTools = window['devToolsExtension'];
    var instanceID = id;
    id += 1;
    var name = "react-waterfall - " + instanceID;
    var features = {
        jump: true
    };
    var devTools = reduxDevTools.connect({ name: name, features: features });
    devTools.subscribe(function (data) {
        switch (data.type) {
            case 'START':
                devTools.init(initialState);
                break;
            case 'RESET':
                self.setState(initialState);
                break;
            case 'DISPATCH':
                switch (data.payload.type) {
                    case 'JUMP_TO_STATE':
                    case 'JUMP_TO_ACTION': {
                        self.setState(JSON.parse(data.state));
                        break;
                    }
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    });
    return function (action) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        devTools.send(__assign({ type: action }, arg), self.state, {}, instanceID);
    };
});
//# sourceMappingURL=devtools.js.map