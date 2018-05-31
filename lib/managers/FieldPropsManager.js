import { sp } from '@pnp/sp';
export var FieldPropsManager = {
    createFieldRendererPropsFromFieldMetadata: function (fieldMetadata, formMode, spListItem, spRest) {
        if (fieldMetadata == null) {
            return null;
        }
        var fieldProps = {
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
        };
        if (spListItem != null && spListItem[fieldProps.InternalName] != null && spListItem[fieldProps.InternalName].__deferred == null) {
            fieldProps.FormFieldValue = spListItem[fieldProps.InternalName];
        }
        fieldProps = addFieldTypeSpecificProperties(fieldProps, fieldMetadata);
        return fieldProps;
    }
};
var addFieldTypeSpecificProperties = function (fieldProps, fieldMetadata) {
    var result = fieldProps;
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
};
var addChoiceFieldProperties = function (fieldProps, fieldMetadata) {
    fieldProps.Choices = fieldMetadata.Choices == null ? undefined : fieldMetadata.Choices.results;
    return fieldProps;
};
var addLookupFieldProperties = function (fieldProps, fieldMetadata) {
    fieldProps.LookupListId = fieldMetadata.LookupList == null ? undefined : fieldMetadata.LookupList,
        fieldProps.LookupWebId = fieldMetadata.LookupWebId == null ? undefined : fieldMetadata.LookupWebId,
        fieldProps.LookupField = fieldMetadata.LookupField == null || fieldMetadata.LookupField === '' ? 'Title' : fieldMetadata.LookupField;
    return fieldProps;
};
//# sourceMappingURL=FieldPropsManager.js.map