import { IFieldProps } from '../interfaces';
import { SPRest } from '@pnp/sp';
export declare const FieldPropsManager: {
    createFieldRendererPropsFromFieldMetadata: (fieldMetadata: any, formMode: number, spListItem: any, spRest: SPRest) => IFieldProps;
};
