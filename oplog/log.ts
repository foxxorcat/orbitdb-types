import type { AccessController } from "../access-controllers"
import type { IdentityType as Identity } from "../identities"
import type { Clock } from "./clock"
import type { EesolveConflict } from "./conflict-resolution"
import type { Entry } from "./entry"

export interface Log {
    id: string
    access: AccessController
    identity: Identity
    storage: Storage
    /**
     * Returns the clock of the log.
     * @return 
     */
    clock: () => Promise<Clock>
    /**
     * Returns the current heads of the log
     * @return 
     */
    heads: () => Promise<Entry[]>
    /**
     * Returns all entries in the log
     * @return
     */
    values: () => Promise<Entry[]>
    all: () => Promise<Entry[]>
    /**
     * Retrieve an entry
     *
     * @param hash The hash of the entry to retrieve
     * @return
     */
    get: (hash: string) => Promise<Entry>
    has: (hash: string) => Promise<boolean>
    /**
     * Append an new entry to the log
     *
     * @param data Payload to add to the entry
     * @param options
     * @param options.referencesCount TODO
     * @return Entry that was appended
     */
    append: (data: unknown, options?: { referencesCount: number }) => Promise<Entry>
    /**
     * Join two logs.
     *
     * Joins another log into this one.
     * 
     * 1. Prepare entry
     * 2. Authorize entry
     * 3. Store entry
     * 4. return Entry
     * 5. Get current heads of the log
     *
     * @param log Log to join with this Log
     *
     * @example
     * ```js
     * await log1.join(log2)
     * ```
     */
    join: (log: Log) => Promise<void>
    /**
     * Join an entry into a log.
     *
     * 1. Check if the entry is already in the log and return early if it is
     * 2. Verify the entry
     * 3. Find missing entries and connections (=path in the DAG) to the current heads
     * 4. Add missing entries to the index (=to the log)
     * 5. Remove heads which new entries are connect to
     * 6. Add the new entry to heads (=union with current heads)
     * 
     * @param entry Entry to join with this Log
     *
     * @example
     * ```js
     * await log.joinEntry(entry)
     * ```
     */
    joinEntry: (entry: Entry) => Promise<boolean>
    traverse: (rootEntries: Entry[], shouldStopFn: (entry: Entry) => boolean, useRefs?: boolean) => AsyncGenerator<Entry, void, unknown>

    /**
     * Async iterator over the log entries
     *
     * @param options
     * @param options.amount Number of entried to return. Default: return all entries.
     * @param options.gt Beginning hash of the iterator, non-inclusive
     * @param options.gte Beginning hash of the iterator, inclusive
     * @param options.lt Ending hash of the iterator, non-inclusive
     * @param options.lte Ending hash of the iterator, inclusive
     * @return Iterator object of log entries
     *
     * @examples
     * ```js
     * (async () => {
     *   log = await Log(testIdentity, { logId: 'X' })
     *
     *   for (let i = 0; i <= 100; i++) {
     *     await log.append('entry' + i)
     *   }
     *
     *   let it = log.iterator({
     *     lte: 'zdpuApFd5XAPkCTmSx7qWQmQzvtdJPtx2K5p9to6ytCS79bfk',
     *     amount: 10
     *   })
     *
     *   for await (let entry of it) {
     *     console.log(entry.payload) // 'entry100', 'entry99', ..., 'entry91'
     *   }
     * })()
     * ```
     */
    iterator: (params?: { amount?: number, gt?: string, gte?: string, lt?: string, lte?: string }) => AsyncGenerator<Entry, void, unknown>
    /**
     * Clear all entries from the log and the underlying storages
     */
    clear: () => Promise<void>
    /**
     * Close the log and underlying storages
     */
    close: () => Promise<void>
}

declare function Log(identity: Identity, options: {
    logId: string,
    logHeads: Entry[],
    access?: AccessController,
    entryStorage?: Storage,
    headsStorage?: Storage,
    indexStorage?: Storage,
    sortFn?: EesolveConflict
}): Log

declare const DefaultAccessController: () => Promise<AccessController>

export { Log as default, DefaultAccessController }