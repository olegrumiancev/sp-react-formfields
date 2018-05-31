import { IFieldProps } from '../interfaces';
import { SPRest, sp } from '@pnp/sp';

export const FieldPropsManager = {
  createFieldRendererPropsFromFieldMetadata: (fieldMetadata: any, formMode: number, spListItem: any, spRest: SPRest) => {
    if (fieldMetadata == null) {
      return null;
    }

    let fieldProps = {
      CurrentMode: formMode,
      Title: fieldMetadata.Title,
      InternalName: fieldMetadata.InternalName,
      EntityPropertyName: fieldMetadata.EntityPropertyName,
      IsHidden: fieldMetadata.Hidden,
      IsRequired: fieldMetadata.Required,
      IsMulti: fieldMetadata.TypeAsString.match(/multi/gi),
      Type: fieldMetadata.TypeAsString,
      Description: fieldMetadata.Description,
      pnpSPRest: spRest == null ? sp : spRest
    } as IFieldProps;

    if (spListItem != null && spListItem[fieldProps.InternalName] != null && spListItem[fieldProps.InternalName].__deferred == null) {
      fieldProps.FormFieldValue = spListItem[fieldProps.InternalName];
    }

    fieldProps = addFieldTypeSpecificProperties(fieldProps, fieldMetadata);
    return fieldProps;
  }
}

const addFieldTypeSpecificProperties = (fieldProps: IFieldProps, fieldMetadata: any): IFieldProps => {
  let result = fieldProps;
  switch (fieldProps.Type) {
    case 'Choice':
    case 'MultiChoice':
      result = addChoiceFieldProperties(fieldProps, fieldMetadata);
      break;
    case 'Lookup':
    case 'LookupMulti':
      result = addLookupFieldProperties(fieldProps, fieldMetadata);
      break;
    default:
      break;
  }
  return result;
}

const addChoiceFieldProperties = (fieldProps: IFieldProps, fieldMetadata: any): IFieldProps => {
  fieldProps.Choices = fieldMetadata.Choices == null ? undefined : fieldMetadata.Choices.results
  return fieldProps;
}

const addLookupFieldProperties = (fieldProps: IFieldProps, fieldMetadata: any): IFieldProps => {
  fieldProps.LookupListId = fieldMetadata.LookupList == null ? undefined : fieldMetadata.LookupList,
  fieldProps.LookupWebId = fieldMetadata.LookupWebId == null ? undefined : fieldMetadata.LookupWebId,
  fieldProps.LookupField = fieldMetadata.LookupField == null || fieldMetadata.LookupField === '' ? 'Title' : fieldMetadata.LookupField
  return fieldProps;
}