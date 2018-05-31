import { SPRest } from '@pnp/sp';
import { BaseFieldRenderer } from './fields';
export interface IFormMode {
    New: number;
    Display: number;
    Edit: number;
}
export declare const FormMode: IFormMode;
export interface IFormManagerProps {
    PnPSPRest?: SPRest;
    SPWebUrl: string;
    CurrentListId: string;
    CurrentMode: number;
    CurrentItemId?: number;
    Fields?: IFieldProps[];
    IsLoading: boolean;
}
export interface IFormFieldProps {
    InternalName: string;
    FormMode?: number;
}
export interface IFieldProps {
    Title: string;
    InternalName: string;
    EntityPropertyName: string;
    IsMulti: boolean;
    IsHidden: boolean;
    IsRequired: boolean;
    FormFieldValue: any;
    Type: string;
    Description: string;
    Choices?: string[];
    LookupListId?: string;
    LookupWebId?: string;
    LookupField?: string;
    CurrentMode: number;
    pnpSPRest: SPRest;
    saveChangedFieldData?(fieldInternalName: string, newValue: any): void;
    getFieldRendererObject?(fieldRenderer: BaseFieldRenderer): void;
}
export interface ICreateFieldRendererConfig {
    FieldRendererComponent: BaseFieldRenderer;
    FieldRendererProps: IFieldProps;
}
