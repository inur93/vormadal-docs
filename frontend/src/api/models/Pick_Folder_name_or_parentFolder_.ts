/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Folder } from './Folder';

/**
 * From T, pick a set of properties whose keys are in the union K
 */
export type Pick_Folder_name_or_parentFolder_ = {
    name: string;
    parentFolder?: (Folder | string);
}