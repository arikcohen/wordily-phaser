/**
 * Represents content to be shared by the user.
 *
 * @export
 * @interface ISharePayload
 */
import { SharePayloadIntent } from "./SharePayloadIntent";
/**
 * A share payload representation
 *
 * @export
 * @interface ISharePayload
 */
export interface ISharePayload {
    /**
     * Indicates the intent of the share.
     *
     * @type {SharePayloadIntent}
     * @memberOf ISharePayload
     */
    intent: SharePayloadIntent;
    /**
     * A base64 encoded image to be shared.
     *
     * @type {string}
     * @memberOf ISharePayload
     */
    image: string;
    /**
     * A text message to be shared.
     *
     * @type {string}
     * @memberOf ISharePayload
     */
    text: string;
    /**
     * A blob of data to attach to the share.
     * All game sessions launched from the share will be able to access this blob through FBInstant.getEntryPointData().
     *
     * @type {Object}
     * @memberOf ISharePayload
     */
    data?: Object;
}
