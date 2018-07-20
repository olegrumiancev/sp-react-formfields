import { IFieldProps } from '../interfaces';
import { SPRest } from '@pnp/sp';
export declare const FieldPropsManager: {
    createFieldRendererPropsFromFieldMetadata: (fieldMetadata: any, formMode: number, currentListId: string, spListItem: any, spRest: SPRest) => Promise<IFieldProps>;
};
