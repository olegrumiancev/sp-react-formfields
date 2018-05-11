// import { sp, SPRest, List } from '@pnp/sp';
// import { FormMode, IFieldProps, IFormManagerProps, ICreateFieldRendererConfig } from '../interfaces';
// import { handleError } from '../utils';
// import { FieldPropsManager } from './FieldPropsManager';
// import { BaseFieldRenderer, FieldTextRenderer, FieldChoiceRenderer, FieldLookupRenderer, FieldUserRenderer } from '../fields';
// import * as React from 'react';

// export class FormFieldsManager extends React.Component<IFormManagerProps, IFormManagerProps>  {
//   private ODataMode = 'application/json;odata=verbose';
//   private list: List = null;
//   //private fieldMetadataList: any[] = [];
//   private spListItem: any = null;
//   //private fieldProps: IFieldProps[] = [];
//   private renderedFields: BaseFieldRenderer[] = [];
//   //private globalFormMode: number = null;

//   //
//   // Use FormMode enum for specifying form mode
//   //
//   constructor(props: IFormManagerProps) {
//     super(props);

//     //this.configurePnp(props.SPWebUrl);
//     this.state = {
//       SPWebUrl: props.SPWebUrl,
//       CurrentListId: props.CurrentListId,
//       CurrentMode: props.CurrentMode,
//       CurrentItemId: props.CurrentItemId,
//       PnPSPRest: sp,
//       Fields: []
//       //FieldRenderers: []
//     }



//     // this.list = this.state.PnPSPRest.web.lists.getById(this.state.CurrentListId);
//     // this.list.fields.filter("ReadOnlyField eq false and Hidden eq false and Title ne 'Content Type'").get().then((listFields: any[]) => {
//     //   //this.fieldMetadataList = listFields;

//     //   let toSelect = [];
//     //   let toExpand = [];
//     //   for (let f of listFields) {
//     //     if (f.TypeAsString.match(/user/gi)) {
//     //       toSelect.push(`${f.EntityPropertyName}/Title`);
//     //       toSelect.push(`${f.EntityPropertyName}/Id`);
//     //       toExpand.push(f.EntityPropertyName);
//     //     } else if (f.TypeAsString.match(/lookup/gi)) {
//     //       toSelect.push(`${f.EntityPropertyName}/Title`);
//     //       toSelect.push(`${f.EntityPropertyName}/Id`);
//     //       toExpand.push(f.EntityPropertyName);
//     //     } else {
//     //       toSelect.push(f.EntityPropertyName);
//     //     }
//     //   }

//     //   if (this.state.CurrentMode != FormMode.New) {
//     //     this.list.items.getById(this.state.CurrentItemId).select(...toSelect).expand(...toExpand).get().then(item => {
//     //       this.spListItem = item;
//     //       this.setState({Fields: listFields.map(fm => {
//     //         return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, this.state.CurrentMode, this.spListItem, this.state.PnPSPRest);
//     //       })});
//     //       this.props.onInitCompleteCallback(this);
//     //     }).catch(e => {
//     //       handleError(e);
//     //       this.props.onInitCompleteCallback(this);
//     //     });
//     //   } else {
//     //     this.setState({Fields: listFields.map(fm => {
//     //       return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, this.state.CurrentMode, null, this.state.PnPSPRest);
//     //     })});
//     //     this.props.onInitCompleteCallback(this);
//     //   }
//     // }).catch(e => {
//     //   handleError(e);
//     //   this.props.onInitCompleteCallback(this);
//     // });
//   }

//   public render() {
//     return <span id={`formManager_${this.state.CurrentListId}_${this.state.CurrentItemId}`}></span>;
//   }

//   // public createFieldRendererPropsFromFieldMetadata(internalName: string): IFieldProps {
//   //   let filtered = this..filter(fm => fm.InternalName == internalName);
//   //   if (filtered != null && filtered.length > 0) {
//   //     return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(filtered[0], this.globalFormMode, this.spListItem, this.sp);
//   //   }
//   //   return null;
//   // }

//   public createFieldRendererComponent(internalName: string): React.ReactElement<BaseFieldRenderer> {
//     let filtered = this.state.Fields.filter(fm => fm.InternalName == internalName);
//     //console.log(filtered);
//     if (filtered != null && filtered.length > 0) {
//       let element = createFieldRendererComponent(filtered[0], (internalName, newValue) => {
//         let filteredProp = this.state.Fields.filter(fp => fp.InternalName == internalName);
//         filteredProp[0].FormFieldValue = newValue;
//       }, (createdFieldComponent) => {
//         if (createdFieldComponent != null) {
//           //console.log(internalName);
//           //console.log(this.renderedFields);
//           let renderingField = this.state.FieldRenderers.filter(rf => rf.props.InternalName == internalName);
//           if (renderingField == null || renderingField.length == 0) {
//             this.renderedFields.push(createdFieldComponent);
//             //this.setState({FieldRenderers: [createdFieldComponent, ...this.state.FieldRenderers]});
//           }
//         }
//       });
//       //console.log(element);
//       return element;
//     }
//     return null;
//   }

//   public getFieldControlValuesForPost(): Object {
//     let toReturn = {};
//     for (let fp of this.state.Fields) {
//       if (fp.Type.match(/user/gi) || fp.Type.match(/lookup/gi)) {
//         let result = null;
//         if (fp.FormFieldValue != null) {
//           if (!fp.IsMulti) {
//             result = parseInt(fp.FormFieldValue.Id);
//           } else {
//             if (fp.FormFieldValue.results != null && fp.FormFieldValue.results.length > 0) {
//               result = {results: fp.FormFieldValue.results.map(r => parseInt(r.Id))};
//             } else {
//               result = {results: []};
//             }
//           }
//         }
//         toReturn[`${fp.EntityPropertyName}Id`] = result;
//       } else {
//         toReturn[fp.EntityPropertyName] = fp.FormFieldValue == null ? undefined : fp.FormFieldValue;
//       }
//     }
//     return toReturn;
//   }

//   public getFieldPropsArray(): IFieldProps[] {
//     return this.state.Fields;
//   }

//   public setFormMode(mode: number) {
//     // this.globalFormMode = mode;
//     // console.log(`in setFormMode, mode: ${mode}`)
//     // this.fieldProps.forEach(fp => {
//     //   fp.CurrentMode = mode;
//     // });

//     // console.log(this);

//     // this.renderedFields.forEach(rf => {
//     //   rf.setFieldMode(mode);
//     // })
//     this.setState({
//       CurrentMode: mode,
//       Fields: this.state.Fields.map(f => {
//         f.CurrentMode = mode;
//         return f;
//       })
//     }, () => {
//       //this.state.FieldRenderers.forEach(rf => {
//       this.renderedFields.forEach(rf => {
//         rf.setFieldMode(this.state.CurrentMode);
//       })
//     });
//   }
// }

// export const createFieldRendererComponent = (
//     fieldProps: IFieldProps,
//     onFieldDataChangeCallback: (internalName: string, newValue: any) => void,
//     fieldCreatedRef: (createdField: BaseFieldRenderer) => void
//   ): React.ReactElement<BaseFieldRenderer> => {

//   //console.log(fieldProps);
//   let defaultElement = null;
//   if (fieldProps != null) {
//     defaultElement = (<BaseFieldRenderer {...fieldProps} key={fieldProps.InternalName} />);
//     if (fieldProps.Type == "Text") {
//       return <FieldTextRenderer {...fieldProps}
//         key={fieldProps.InternalName}
//         saveChangedFieldData={onFieldDataChangeCallback}
//         getFieldRendererObject={fieldCreatedRef} />
//     }
//     if (fieldProps.Type.match(/user/gi)) {
//       return <FieldUserRenderer {...fieldProps}
//         key={fieldProps.InternalName}
//         saveChangedFieldData={onFieldDataChangeCallback}
//         getFieldRendererObject={fieldCreatedRef} />
//     }
//     if (fieldProps.Type.match(/choice/gi)) {
//       return <FieldChoiceRenderer {...fieldProps}
//         key={fieldProps.InternalName}
//         saveChangedFieldData={onFieldDataChangeCallback}
//         getFieldRendererObject={fieldCreatedRef} />
//     }
//     if (fieldProps.Type.match(/lookup/gi)) {
//       return <FieldLookupRenderer {...fieldProps}
//         key={fieldProps.InternalName}
//         saveChangedFieldData={onFieldDataChangeCallback}
//         getFieldRendererObject={fieldCreatedRef} />
//     }
//   }
//   return defaultElement;
// }