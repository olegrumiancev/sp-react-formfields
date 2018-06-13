/// <reference types="react" />
import * as React from 'react';
import { IFieldProps } from '../interfaces';
export declare class FormField extends React.Component<IFieldProps, any> {
    constructor(props: IFieldProps);
    render(): JSX.Element;
    componentDidMount(): void;
    private setFieldData(internalName, newValue);
    private createFieldRenderer(fieldProps, onFieldDataChangeCallback);
}
