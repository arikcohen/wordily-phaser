/**
 * Represents information about a player who is in the context that the current player is playing in.
 *
 * @export
 * @interface IContextPlayer
 */
export interface IContextPlayer {
    /**
     * Get the id of the context player.
     *
     * @returns {string} The ID of the context player
     *
     * @memberOf IContextPlayer
     */
    getID(): string;
    /**
     * Get the player's localized display name.
     *
     * @returns {string} The player's localized display name.
     *
     * @memberOf IContextPlayer
     */
    getName(): string;
    /**
     * Get the player's public profile photo.
     *
     * @returns {string} A url to the player's public profile photo
     *
     * @memberOf IContextPlayer
     */
    getPhoto(): string;
}
