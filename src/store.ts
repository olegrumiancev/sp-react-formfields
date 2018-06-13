import { sp, SPRest, List, AttachmentFileInfo, ItemUpdateResult, ItemAddResult } from '@pnp/sp';
import { initStore } from 'react-waterfall';
import { IFormManagerProps, FormMode, IFieldProps, ISaveItemResult, IFormManagerActions } from './interfaces';
import { handleError } from './utils';
import { FieldPropsManager } from './managers/FieldPropsManager';
import * as React from 'react';

const store = {
  initialState: {
    SPWebUrl: null,
    CurrentMode: 0,
    CurrentListId: null,
    IsLoading: true
  } as IFormManagerProps,
  actions: {
    initStore: async (state: IFormManagerProps, sPWebUrl: string, currentListId: string, currentMode: number, currentItemId?: number) => {
      configurePnp(sPWebUrl);

      let list = sp.web.lists.getById(currentListId);
      let listFields: any[] =
        await list
          .fields
          .filter('ReadOnlyField eq false and Hidden eq false and Title ne \'Content Type\'').get();

      let toSelect = [];
      let toExpand = [];
      for (let f of listFields) {
        if (f.TypeAsString.match(/user/gi)) {
          toSelect.push(`${f.EntityPropertyName}/Title`);
          toSelect.push(`${f.EntityPropertyName}/Id`);
          toExpand.push(f.EntityPropertyName);
        } else if (f.TypeAsString.match(/lookup/gi)) {
          toSelect.push(`${f.EntityPropertyName}/Title`);
          toSelect.push(`${f.EntityPropertyName}/Id`);
          toExpand.push(f.EntityPropertyName);
        } else {
          toSelect.push(f.EntityPropertyName);
        }
      }

      let fieldInfos = [];
      if (currentMode !== FormMode.New) {
        let itemMetadata = list.items.getById(currentItemId);
        let item = await itemMetadata.select(...toSelect).expand(...toExpand).get();
        let attachmentMetadata = await itemMetadata.attachmentFiles.get();
        console.log(item);
        fieldInfos = listFields.map(fm => {
          return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, item, sp);
        });
        if (item.Attachments) {
          console.log(attachmentMetadata);
          fieldInfos.filter(f => f.InternalName === 'Attachments')[0].FormFieldValue = attachmentMetadata;
        }
      } else {
        fieldInfos = listFields.map(fm => {
          return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, null, sp);
        });
      }

      return {
        PnPSPRest: sp,
        SPWebUrl: sPWebUrl,
        CurrentListId: currentListId,
        CurrentItemId: currentItemId,
        CurrentMode: currentMode,
        Fields: fieldInfos,
        IsLoading: false
      } as IFormManagerProps;
    },
    setFormMode: (state: IFormManagerProps, mode: number) => {
      console.log(`setting global store form mode`);
      state.CurrentMode = mode;
      state.Fields.forEach(f => f.CurrentMode = mode);
      return state;
    },
    setItemId: (state: IFormManagerProps, itemId: number) => {
      state.CurrentItemId = itemId;
      return state;
    },
    setFieldData: (state: IFormManagerProps, internalName: string, newValue: any) => {

      let filtered = state.Fields.filter(f => f.InternalName === internalName);
      if (filtered && filtered.length > 0) {
        filtered[0].FormFieldValue = newValue;
      }
      return state;
    },
    addNewAttachmentInfo: (state: IFormManagerProps, fileInfo: any) => {
      if (!state.NewAttachments) {
        state.NewAttachments = [];
      }
      state.NewAttachments.push(fileInfo);
      return state;
    },
    removeNewAttachmentInfo: (state: IFormManagerProps, fileInfo: any) => {
      state.NewAttachments = state.NewAttachments.filter(a => a.name !== fileInfo.name);
      return state;
    },
    addOrRemoveExistingAttachmentDeletion: (state: IFormManagerProps, attachmentName: string) => {
      if (!state.ExistingAttachmentsToDelete) {
        state.ExistingAttachmentsToDelete = [];
      }

      if (state.ExistingAttachmentsToDelete.indexOf(attachmentName) !== -1) {
        state.ExistingAttachmentsToDelete = state.ExistingAttachmentsToDelete.filter(a => a !== attachmentName);
      } else {
        state.ExistingAttachmentsToDelete.push(attachmentName);
      }

      let filtered = state.Fields.filter(f => f.InternalName === 'Attachments');
      if (filtered && filtered.length > 0) {
        filtered[0].ExistingAttachmentsToDelete = state.ExistingAttachmentsToDelete;
      }
      console.log(state);
      return state;
    }
  }
};

const getFieldControlValuesForPost = (): Object => {
  const state = initedStore.getState();
  let toReturn = {};
  for (let fp of state.Fields) {
    if (fp.InternalName === 'Attachments') {
      continue;
    }
    if (fp.Type.match(/user/gi) || fp.Type.match(/lookup/gi)) {
      let result = null;
      if (fp.FormFieldValue != null) {
        if (!fp.IsMulti) {
          result = parseInt(fp.FormFieldValue.Id);
        } else {
          if (fp.FormFieldValue.results != null && fp.FormFieldValue.results.length > 0) {
            result = { results: fp.FormFieldValue.results.map(r => r.Id) };
          } else {
            result = { results: [] };
          }
        }
      } else {
        if (!fp.IsMulti) {
          result = 0;
        } else {
          result = { results: [] };
        }
      }
      toReturn[`${fp.EntityPropertyName}Id`] = result;
    } else {
      // if (fp.FormFieldValue) {
      //  toReturn[fp.EntityPropertyName] = fp.FormFieldValue;
      // }
      // toReturn[fp.EntityPropertyName] = fp.FormFieldValue == null ? undefined : fp.FormFieldValue;
      toReturn[fp.EntityPropertyName] = fp.FormFieldValue;
    }
  }
  return toReturn;
};

const getNewAttachmentsToSave = (): Promise<AttachmentFileInfo[]> => {
  let toReturn: Promise<AttachmentFileInfo[]> = new Promise<AttachmentFileInfo[]>((resolve, reject) => {
    const state = initedStore.getState();
    if (state.NewAttachments) {
      let individualFilePromises: Promise<AttachmentFileInfo>[] = [];
      state.NewAttachments.forEach(na => {
        let individualFilePromise = new Promise<AttachmentFileInfo>((individualPromiseResolve, individualPromiseReject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const fileAsBinaryString = reader.result;
            individualPromiseResolve({
              name: na.name,
              content: fileAsBinaryString
            } as AttachmentFileInfo);
          };
          reader.onabort = () => individualPromiseResolve(null);
          reader.onerror = () => individualPromiseResolve(null);
          reader.readAsBinaryString(na);
        });
        individualFilePromises.push(individualFilePromise);
      });
      Promise.all(individualFilePromises).then((attFileInfos: AttachmentFileInfo[]) => {
        resolve(attFileInfos);
      }).catch(e => {
        resolve(null);
      });
    } else {
      resolve(null);
    }
  });
  return toReturn;
};

const saveFormData = (): Promise<ISaveItemResult> => {
  let result = new Promise<ISaveItemResult>((resolve, reject) => {
    let toResolve = {} as ISaveItemResult;
    const globalState = FormFieldsStore.actions.getState();
    let formDataRegularFields = FormFieldsStore.actions.getFieldControlValuesForPost();
    let itemCollection = globalState.PnPSPRest.web.lists.getById(globalState.CurrentListId).items;
    let action: Promise<ItemUpdateResult | ItemAddResult> = null;
    if (globalState.CurrentMode === FormMode.New) {
      action = itemCollection.add(formDataRegularFields);
    } else {
      action = itemCollection.getById(globalState.CurrentItemId).update(formDataRegularFields);
    }

    console.log(formDataRegularFields);
    action.then((res: ItemAddResult | ItemUpdateResult) => {
      console.log(JSON.stringify(res));
      toResolve.IsSuccessful = true;
      if (res.data.Id) {
        toResolve.ItemId = parseInt(res.data.Id);
      } else {
        toResolve.ItemId = globalState.CurrentItemId;
      }

      // once we have item id - need to set this to global state
      FormFieldsStore.actions.setItemId(toResolve.ItemId);

      // Next, attachments
      FormFieldsStore.actions.getNewAttachmentsToSave().then((attachments: AttachmentFileInfo[]) => {
        console.log(attachments);
        if (attachments === null || attachments.length === 0) {
          resolve(toResolve);
        } else {
          let list = globalState.PnPSPRest.web.lists.getById(globalState.CurrentListId);
          list.items.getById(toResolve.ItemId).attachmentFiles.addMultiple(attachments).then(addMultipleResult => {
            console.log(addMultipleResult);

            // add new attachment file data to global state
            let filtered = globalState.Fields.filter(f => f.InternalName === 'Attachments');
            // filtered[0].FormFieldValue =
            globalState.PnPSPRest.web.lists.getById(globalState.CurrentListId)
              .items.getById(toResolve.ItemId).attachmentFiles.get().then(attachments => {
                filtered[0].FormFieldValue = attachments;
              });

            resolve(toResolve);
          }).catch(e => {
            console.log(e);
            toResolve.IsSuccessful = false;
            toResolve.ErrorObject = e;
            resolve(toResolve);
          });
        }
      }).catch(e => {
        console.log(e);
        toResolve.IsSuccessful = false;
        toResolve.ErrorObject = e;
        resolve(toResolve);
      });

      resolve(toResolve);
    }).catch(e => {
      toResolve.IsSuccessful = false;
      toResolve.ErrorObject = e;
      toResolve.ItemId = -1;
      resolve(toResolve);
    });
  });
  return result;
};

const configurePnp = (webUrl: string) => {
  sp.setup({
    sp: {
      headers: {
        Accept: 'application/json;odata=verbose'
      },
      baseUrl: webUrl
    }
  });
};

const initedStore = initStore(store);

export const FormFieldsStore = {
  Provider: initedStore.Provider,
  Consumer: initedStore.Consumer,
  actions: {
    getState: initedStore.getState,
    initStore: initedStore.actions.initStore,
    setFormMode: initedStore.actions.setFormMode,
    setItemId: initedStore.actions.setItemId,
    setFieldData: initedStore.actions.setFieldData,
    addNewAttachmentInfo: initedStore.actions.addNewAttachmentInfo,
    removeNewAttachmentInfo: initedStore.actions.removeNewAttachmentInfo,
    addOrRemoveExistingAttachmentDeletion: initedStore.actions.addOrRemoveExistingAttachmentDeletion,
    getFieldControlValuesForPost,
    getNewAttachmentsToSave,
    saveFormData
  } as IFormManagerActions
};
