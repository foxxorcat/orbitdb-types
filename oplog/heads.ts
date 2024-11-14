import type { Entry } from "./entry";

export interface Header {
    put: (heads: Entry[]) => Promise<void>
    set: (heads: Entry[]) => Promise<void>
    add: (heads: Entry) => Promise<Entry[]>
    remove: (hash: string) => Promise<void>
    iterator: () => AsyncGenerator<Required<Entry>, void, unknown>
    all: () => Promise<Entry[]>
    clear: () => Promise<void>
    close: () => Promise<void>
}

declare function Heads(options: { storage: any, heads: Entry[] }): Header

export default Heads