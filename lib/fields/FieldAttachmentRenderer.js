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
require('./FieldAttachmentRenderer.min.css');
require('react-dropzone-component/styles/filepicker.css');
import * as React from 'react';
import { FormMode } from '../interfaces';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { BaseFieldRenderer } from './BaseFieldRenderer';
import { DropzoneComponent } from 'react-dropzone-component';
import { FormFieldsStore } from '../store';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { getFieldPropsByInternalName } from '../utils';
var FieldAttachmentRenderer = (function (_super) {
    __extends(FieldAttachmentRenderer, _super);
    function FieldAttachmentRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.onFileAdded = function (file) {
            FormFieldsStore.actions.addNewAttachmentInfo(file);
        };
        _this.onExistingFileDeleteClick = function (ev) {
            ev.preventDefault();
            var toDelete = ev.target.closest('button').attributes['data'].value;
            FormFieldsStore.actions.addOrRemoveExistingAttachmentDeletion(toDelete);
            var globalState = FormFieldsStore.actions.getState();
            var attachmentProps = getFieldPropsByInternalName(globalState.Fields, 'Attachments');
            if (attachmentProps) {
                _this.setState({ existingToDelete: attachmentProps.AttachmentsExistingToDelete });
            }
        };
        _this.onDrop = function () {
        };
        _this.state = __assign({}, _this.state, { currentValue: props.FormFieldValue, existingToDelete: props.AttachmentsExistingToDelete === undefined ? [] : props.AttachmentsExistingToDelete });
        return _this;
    }
    FieldAttachmentRenderer.prototype.renderNewForm = function () {
        return this.renderAllForms();
    };
    FieldAttachmentRenderer.prototype.renderEditForm = function () {
        return this.renderAllForms();
    };
    FieldAttachmentRenderer.prototype.renderDispForm = function () {
        return this.renderAllForms();
    };
    FieldAttachmentRenderer.prototype.renderAllForms = function () {
        return (React.createElement(React.Fragment, null,
            this.getUploadPart(),
            this.getExistingItemsPart()));
    };
    FieldAttachmentRenderer.prototype.getExistingItemsPart = function () {
        var _this = this;
        var attachmentItems = [];
        if (this.state.currentValue) {
            attachmentItems = this.state.currentValue;
        }
        return (React.createElement(React.Fragment, null, attachmentItems.map(function (a, i) {
            var linkStyle = {};
            if (_this.state.existingToDelete && _this.state.existingToDelete.indexOf(a.FileName) !== -1) {
                linkStyle['textDecoration'] = 'line-through';
            }
            return React.createElement("div", { key: "attachmentItemContainer_" + i },
                React.createElement(Link, { key: "attachment_" + i, href: a.ServerRelativeUrl, target: '_blank', style: linkStyle }, a.FileName),
                _this.props.CurrentMode !== FormMode.Display ?
                    React.createElement(IconButton, { key: "attachmentDelete_" + i, onClick: _this.onExistingFileDeleteClick, data: a.FileName, iconProps: { iconName: 'Delete' }, style: { verticalAlign: 'middle', height: '2em' } }) :
                    null);
        })));
    };
    FieldAttachmentRenderer.prototype.getUploadPart = function () {
        var uploadPart = null;
        if (this.props.CurrentMode === FormMode.New || this.props.CurrentMode === FormMode.Edit) {
            var componentConfig = {
                showFiletypeIcon: false,
                disablePreview: true,
                postUrl: 'fake'
            };
            var dzStyle = {
                width: '100%',
                border: '2px black dashed',
                cursor: 'pointer',
                marginBottom: '15px'
            };
            var eventHandlers = {
                drop: this.onDrop,
                addedfile: this.onFileAdded
            };
            var djsConfig = {
                addRemoveLinks: true,
                autoProcessQueue: false
            };
            uploadPart =
                React.createElement("div", { style: dzStyle },
                    React.createElement(DropzoneComponent, { config: componentConfig, eventHandlers: eventHandlers, djsConfig: djsConfig }));
        }
        return uploadPart;
    };
    return FieldAttachmentRenderer;
}(BaseFieldRenderer));
export { FieldAttachmentRenderer };
//# sourceMappingURL=FieldAttachmentRenderer.js.map