"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A filter that may be applied to a Context Choose operation
 *
 * @export
 * @enum {string}
 */
var ContextFilter;
(function (ContextFilter) {
    /**
     * Prefer to only surface contexts the game has not been played in before.
     */
    ContextFilter["NEW_CONTEXT_ONLY"] = "NEW_CONTEXT_ONLY";
    /**
     * Include the "Existing Challenges" section, which surfaces actively played-in contexts that the player is a part of.
     */
    ContextFilter["INCLUDE_EXISTING_CHALLENGES"] = "INCLUDE_EXISTING_CHALLENGES";
    /**
     * In sections containing individuals, prefer people who have not played the game.
     */
    ContextFilter["NEW_PLAYERS_ONLY"] = "NEW_PLAYERS_ONLY";
})(ContextFilter = exports.ContextFilter || (exports.ContextFilter = {}));
