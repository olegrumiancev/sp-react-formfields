import * as React from 'react';
import { IFieldProps, FormMode } from '../interfaces';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class FieldMultilineTextRenderer extends BaseFieldRenderer {
  public constructor(props: IFieldProps) {
    super(props);
    let val = null;

    if (props.FormFieldValue) {
      val = props.FormFieldValue;
    } else {
      val = '<p></p>';
    }
    const contentBlock = htmlToDraft(val);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        ...this.state,
        currentValue: editorState
      };
    }
  }

  protected renderNewForm() {
    return this.renderAllForms(true);
  }

  protected renderEditForm() {
    return this.renderAllForms(true);
  }

  protected renderDispForm() {
    return this.renderAllForms(false);
  }

  private renderAllForms(editable: boolean) {
    const toolbarStyle = editable ? { } : { display: 'none' };
    let contentState = convertToRaw(this.state.currentValue.getCurrentContent());
    if (contentState.blocks.length > 1 && contentState.blocks[0].text === '') {
      contentState.blocks.splice(0, 1);
    }

    return (
      <Editor
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        onBlur={() => {
          // TODO: decide if this is needed
        }}

        readOnly={!editable}
        toolbarStyle={toolbarStyle}

        initialContentState={contentState}
        onEditorStateChange={this.onChange}
      />
    );
  }

  private onChange = (editorState) => {
    this.setState({ currentValue: editorState });
    const toSave = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.trySetChangedValue(toSave);
  }
}
