import * as React from 'react';
import { IFieldProps, FormMode } from '../interfaces';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from './BaseFieldRenderer';

export class FieldNumberRenderer extends BaseFieldRenderer {
  public constructor(props: IFieldProps) {
    super(props);
    let val = props.FormFieldValue;
    if (val && props.NumberIsPercent) {
      val = val * 100;
    }
    this.state = {
      ...this.state,
      currentValue: val
    };
  }

  protected renderNewForm() {
    return this.renderNewOrEditForm();
  }

  protected renderEditForm() {
    return this.renderNewOrEditForm();
  }

  protected renderDispForm() {
    const percent = this.props.NumberIsPercent ? '%' : '';
    return (<Label>{this.state.currentValue}{percent}</Label>);
  }

  private renderNewOrEditForm() {
    const percent = this.props.NumberIsPercent ? '%' : null;
    if (this.props.NumberIsPercent) {
      return (
        <React.Fragment>
          <TextField
            onChanged={this.onChanged}
            onKeyPress={this.onKeypress}
            value={this.state.currentValue == null ? '' : this.state.currentValue}
            addonString='%'
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <TextField
            onChanged={this.onChanged}
            onKeyPress={this.onKeypress}
            value={this.state.currentValue == null ? '' : this.state.currentValue}
          />
        </React.Fragment>
      );
    }
  }

  private onChanged = (newValue) => {
    let toSave = newValue;
    if (this.props.NumberIsPercent) {
      toSave = toSave / 100;
    }
    this.setState({ currentValue: newValue });
    this.trySetChangedValue(toSave);
  }

  private onKeypress = (ev) => {
    if (ev.key.match(/[0-9]/) === null) {
      ev.preventDefault();
    }
  }
}
