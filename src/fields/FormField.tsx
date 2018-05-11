import * as React from 'react';
import { IFormFieldProps, IFieldProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import { BaseFieldRenderer, FieldTextRenderer, FieldChoiceRenderer, FieldLookupRenderer, FieldUserRenderer } from './index';

export class FormField extends React.Component<IFormFieldProps, any> {
  constructor(props: IFormFieldProps) {
    super(props);
    this.state = {fieldInfo: null};
  }

  public render() {
    if (this.state.fieldInfo == null) {
      return null;
    };

    return (this.createFieldRenderer(this.setFieldData));
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

  private createFieldRenderer(onFieldDataChangeCallback: (internalName: string, newValue: any) => void): JSX.Element {
    let defaultElement = null;
    if (this.state.fieldInfo != null) {
      let fieldProps = this.state.fieldInfo as IFieldProps;
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
    }
    return defaultElement;
  }
}