import type { CreateDatastore, DatastoreBuilderMap } from "./databases";
import type { Database as BaseDatabase } from "./database";

import type { AccessControllersBuilderMap, CreateAccessController } from "./access-controllers";
import type { IdentitiesType as Identities, IdentityType as Identity, CreateIdentityOption } from "./identities";
import type { Storage } from "./storage";
import type { ReturnType2, IPFS } from "./types";

export interface OrbitDB {
    /**
     * 自定义 identities 时无意义
     */
    id: string,

    peerId: string
    /**
     * 当前身份信息
     */
    identity: Identity
    ipfs: IPFS
    directory: string
    // keystore: KeyStore

    /**
     * Open a database or create one if it does not already exist.
     *
     * By default, OrbitDB will create a database of type [DefaultDatabaseType]:
     * ```
     * const mydb = await orbitdb.open('mydb')
     * ```
     * To create a database of a different type, specify the type param:
     * ```
     * const mydb = await orbitdb.open('mydb', {type: 'documents'})
     * ```
     * The type must be listed in [databaseTypes] or an error is thrown.
     * To open an existing database, pass its address to the `open` function:
     * ```
     * const existingDB = await orbitdb.open(dbAddress)
     * ```
     * The address of a newly created database can be retrieved using
     * `db.address`.
     * @function
     * @param {string} address The address of an existing database to open, or
     * the name of a new database.
     * @param {Object} params One or more database configuration parameters.
     * @param {string} [params.type=events] The database's type.
     * @param {Meta} [params.meta={}] The database's metadata. Only applies when
     * creating a database and is not used when opening an existing database.
     * @param {boolean} [params.sync=true] If true, sync databases automatically.
     * Otherwise, false.
     * @param {Database} [params.Database=[Events]] A Database-compatible
     * module.
     * @param {AccessControllers} [params.AccessController=[IPFSAccessController]]
     * An AccessController-compatible module.
     * @param {Storage} [params.headsStorage=[ComposedStorage]] A compatible storage instance for storing
     * log heads. Defaults to ComposedStorage(LRUStorage, LevelStorage).
     * @param {Storage} [params.entryStorage=[ComposedStorage]] A compatible storage instance for storing
     * log entries. Defaults to ComposedStorage(LRUStorage, IPFSBlockStorage).
     * @param {Storage} [params.indexStorage=[ComposedStorage]] A compatible storage instance for storing an " index of log entries. Defaults to ComposedStorage(LRUStorage, LevelStorage).
     * @param {number} [params.referencesCount] The number of references to use for [Log] entries.
     * @return {Database} A database instance.
     * @throws "Unsupported database type" if the type specified is not in the list
     * of known databaseTypes.
     */
    // open(address: string, ): ReturnType2<Database>
    open <
        Meta extends object,
        Type extends keyof DatastoreBuilderMap, DB extends CreateDatastore = ReturnType2<DatastoreBuilderMap[Type]>,
        AC extends CreateAccessController = ReturnType2<AccessControllersBuilderMap['ipfs']>,
    >(address: string, option?: {
        /**
         * 数据库类型
         */
        type?: Type,
        meta?: Meta,
        sync?: boolean,
        Database?: DB,
        AccessController?: AC,

        headsStorage?: Storage,
        entryStorage?: Storage,
        indexStorage?: Storage,
        referencesCount?: number
    }) : Promise<ReturnType2<DB> extends BaseDatabase<infer Meta> & infer E ? BaseDatabase<Meta, ReturnType2<AC>> & E : never>

    open<DB extends CreateDatastore = CreateDatastore, Meta extends object = {}>(
        address: string, option?: {
            /**
             * 数据库类型
             */
            type?: string,
            meta?: Meta,
            sync?: boolean,
            Database?: DB,
            AccessController?: CreateAccessController,

            headsStorage?: Storage,
            entryStorage?: Storage,
            indexStorage?: Storage,
            referencesCount?: number
        }
    ): Promise<ReturnType2<DB>>

    /**
     * Stops OrbitDB, closing the underlying keystore and manifest store.
     */
    stop: () => Promise<void>
}

declare function OrbitDB<IdentityOption extends CreateIdentityOption<unknown>>(options: {
    ipfs: IPFS,
    /**
     * 创建 identity 使用的参数
     */
    identity: IdentityOption,
    /**
     * 负责 identity 生成和校验
     * @param identities.keystore 配置默认identities使用的 keystore
     */
    identities: Identities<IdentityOption>,
    /**
     * 本地数据存储位置
     * @default './orbitdb'
     */
    directory?: string
}): Promise<OrbitDB>

declare function OrbitDB(options: {
    ipfs: IPFS,
    /**
     * 身份ID
     */
    id?: string,
    /**
    * 本地数据存储位置
    * @default './orbitdb'
    */
    directory?: string
}): Promise<OrbitDB>

export { OrbitDB as default };