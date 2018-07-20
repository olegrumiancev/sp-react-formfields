var currencies = require('./currencies.json');
export var getCurrency = function (lcid) {
    if (lcid in currencies) {
        return currencies[lcid];
    }
    return null;
};
//# sourceMappingURL=localeCurrency.js.map