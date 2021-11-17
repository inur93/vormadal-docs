
export class BaseError<T> {

    constructor(

        /**
         * Http status code
         */
        public status: number,
        /**
         * User friendly message of the error
         */
        public message: string,
        /**
         * a unique code for this type of error
         */
        public code: string,
        /**
         * any relevant data for this error which can be used by the client for better handling the error
         */
        public details: T) {
    }
}