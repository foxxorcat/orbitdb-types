import type { AccessController } from "./access-controllers";
import type { IdentityType as Identity } from "./identities";
import type { IPFS, Storage } from ".";
import type { Await } from "./types";
import type { LogType as Log, EntryType as Entry } from "./oplog";
import type { Sync, SyncEventMap } from "./sync";
import type { EventEmitter } from 'events'

export type DatabaseEventMap = {
    'update': [entry: Entry]
    'close': []
    'drop': []
}

export type OnUpdateFunction = (log: Log, entry: Entry) => Await<void>
export type DatabaseParam<Meta = unknown, AC extends AccessController = AccessController> = {
    /**
     * The name of the database.
     */
    name: string
    /**
     * The address of the database.
     */
    address: string
    /**
     * An Identity instance.
     */
    identity: Identity
    /**
     * An AccessController instance.
     */
    access: AC
    /**
     * The database's metadata.
     */
    meta: Meta
    /**
     * An IPFS instance.
     */
    ipfs: IPFS
    /**
     * A location for storing Database-related data. Defaults to ./orbitdb/[params.address].
     * 
     * 用于存储与数据库相关数据的位置。
     * @default './orbitdb'
     */
    directory?: string
    /**
     * A compatible storage instance for storing log entries. Defaults to ComposedStorage.
     * 
     * 一个用于存储日志条目的存储实例。默认为ComposedStorage。
     */
    entryStorage?: Storage
    /**
    * A compatible storage instance for storing log heads. Defaults to ComposedStorage.
    * 
    * 一个用于存储日志头部的存储实例。默认为ComposedStorage。
    * @default LevelStorage
    */
    headsStorage?: Storage,
    /**
     * A compatible storage instance for storing an index of log entries. Defaults to ComposedStorage.
     * 
     * 一个用于存储日志条目索引的存储实例。默认为ComposedStorage。
     * @default LevelStorage
     */
    indexStorage?: Storage
    /**
     * The maximum distance between references to other entries.
     * 
     * 对其他条目引用的最大距离。
     * @default 16
     */
    referencesCount?: number
    /**
     * If true, sync databases automatically. Otherwise, false.
     * 
     * 是否自动同步数据库
     * @default false
     */
    syncAutomatically?: boolean
    /**
     * A function callback. Fired when an entry is added to the oplog.
     */
    onUpdate?: OnUpdateFunction
}

export interface Operation<T = unknown> {
    op: string
    key: string
    value: T
}

export interface Database<Meta = unknown,AC extends AccessController = AccessController> {
    /**
     * The name of the database.
     */
    name: string
    /**
     * The address of the database.
     */
    address: string
    identity: Identity
    meta: Meta
    /**
     * Closes the database, stopping sync and closing the oplog.
     */
    close: () => Promise<void>
    /**
     * Drops the database, clearing the oplog.
     */
    drop: () => Promise<void>
    /**
     * Adds an operation to the oplog.
     * @param {*} op Some operation to add to the oplog.
     * @return {string} The hash of the operation.
     */
    addOperation: (op: Operation) => string
    log: Log
    /**
     * A [sync] instance of the database.
     */
    sync: Sync
    /**
     * Set of currently connected peers for this Database instance.
     */
    peers: Sync['peers']
    /**
     * Event emitter that emits Database changes. See Events section for details.
     */
    events: EventEmitter<DatabaseEventMap & SyncEventMap>
    /**
     * The [access controller]{@link module:AccessControllers} instance of the database.
     */
    access: AC
}

declare const Database: <Meta = unknown>(params: DatabaseParam<Meta>) => Database<Meta>
export default Database