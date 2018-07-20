/// <reference types="react" />
import * as React from 'react';
import { ITermParentProps, ITermParentState } from './interfaces';
export default class TermParent extends React.Component<ITermParentProps, ITermParentState> {
    private _terms;
    private _anchorName;
    constructor(props: ITermParentProps);
    componentWillMount(): void;
    render(): JSX.Element;
    private _handleClick();
}
