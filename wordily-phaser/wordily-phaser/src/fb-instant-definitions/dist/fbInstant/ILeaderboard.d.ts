import { ILeaderboardEntry } from "./ILeaderboardEntry";
/**
 * An Instant Game leaderboard
 *
 * @interface ILeaderboard
 */
export interface ILeaderboard {
    /**
     * The name of the leaderboard.
     *
     * @returns {string} The name of the leaderboard.
     *
     * @memberOf ILeaderboard
     */
    getName(): string;
    /**
     * The ID of the context that the leaderboard is associated with, or null if the leaderboard is not tied to a particular context.
     *
     * @returns {string} The ID of the context that the leaderboard is associated with, or null if the leaderboard is not tied to a particular context.
     *
     * @memberOf ILeaderboard
     */
    getContextID(): string;
    /**
     * Fetches the total number of player entries in the leaderboard.
     *
     * @returns {Promise<number>} A unique identifier for the player.
     * @throws NETWORK_FAILURE
     *
     * @memberOf ILeaderboard
     */
    getEntryCountAsync(): Promise<number>;
    /**
     * Updates the player's score.
     * If the player has an existing score, the old score will only be replaced if the new score is better than it.
     * NOTE: If the leaderboard is associated with a specific context,
     * the game must be in that context to set a score for the player.
     *
     * @param {number} score The new score for the player. Must be a 64-bit integer number.
     * @param {string} [extraData] Metadata to associate with the stored score. Must be less than 2KB in size.
     * @returns {Promise<ILeaderboardEntry>} Resolves with the current leaderboard entry for the player after the update.
     * @throws LEADERBOARD_WRONG_CONTEXT, NETWORK_FAILURE, INVALID_PARAM, INVALID_OPERATION
     *
     * @memberOf ILeaderboard
     */
    setScoreAsync(score: number, extraData?: string): Promise<ILeaderboardEntry>;
    /**
     * Retrieves the leaderboard's entry for the current player, or null if the player has not set one yet.
     *
     * @returns {Promise<ILeaderboardEntry>} Resolves with the current leaderboard entry for the player. It can be null.
     * @throws NETWORK_FAILURE, INVALID_OPERATION
     *
     * @memberOf ILeaderboard
     */
    getPlayerEntryAsync(): Promise<ILeaderboardEntry>;
    /**
     * Retrieves a set of leaderboard entries, ordered by score ranking in the leaderboard.
     *
     * @param {number} count The number of entries to attempt to fetch from the leaderboard. Defaults to 10 if not specified. Up to a maximum of 100 entries may be fetched per query.
     * @param {number} offset The offset from the top of the leaderboard that entries will be fetched from.
     * @returns {Promise<ILeaderboardEntry[]>} Resolves with the leaderboard entries that match the query.
     * @throws NETWORK_FAILURE
     *
     * @memberOf ILeaderboard
     */
    getEntriesAsync(count: number, offset: number): Promise<ILeaderboardEntry[]>;
}
