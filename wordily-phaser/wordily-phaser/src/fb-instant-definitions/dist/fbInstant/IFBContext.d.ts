/**
 * Contains functions and properties related to the current game context.
 *
 * @export
 * @interface IConnectedPlayer
 */
import { IContextSizeResponse } from "./IContextSizeResponse";
import { IChooseAsyncOptions } from "./IChooseAsyncOptions";
import { IContextPlayer } from "./IContextPlayer";
import { FBContextType } from "./FBContextType";
export interface IFBContext {
    /**
     * A unique identifier for the current game context.
     * This represents a specific context that the game is being played in
     * (for example, a particular messenger conversation or facebook post).
     * The identifier will be null if game is being played in a solo context.
     * The result is not guaranteed to be correct until FBInstant.startGameAsync has resolved.
     *
     * @returns {string} A unique identifier for the current game context.
     *
     * @memberOf IConnectedPlayer
     */
    getID(): string;
    /**
     * The type of the current game context.
     *
     * @returns {FBContextType} Type of the current game context.
     *
     * @memberOf IConnectedPlayer
     */
    getType(): FBContextType;
    /**
     * This function determines whether the number of participants in the current game context is
     * between a given minimum and maximum, inclusive.
     * If one of the bounds is null only the other bound will be checked against.
     * It will always return the original result for the first call made in a context in a given game play session.
     * Subsequent calls, regardless of arguments, will return the answer to the original query until
     * a context change occurs and the query result is reset.
     *
     * @param {number} [minSize] The minimum bound of the context size query.
     * @param {number} [maxSize] The maximum bound of the context size query.
     * @returns {IContextSizeResponse} An object representing the context query results.
     *
     * @memberOf IConnectedPlayer
     */
    isSizeBetween(minSize?: number, maxSize?: number): IContextSizeResponse;
    /**
     * Request a switch into a specific context.
     * If the player does not have permission to enter that context, or if the player
     * does not provide permission for the game to enter that context, this will reject.
     * Otherwise, the promise will resolve when the game has switched into the specified context.
     *
     * @param {string} id ID of the desired context.
     * @returns {Promise<void>} A promise that resolves when the game has switched into the specified context, or rejects otherwise.
     * @throws INVALID_PARAM, SAME_CONTEXT, NETWORK_FAILURE, USER_INPUT, PENDING_REQUEST, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBContext
     */
    switchAsync(id: string): Promise<void>;
    /**
     * Opens a context selection dialog for the player. If the player selects an available context,
     * the client will attempt to switch into that context, and resolve if successful. Otherwise,
     * if the player exits the menu or the client fails to switch into the new context, this function will reject.
     *
     * _The "options" parameter may not be optional, we encountered a bug when not adding a filter_
     *
     * @param {*} [options] An object specifying conditions on the contexts that should be offered.
     * @returns {Promise<void>} A promise that resolves when the game has switched into the context chosen by the user. Otherwise, the promise will reject (if the user cancels out of the dialog, for example).
     * @throws INVALID_PARAM, SAME_CONTEXT, NETWORK_FAILURE, USER_INPUT, PENDING_REQUEST, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBContext
     */
    chooseAsync(options?: IChooseAsyncOptions): Promise<void>;
    /**
     * Attempts to create or switch into a context between a specified player and the current player.
     * The returned promise will reject if the player listed is not a Connected Player of the current player
     * or if the player does not provide permission to enter the new context.
     * Otherwise, the promise will resolve when the game has switched into the new context.
     *
     * @param {string} playerID ID of the player
     * @returns {Promise<void>} A promise that resolves when the game has switched into the new context, or rejects otherwise.
     * @throws INVALID_PARAM, SAME_CONTEXT, NETWORK_FAILURE, USER_INPUT, PENDING_REQUEST, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBContext
     */
    createAsync(playerID: string): Promise<void>;
    /**
     * Gets an array of #contextplayer objects containing information about active players (people who played the game in the last 90 days) that are
     * associated with the current context. This may include the current player.
     *
     * @returns {Promise<IContextPlayer[]>} An array of players
     * @throws NETWORK_FAILURE,CLIENT_UNSUPPORTED_OPERATION, INVALID_OPERATION
     *
     * @memberOf IFBContext
     */
    getPlayersAsync(): Promise<IContextPlayer[]>;
}
