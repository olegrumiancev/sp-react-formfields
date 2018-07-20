/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import './FieldChoiceRenderer.css';
export declare class FieldChoiceRenderer extends BaseFieldRenderer {
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): any;
    private renderNewOrEditForm;
    private saveFieldDataInternal;
    private constructNewState;
}
