import type { IdentitiesType as Identities } from "../identities"
import type { Manifest } from "../manifest-store";
import type { OrbitDB } from "../orbitdb";
import type { EntryType as Entry } from "../oplog"
import type { Await } from "../types"
import IPFSAccessController, { type IPFSAccessController as IPFSAccessControllerType } from "./ipfs"
import OrbitDBAccessController, { type OrbitDBAccessController as OrbitDBAccessControllerType } from "./orbitdb"

export interface AccessControllersBuilderMap {
    'ipfs': typeof IPFSAccessController,
    'orbitdb': typeof OrbitDBAccessController,
}

export interface AccessControllersBuilder<BuilderOption = unknown, AC extends AccessController = AccessController> {
    (options?: BuilderOption): CreateAccessController<AC>
    type: AC['type']
}

export type CreateAccessController<AC extends AccessController = AccessController> =
    (option: { orbitdb: Pick<OrbitDB, 'open' | 'ipfs' | 'identity'>, identities: Identities<unknown>, address?: Manifest['accessController'] }) => Await<AC>

export interface AccessController<Type extends string = string> {
    type: Type
    address: string
    canAppend: (entry: Entry) => boolean
}

declare function useAccessController(accessController: AccessControllersBuilder): void
declare function getAccessController(type: string): AccessControllersBuilder
declare function getAccessController<T extends keyof AccessControllersBuilderMap>(type: T): AccessControllersBuilderMap[T]

export {
    getAccessController,
    useAccessController,
    IPFSAccessController,
    OrbitDBAccessController,
    type IPFSAccessControllerType,
    type OrbitDBAccessControllerType,
}