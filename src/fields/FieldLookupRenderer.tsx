import * as React from "react";
import { IFieldProps, FormMode } from "../interfaces";
import { TagPicker, ITag, IBasePicker } from 'office-ui-fabric-react/lib/Pickers';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { BaseFieldRenderer } from "./BaseFieldRenderer";
import { Web } from "@pnp/sp";
import { handleError } from "../utils";

export class FieldLookupRenderer extends BaseFieldRenderer {
  private allItemsLoading: boolean;
  private tagPicker: any;
  public constructor(props) {
    super(props);
    let vals = [];
    if (this.props.FormFieldValue != null) {
      if (this.props.IsMulti) {
        vals = this.props.FormFieldValue.results;
      } else {
        vals.push(this.props.FormFieldValue);
      }
    }
    this.state = {
      ...this.state,
      selectedItems: vals.map(v => ({key: v.ID, name: v[this.props.LookupField]})),
      allLookupItems: null
    };

    this.allItemsLoading = false;
  }

  protected renderNewForm() {
    return this.renderNewOrEditForm();
  }

  protected renderEditForm() {
    return this.renderNewOrEditForm();
  }

  protected renderDispForm() {
    return (this.state.selectedItems.map((fv, i) => <Label key={`${this.props.InternalName}_${i}`}>{fv.name}</Label>));
  }

  private renderNewOrEditForm() {
    return (
      <TagPicker className="lookupTagPickerInput"
        itemLimit={this.props.IsMulti ? 100 : 1}
        pickerSuggestionsProps={{
          suggestionsHeaderText: 'Suggested items',
          noResultsFoundText: 'No matches found',
          loadingText: 'Results are loading, please wait...'
        }}
        onResolveSuggestions={(filter, selectedItems) => this.resolveTagSuggestions(filter, selectedItems)}
        defaultSelectedItems={this.state.selectedItems}
        onChange={(items?: ITag[]) => this.processTagItemsChange(items == null ? [] : items)}
        resolveDelay={750}
        //componentRef={(c) => this.tagPicker = c}
        ref={c => this.tagPicker = c}
      />
    );
  }

  private processTagItemsChange(items: ITag[]) {
    this.setState({selectedItems: items});
  }

  private resolveTagSuggestions(filterText: string, selectedItems: ITag[]): ITag[] {
    let results = [];
    console.log(this.tagPicker);
    if (filterText) {
      if (this.state.allLookupItems == null) {
        this.allItemsLoading = true;
        if (!this.state.allItemsLoading) {
          let web: Web = null;
          let toSelect = [this.props.LookupField];
          if (this.props.LookupField != "ID") {
            toSelect.push("ID");
          }

          this.getPnpWeb(this.props.LookupWebId).then((web: Web) => {
            web.lists.getById(this.props.LookupListId).items.select(...toSelect).getAll().then(items => {
              this.allItemsLoading = false;
              let transformedItems = items.map(i => ({
                key: i.ID.toString(),
                name: i[this.props.LookupField].toString()
              }));
              this.setState({allLookupItems: transformedItems}, () => {
                //this.tagPicker.setState({isFocused: false});
                this.tagPicker.dismissSuggestions();
                let suggestions = this.getPossibleSuggestionsInternal(filterText, selectedItems);
                this.tagPicker.suggestionStore.updateSuggestions(suggestions);
                this.tagPicker.setState({suggestionsVisible: true});
                //this.tagPicker.resetFocus(0);
                //this.resolveTagSuggestions(filterText, selectedItems);


                //this.tagPicker.setState({isFocused: true});
              });
            }).catch(e => {
              handleError(e);
              this.allItemsLoading = false;
            });
          });
        }
      } else {
        this.tagPicker.focus();
        this.tagPicker.setState({isFocused: false});
        results = this.getPossibleSuggestionsInternal(filterText, selectedItems);

      }
    }
    return results;
  }

  private getPossibleSuggestionsInternal(filterText: string, selectedItems: ITag[]): ITag[] {
    return this.state.allLookupItems
      .filter(item => item.name != null && item.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
      .filter(item => !this.selectedItemsContainTag(item, selectedItems));
  }

  private getPnpWeb(webId: string): Promise<Web> {
    let promise: Promise<Web> = new Promise<Web>((resolve, reject) => {
      if (webId) {
        this.props.pnpSPRest.site.openWebById(this.props.LookupWebId).then(webResult => {
          resolve(webResult.web);
        }).catch(e => handleError(e));
      } else {
        resolve(this.props.pnpSPRest.web);
      }
    });
    return promise;
  }

  private selectedItemsContainTag(tag: ITag, tagList: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }

  private saveFieldDataInternal(newValue) {
    if (this.props.IsMulti) {
      this.setState({selectedItems: this.constructNewState(newValue.key, newValue.selected)}, () => {
        this.trySetChangedValue({results: this.state.selectedItems});
      });
    } else {
      this.setState({selectedItems: [newValue.key]}, () => {
        this.trySetChangedValue(this.state.selectedItems.length > 0 ? this.state.selectedItems[0] : undefined);
      });
    }
  }

  private constructNewState(value: string, toAdd: boolean): string[] {
    let result: string[] = this.state.selectedItems;
    if (toAdd) {
      let filtered = this.state.selectedItems.filter(i => i == value);
      if (!(this.state.selectedItems as string[]).includes(value)) {
        result = [value, ...this.state.selectedItems];
      }
    } else {
      result = [];
      for (let i of this.state.selectedItems) {
        if (i != value) {
          result.push(i);
        }
      }
    }
    return result;
  }
}