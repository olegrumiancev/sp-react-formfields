var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
var FieldMultilineTextRenderer = (function (_super) {
    __extends(FieldMultilineTextRenderer, _super);
    function FieldMultilineTextRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (editorState) {
            _this.setState({ currentValue: editorState });
            var toSave = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            _this.trySetChangedValue(toSave);
        };
        var val = null;
        if (props.FormFieldValue) {
            val = props.FormFieldValue;
        }
        else {
            val = '<p></p>';
        }
        var contentBlock = htmlToDraft(val);
        if (contentBlock) {
            var contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            var editorState = EditorState.createWithContent(contentState);
            _this.state = __assign({}, _this.state, { currentValue: editorState });
        }
        return _this;
    }
    FieldMultilineTextRenderer.prototype.renderNewForm = function () {
        return this.renderAllForms(true);
    };
    FieldMultilineTextRenderer.prototype.renderEditForm = function () {
        return this.renderAllForms(true);
    };
    FieldMultilineTextRenderer.prototype.renderDispForm = function () {
        return this.renderAllForms(false);
    };
    FieldMultilineTextRenderer.prototype.renderAllForms = function (editable) {
        var toolbarStyle = editable ? {} : { display: 'none' };
        var contentState = convertToRaw(this.state.currentValue.getCurrentContent());
        if (contentState.blocks.length > 1 && contentState.blocks[0].text === '') {
            contentState.blocks.splice(0, 1);
        }
        return (React.createElement(Editor, { wrapperClassName: 'wrapper-class', editorClassName: 'editor-class', toolbarClassName: 'toolbar-class', onBlur: function () {
            }, readOnly: !editable, toolbarStyle: toolbarStyle, initialContentState: contentState, onEditorStateChange: this.onChange }));
    };
    return FieldMultilineTextRenderer;
}(BaseFieldRenderer));
export { FieldMultilineTextRenderer };
//# sourceMappingURL=FieldMultilineTextRenderer.js.map