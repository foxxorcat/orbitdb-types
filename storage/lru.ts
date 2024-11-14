/**
 * @description
 * LRUStorage stores data in a Least Recently Used (LRU) cache.
 */

import type { Storage } from "./storage"

// const defaultSize = 1000000

/**
 * Creates an instance of LRUStorage.
 * @function
 * @param {Object} [params={}] One or more parameters for configuring
 * LRUStorage.
 * @param {string} [params.size=defaultSize] The number of elements to store.
 * @return {Storage} An instance of LRUStorage.
 */
declare const LRUStorage: (params?: { size?: string }) => Storage
export default LRUStorage