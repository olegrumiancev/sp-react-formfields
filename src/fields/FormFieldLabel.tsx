import * as React from 'react';
import { IFormFieldLabelProps, IFieldProps, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import { getFieldPropsByInternalName } from '../utils';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class FormFieldLabel extends React.Component<IFormFieldLabelProps, any> {
  public constructor(props) {
    super(props);
    this.state = { };
  }

  public render() {
    let ConnectedFormFieldLabel = FormFieldsStore.connect((state: IFormManagerProps) => getFieldPropsByInternalName(state.Fields, this.props.InternalName))(FormFieldLabelInternal);
    return <ConnectedFormFieldLabel />;
  }
}

const FormFieldLabelInternal = (f: IFieldProps) => (
  <Label key={`label_${f.InternalName}`}>
    {f.Title}
    {f.IsRequired ? <span key={`label_required_${f.InternalName}`} style={{ color: 'red' }}> *</span> : null}
  </Label>
);
