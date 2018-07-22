import * as React from 'react';
import { IListFormProps } from './interfaces';
export default class ListForm extends React.Component<IListFormProps, IListFormProps> {
    private localContext;
    constructor(props: any);
    render(): JSX.Element;
    componentDidMount(): void;
    private closeForm;
    private getButtonsByFormMode;
}
export declare const ListFormInternal: (props: any) => JSX.Element;
