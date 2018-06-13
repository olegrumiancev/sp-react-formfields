/// <reference types="react" />
import { IFieldProps } from '../interfaces';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export declare class FieldMultilineTextRenderer extends BaseFieldRenderer {
    constructor(props: IFieldProps);
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    private renderAllForms(editable);
    private onChange;
}
