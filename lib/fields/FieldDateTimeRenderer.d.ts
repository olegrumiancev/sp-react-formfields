/// <reference types="react" />
import 'rc-time-picker/assets/index.css';
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
export declare class FieldDateTimeRenderer extends BaseFieldRenderer {
    private timeFormat;
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    private renderNewOrEditForm;
    private getStateObjectFromISO;
    private onDateChange;
    private onTimeChange;
    private getCompositeDateForSaving;
}
