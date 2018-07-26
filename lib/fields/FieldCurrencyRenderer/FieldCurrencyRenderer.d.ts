/// <reference types="react" />
import { IFieldProps } from '../../interfaces';
import { BaseFieldRenderer } from '../BaseFieldRenderer';
export declare class FieldCurrencyRenderer extends BaseFieldRenderer {
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    private renderNewOrEditForm;
    private onChanged;
    private onKeypress;
}
