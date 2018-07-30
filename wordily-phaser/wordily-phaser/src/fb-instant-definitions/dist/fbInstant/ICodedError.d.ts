import { ErrorCodeType } from "./ErrorCodeType";
/**
 * A Coded Error returned by the Instant Games API
 *
 * @export
 * @interface ICodedError
 */
export interface ICodedError {
    /**
     * The relevant error code
     *
     * @type {ErrorCodeType}
     * @memberOf ICodedError
     */
    code: ErrorCodeType;
    /**
     * A message describing the error
     *
     * @type {string}
     * @memberOf ICodedError
     */
    message: string;
}
