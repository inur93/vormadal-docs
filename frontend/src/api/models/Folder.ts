/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Types_ObjectId } from './Types_ObjectId';

export type Folder = {
    /**
     * Generated id by Mongo
     */
    _id: Types_ObjectId;
    name: string;
    parentFolder?: (Folder | string);
}