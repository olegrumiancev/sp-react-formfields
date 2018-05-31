/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
export declare class FieldUserRenderer extends BaseFieldRenderer {
    constructor(props: IFieldProps);
    componentDidMount(): void;
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    private renderNewOrEditForm();
    private getTextFromItem(persona);
    private validateInput;
    private onItemsChange;
    private onRemoveSuggestion;
    private onFilterChanged;
    private saveDataInternal;
}
