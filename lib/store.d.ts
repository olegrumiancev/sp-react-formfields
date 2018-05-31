/// <reference types="react" />
import { IFormManagerProps } from './interfaces';
import * as React from 'react';
export declare const FormFieldsStore: {
    getFieldControlValuesForPost: () => Object;
    Provider: React.ComponentType<any>;
    Consumer: React.ComponentType<any>;
    connect: (selector: (state: IFormManagerProps) => any) => (baseComponet: React.ComponentType<any>) => React.ComponentType<any>;
    actions: {
        [K: string]: (...args: any[]) => void;
    };
    getState: () => IFormManagerProps;
    subscribe: (subscruber: (action: string, state: IFormManagerProps, ...args: any[]) => void) => void;
};
