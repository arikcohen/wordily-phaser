/**
 * Represents information about a player who is connected to the current player.
 *
 * @export
 * @interface IConnectedPlayer
 */
export interface IConnectedPlayer {
    /**
     * Get the id of the connected player.
     *
     * @returns {string} The ID of the connected player
     *
     * @memberOf IConnectedPlayer
     */
    getID(): string;
    /**
     * Get the player's full name.
     *
     * @returns {string} The player's full name
     *
     * @memberOf IConnectedPlayer
     */
    getName(): string;
    /**
     * Get the player's public profile photo.
     *
     * @returns {string} A url to the player's public profile photo
     *
     * @memberOf IConnectedPlayer
     */
    getPhoto(): string;
}
