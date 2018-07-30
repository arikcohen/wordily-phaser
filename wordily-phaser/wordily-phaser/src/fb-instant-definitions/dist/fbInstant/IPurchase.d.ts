/**
 * Represents an individual purchase of a game product.
 *
 * @interface IPurchase
 */
export interface IPurchase {
    /**
     * A developer-specified string, provided during the purchase of the product
     *
     * @type {string}
     * @memberOf IPurchase
     */
    developerPayload?: string;
    /**
     * The identifier for the purchase transaction
     *
     * @type {string}
     * @memberOf IPurchase
     */
    paymentID: string;
    /**
     * The product's game-specified identifier
     *
     * @type {string}
     * @memberOf IPurchase
     */
    productID: string;
    /**
     * Unix timestamp of when the purchase occurred
     *
     * @type {string}
     * @memberOf IPurchase
     */
    purchaseTime: string;
    /**
     * A token representing the purchase that may be used to consume the purchase
     *
     * @type {string}
     * @memberOf IPurchase
     */
    purchaseToken: string;
    /**
     * Server-signed encoding of the purchase request
     *
     * @type {string}
     * @memberOf IPurchase
     */
    signedRequest: string;
}
