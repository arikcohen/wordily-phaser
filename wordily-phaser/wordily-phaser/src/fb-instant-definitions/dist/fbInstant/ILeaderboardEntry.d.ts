import { ILeaderboardPlayer } from "./ILeaderboardPlayer";
/**
 * A score entry for an Instant Game leaderboard
 *
 * @interface ILeaderboardEntry
 */
export interface ILeaderboardEntry {
    /**
     * Gets the score associated with the entry.
     *
     * @returns {number} Returns an integer score value.
     *
     * @memberOf ILeaderboardEntry
     */
    getScore(): number;
    /**
     * Gets the score associated with the entry, formatted with the score format associated with the leaderboard.
     *
     * @returns {string} Returns a formatted score.
     *
     * @memberOf ILeaderboardEntry
     */
    getFormattedScore(): string;
    /**
     * Gets the timestamp of when the leaderboard entry was last updated.
     *
     * @returns {number} Returns a Unix timestamp.
     *
     * @memberOf ILeaderboardEntry
     */
    getTimestamp(): number;
    /**
     * Gets the rank of the player's score in the leaderboard.
     *
     * @returns {number} Returns the entry's leaderboard ranking.
     *
     * @memberOf ILeaderboardEntry
     */
    getRank(): number;
    /**
     * Gets the developer-specified payload associated with the score, or null if one was not set.
     *
     * @returns {string} An optional developer-specified payload associated with the score.
     *
     * @memberOf ILeaderboardEntry
     */
    getExtraData(): string;
    /**
     * Gets information about the player associated with the entry.
     *
     * @returns {ILeaderboardPlayer} The information about the player associated with the entry.
     *
     * @memberOf ILeaderboardEntry
     */
    getPlayer(): ILeaderboardPlayer;
}
