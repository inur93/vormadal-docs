/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFolder } from '../models/CreateFolder';
import type { GetFolder } from '../models/GetFolder';
import type { Omit_UpdateFolder__id_ } from '../models/Omit_UpdateFolder__id_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FolderService {

    /**
     * @returns GetFolder Ok
     * @throws ApiError
     */
    public static getAllFolders(): CancelablePromise<Array<GetFolder>> {
        return __request({
            method: 'GET',
            path: `/folders`,
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns GetFolder Created
     * @throws ApiError
     */
    public static createFolder(
requestBody: CreateFolder,
): CancelablePromise<GetFolder> {
        return __request({
            method: 'POST',
            path: `/folders`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param folderId 
     * @param requestBody 
     * @returns GetFolder Ok
     * @throws ApiError
     */
    public static updateFolder(
folderId: string,
requestBody: Omit_UpdateFolder__id_,
): CancelablePromise<GetFolder> {
        return __request({
            method: 'PUT',
            path: `/folders/${folderId}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param folderId 
     * @returns void 
     * @throws ApiError
     */
    public static deleteFolder(
folderId: string,
): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/folders/${folderId}`,
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}