/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
export declare class FieldUrlRenderer extends BaseFieldRenderer {
    constructor(props: IFieldProps);
    componentDidMount(): void;
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    private renderNewOrEditForm;
    private getSplitValues;
    private onValueChange;
    private validateUrlLength;
}
