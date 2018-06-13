import * as React from 'react';
import { IFormFieldProps, IFieldProps, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import { BaseFieldRenderer, FieldTextRenderer, FieldChoiceRenderer, FieldLookupRenderer, FieldUserRenderer } from './index';
import { FieldMultilineTextRenderer } from './FieldMultilineTextRenderer';
import { FieldNumberRenderer } from './FieldNumberRenderer';
import { FieldDateTimeRenderer } from './FieldDateTimeRenderer';
import { FieldAttachmentRenderer } from './FieldAttachmentRenderer';

export class FormField extends React.Component<IFieldProps, any> {
  constructor(props: IFieldProps) {
    super(props);
  }

  public render() {
    console.log(`render in formfield 2`);
    // return (
      // <FormFieldsStore.Consumer
      //   mapStateToProps={(state: IFormManagerProps) => ({
      //     Fields: state.Fields,
      //     IsLoading: state.IsLoading,
      //     CurrentMode: state.CurrentMode
      //   })}
      // >
      //   {({ Fields, IsLoading, CurrentMode, actions }) => {
      //     if (!Fields) {
      //       return null;
      //     }

      //     let fieldInfo = (Fields as IFieldProps[]).filter(f => f.InternalName === this.props.InternalName);
      //     if (!fieldInfo || fieldInfo.length < 1) {
      //       return null;
      //     }

      //     // console.log(fieldInfo[0]);
      //     return (this.createFieldRenderer(fieldInfo[0], this.setFieldData));
      //   }}

    // const globalState = FormFieldsStore.getState();

          // console.log(fieldInfo[0]);
    return (this.createFieldRenderer(this.props, this.setFieldData));
    // );
  }

  public componentDidMount() {
    // let fieldInfo = FormFieldsStore.actions.getState().Fields.filter(f => f.InternalName === this.props.InternalName);
    // if (fieldInfo && fieldInfo.length > 0) {
      // this.setState({ fieldInfo: fieldInfo[0] });
    // }
  }

  private setFieldData(internalName: string, newValue: any) {
    FormFieldsStore.actions.setFieldData(internalName, newValue);
  }

  private createFieldRenderer(fieldProps: IFieldProps, onFieldDataChangeCallback: (internalName: string, newValue: any) => void): JSX.Element {
    let defaultElement = null;
    defaultElement = (<BaseFieldRenderer {...fieldProps} key={fieldProps.InternalName} />);
    if (fieldProps.Type === 'Text') {
      return <FieldTextRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'Note') {
      return <FieldMultilineTextRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'Number') {
      return <FieldNumberRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type === 'DateTime') {
      return <FieldDateTimeRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/user/gi)) {
      return <FieldUserRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/choice/gi)) {
      return <FieldChoiceRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/lookup/gi)) {
      return <FieldLookupRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }
    if (fieldProps.Type.match(/attachments/gi)) {
      return <FieldAttachmentRenderer
        {...fieldProps}
        key={fieldProps.InternalName}
        saveChangedFieldData={onFieldDataChangeCallback}
      />;
    }

    return defaultElement;
  }
}
