/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
export declare class FieldAttachmentRenderer extends BaseFieldRenderer {
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    private renderAllForms();
    private getExistingItemsPart();
    private getUploadPart();
    private onFileAdded;
    private onExistingFileDeleteClick;
    private onDrop;
}
