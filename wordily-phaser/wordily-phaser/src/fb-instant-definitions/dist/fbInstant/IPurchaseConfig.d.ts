/**
 * The configuration of a purchase request for a product registered to the game.
 *
 * @interface IPurchaseConfig
 */
export interface IPurchaseConfig {
    /**
     * The identifier of the product to purchase
     *
     * @type {string}
     * @memberOf IPurchaseConfig
     */
    productID: string;
    /**
     * An optional developer-specified payload, to be included in the returned purchase's signed request.
     *
     * @type {string}
     * @memberOf IPurchaseConfig
     */
    developerPayload?: string;
}
