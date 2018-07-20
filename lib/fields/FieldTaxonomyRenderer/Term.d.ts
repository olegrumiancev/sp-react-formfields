/// <reference types="react" />
import * as React from 'react';
import { ITermProps, ITermState } from './interfaces';
export default class Term extends React.Component<ITermProps, ITermState> {
    constructor(props: ITermProps);
    componentWillReceiveProps?(nextProps: ITermProps, nextContext: any): void;
    render(): JSX.Element;
    private _handleChange(ev, isChecked);
}
