/**
 * @description
 * ComposedStorage stores data to multiple storage backends.
 * @example <caption>Store to LRU and Level</caption>
 * await ComposedStorage(await LRUStorage(), await LevelStorage())
 * @example <caption>Store to memory and IPFS</caption>
 * await ComposedStorage(await MemoryStorage(), await IPFSBlockStorage())
 * @example <caption>Store to LRU and a nested ComposedStorage</caption>
 * const storage1 = await ComposedStorage(await LRUStorage(), await LevelStorage())
 * await ComposedStorage(storage1, await IPFSBlockStorage())
 */

import type { Storage } from "./storage";

/**
  * Creates an instance of ComposedStorage.
  * @param {Storage} storage1 A storage instance.
  * @param {Storage} storage2 A storage instance.
  * @return {Storage} An instance of ComposedStorage.
  */
declare const ComposedStorage: (storage1: Storage, storage2: Storage) => Storage;
export default ComposedStorage
