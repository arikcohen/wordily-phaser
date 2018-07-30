import { ContextFilter } from "./ContextFilter";
export interface IChooseAsyncOptions {
    /**
     * The set of filters to apply to the context suggestions.
     *
     * @type {ContextFilter[]}
     * @memberOf IChooseAsyncOptions
     */
    filters?: ContextFilter[];
    /**
     * The maximum number of participants that a suggested context should ideally have.
     *
     * _(This property configures a hard limit)_
     *
     * @type {number}
     * @memberOf IChooseAsyncOptions
     */
    maxSize?: number;
    /**
     * The minimum number of participants that a suggested context should ideally have.
     *
     * _(This property configures a hard limit)_
     *
     * @type {number}
     * @memberOf IChooseAsyncOptions
     */
    minSize?: number;
}
