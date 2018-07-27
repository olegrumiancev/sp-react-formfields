var Subscriptions = (function () {
    function Subscriptions() {
        var _this = this;
        this.subscriptions = [];
        this.getSubscriptions = function () { return _this.subscriptions; };
        this.subscribe = function (subscription) {
            _this.subscriptions = _this.subscriptions.concat([subscription]);
        };
        this.unsubscribe = function (subscription) {
            _this.subscriptions = _this.subscriptions.filter(function (subscriber) { return subscriber !== subscription; });
        };
    }
    return Subscriptions;
}());
export default Subscriptions;
//# sourceMappingURL=subscriptions.js.map