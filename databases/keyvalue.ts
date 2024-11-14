import type { DatastoreBuilder, Datastore } from "./index";

export interface KeyValueDatastore<Value = unknown> extends Datastore<'keyvalue'> {
    /**
     * Stores a key/value pair to the store.
     * @function
     * @param {string} key The key to store.
     * @param {*} value The value to store.
     * @return {string} The hash of the new oplog entry.
     * @memberof module:Databases.Databases-KeyValue
     * @instance
     */
    put: (key: string, value: Value) => Promise<string>

    /**
     * Deletes a key/value pair from the store.
     * @function
     * @param {string} key The key of the key/value pair to delete.
     * @memberof module:Databases.Databases-KeyValue
     * @instance
     */
    del: (key: string) => Promise<string>

    /**
     * Gets a value from the store by key.
     * @function
     * @param {string} key The key of the value to get.
     * @return {*} The value corresponding to key or null.
     * @memberof module:Databases.Databases-KeyValue
     * @instance
     */
    get: (key: string) => Promise<Value | undefined>

    /**
     * Iterates over keyvalue pairs.
     * @function
     * @param {Object} [filters={}] Various filters to apply to the iterator.
     * @param {string} [filters.amount=-1] The number of results to fetch.
     * @yields [string, string, string] The next key/value as key/value/hash.
     * @memberof module:Databases.Databases-KeyValue
     * @instance
     */
    iterator: (filters: { amount: number }) => AsyncGenerator<{
        key: string;
        value: Value;
        hash: string;
    }>

    /**
     * Returns all key/value pairs.
     * @function
     * @return [][string, string, string] An array of key/value pairs as
     * key/value/hash entries.
     * @memberof module:Databases.Databases-KeyValue
     * @instance
     */
    all: () => Promise<{
        key: string;
        value: Value;
        hash: string;
    }[]>
}

export type KeyValueDatastoreBuilder<Event = unknown> = DatastoreBuilder<undefined, KeyValueDatastore<Event>>

declare const KeyValue: KeyValueDatastoreBuilder
export default KeyValue
