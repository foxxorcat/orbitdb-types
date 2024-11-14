import type { Await } from "../types"

export interface StoragePiar {
    key: string
    value: Uint8Array
}
export interface Storage {
    /**
     * Puts data to all configured storages.
     * @param hash The hash of the data to put.
     * @param data The data to store.
     */
    put: (hash: string, data: Uint8Array) => Await<void>
    /**
     * Deletes data from Level.
     * @param hash The hash of the data to delete.
     * @param data The data to store.
     */
    del: (hash: string) => Await<void>
    /**
     * Gets data from the composed storage.
     * @param hash The hash of the data to get.
     */
    get: (hash: string) => Await<Uint8Array>
    /**
     * Iterates over records stored in both storages.
     */
    iterator: () => AsyncGenerator<StoragePiar, void, unknown>
    /**
     * Merges data from another source into each of the composed storages.
     * @param {module:Storage} other Another storage instance.
     */
    merge: (other: Storage) => Await<void>
    /**
     * Calls clear on each of the composed storages.
     */
    clear: () => Await<void>
    /**
     * Calls close on each of the composed storages.
     */
    close: () => Await<void>
}
