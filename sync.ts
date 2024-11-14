/**
 * @description
 * The Sync Protocol for OrbitDB synchronizes the database operations {@link module:Log} between multiple peers.
 *
 * The Sync Protocol sends and receives heads between multiple peers,
 * both when opening a database and when a database is updated, ie.
 * new entries are appended to the log.
 *
 * When Sync is started, a peer subscribes to a pubsub topic of the log's id.
 * Upon subscribing to the topic, peers already connected to the topic receive
 * the subscription message and "dial" the subscribing peer using a libp2p
 * custom protocol. Once connected to the subscribing peer on a direct
 * peer-to-peer connection, the dialing peer and the subscribing peer exchange * the heads of the Log each peer currently has. Once completed, the peers have * the same "local state".
 *
 * Once the initial sync has completed, peers notify one another of updates to
 * the log, ie. updates to the database, using the initially opened pubsub
 * topic subscription. A peer with new heads broadcasts changes to other peers
 * by publishing the updated heads to the pubsub topic. Peers subscribed to the
 * same topic will then receive the update and will update their log's state,
 * the heads, accordingly.
 *
 * The Sync Protocol is eventually consistent. It guarantees that once all
 * messages have been sent and received, peers will observe the same log state
 * and values. The Sync Protocol does not guarantee the order in which messages
 * are received or even that a message is recieved at all, nor any timing on
 * when messages are received.
 *
 * @example
 * ```js
 * // Using defaults
 * const sync = await Sync({ ipfs, log, onSynced: (peerId, heads) => ... })
 * ```
 *
 * @example
 * ```js
 * // Using all parameters
 * const sync = await Sync({ ipfs, log, events, onSynced: (peerId, heads) => ..., start: false })
 * sync.events.on('join', (peerId, heads) => ...)
 * sync.events.on('leave', (peerId) => ...)
 * sync.events.on('error', (err) => ...)
 * await sync.start()
 * ```
 */

import type { PeerId } from "@libp2p/interface";
import type { LogType as Log, EntryType as Entry } from "./oplog";
import type { EventEmitter } from 'events'
import type { Await, IPFS } from "./types";

export interface Sync {
    add: (entry: Entry) => Promise<void>
    /**
     * stop Sync
     */
    stop: () => Promise<void>
    /**
     * start Sync
     */
    start: () => Promise<void>
    events: EventEmitter<SyncEventMap>
    /**
     * PeerID
     */
    peers: Set<string>
}

export type OnSyncedFunction = (peerId: PeerId, heads: Entry[]) => Await<void>

export type SyncEventMap = {
    'join': [peerId: string, heads: Entry[]],
    'leave': [peerId: string],
    'error': [err: unknown]
}

/**
 * Creates a Sync instance for sychronizing logs between multiple peers.
 *
 * @function
 * @param {Object} params One or more parameters for configuring Sync.
 * @param {IPFS} params.ipfs An IPFS instance.
 * @param {Log} params.log The log instance to sync.
 * @param {EventEmitter} [params.events] An event emitter to use. Events
 * emitted are 'join', 'leave' and 'error'. If the parameter is not provided,
 * an EventEmitter will be created.
 * @param {OnSyncedFunction} [params.onSynced] A callback function that is called after
 * the peer has received heads from another peer.
 * @param {Boolean} [params.start] True if sync should start automatically,
 * false otherwise. Defaults to true.
 * @return {Sync} sync An instance of the Sync Protocol.
 */
declare const Sync: (params: {
    ipfs: IPFS;
    log: Log;
    events?: EventEmitter;
    onSynced?: OnSyncedFunction;
    /**
     * @default 30000
     */
    timeout?: number
    /**
     * @default true
     */
    start?: boolean;
}) => Promise<Sync>

export { Sync as default }
