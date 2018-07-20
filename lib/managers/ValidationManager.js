import { FormFieldsStore } from '../store';
import { getFieldPropsByInternalName } from '../utils';
var required = function (internalName) {
    var globalState = FormFieldsStore.actions.getState();
    var fieldProps = getFieldPropsByInternalName(globalState.Fields, internalName);
    if (!fieldProps) {
        return "Could not find a field by internal name '" + internalName + "'";
    }
    var valueIsArray = Array.isArray(fieldProps.FormFieldValue);
    if ((valueIsArray && fieldProps.FormFieldValue.length > 0) || (!valueIsArray && fieldProps.FormFieldValue)) {
        return null;
    }
    else {
        return fieldProps.Title + " field is required";
    }
};
var mustMatch = function (internalName1, internalName2) {
    var globalState = FormFieldsStore.actions.getState();
    var fieldProps1 = getFieldPropsByInternalName(globalState.Fields, internalName1);
    var fieldProps2 = getFieldPropsByInternalName(globalState.Fields, internalName2);
    if (!fieldProps1) {
        return "Could not find a field by internal name '" + internalName1 + "'";
    }
    if (!fieldProps2) {
        return "Could not find a field by internal name '" + internalName2 + "'";
    }
    var errorText = fieldProps1.Title + " does not match " + fieldProps2.Title;
    var valueIsArray = Array.isArray(fieldProps1.FormFieldValue);
    var isEqual = false;
    if (valueIsArray) {
        if (fieldProps1.FormFieldValue.length === fieldProps2.FormFieldValue.length) {
            isEqual = true;
            for (var i = 0; i < fieldProps1.FormFieldValue.length; i++) {
                if (fieldProps1.FormFieldValue[i] !== fieldProps2.FormFieldValue[i]) {
                    isEqual = false;
                    break;
                }
            }
        }
    }
    else {
        isEqual = fieldProps1.FormFieldValue === fieldProps2.FormFieldValue;
    }
    return isEqual ? null : errorText;
};
var minLength = function (internalName, length) {
    var globalState = FormFieldsStore.actions.getState();
    var fieldProps = getFieldPropsByInternalName(globalState.Fields, internalName);
    if (!fieldProps) {
        return "Could not find a field by internal name '" + internalName + "'";
    }
    var textLength = fieldProps.FormFieldValue ? fieldProps.FormFieldValue.length : 0;
    var errorText = fieldProps.Title + " must be at least " + length + " character(-s)";
    return textLength >= length ? null : errorText;
};
var maxLength = function (internalName, length) {
    var globalState = FormFieldsStore.actions.getState();
    var fieldProps = getFieldPropsByInternalName(globalState.Fields, internalName);
    if (!fieldProps) {
        return "Could not find a field by internal name '" + internalName + "'";
    }
    var textLength = fieldProps.FormFieldValue ? fieldProps.FormFieldValue.length : 0;
    var errorText = fieldProps.Title + " must not be more than " + length + " character(-s)";
    return textLength <= length ? null : errorText;
};
var maxValue = function (internalName, maxValue) {
    var globalState = FormFieldsStore.actions.getState();
    var fieldProps = getFieldPropsByInternalName(globalState.Fields, internalName);
    if (!fieldProps) {
        return "Could not find a field by internal name '" + internalName + "'";
    }
    var val = fieldProps.FormFieldValue;
    var errorText = fieldProps.Title + " must not be more than " + (fieldProps.NumberIsPercent ? maxValue * 100 : maxValue);
    if (!val) {
        return null;
    }
    return val <= maxValue ? null : errorText;
};
var minValue = function (internalName, minValue) {
    var globalState = FormFieldsStore.actions.getState();
    var fieldProps = getFieldPropsByInternalName(globalState.Fields, internalName);
    if (!fieldProps) {
        return "Could not find a field by internal name '" + internalName + "'";
    }
    var val = fieldProps.FormFieldValue;
    var errorText = fieldProps.Title + " must be at least " + (fieldProps.NumberIsPercent ? minValue * 100 : minValue);
    if (!val) {
        return null;
    }
    return val >= minValue ? null : errorText;
};
var validateField = function (fieldProps) {
    var result = {};
    result.IsValid = true;
    result.ValidationErrors = null;
    if (fieldProps.Validators && fieldProps.Validators.length > 0) {
        var errors = fieldProps.Validators.reduce(function (prevErrors, currentValidator) {
            var localError = currentValidator();
            if (localError) {
                if (prevErrors == null) {
                    prevErrors = [localError];
                }
                else {
                    prevErrors.push(localError);
                }
            }
            return prevErrors;
        }, null);
        result.IsValid = errors == null;
        result.ValidationErrors = errors;
    }
    return result;
};
export var ValidationManager = {
    defaultValidators: {
        required: required,
        mustMatch: mustMatch,
        minLength: minLength,
        maxLength: maxLength,
        minValue: minValue,
        maxValue: maxValue
    },
    validateField: validateField
};
//# sourceMappingURL=ValidationManager.js.map