import { UpdateAction } from "./UpdateAction";
/**
 * An update payload which can be used in the FBInstant.updateAsync function.
 *
 * @export
 * @interface IUpdatePayload
 */
export interface IUpdatePayload {
    /**
     * The UpdateAction (CUSTOM or LEADERBOARD)
     *
     * @type {UpdateAction}
     * @memberOf IUpdatePayload
     */
    action: UpdateAction;
}
