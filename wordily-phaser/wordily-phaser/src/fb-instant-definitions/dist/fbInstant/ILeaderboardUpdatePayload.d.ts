import { IUpdatePayload } from "./IUpdatePayload";
/**
 * Represents a leaderboard update for FBInstant.updateAsync.
 *
 * @export
 * @interface ILeaderboardUpdatePayload
 */
export interface ILeaderboardUpdatePayload extends IUpdatePayload {
    /**
     * The name of the leaderboard to feature in the update.
     *
     * @type {string}
     * @memberOf ILeaderboardUpdatePayload
     */
    name: string;
    /**
     * Optional text message. If not specified, a localized fallback message will be provided instead.
     *
     * @type {string}
     * @memberOf ILeaderboardUpdatePayload
     */
    text?: string;
}
