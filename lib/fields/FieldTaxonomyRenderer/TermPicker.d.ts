import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPickerTerm, ITermPickerProps, ITermPickerState } from './interfaces';
export declare class TermBasePicker extends BasePicker<IPickerTerm, IBasePickerProps<IPickerTerm>> {
}
export default class TermPicker extends React.Component<ITermPickerProps, ITermPickerState> {
    private tagPicker;
    constructor(props: any);
    componentWillReceiveProps(newProps: any): void;
    render(): JSX.Element;
    protected onRenderItem(term: IPickerItemProps<IPickerTerm>): JSX.Element;
    protected onRenderSuggestionsItem(term: IPickerTerm): JSX.Element;
    private onFilterChanged;
    private onGetTextFromItem;
}
