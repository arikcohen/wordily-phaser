"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents the type of a game context.
 *
 * @export
 * @enum {string}
 */
var FBContextType;
(function (FBContextType) {
    /**
     * A facebook post
     */
    FBContextType["POST"] = "POST";
    /**
     * A messenger thread
     */
    FBContextType["THREAD"] = "THREAD";
    /**
     * A facebook group
     */
    FBContextType["GROUP"] = "GROUP";
    /**
     * Default context, where the player is the only participant
     */
    FBContextType["SOLO"] = "SOLO";
})(FBContextType = exports.FBContextType || (exports.FBContextType = {}));
