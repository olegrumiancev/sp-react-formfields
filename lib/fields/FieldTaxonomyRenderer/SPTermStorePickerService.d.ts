import { IPickerTerm, IPickerTermSet } from './interfaces';
import { IFieldProps } from '../../interfaces';
export default class SPTermStorePickerService {
    private props;
    constructor(props: IFieldProps);
    getAllTerms(termsetId: string): Promise<IPickerTermSet>;
    searchTermsByName(searchText: string): Promise<IPickerTerm[]>;
    cleanGuid(guid: string): string;
    private searchTermsByTermSet;
    private isGuid;
    private sortTermsInTermSetByHierarchy;
    private getSortedTermsForAParent;
}
