/// <reference types="react" />
import * as React from 'react';
import { IFormFieldProps } from '../interfaces';
export declare class FormField extends React.Component<IFormFieldProps, any> {
    constructor(props: IFormFieldProps);
    render(): JSX.Element;
    componentDidMount(): void;
    private setFieldData(internalName, newValue);
    private createFieldRenderer(fieldProps, onFieldDataChangeCallback);
}
