/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Folder } from './Folder';

export type CreateFolder = {
    name: string;
    parentFolder?: (Folder | string);
}