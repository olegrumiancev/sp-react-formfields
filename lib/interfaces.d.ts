import { SPRest, AttachmentFileInfo } from '@pnp/sp';
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
    NewAttachments?: any[];
    ExistingAttachmentsToDelete?: any[];
}
export interface IFormManagerActions {
    getState(): IFormManagerProps;
    initStore(sPWebUrl: string, currentListId: string, currentMode: number, currentItemId?: number): any;
    setFormMode(mode: number): void;
    setItemId(itemId: number): void;
    setFieldData(internalName: string, newValue: any): void;
    addNewAttachmentInfo(fileInfo: any): void;
    removeNewAttachmentInfo(fileInfo: any): void;
    addOrRemoveExistingAttachmentDeletion(attachmentName: string): void;
    getFieldControlValuesForPost(): Object;
    getNewAttachmentsToSave(): Promise<AttachmentFileInfo[]>;
    saveFormData(): Promise<ISaveItemResult>;
}
export interface IFormFieldProps {
    InternalName: string;
    FormMode?: number;
}
export interface ISaveItemResult {
    IsSuccessful: boolean;
    ErrorObject?: object;
    ItemId: number;
    RestObject: object;
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
    NumberIsPercent?: boolean;
    DateTimeIsTimePresent?: boolean;
    ExistingAttachmentsToDelete?: any[];
    CurrentMode: number;
    pnpSPRest: SPRest;
    saveChangedFieldData?(fieldInternalName: string, newValue: any): void;
    getFieldRendererObject?(fieldRenderer: BaseFieldRenderer): void;
}
export interface ICreateFieldRendererConfig {
    FieldRendererComponent: BaseFieldRenderer;
    FieldRendererProps: IFieldProps;
}
