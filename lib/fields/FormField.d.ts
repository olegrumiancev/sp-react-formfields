import * as React from 'react';
import { IFormFieldProps } from '../interfaces';
export declare class FormField extends React.Component<IFormFieldProps, any> {
    constructor(props: IFormFieldProps);
    render(): JSX.Element;
    componentDidMount(): Promise<void>;
    private loadFieldAsync;
    private renderAsyncField;
    private registerLoadedField;
    private catchLoadedFieldError;
    private importComponentNameFromTypeString;
}
