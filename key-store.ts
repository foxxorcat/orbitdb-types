/**
 * Secp256k1 KeyStore
 */

import type { Secp256k1PrivateKey } from "@libp2p/interface";
import type { Await } from "./types";
import type { Storage } from "./storage";

declare const verifyMessage: (signature: string, publicKey: string, data: string | Uint8Array) => Promise<boolean>
declare const signMessage: (key: Secp256k1PrivateKey, data: string | Uint8Array) => Promise<string>

export interface KeyStore {
    /**
     * Clears the KeyStore's underlying storage.
     */
    clear: () => Await<void>
    /**
     * Closes the KeyStore's underlying storage.
     */
    close: () => Await<void>
    /**
     * Checks if a key exists in the key store .
     * @param {string} id The id of an [Identity] to check the key for.
     * @return {boolean} True if the key exists, false otherwise.
     * @throws id needed to check a key if no id is specified.
     */
    hasKey: (id: string) => Await<boolean>
    /**
     * Adds a private key to the keystore.
     * @param {string} id An id of the [Identity] to whom the key belongs to.
     * @param {Object} key The private key to store.
     * @param {Uint8Array} key.privateKey
     */
    addKey: (id: string, key: { privateKey: Uint8Array }) => Await<void>

    /**
     * Creates a key pair and stores it to the keystore.
     * @param {string} id An id of the [Identity] to generate the key pair for.
     * @throws id needed to create a key if no id is specified.
     */
    createKey: (id: string) => Await<{ publicKey: Uint8Array, privateKey: Uint8Array }>

    /**
     * Gets a key from keystore.
     * @param {string} id An id of the [Identity] whose key to retrieve.
     * @return {PrivateKey} The key specified by id.
     * @throws id needed to get a key if no id is specified.
     */
    getKey: (id: string) => Await<Secp256k1PrivateKey|undefined>

    /**
     * Gets the serialized public key from a key pair.
     * @param {PrivateKey} keys A key pair.
     * @param {Object} options One or more options.
     * @param {string} options.format The format the public key should be
     * returned in.
     * @return The public key.
     * @throws Supported formats are `hex` and `buffer` if an invalid format is
     * passed in options.
     */
    getPublic: <T = PublicfFormatMap, F extends keyof T = keyof T >(keys: Secp256k1PrivateKey, options?: { format?: F }) => Await<T[F]>
}

type PublicfFormatMap = {
    'hex': string
    'buffer': Uint8Array
}

/**
 * Creates an instance of KeyStore.
 * @param {Object} params 
 * @param {string} [params.path=./keystore]
 * @param {Storage} [params.storage=LevelStorage({path: params.path || defaultPath})]
 * @returns {KeyStore}
 */
declare function KeyStore(params?: { storage?: Storage } | { path?: string }): KeyStore

export {
    KeyStore as default,
    verifyMessage,
    signMessage
}
