/**
 * Top level namespace for the Instant Games SDK.
 *
 * @interface IFBInstant
 */
import { IAdInstance } from "./IAdInstance";
import { IFBPlayer } from "./IFBPlayer";
import { IFBContext } from "./IFBContext";
import { Platform } from "./Platform";
import { ISharePayload } from "./ISharePayload";
import { IUpdatePayload } from "./IUpdatePayload";
import { IAPIError } from "./IAPIError";
import { IPayments } from "./IPayments";
import { ILeaderboard } from "./ILeaderboard";
export interface IFBInstant {
    /**
     * The current player
     *
     * @type {IFBPlayer}
     * @memberOf IFBInstant
     */
    readonly player: IFBPlayer;
    /**
     * The current game context
     *
     * @type {IFBContext}
     * @memberOf IFBInstant
     */
    readonly context: IFBContext;
    /**
     * The payments instance
     *
     * @type {IPayments}
     * @memberOf IFBInstant
     */
    readonly payments: IPayments;
    /**
     * Attempt to create an instance of interstitial ad.
     * This instance can then be preloaded and presented.
     *
     * @param {string} placementID The placement ID that's been setup in your Audience Network settings
     * @returns {Promise<IAdInstance>} A promise that resolves with an IAdInstance, or rejects with a CodedError if it couldn't be created.
     * @throws ADS_TOO_MANY_INSTANCES, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBInstant
     */
    getInterstitialAdAsync(placementID: string): Promise<IAdInstance>;
    /**
     * Attempt to create an instance of rewarded video.
     * This instance can then be preloaded and presented.
     *
     * @param {string} placementID The placement ID that's been setup in your Audience Network settings
     * @returns {Promise<IAdInstance>} A promise that resolves with an IAdInstance, or rejects with a CodedError if it couldn't be created.
     * @throws ADS_TOO_MANY_INSTANCES, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBInstant
     */
    getRewardedVideoAsync(placementID: string): Promise<IAdInstance>;
    /**
     * [IN CLOSED BETA] Attempts to match the current player with other users looking for people to play with.
     * If successful the a new Messenger group thread will be created containing the matched players and the player will be context switched to that thread.
     *
     * @param {string} [matchTag] Optional extra information about the player used to group them with similar players. Players will only be grouped with other players with exactly the same tag. The tag must only include letters, numbers, and underscores and be 100 characters or less in length.
     * @returns {Promise<void>} A promise that resolves when the player has been added to a group thread and switched into the thread's context.
     * @throws INVALID_PARAM, NETWORK_FAILURE, USER_INPUT, PENDING_REQUEST, CLIENT_UNSUPPORTED_OPERATION, INVALID_OPERATION
     *
     * @memberOf IFBInstant
     */
    matchPlayerAsync(matchTag?: string): Promise<void>;
    /**
     * [IN CLOSED BETA] Checks if the current player is eligible for the matchPlayerAsync API.
     *
     * @returns {Promise<boolean>} A promise that resolves with true if the player is eligible to match with other players and false otherwise.
     * @throws NETWORK_FAILURE, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBInstant
     */
    checkCanPlayerMatchAsync(): Promise<boolean>;
    /**
     * Fetch a specific leaderboard belonging to this Instant Game.
     *
     * @param {string} name The name of the leaderboard. Each leaderboard for an Instant Game must have its own distinct name.
     * @returns {Promise<ILeaderboard>} A promise that resolves with the matching leaderboard, rejecting if one is not found.
     * @throws LEADERBOARD_NOT_FOUND, NETWORK_FAILURE, CLIENT_UNSUPPORTED_OPERATION, INVALID_OPERATION, INVALID_PARAM
     *
     * @memberOf IFBInstant
     */
    getLeaderboardAsync(name: string): Promise<ILeaderboard>;
    /**
     * The current locale. See https://www.facebook.com/translations/FacebookLocales.xml for a complete list of supported locale values.
     * Use this to determine what language the current game should be localized with.
     * The value will always be null until FBInstant.initializeAsync() resolves.
     *
     * @returns {string} The current locale.
     *
     * @memberOf IFBInstant
     */
    getLocale(): string;
    /**
     * The platform on which the game is currently running.
     * The value will always be null until FBInstant.initializeAsync() resolves.
     *
     * @returns {Platform} The platform
     *
     * @memberOf IFBInstant
     */
    getPlatform(): Platform;
    /**
     * The string representation of this SDK version.
     *
     * @returns {string} The SDK version.
     *
     * @memberOf IFBInstant
     */
    getSDKVersion(): string;
    /**
     * Initializes the SDK library. This should be called before any other SDK functions.
     *
     * @returns {Promise<void>} A promise that resolves when the SDK is ready to use.
     * @throws INVALID_OPERATION
     *
     * @memberOf IFBInstant
     */
    initializeAsync(): Promise<void>;
    /**
     * Report the game's initial loading progress.
     *
     * @param {number} percentage A number between 0 and 100.
     *
     * @memberOf IFBInstant
     */
    setLoadingProgress(percentage: number): void;
    /**
     * Provides a list of API functions that are supported by the client
     *
     * @returns {string[]} List of API functions that the client explicitly supports
     *
     * @memberOf IFBInstant
     */
    getSupportedAPIs(): string[];
    /**
     * Returns any data object associated with the entry point that the game was launched from.
     *
     * The contents of the object are developer-defined, and can occur from entry points on different platforms.
     * This will return null for older mobile clients, as well as when there is no data associated with
     * the particular entry point.
     *
     * @returns {*} Data associated with the current entry point.
     *
     * @memberOf IFBInstant
     */
    getEntryPointData(): any;
    /**
     * Returns the entry point that the game was launched from
     *
     * @returns {string} The name of the entry point from which the user started the game
     *
     * @memberOf IFBInstant
     */
    getEntryPointAsync(): string;
    /**
     * Sets the data associated with the individual gameplay session for the current context.
     *
     * This function should be called whenever the game would like to update the current session data.
     * This session data may be used to populate a variety of payloads, such as game play webhooks.
     *
     * @param {Object} sessionData An arbitrary data object, which must be less than or equal to 1000 characters when stringified.
     *
     * @memberOf IFBInstant
     */
    setSessionData(sessionData: Object): void;
    /**
     * This indicates that the game has finished initial loading and is ready to start.
     * Context information will be up-to-date when the returned promise resolves.
     *
     * @returns {Promise<void>} A promise that resolves when the game should start.
     * @throws INVALID_PARAM, CLIENT_UNSUPPORTED_OPERATION
     *
     * @memberOf IFBInstant
     */
    startGameAsync(): Promise<void>;
    /**
     * This invokes a dialog to let the user share specified content, either as a message in Messenger
     * or as a post on the user's timeline. A blob of data can be attached to the share which every
     * game session launched from the share will be able to access from FBInstant.getEntryPointData().
     * This data must be less than or equal to 1000 characters when stringified.
     * The user may choose to cancel the share action and close the dialog, and the returned promise
     * will resolve when the dialog is closed regardless if the user actually shared the content or not.
     *
     * @param {ISharePayload} payload Specify what to share.
     * @returns {Promise<void>} A promise that resolves when the share is completed or cancelled.
     * @throws INVALID_PARAM, NETWORK_FAILURE, PENDING_REQUEST, CLIENT_UNSUPPORTED_OPERATION, INVALID_OPERATION
     *
     * @memberOf IFBInstant
     */
    shareAsync(payload: ISharePayload): Promise<void>;
    /**
     * Informs Facebook of an update that occurred in the game.
     * This will temporarily yield control to Facebook and Facebook will decide what to do based on what the update is.
     * The returned promise will resolve/reject when Facebook returns control to the game.
     *
     * @param {IUpdatePayload} payload A payload that describes the update.
     * @returns {Promise<void>} A promise that resolves when Facebook gives control back to the game.
     * @throws INVALID_PARAM, PENDING_REQUEST, INVALID_OPERATION
     *
     * @memberOf IFBInstant
     */
    updateAsync(payload: IUpdatePayload): Promise<void>;
    /**
     * [IN CLOSED BETA] Request that the client switch to a different Instant Game.
     * The API will reject if the switch fails - else, the client will load the new game.
     *
     * @param {string} appID The Application ID of the Instant Game to switch to. The application must be an Instant Game, and must belong to the same business as the current game. To associate different games with the same business, you can use Business Manager: https://developers.facebook.com/docs/apps/business-manager#update-business.
     * @param {string} [data] An optional data payload. This will be set as the entrypoint data for the game being switched to. Must be less than or equal to 1000 characters when stringified.
     * @returns {Promise<void>}
     *
     * @memberOf IFBInstant
     */
    switchGameAsync(appID: string, data?: string): Promise<void>;
    /**
     * Quits the game
     *
     * @memberOf IFBInstant
     */
    quit(): void;
    /**
     * Log an app event with FB Analytics.
     * See https://developers.facebook.com/docs/javascript/reference/v2.8#app_events for more details about FB Analytics.
     *
     * @param {string} eventName Name of the event. Must be 2 to 40 characters, and can only contain '_', '-', ' ', and alphanumeric characters.
     * @param {number} [valueToSum] An optional numeric value that FB Analytics can calculate a sum with.
     * @param {Object} [parameters] An optional object that can contain up to 25 key-value pairs to be logged with the event. Keys must be 2 to 40 characters, and can only contain '_', '-', ' ', and alphanumeric characters. Values must be less than 100 characters in length.
     * @returns {IAPIError} The error if the event failed to log; otherwise returns null.
     *
     * @memberOf IFBInstant
     */
    logEvent(eventName: string, valueToSum?: number, parameters?: Object): IAPIError;
    /**
     * Set a callback to be fired when a pause event is triggered.
     *
     * @param {Function} func Set a callback to be fired when a pause event is triggered.
     *
     * @memberOf IFBInstant
     */
    onPause(func: Function): void;
}
