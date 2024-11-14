// import { type Database } from "../database";

// export type DocumentsDatastore = {
//     type: 'documents',
//     put: (doc: any) => string
//     del: (key: string) => string
//     get: (key: string) => any
//     indexBy:string
// } & Database

// declare const Documents: {
//     (params?: { indexBy?: string }): DocumentsDatastore;
//     type: 'documents';
// }

import type { DatastoreBuilder, Datastore } from "./index";

export interface DocumentsDatastore<Doc extends object = object> extends Datastore<'documents'> {
    /**
     * Stores a document to the store.
     * @function
     * @param {Object} doc An object representing a key/value list of fields.
     * @return {string} The hash of the new oplog entry.
     * @memberof module:Databases.Databases-Documents
     * @instance
     */
    put: (doc: Doc) => Promise<string>

    /**
     * Deletes a document from the store.
     * @function
     * @param {string} key The key of the doc to delete.
     * @return {string} The hash of the new oplog entry.
     * @memberof module:Databases.Databases-Documents
     * @instance
     */
    del: (key: string) => Promise<string>

    /**
     * Gets a document from the store by key.
     * @function
     * @param {string} key The key of the doc to get.
     * @return {Object} The doc corresponding to key or null.
     * @memberof module:Databases.Databases-Documents
     * @instance
     */
    get: (key: string) => Promise<Doc>

    /**
     * Queries the document store for documents matching mapper filters.
     * @function
     * @param {function(Object)} findFn A function for querying for specific
     * results.
     *
     * The findFn function's signature takes the form `function(doc)` where doc
     * is a document's value property. The function should return true if the
     * document should be included in the results, false otherwise.
     * @return {Array} Found documents.
     * @memberof module:Databases.Databases-Documents
     * @instance
     */
    query: (findFn: (arg: Doc) => boolean) => Doc[]

    /**
     * Iterates over documents.
     * @function
     * @param {Object} [filters={}] Various filters to apply to the iterator.
     * @param {string} [filters.amount=-1] The number of results to fetch.
     * @yields [string, string, string] The next document as hash/key/value.
     * @memberof module:Databases.Databases-Documents
     * @instance
     */
    iterator: (filters: { amount: number }) => AsyncGenerator<{ hash: string, key: string, value: Doc }>

    /**
     * Returns all documents.
     * @function
     * @return [][string, string, string] An array of documents as hash/key
     * value entries.
     * @memberof module:Databases.Databases-Documents
     * @instance
     */
    all: () => Promise<{ hash: string, key: string, value: Doc }>
}

export type DocumentsDatastoreBuilder = DatastoreBuilder<{
    /**
     * An index.
     * @default '_id'
     */
    indexBy: string
}, DocumentsDatastore>

declare const Documents: DocumentsDatastoreBuilder
export default Documents