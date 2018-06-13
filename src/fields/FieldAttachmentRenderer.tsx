require('dropzone/dist/min/dropzone.min.css');
require('react-dropzone-component/styles/filepicker.css');
import * as React from 'react';
import { IFieldProps, FormMode } from '../interfaces';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import { AttachmentFiles } from '@pnp/sp/src/attachmentfiles';
import { DropzoneComponent, DragEventCallback } from 'react-dropzone-component';
import { FormFieldsStore } from '../store';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';

export class FieldAttachmentRenderer extends BaseFieldRenderer {
  public constructor(props: IFieldProps) {
    super(props);
    this.state = {
      ...this.state,
      currentValue: props.FormFieldValue,
      existingToDelete: props.ExistingAttachmentsToDelete === undefined ? [] : props.ExistingAttachmentsToDelete
    };
  }

  protected renderNewForm() {
    return this.renderAllForms();
  }

  protected renderEditForm() {
    return this.renderAllForms();
  }

  protected renderDispForm() {
    return this.renderAllForms();
  }

  private renderAllForms() {
    return (
      <React.Fragment>
        {this.getUploadPart()}
        {this.getExistingItemsPart()}
      </React.Fragment>
    );
  }

  // private getNewItemsPart(): JSX.Element {
  //   let newAttachmentItems = [];
  //   if (this.state.fileNames) {
  //     newAttachmentItems = this.state.fileNames;
  //   }

  //   return (
  //     <React.Fragment>
  //       {newAttachmentItems.map((a, i) => {
  //         return <Label key={`newAttachment_${i}`}>{a}</Label>;
  //       })}
  //     </React.Fragment>);
  // }

  private getExistingItemsPart(): JSX.Element {
    let attachmentItems = [];
    if (this.state.currentValue) {
      attachmentItems = this.state.currentValue;
    }

    return (
      <React.Fragment>
        {attachmentItems.map((a, i) => {
          let linkStyle = {};
          // console.log(this.state);
          if (this.state.existingToDelete && this.state.existingToDelete.indexOf(a.FileName) !== -1) {
            linkStyle['textDecoration'] = 'line-through';
          }
          return <div key={`attachmentItemContainer_${i}`}>
            <Link key={`attachment_${i}`} href={a.ServerRelativeUrl} target='_blank' style={linkStyle}>{a.FileName}</Link>
            {this.props.CurrentMode !== FormMode.Display ?
            <IconButton
              key={`attachmentDelete_${i}`} onClick={this.onExistingFileDeleteClick}
              data={a.FileName} iconProps={{ iconName: 'Delete' }}
              style={{ verticalAlign: 'middle', height: '2em' }} /> :
            null}

          </div>;
        })}
      </React.Fragment>);
  }

  private getUploadPart(): JSX.Element {
    let uploadPart = null;
    if (this.props.CurrentMode === FormMode.New || this.props.CurrentMode === FormMode.Edit) {
      let componentConfig = {
        showFiletypeIcon: false,
        disablePreview: true,
        postUrl: 'fake'
      };
      let dzStyle = {
        // height: '55px',
        width: '100%',
        border: '2px black dashed',
        cursor: 'pointer',
        marginBottom: '15px'
      };

      let eventHandlers = {
        drop: this.onDrop,
        addedfile: this.onFileAdded
      };

      let djsConfig = {
        addRemoveLinks: true,
        autoProcessQueue: false
        // dictDefaultMessage: ''
      };

      uploadPart =
        <div style={dzStyle}>
          <DropzoneComponent config={componentConfig} eventHandlers={eventHandlers} djsConfig={djsConfig}>
          </DropzoneComponent>
        </div>;
    }
    return uploadPart;
  }

  private onFileAdded = (file) => {
    console.log(file);
    FormFieldsStore.actions.addNewAttachmentInfo(file);
  }

  private onNewFileRemoved = (file) => {
    FormFieldsStore.actions.removeNewAttachmentInfo(file);
  }

  private onExistingFileDeleteClick = (ev) => {
    // ev.persist();
    ev.preventDefault();
    // console.log(ev);
    // debugger;
    const toDelete = ev.target.closest('button').attributes['data'].value;
    FormFieldsStore.actions.addOrRemoveExistingAttachmentDeletion(toDelete);
    // let newExistingToDelete = [];
    // if ((this.state.existingToDelete as any[]) !== undefined) {
    //   newExistingToDelete = this.state.existingToDelete; // newExistingToDelete;
    // }

    // console.log(this.props.ExistingAttachmentsToDelete);
    const globalState = FormFieldsStore.actions.getState();
    this.setState({ existingToDelete: globalState.ExistingAttachmentsToDelete });
    // if (newExistingToDelete.indexOf(toDelete) !== -1) {
    //   // newExistingToDelete = newExistingToDelete.filter(el => el !== toDelete);
    //   FormFieldsStore.actions.removeExistingAttachmentDeletion(toDelete);
    // } else {
    //   // newExistingToDelete.push(toDelete);
    //   FormFieldsStore.actions.addExistingAttachmentDeletion(toDelete);
    // }

    // this.setState({ existingToDelete: [...newExistingToDelete] });
    // this.existingToDelete = newExistingToDelete;
    // this.forceUpdate();

  }

  private onDrop = (ev: DragEvent) => {
    console.log(ev);

  }
}
