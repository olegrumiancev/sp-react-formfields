import * as React from "react";
import { IFieldProps, FormMode } from "../interfaces";

export class BaseFieldRenderer extends React.Component<IFieldProps, any> {
  public constructor(props) {
    super(props);
    this.state = {
      valueForSaving: null,
      currentMode: this.props.CurrentMode
    };

    if (this.props.getFieldRendererObject) {
      this.props.getFieldRendererObject(this);
    }
  }

  public render() {
    if (this.state.currentMode == FormMode.New) {
      return this.renderNewForm();
    }
    if (this.state.currentMode == FormMode.Edit) {
      return this.renderEditForm();
    }
    if (this.state.currentMode == FormMode.Display) {
      return this.renderDispForm();
    }
    return null;
  }

  protected renderNewForm() {
    return (<div>Not implemented, field type: {this.props.Type}, form mode: new</div>);
  }

  protected renderEditForm() {
    return (<div>Not implemented, field type: {this.props.Type}, form mode: edit</div>);
  }

  protected renderDispForm() {
    return (<div>Not implemented, field type: {this.props.Type}, form mode: disp</div>);
  }

  protected trySetChangedValue(newValue: any) {
    if (this.props != null && this.props.saveChangedFieldData != null) {
      this.props.saveChangedFieldData(this.props.InternalName, newValue);
    }
    this.setState({valueForSaving: newValue});
  }

  public setFieldMode(mode: number) {
    console.log(`set field mode for ${this.props.InternalName}, mode from ${this.state.currentMode} to ${mode}`);
    console.log(this);
    this.setState({currentMode: mode}, () => {
      console.log(this);
    });
  }

  public isValid(): boolean {
    return true;
  }

  public getValue() {
    return this.state.valueForSaving;
  }
}