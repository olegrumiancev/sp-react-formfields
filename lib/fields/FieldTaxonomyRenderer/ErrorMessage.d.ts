/// <reference types="react" />
import * as React from 'react';
export interface IFieldErrorMessageProps {
    errorMessage: string;
}
export default class FieldErrorMessage extends React.Component<IFieldErrorMessageProps> {
    render(): JSX.Element;
}
