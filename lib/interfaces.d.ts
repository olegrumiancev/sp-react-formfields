/// <reference types="sharepoint" />
import { SPRest, AttachmentFileInfo } from '@pnp/sp';
import { BaseFieldRenderer } from './fields';
export interface IFormMode {
    New: number;
    Display: number;
    Edit: number;
}
export declare const FormMode: IFormMode;
export interface IListFormProps {
    CurrentListId?: string;
    CurrentItemId?: number;
    SpWebUrl?: string;
    CurrentMode: number;
    IsLoading?: boolean;
    IsSaving?: boolean;
    pnpSPRest?: SPRest;
}
export interface IFormMessage {
    Text: string;
    DialogCallback?: (globalState: IFormManagerProps) => void;
}
export interface IFormManagerProps {
    PnPSPRest?: SPRest;
    SPWebUrl: string;
    CurrentListId: string;
    CurrentMode: number;
    CurrentItemId?: number;
    Fields?: IFieldProps[];
    IsLoading: boolean;
    ShowValidationErrors: boolean;
    ETag: string;
    GlobalMessage?: IFormMessage;
}
export interface IFormManagerActions {
    getState(): IFormManagerProps;
    initStore(sPWebUrl: string, currentListId: string, currentMode: number, currentItemId?: number): Promise<IFormManagerProps>;
    setLoading(isLoading: boolean): any;
    setFormMode(mode: number): void;
    setItemId(itemId: number): void;
    setFieldData(internalName: string, newValue: any): void;
    setFieldValidationState(internalName: string, isValid: boolean, validationErrors: string[]): any;
    setFieldPropValue(internalName: string, propName: string, propValue: any): any;
    addNewAttachmentInfo(fileInfo: any): void;
    removeNewAttachmentInfo(fileInfo: any): void;
    addOrRemoveExistingAttachmentDeletion(attachmentName: string): void;
    getFieldControlValuesForPost(): Promise<Object>;
    getNewAttachmentsToSave(): Promise<AttachmentFileInfo[]>;
    clearHelperAttachmentProperties(): void;
    saveFormData(): Promise<ISaveItemResult>;
    validateForm(): boolean;
    setShowValidationErrors(show: boolean): void;
    addValidatorToField(validator: Function, internalName: string, ...validatorParams: any[]): void;
    clearValidatorsFromField(internalName: string): void;
    setFormMessage(message: string, callback: () => void): void;
}
export interface IFormFieldProps {
    InternalName: string;
    FormMode?: number;
    CustomValidators?: Function[];
}
export interface IValidateFieldResult {
    IsValid: boolean;
    ValidationErrors: string[];
}
export interface ISaveItemResult {
    IsSuccessful: boolean;
    Error?: string;
    ItemId: number;
    RestObject: object;
    ETag: string;
}
export interface IFieldProps {
    SchemaXml: XMLDocument;
    Title: string;
    InternalName: string;
    EntityPropertyName: string;
    IsMulti: boolean;
    IsHidden: boolean;
    IsRequired: boolean;
    FormFieldValue: any;
    DefaultValue?: any;
    Max?: number;
    Min?: number;
    Type: string;
    Description: string;
    IsRichText?: boolean;
    Choices?: string[];
    FillInChoice?: boolean;
    LookupListId?: string;
    LookupWebId?: string;
    LookupField?: string;
    TaxonomyTermSetId?: string;
    TaxonomyAnchorId?: string;
    TaxonomyIsOpen?: boolean;
    TaxonomyUpdateFieldEntityPropertyName?: string;
    UserSelectionMode?: string;
    NumberIsPercent?: boolean;
    DateTimeIsTimePresent?: boolean;
    CurrencyLocaleId?: number;
    UrlRenderAsPicture?: boolean;
    AttachmentsNewToAdd?: any[];
    AttachmentsExistingToDelete?: any[];
    CurrentMode: number;
    CurrentListId: string;
    ShowValidationErrors: boolean;
    pnpSPRest: SPRest;
    Validators?: Function[];
    IsValid?: boolean;
    ValidationErrors?: string[];
    saveChangedFieldData?(fieldInternalName: string, newValue: any): void;
    getFieldRendererObject?(fieldRenderer: BaseFieldRenderer): void;
}
export interface ICreateFieldRendererConfig {
    FieldRendererComponent: BaseFieldRenderer;
    FieldRendererProps: IFieldProps;
}
export interface IValidationManager {
    defaultValidators: {
        required(internalName: string): string;
        mustMatch(internalName1: string, internalName2: string): string;
        minLength(internalName: string, length: number): string;
        maxLength(internaName: string, length: number): string;
        minValue(internalName: string, minValue: number): string;
        maxValue(internaName: string, maxValue: number): string;
    };
    validateField(fieldProps: IFieldProps): IValidateFieldResult;
}
export declare const getQueryString: (url: any, field: any) => string;
export declare const executeSPQuery: (ctx: SP.ClientRuntimeContext) => Promise<any>;
export declare const ODataMode = "application/json;odata=verbose";
export declare const setupPnp: (sp: SPRest, webUrl: any) => void;
