/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePage } from '../models/CreatePage';
import type { GetPage } from '../models/GetPage';
import type { GetPageSummary } from '../models/GetPageSummary';
import type { Omit_UpdatePage__id_ } from '../models/Omit_UpdatePage__id_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class PageService {

    /**
     * @returns GetPageSummary Ok
     * @throws ApiError
     */
    public static getAllPages(): CancelablePromise<Array<GetPageSummary>> {
        return __request({
            method: 'GET',
            path: `/pages`,
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns GetPage Created
     * @throws ApiError
     */
    public static createPage(
requestBody: CreatePage,
): CancelablePromise<GetPage> {
        return __request({
            method: 'POST',
            path: `/pages`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param identifier the UUID or slug of the page
     * @returns GetPage Ok
     * @throws ApiError
     */
    public static getPage(
identifier: string,
): CancelablePromise<GetPage> {
        return __request({
            method: 'GET',
            path: `/pages/${identifier}`,
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param pageId 
     * @param requestBody 
     * @returns GetPage Ok
     * @throws ApiError
     */
    public static updatePage(
pageId: string,
requestBody: Omit_UpdatePage__id_,
): CancelablePromise<GetPage> {
        return __request({
            method: 'PUT',
            path: `/pages/${pageId}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param pageId 
     * @returns void 
     * @throws ApiError
     */
    public static deletePage(
pageId: string,
): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/pages/${pageId}`,
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}