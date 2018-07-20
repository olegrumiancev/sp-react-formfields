/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import './FieldUserRenderer.css';
export declare class FieldUserRenderer extends BaseFieldRenderer {
    private isFieldMounted;
    constructor(props: IFieldProps);
    componentWillUnmount(): void;
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
