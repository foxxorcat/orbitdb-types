/**
 * @description
 * MemoryStorage stores data in memory.
 */

import type { Storage } from "./storage";

/**
  * Creates an instance of MemoryStorage.
  * @function
  * @return {module:Storage.Storage-Memory} An instance of MemoryStorage.
  */
declare const MemoryStorage: () => Storage
export default MemoryStorage