import type { IPFS } from "./types"
import type { Storage } from "./storage"

export type Manifest<Meta = {}> = {
    name: string,
    /**
     * dbType
     */
    type: string,
    /**
     * value: /{accessType}/{address}
     */
    accessController: string
} & Meta

export interface ManifestStore<Meta = {}> {
    get: (hash: string) => Promise<Manifest<Meta>>
    create: (options: {
        name: string,
        type: string,
        accessController: string,
        meta: Meta
    }) => Promise<{ hash: string, manifest: Manifest<Meta> }>
    close: () => Promise<void>
}

declare const ManifestStore: (
    options: { storage: Storage } | { ipfs: Pick<IPFS, 'blockstore' | 'pins'> }
) => Promise<ManifestStore>

export default ManifestStore
