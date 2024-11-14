/**
 * @description
 * LevelStorage stores data to a Level-compatible database.
 *
 * To learn more about Level, see {@link https://github.com/Level/level}.
 */

import type { Storage } from "./storage";

// const defaultPath = './level'
// const defaultValueEncoding = 'view'

/**
 * Creates an instance of LevelStorage.
 * @param {Object} [params={}] One or more parameters for configuring
 * LevelStorage.
 * @param {string} [params.path=defaultPath] The Level path.
 * @param {string} [params.valueEncoding=defaultValueEncoding] Value encoding.
 * @return {Storage} An instance of LevelStorage.
 */
declare const LevelStorage: (params?: {
    path?: string;
    valueEncoding?: string;
}) => Storage
export default LevelStorage