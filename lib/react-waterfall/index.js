var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { createContext } from 'react';
import createProvider from './Components/Provider';
import createConnect from './helpers/connect';
import Subscriptions from './helpers/subscriptions';
import devtools from './helpers/devtools';
var defaultMiddlewares = process.env.NODE_ENV === 'development' &&
    typeof window !== 'undefined' &&
    window['devToolsExtension']
    ? [devtools]
    : [];
var createStore = function (_a, middlewares) {
    var initialState = _a.initialState, _b = _a.actionsCreators, actionsCreators = _b === void 0 ? {} : _b;
    if (middlewares === void 0) { middlewares = []; }
    var provider;
    var context = createContext(null);
    var _c = new Subscriptions(), getSubscriptions = _c.getSubscriptions, subscribe = _c.subscribe, unsubscribe = _c.unsubscribe;
    var setProvider = function (self) {
        var initializedMiddlewares = middlewares.concat(defaultMiddlewares).map(function (middleware) {
            return middleware({ initialState: initialState, actionsCreators: actionsCreators }, self, actions);
        });
        provider = {
            setState: function (state, callback) { return self.setState(state, callback); },
            initializedMiddlewares: initializedMiddlewares
        };
    };
    var state = initialState;
    var setState = function (action, result) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        state = __assign({}, state, result);
        return new Promise(function (resolve) {
            var subscriptions = getSubscriptions();
            subscriptions.forEach(function (fn) { return fn.apply(void 0, [action, result].concat(args)); });
            provider.setState(state, function () {
                provider.initializedMiddlewares.forEach(function (m) { return m.apply(void 0, [action].concat(args)); });
                resolve();
            });
        });
    };
    var actions = Object.keys(actionsCreators).reduce(function (r, v) {
        var _a;
        return (__assign({}, r, (_a = {}, _a[v] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!provider) {
                console.error('<Provider /> is not initialized yet');
                return;
            }
            var result = actionsCreators[v].apply(actionsCreators, [state, actions].concat(args));
            return result.then
                ? result.then(function (result) { return setState.apply(void 0, [v, result].concat(args)); })
                : setState.apply(void 0, [v, result].concat(args));
        }, _a)));
    }, {});
    var Provider = createProvider(setProvider, context.Provider, initialState);
    var connect = createConnect(context.Consumer);
    return {
        Provider: Provider,
        connect: connect,
        actions: actions,
        subscribe: subscribe,
        unsubscribe: unsubscribe
    };
};
export default createStore;
//# sourceMappingURL=index.js.map