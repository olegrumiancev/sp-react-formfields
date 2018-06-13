import * as React from 'react';
import { IFieldProps, FormMode, IFormManagerProps } from '../interfaces';
import { FormFieldsStore } from '../store';
import { Button } from 'office-ui-fabric-react/lib/Button';
import ErrorBoundary from '../ErrorBoundary';

export class BaseFieldRenderer extends React.Component<IFieldProps, any> {
  public constructor(props: IFieldProps) {
    super(props);
    this.state = {
      valueForSaving: null
    };
  }

  public render() {
    return (
        // <FormFieldsStore.Consumer mapStateToProps={(state: IFormManagerProps) => ({ CurrentMode: state.CurrentMode })}>
        //   {({ CurrentMode, actions }) => {
        //     // return <ErrorBoundary>
        //     return <React.Fragment>
        //       {CurrentMode === FormMode.New ? this.renderNewForm() : null}
        //       {CurrentMode === FormMode.Edit ? this.renderEditForm() : null}
        //       {CurrentMode === FormMode.Display ? this.renderDispForm() : null}
        //     </React.Fragment>;
        //     // </ErrorBoundary>;
        //   }}
        // </FormFieldsStore.Consumer>
      <ErrorBoundary>
        {this.props.CurrentMode === FormMode.New ? this.renderNewForm() : null}
        {this.props.CurrentMode === FormMode.Edit ? this.renderEditForm() : null}
        {this.props.CurrentMode === FormMode.Display ? this.renderDispForm() : null}
      </ErrorBoundary>
    );
  }

  public setFieldMode(mode: number) {
    console.log(`set field mode for ${this.props.InternalName}, mode from ${this.state.currentMode} to ${mode}`);
    console.log(this);
    this.setState({ currentMode: mode }, () => {
      console.log(this);
    });
  }

  public isValid(): boolean {
    return true;
  }

  public getValue() {
    return this.state.valueForSaving;
  }

  protected renderNewForm() {
    return (<div>+ Not implemented, field type: {this.props.Type}, form mode: new</div>);
  }

  protected renderEditForm() {
    return (<div>+ Not implemented, field type: {this.props.Type}, form mode: edit</div>);
  }

  protected renderDispForm() {
    return (<div>++ Not implemented, field type: {this.props.Type}, form mode: disp</div>);
  }

  protected trySetChangedValue(newValue: any) {
    if (this.props != null && this.props.saveChangedFieldData != null) {
      this.props.saveChangedFieldData(this.props.InternalName, newValue);
    }
    this.setState({ valueForSaving: newValue });
    FormFieldsStore.actions.setFieldData(this.props.InternalName, newValue);
  }
}
