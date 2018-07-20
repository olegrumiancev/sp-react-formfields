/// <reference types="react" />
import * as React from 'react';
import { IFieldProps } from '../interfaces';
export declare class BaseFieldRenderer extends React.Component<IFieldProps, any> {
    constructor(props: IFieldProps);
    render(): JSX.Element;
    setFieldMode(mode: number): void;
    validate(): boolean;
    getValue(): any;
    protected renderNewForm(props: IFieldProps): JSX.Element;
    protected renderEditForm(props: IFieldProps): JSX.Element;
    protected renderDispForm(props: IFieldProps): JSX.Element;
    protected renderValidationErrors(validationErrors: string[]): JSX.Element;
    protected trySetChangedValue(newValue: any): void;
}
