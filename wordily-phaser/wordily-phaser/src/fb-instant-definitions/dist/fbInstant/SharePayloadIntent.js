"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Indicates the intent of the share.
 *
 * @export
 * @enum {string}
 */
var SharePayloadIntent;
(function (SharePayloadIntent) {
    SharePayloadIntent["INVITE"] = "INVITE";
    SharePayloadIntent["REQUEST"] = "REQUEST";
    SharePayloadIntent["CHALLENGE"] = "CHALLENGE";
    SharePayloadIntent["SHARE"] = "SHARE";
})(SharePayloadIntent = exports.SharePayloadIntent || (exports.SharePayloadIntent = {}));
