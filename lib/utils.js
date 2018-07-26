var escapeChars = { lt: '<', gt: '>', quot: '"', apos: '\'', amp: '&' };
export var unescapeHTML = function (str) {
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;
        if (entityCode in escapeChars) {
            return escapeChars[entityCode];
        }
        else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
        }
        else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        }
        else {
            return entity;
        }
    });
};
export var handleError = function (msg) {
    console.error(msg);
};
export var getFieldPropsByInternalName = function (allProps, internalName) {
    if (!allProps || allProps.length < 1 || !internalName) {
        return null;
    }
    var filtered = allProps.filter(function (f) { return f.InternalName === internalName; });
    if (filtered && filtered.length > 0) {
        return filtered[0];
    }
    return null;
};
//# sourceMappingURL=utils.js.map