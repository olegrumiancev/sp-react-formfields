import * as React from 'react';
import { IFieldProps } from './interfaces';
export default class FormHeader extends React.Component<{
    Fields: IFieldProps[];
    CurrentMode: number;
}, {}> {
    constructor(props: any);
    render(): JSX.Element;
}
