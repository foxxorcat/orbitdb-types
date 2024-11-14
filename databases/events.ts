import type { DatastoreBuilder, Datastore } from "./index";

export interface EventsDatastore<Event = unknown> extends Datastore<'events'> {
    /**
     * Adds an event to the store.
     * @function
     * @param {*} value The event to be added.
     * @return {string} The hash of the new oplog entry.
     * @memberof module:Databases.Databases-Events
     * @instance
     */
    add: (value: Event) => Promise<string>

    /**
     * Gets an event from the store by hash.
     * @function
     * @param {string} hash The hash of the event to get.
     * @return {*} The value corresponding to hash or null.
     * @memberof module:Databases.Databases-Events
     * @instance
     */
    get: (hash: string) => Promise<Event>

    /**
     * Iterates over events.
     * @function
     * @param {Object} [filters={}] Various filters to apply to the iterator.
     * @param {string} [filters.gt] All events which are greater than the
     * given hash.
     * @param {string} [filters.gte] All events which are greater than or equal
     * to the given hash.
     * @param {string} [filters.lt] All events which are less than the given
     * hash.
     * @param {string} [filters.lte] All events which are less than or equal to
     * the given hash.
     * @param {string} [filters.amount=-1] The number of results to fetch.
     * @yields [string, string] The next event as hash/value.
     * @memberof module:Databases.Databases-Events
     * @instance
     */
    iterator: (filters: { gt?: string, gte?: string, lt?: string, lte?: string, amount?: number }) => AsyncGenerator<{ hash: string; value: Event; }>

    /**
     * Returns all events.
     * @function
     * @return [][string, string] An array of events as hash/value entries.
     * @memberof module:Databases.Databases-Events
     * @instance
     */
    all: () => Promise<{ hash: string; value: Event; }[]>
}

export type EventsDatastoreBuilder<Event = unknown> = DatastoreBuilder<undefined, EventsDatastore<Event>>

declare const Events: EventsDatastoreBuilder
export default Events
