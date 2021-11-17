

/**
 * list containing a subset of a query and the total number of documents matching the query.
 */
export interface PagedList<T> {
    /**
     * The total number of results
     */
    count: number;
    /**
     * a subset of the data defined by the limit and page query parameters
     */
    data: T[]
}