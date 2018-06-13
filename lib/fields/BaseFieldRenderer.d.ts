/// <reference types="react" />
import * as React from 'react';
import { IFieldProps } from '../interfaces';
export declare class BaseFieldRenderer extends React.Component<IFieldProps, any> {
    constructor(props: IFieldProps);
    render(): JSX.Element;
    setFieldMode(mode: number): void;
    isValid(): boolean;
    getValue(): any;
    protected renderNewForm(): JSX.Element;
    protected renderEditForm(): JSX.Element;
    protected renderDispForm(): JSX.Element;
    protected trySetChangedValue(newValue: any): void;
}
