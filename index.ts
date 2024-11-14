export { default as createOrbitDB } from './orbitdb'
export type * from './orbitdb'

export {
  isValidAddress,
  parseAddress
} from './address'
export type * from './address'

export { Log, Entry, DefaultAccessController } from './oplog'
export type * from './oplog'

export { default as Database, type Database as DatabaseType } from './database'
export type * from './database'

export {
  Documents,
  Events,
  KeyValue,
  KeyValueIndexed,
  useDatabaseType,
  // getDatabaseType
} from './databases'
export type * from './databases'

export { default as KeyStore } from './key-store'
export type * from './key-store'

export {
  useAccessController,
  // getAccessController,
  IPFSAccessController,
  OrbitDBAccessController,
} from './access-controllers'
export type * from './access-controllers'

export {
  Identities,
  isIdentity,
  useIdentityProvider,
  // getIdentityProvider,
  PublicKeyIdentityProvider
} from './identities'
export type * from './identities'

export {
  IPFSBlockStorage,
  LevelStorage,
  LRUStorage,
  MemoryStorage,
  ComposedStorage
} from './storage'
export type * from './storage'

export * from './types'