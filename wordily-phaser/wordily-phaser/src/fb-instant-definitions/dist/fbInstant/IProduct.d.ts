/**
 * Represents a game's product information.
 *
 * @interface IProduct
 */
export interface IProduct {
    /**
     * The title of the product
     *
     * @type {string}
     * @memberOf IProduct
     */
    title: string;
    /**
     * The product's game-specified identifier
     *
     * @type {string}
     * @memberOf IProduct
     */
    productID: string;
    /**
     * The product description
     *
     * @type {string}
     * @memberOf IProduct
     */
    description?: string;
    /**
     * A link to the product's associated image
     *
     * @type {string}
     * @memberOf IProduct
     */
    imageURI?: string;
    /**
     * The price of the product
     *
     * @type {string}
     * @memberOf IProduct
     */
    price: string;
    /**
     * The currency code for the product
     *
     * @type {string}
     * @memberOf IProduct
     */
    priceCurrencyCode: string;
}
