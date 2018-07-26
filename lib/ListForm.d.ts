import * as React from 'react';
import { IListFormProps } from './interfaces';
export declare class ListForm extends React.Component<IListFormProps, IListFormProps> {
    private localContext;
    constructor(props: any);
    render(): JSX.Element;
    componentDidMount(): void;
    private getButtonsByFormMode;
}
export declare const ListFormInternal: (props: any) => JSX.Element;
