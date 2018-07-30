/**
 * Represents the type of a game context.
 *
 * @export
 * @enum {string}
 */
export declare enum FBContextType {
    /**
     * A facebook post
     */
    POST = "POST",
    /**
     * A messenger thread
     */
    THREAD = "THREAD",
    /**
     * A facebook group
     */
    GROUP = "GROUP",
    /**
     * Default context, where the player is the only participant
     */
    SOLO = "SOLO",
}
