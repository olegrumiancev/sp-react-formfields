import { IFieldProps } from '../../interfaces';
export interface ITaxonomyPickerProps {
    label: string;
    panelTitle: string;
    allowMultipleSelections?: boolean;
    initialValues?: IPickerTerms;
    termsetNameOrID: string;
    anchorId?: string;
    isTermSetSelectable?: boolean;
    disabledTermIds?: string[];
    disableChildrenOfDisabledParents?: boolean;
    disabled?: boolean;
    onGetErrorMessage?: (value: IPickerTerms) => string | Promise<string>;
    onChange?: (newValue?: IPickerTerms) => void;
}
export interface ITaxonomyPickerState {
    termSetAndTerms?: IPickerTermSet;
    errorMessage?: string;
    openPanel?: boolean;
    loaded?: boolean;
    currentValue?: IPickerTerms;
}
export interface ITermChanges {
    changedCallback: (term: IPickerTerm, checked: boolean) => void;
    activeNodes?: IPickerTerms;
    disabledTermIds?: string[];
    disableChildrenOfDisabledParents?: boolean;
}
export interface ITermParentProps extends ITermChanges {
    termset: IPickerTermSet;
    multiSelection: boolean;
    anchorId?: string;
    isTermSetSelectable?: boolean;
    autoExpand: () => void;
    termSetSelectedChange?: (termSet: IPickerTermSet, isChecked: boolean) => void;
}
export interface ITermParentState {
    loaded?: boolean;
    expanded?: boolean;
}
export interface ITermProps extends ITermChanges {
    termset: string;
    term: IPickerTerm;
    multiSelection: boolean;
    disabled: boolean;
}
export interface ITermState {
    selected?: boolean;
}
export interface ITermPickerState {
    terms: IPickerTerms;
}
export interface ITermPickerProps {
    fieldProps: IFieldProps;
    disabled: boolean;
    value: IPickerTerm[];
    allTerms: IPickerTerm[];
    allowMultipleSelections: boolean;
    isTermSetSelectable?: boolean;
    disabledTermIds?: string[];
    disableChildrenOfDisabledParents?: boolean;
    onChanged: (items: IPickerTerm[]) => void;
}
export interface IPickerTerm {
    name: string;
    key: string;
    parentId: string;
    customSortOrder: string;
    path: string;
    pathDepth: number;
    termSet: string;
    termSetName?: string;
    isDeprecated: boolean;
}
export interface IPickerTermSet {
    Id: string;
    Name: string;
    Description: string;
    CustomSortOrder: string;
    Terms?: IPickerTerm[];
}
export interface IPickerTerms extends Array<IPickerTerm> {
}
export interface IPropertyFieldTermPickerProps {
    label: string;
    panelTitle: string;
    allowMultipleSelections?: boolean;
    initialValues?: IPickerTerms;
    excludeSystemGroup?: boolean;
    limitByGroupNameOrID?: string;
    limitByTermsetNameOrID?: string;
    properties: any;
    key: string;
    disabled?: boolean;
    onGetErrorMessage?: (value: IPickerTerms) => string | Promise<string>;
    deferredValidationTime?: number;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
}
