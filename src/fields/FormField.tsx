import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IFormFieldProps, IFieldProps, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import { getFieldPropsByInternalName } from '../utils';

// import { BaseFieldRenderer } from './BaseFieldRenderer';
// import { FieldTextRenderer } from './FieldTextRenderer';
// import { FieldChoiceRenderer } from './FieldChoiceRenderer';
// import { FieldLookupRenderer } from './FieldLookupRenderer';

// import { FieldUserRenderer } from './FieldUserRenderer';
// import { FieldMultilineTextRenderer } from './FieldMultilineTextRenderer';
// import { FieldNumberRenderer } from './FieldNumberRenderer';
// import { FieldDateTimeRenderer } from './FieldDateTimeRenderer';
// import { FieldAttachmentRenderer } from './FieldAttachmentRenderer';
// import { FieldTaxonomyRenderer } from './FieldTaxonomyRenderer';
// import { getFieldPropsByInternalName } from '../utils';
// import { FieldBooleanRenderer } from './FieldBooleanRenderer';
// import { FieldCurrencyRenderer } from './FieldCurrencyRenderer';
// import { FieldUrlRenderer } from './FieldUrlRenderer';

export class FormField extends React.Component<IFormFieldProps, any> {
  constructor(props: IFormFieldProps) {
    super(props);
    this.state = {
      loadedField: null
    };
  }

  public render() {
    let ConnectedFormField = FormFieldsStore.connect((state: IFormManagerProps) => getFieldPropsByInternalName(state.Fields, this.props.InternalName))(this.renderAsyncField);
    return <ConnectedFormField />;
  }

  public async componentDidMount() {
    let currentFieldProps: IFieldProps = getFieldPropsByInternalName(FormFieldsStore.actions.getState().Fields, this.props.InternalName);
    await this.loadFieldAsync(currentFieldProps.Type);
  }

  private loadFieldAsync = async type => {
    console.log(`Loading ${type} field...`);
    this.importComponentNameFromTypeString(type);
  }

  private renderAsyncField = (fieldProps: IFieldProps): JSX.Element => {
    if (!this.state.loadedField) {
      return <div>Loading...</div>;
    }

    return React.createElement(this.state.loadedField, {
      ...fieldProps,
      key: fieldProps.InternalName,
      saveChangedFieldData: FormFieldsStore.actions.setFieldData
    });
  }

  private registerLoadedField = (field) => {
    console.log(field);
    this.setState({
      loadedField: field
    });
  }

  private catchLoadedFieldError = (error, type) => {
    console.error(`"${type}" not yet supported, inner msg: ${error}`);
  }

  private importComponentNameFromTypeString(type: string) {
    if (type === 'Text') {
      import(/* webpackChunkName: "FieldTextRenderer" */ './FieldTextRenderer')
        .then(module => this.registerLoadedField(module.FieldTextRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type.match(/choice/gi)) {
      import(/* webpackChunkName: "FieldChoiceRenderer" */ './FieldChoiceRenderer')
        .then(module => this.registerLoadedField(module.FieldChoiceRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type.match(/lookup/gi)) {
      import(/* webpackChunkName: "FieldLookupRenderer" */ './FieldLookupRenderer')
        .then(module => this.registerLoadedField(module.FieldLookupRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type === 'Note') {
      import(/* webpackChunkName: "FieldMultilineTextRenderer" */ './FieldMultilineTextRenderer')
        .then(module => this.registerLoadedField(module.FieldMultilineTextRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type === 'Boolean') {
      import(/* webpackChunkName: "FieldBooleanRenderer" */ './FieldBooleanRenderer')
        .then(module => this.registerLoadedField(module.FieldBooleanRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type === 'Number') {
      import(/* webpackChunkName: "FieldNumberRenderer" */ './FieldNumberRenderer')
        .then(module => this.registerLoadedField(module.FieldNumberRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type === 'Currency') {
      import(/* webpackChunkName: "FieldCurrencyRenderer" */ './FieldCurrencyRenderer')
        .then(module => this.registerLoadedField(module.FieldCurrencyRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type === 'URL') {
      import(/* webpackChunkName: "FieldUrlRenderer" */ './FieldUrlRenderer')
        .then(module => this.registerLoadedField(module.FieldUrlRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type === 'DateTime') {
      import(/* webpackChunkName: "FieldDateTimeRenderer" */ './FieldDateTimeRenderer')
        .then(module => this.registerLoadedField(module.FieldDateTimeRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type.match(/user/gi)) {
      import(/* webpackChunkName: "FieldUserRenderer" */ './FieldUserRenderer')
        .then(module => this.registerLoadedField(module.FieldUserRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type.match(/TaxonomyFieldType/gi)) {
      import(/* webpackChunkName: "FieldTaxonomyRenderer" */ './FieldTaxonomyRenderer')
        .then(module => this.registerLoadedField(module.FieldTaxonomyRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else if (type.match(/attachments/gi)) {
      import(/* webpackChunkName: "FieldAttachmentRenderer" */ './FieldAttachmentRenderer')
        .then(module => this.registerLoadedField(module.FieldAttachmentRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    } else {
      import(/* webpackChunkName: "BaseFieldRenderer" */ './BaseFieldRenderer')
        .then(module => this.registerLoadedField(module.BaseFieldRenderer)).catch(e => this.catchLoadedFieldError(e, type));
    }
  }
}
