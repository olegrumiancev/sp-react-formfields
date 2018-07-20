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
import * as Taxonomy from '@pnp/sp-taxonomy';
var SPTermStorePickerService = (function () {
    function SPTermStorePickerService(props) {
        this.props = props;
    }
    SPTermStorePickerService.prototype.getAllTerms = function (termsetId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var termSet, result, retrievedTerms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Taxonomy.taxonomy.getDefaultSiteCollectionTermStore().getTermSetById(termsetId)
                            .usingCaching()
                            .get()];
                    case 1:
                        termSet = _a.sent();
                        result = null;
                        if (!termSet) return [3, 3];
                        result = {
                            Id: termsetId,
                            Name: termSet.Name,
                            Description: termSet.Description,
                            CustomSortOrder: termSet.CustomSortOrder
                        };
                        return [4, Taxonomy.taxonomy.getDefaultSiteCollectionTermStore().getTermSetById(termsetId)
                                .terms
                                .select('Id', 'Name', 'PathOfTerm', 'IsDeprecated', 'Parent', 'CustomSortOrder')
                                .usingCaching()
                                .get()];
                    case 2:
                        retrievedTerms = _a.sent();
                        if (retrievedTerms) {
                            result.Terms = retrievedTerms.map(function (rt) {
                                return {
                                    key: _this.cleanGuid(rt.Id),
                                    parentId: rt.Parent ? _this.cleanGuid(rt.Parent.Id) : null,
                                    customSortOrder: rt.CustomSortOrder ? rt.CustomSortOrder : null,
                                    name: rt.Name,
                                    path: rt.PathOfTerm,
                                    pathDepth: rt.PathOfTerm ? rt.PathOfTerm.split(';').length : 1,
                                    termSet: termsetId,
                                    termSetName: result.Name,
                                    isDeprecated: rt.IsDeprecated
                                };
                            });
                        }
                        _a.label = 3;
                    case 3: return [2, this.sortTermsInTermSetByHierarchy(result)];
                }
            });
        });
    };
    SPTermStorePickerService.prototype.searchTermsByName = function (searchText) {
        return this.searchTermsByTermSet(searchText, this.props.TaxonomyTermSetId);
    };
    SPTermStorePickerService.prototype.cleanGuid = function (guid) {
        if (guid !== undefined) {
            return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
        }
        else {
            return '';
        }
    };
    SPTermStorePickerService.prototype.searchTermsByTermSet = function (searchText, termSetId, termLimit) {
        var _this = this;
        if (termLimit === void 0) { termLimit = 10; }
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var allTerms, filteredTerms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getAllTerms(termSetId)];
                    case 1:
                        allTerms = _a.sent();
                        filteredTerms = allTerms.Terms.filter(function (t) { return t.name.match(new RegExp(searchText, 'gi')); });
                        if (filteredTerms.length > termLimit) {
                            filteredTerms = filteredTerms.slice(0, termLimit - 1);
                        }
                        resolve(filteredTerms);
                        return [2];
                }
            });
        }); });
    };
    SPTermStorePickerService.prototype.isGuid = function (strGuid) {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(strGuid);
    };
    SPTermStorePickerService.prototype.sortTermsInTermSetByHierarchy = function (termSet) {
        if (!termSet) {
            return termSet;
        }
        var mockRootLevelTerm = {
            key: null,
            name: '',
            customSortOrder: termSet.CustomSortOrder,
            isDeprecated: false,
            parentId: null,
            path: '',
            pathDepth: 0,
            termSet: ''
        };
        var sortedTerms = [];
        var toProcess = this.getSortedTermsForAParent(termSet.Terms, mockRootLevelTerm);
        while (toProcess.length > 0) {
            var item = toProcess[0];
            sortedTerms.push(item);
            var currentItemChildren = this.getSortedTermsForAParent(termSet.Terms, item);
            if (currentItemChildren.length > 0) {
                toProcess.splice.apply(toProcess, [0, 1].concat(currentItemChildren));
            }
            else {
                toProcess.splice(0, 1);
            }
        }
        termSet.Terms = sortedTerms;
        return termSet;
    };
    SPTermStorePickerService.prototype.getSortedTermsForAParent = function (allUnsortedTerms, parentPickerTerm) {
        var results = allUnsortedTerms.filter(function (f) { return f.parentId === parentPickerTerm.key; });
        if (parentPickerTerm.customSortOrder) {
            var orderedTermIds = parentPickerTerm.customSortOrder.split(':');
            var sortedResults = [];
            var _loop_1 = function (id) {
                var res = results.filter(function (r) { return r.key === id; });
                if (res.length > 0) {
                    sortedResults.push(res[0]);
                }
            };
            for (var _i = 0, orderedTermIds_1 = orderedTermIds; _i < orderedTermIds_1.length; _i++) {
                var id = orderedTermIds_1[_i];
                _loop_1(id);
            }
            return sortedResults;
        }
        else {
            return results;
        }
    };
    return SPTermStorePickerService;
}());
export default SPTermStorePickerService;
//# sourceMappingURL=SPTermStorePickerService.js.map