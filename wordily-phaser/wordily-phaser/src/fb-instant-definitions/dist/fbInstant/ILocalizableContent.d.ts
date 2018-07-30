import { ILocalizationsDict } from "./ILocalizationsDict";
/**
 * Represents a string with localizations and a default value to fall back on.
 *
 * @export
 * @interface ILocalizableContent
 */
export interface ILocalizableContent {
    /**
     * The default value of the string to use if the viewer's locale is not a key in the localizations object.
     *
     * @type {string}
     * @memberOf ILocalizableContent
     */
    default: string;
    /**
     * Specifies what string to use for viewers in each locale.
     * See https://www.facebook.com/translations/FacebookLocales.xml for a complete list of supported locale values.
     *
     * @type {ILocalizationsDict}
     * @memberOf ILocalizableContent
     */
    localizations: ILocalizationsDict;
}
