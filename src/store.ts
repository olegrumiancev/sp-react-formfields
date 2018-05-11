import { sp, SPRest, List } from '@pnp/sp';
import { initStore } from 'react-waterfall';
import { IFormManagerProps, FormMode, IFieldProps } from './interfaces';
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
      let listFields: any[] = await list.fields.filter("ReadOnlyField eq false and Hidden eq false and Title ne 'Content Type'").get(); //.then((listFields: any[]) => {

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
      if (currentMode != FormMode.New) {
        let item = await list.items.getById(currentItemId).select(...toSelect).expand(...toExpand).get(); //.then(item => {
        fieldInfos = listFields.map(fm => {
          return FieldPropsManager.createFieldRendererPropsFromFieldMetadata(fm, currentMode, item, sp);
        });
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
      console.log(state);
      state.CurrentMode = mode;
      state.Fields.forEach(f => f.CurrentMode = mode);
      console.log(state);
      return state;
    },
    setFieldData: (state: IFormManagerProps, internalName: string, newValue: any) => {

      let filtered = state.Fields.filter(f => f.InternalName == internalName);
      if (filtered && filtered.length > 0) {
        filtered[0].FormFieldValue = newValue;
      }
      return state;
    }

  }
}

const getFieldControlValuesForPost = (state: IFormManagerProps): Object => {
  let toReturn = {};
  for (let fp of state.Fields) {
    if (fp.Type.match(/user/gi) || fp.Type.match(/lookup/gi)) {
      let result = null;
      if (fp.FormFieldValue != null) {
        if (!fp.IsMulti) {
          result = parseInt(fp.FormFieldValue.Id);
        } else {
          if (fp.FormFieldValue.results != null && fp.FormFieldValue.results.length > 0) {
            result = {results: fp.FormFieldValue.results.map(r => parseInt(r.Id))};
          } else {
            result = {results: []};
          }
        }
      }
      toReturn[`${fp.EntityPropertyName}Id`] = result;
    } else {
      toReturn[fp.EntityPropertyName] = fp.FormFieldValue == null ? undefined : fp.FormFieldValue;
    }
  }
  return toReturn;
}

const configurePnp = (webUrl: string) => {
  sp.setup({
    sp: {
      headers: {
        Accept: 'application/json;odata=verbose'
      },
      baseUrl: webUrl
    }
  });
}

let initedStore = initStore(store);
export const FormFieldsStore = {
  ...initedStore,
  getFieldControlValuesForPost
};