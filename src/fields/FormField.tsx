import * as React from 'react';
import { IFormFieldProps, IFieldProps, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import { BaseFieldRenderer, FieldTextRenderer, FieldChoiceRenderer, FieldLookupRenderer, FieldUserRenderer } from './index';

export class FormField extends React.Component<IFormFieldProps, any> {
  constructor(props: IFormFieldProps) {
    super(props);
  }

  public render() {
    return (
      <FormFieldsStore.Consumer mapStateToProps={(state: IFormManagerProps) => ({
        Fields: state.Fields,
        IsLoading: state.IsLoading,
        CurrentMode: state.CurrentMode
      })}>
        {({Fields, IsLoading, CurrentMode, actions}) => {
          if (!Fields) {
            return null;
          }

          let fieldInfo = (Fields as IFieldProps[]).filter(f => f.InternalName == this.props.InternalName);
          if (!fieldInfo || fieldInfo.length < 0) {
            return null;
          }

          return (this.createFieldRenderer(fieldInfo[0], this.setFieldData));
        }}
      </FormFieldsStore.Consumer>
    );
  }

  public componentDidMount() {
    let fieldInfo = FormFieldsStore.getState().Fields.filter(f => f.InternalName == this.props.InternalName);
    if (fieldInfo && fieldInfo.length > 0) {
      this.setState({fieldInfo: fieldInfo[0]});
    }
  }

  private setFieldData(internalName: string, newValue: any) {
    FormFieldsStore.actions.setFieldData(internalName, newValue);
  }

  private createFieldRenderer(fieldProps: IFieldProps, onFieldDataChangeCallback: (internalName: string, newValue: any) => void): JSX.Element {
    let defaultElement = null;
    defaultElement = (<BaseFieldRenderer {...fieldProps} key={fieldProps.InternalName} />);
    if (fieldProps.Type == "Text") {
      return <FieldTextRenderer {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback} />
    }
    if (fieldProps.Type.match(/user/gi)) {
      return <FieldUserRenderer {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback} />
    }
    if (fieldProps.Type.match(/choice/gi)) {
      return <FieldChoiceRenderer {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback} />
    }
    if (fieldProps.Type.match(/lookup/gi)) {
      return <FieldLookupRenderer {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback} />
    }

    return defaultElement;
  }
}