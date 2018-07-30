import { IProduct } from "./IProduct";
import { IPurchaseConfig } from "./IPurchaseConfig";
import { IPurchase } from "./IPurchase";
/**
 * [IN CLOSED BETA] Contains functions and properties related to payments and purchases of game products.
 *
 * @interface IPayments
 */
export interface IPayments {
    /**
     * Fetches the game's product catalog.
     *
     * @returns {Promise<IProduct[]>} The set of products that are registered to the game.
     * @throws CLIENT_UNSUPPORTED_OPERATION, PAYMENTS_NOT_INITIALIZED, NETWORK_FAILURE
     *
     * @memberOf IPayments
     */
    getCatalogAsync(): Promise<IProduct[]>;
    /**
     * Begins the purchase flow for a specific product.
     *
     * @param {IPurchaseConfig} purchaseConfig The purchase's configuration details.
     * @returns {Promise<IPurchase>} A Promise that resolves when the product is successfully purchased by the player. Otherwise, it rejects.
     * @throws CLIENT_UNSUPPORTED_OPERATION, PAYMENTS_NOT_INITIALIZED, INVALID_PARAM, NETWORK_FAILURE
     *
     * @memberOf IPayments
     */
    purchaseAsync(purchaseConfig: IPurchaseConfig): Promise<IPurchase>;
    /**
     * Fetches all of the player's unconsumed purchases.
     * As a best practice, the game should fetch the current player's purchases as soon as
     * the client indicates that it is ready to perform payments-related operations.
     * The game can then process and consume any purchases that are waiting to be consumed.
     *
     * @returns {Promise<IPurchase[]>} The set of purchases that the player has made for the game.
     * @throws CLIENT_UNSUPPORTED_OPERATION, PAYMENTS_NOT_INITIALIZED, NETWORK_FAILURE
     *
     * @memberOf IPayments
     */
    getPurchasesAsync(): Promise<IPurchase[]>;
    /**
     * Consumes a specific purchase belonging to the current player.
     * Before provisioning a product's effects to the player,
     * the game should request the consumption of the purchased product.
     * Once the purchase is successfully consumed, the game should immediately
     * provide the player with the effects of their purchase.
     *
     * @param {string} purchaseToken The purchase token of the purchase that should be consumed.
     * @returns {Promise<void>} A Promise that resolves when the purchase has been consumed successfully.
     * @throws CLIENT_UNSUPPORTED_OPERATION, PAYMENTS_NOT_INITIALIZED, INVALID_PARAM, NETWORK_FAILURE
     *
     * @memberOf IPayments
     */
    consumePurchaseAsync(purchaseToken: string): Promise<void>;
    /**
     * Sets a callback to be triggered when Payments operations are available.
     *
     * @param {Function} callback The callback function to be executed when Payments are available.
     *
     * @memberOf IPayments
     */
    onReady(callback: Function): void;
}
