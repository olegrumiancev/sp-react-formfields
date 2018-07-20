import { IFieldProps } from './interfaces';
export declare const getQueryString: (url: any, field: any) => string;
export declare const unescapeHTML: (str: any) => any;
export declare const handleError: (msg: string) => void;
export declare const getFieldPropsByInternalName: (allProps: IFieldProps[], internalName: string) => IFieldProps;
