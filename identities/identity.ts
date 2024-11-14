import type { Await } from "../types";

export type IdentitySignFunc = (identity: Identity, data: string) => Await<string>;
export type IdentityVerifyFunc = (signature: string, publicKey: string, data: string) => Await<boolean>;

/**
 * A signed identity id and public key.
 */
export interface IdentitySignatures {
    /** 
     * IdentityID Signatures
     */
    id: string
    /** 
     * IdentityPublicKey Signatures
     */
    publicKey: string
}

export interface Identity {
    /**
     *  A unique identifer for the identity
     */
    id: string;
    /**
     * A public key.
     */
    publicKey: string,
    /**
     * A signed identity id and public key.
     */
    signatures: IdentitySignatures,
    /**
     * The type of identity provider.
     */
    type: string,

    /**
     * A sign function to sign data using this identity.
     */
    sign: IdentitySignFunc;
    /**
     * A verify function to verify data signed by this identity.
     */
    verify: IdentityVerifyFunc;

    /** 编码后的数据,不参与持久化步骤 */
    /** Identity的cid */
    hash?: string
    /** Identity的块编码数据 */
    bytes?: string
}
export interface IdentityRaw {
    /**
     *  A unique identifer for the identity
     */
    id: string;
    /**
     * A public key.
     */
    publicKey: string,
    /**
     * A signed identity id and public key.
     */
    signatures: IdentitySignatures,
    /**
     * The type of identity provider.
     */
    type: string,
}
export interface IdentityStore {
    /** Identity的cid */
    hash: string
    /** Identity的块编码数据 */
    bytes: string
}
export interface IdentityVerify {
    /**
    * A sign function to sign data using this identity.
    */
    sign: IdentitySignFunc;
    /**
     * A verify function to verify data signed by this identity.
     */
    verify: IdentityVerifyFunc;
}
export type IdentityRawStore = IdentityRaw & IdentityStore
export type IdentityRawStoreVerify = IdentityRawStore & IdentityVerify

declare const Identity: <T extends IdentityRaw>(params: T) => T extends IdentityVerify ? IdentityRawStoreVerify : IdentityRawStore

/**
 * Evaluates whether two identities are equal.
 * @param {Identity} a First identity.
 * @param {Identity} b Second identity.
 * @return {boolean} True if identity a and b are equal, false otherwise.
 */
declare function isEqual(a: IdentityRawStore, b: IdentityRawStore): boolean

/**
 * Verifies whether an identity is valid.
 * @param {*} identity The identity to verify.
 * @return {boolean} True if the identity is valid, false otherwise.
 */
declare function isIdentity<T>(identity: T): identity is T & IdentityRawStore;

declare function decodeIdentity(bytes: Uint8Array): Promise<IdentityRawStore>

export { Identity as default, isEqual, isIdentity, decodeIdentity }
