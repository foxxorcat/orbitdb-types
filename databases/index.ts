import type { Database as BaseDatabase, DatabaseParam } from "../database";
import type { Await } from "../types";

import Documents, { type DocumentsDatastoreBuilder, type DocumentsDatastore } from "./documents";
import Events, { type EventsDatastoreBuilder, type EventsDatastore } from "./events"
import KeyValue, { type KeyValueDatastoreBuilder, type KeyValueDatastore } from "./keyvalue"
import KeyValueIndexed, { type KeyValueIndexedDatastoreBuilder, type KeyValueIndexedDatastore } from "./keyvalue-indexed"

export interface DatastoreBuilderMap {
    'documents': DocumentsDatastoreBuilder,
    'events': EventsDatastoreBuilder,
    'keyvalue': KeyValueDatastoreBuilder,
}

export interface DatastoreBuilder<BuilderOption = unknown, DS extends Datastore = Datastore> {
    (options?: BuilderOption): CreateDatastore<DS>
    type: DS['type']
}

export type CreateDatastore<DS extends Datastore = Datastore> = (params: DatabaseParam) => Await<DS>

export interface Datastore<Type extends string = string> extends BaseDatabase {
    type: Type
}

declare function useDatabaseType(accessController: DatastoreBuilder): void
declare function getDatabaseType(type: string): DatastoreBuilder
declare function getDatabaseType<T extends keyof DatastoreBuilderMap>(type: T): DatastoreBuilderMap[T]

export {
    useDatabaseType, getDatabaseType,
    Documents, type DocumentsDatastoreBuilder, type DocumentsDatastore,
    Events, type EventsDatastoreBuilder, type EventsDatastore,
    KeyValue, type KeyValueDatastoreBuilder, type KeyValueDatastore,
    KeyValueIndexed, type KeyValueIndexedDatastoreBuilder, type KeyValueIndexedDatastore,
}