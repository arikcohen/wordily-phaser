import { ErrorCodeType } from "./ErrorCodeType";
/**
 * An API Error returned by the Instant Games SDK
 *
 * @export
 * @interface IAPIError
 */
export interface IAPIError {
    /**
     * The relevant error code
     *
     * @type {ErrorCodeType}
     * @memberOf IAPIError
     */
    code: ErrorCodeType;
    /**
     * A message describing the error
     *
     * @type {string}
     * @memberOf IAPIError
     */
    message: string;
}
