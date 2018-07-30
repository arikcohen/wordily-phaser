/**
 * Represents a ContextSize response
 *
 * @export
 * @interface IContextSizeResponse
 */
export interface IContextSizeResponse {
    /**
     * The answer field is true if the current context size is between the minSize and maxSize values
     * that are specified in the object, and false otherwise.
     *
     * @type {boolean}
     * @memberOf IContextSizeResponse
     */
    readonly answer: boolean;
    /**
     * The minimum size of the context (it can be null)
     *
     * @type {number}
     * @memberOf IContextSizeResponse
     */
    readonly minSize?: number;
    /**
     * The maximum size of the context (it can be null)
     *
     * @type {number}
     * @memberOf IContextSizeResponse
     */
    readonly maxSize?: number;
}
