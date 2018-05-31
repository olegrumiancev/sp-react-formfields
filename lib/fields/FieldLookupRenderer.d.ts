/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
export declare class FieldLookupRenderer extends BaseFieldRenderer {
    private allItemsLoading;
    private tagPicker;
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): any;
    private renderNewOrEditForm();
    private processTagItemsChange(items);
    private resolveTagSuggestions(filterText, selectedItems);
    private getPossibleSuggestionsInternal(filterText, selectedItems);
    private getPnpWeb(webId);
    private selectedItemsContainTag(tag, tagList);
    private saveFieldDataInternal(newValue);
    private constructNewState(value, toAdd);
}
