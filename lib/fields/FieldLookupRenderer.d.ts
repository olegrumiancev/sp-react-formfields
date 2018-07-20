/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import './FieldLookupRenderer.css';
export declare class FieldLookupRenderer extends BaseFieldRenderer {
    private tagPicker;
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): any;
    private renderNewOrEditForm;
    private processTagItemsChange;
    private resolveTagSuggestions;
    private getPossibleSuggestionsInternal;
    private getPnpWeb;
    private selectedItemsContainTag;
    private constructNewState;
}
