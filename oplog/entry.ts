import { type IdentitiesType as Identities, type IdentityType as Identity } from "../identities";
import { type Clock } from "./clock";

export interface Entry {

    /**
     * A string linking multiple entries together.
     * 将多个Entry接在一起的字符串
     */
    id: string

    /**
     * An arbitrary chunk of data.
     * 任意数据块
     */
    payload: unknown

    /**
     * One or more hashes pointing to the next entries in a chain of entries.
     * 一个或多个EntryID,指向下一个Entry
     */
    next: string[]

    /**
     * One or more hashes which reference other entries in the chain.
     * 引用链中其他Entry的一个或多个哈希。
     */
    refs: string[];
    /**
     * A logical clock. 
     * 逻辑时钟
     */
    clock: Clock;
    /**
     * The version of the entry.
     * entry 版本号
     */
    v: number;

    /**
     * The identity of the entry's owner.
     * Entry所有者的身份地址
     */
    identity: string;
    /**
     * The public key of the identity.
     * identity的公钥
     */
    key: string;
    /**
     * The signature of the entry signed by the owner.
     * 由所有者签名的Entry签名
     */
    sig: string;

    /** 编码后的数据,不参与持久化步骤 */
    /** Entry的cid */
    hash?: string
    /** Entry的块编码数据 */
    bytes?: string
}

/** 
 * Creates an Entry.
 * @param identity The identity instance
 * @param id The unique identifier for this log
 * @param payload Data of the entry to be added. Can be any JSON.stringifyable
 * data.
 * @param clock The clock
 * @param next An array of CIDs as base58btc encoded
 * strings which point to the next entries in a chain of entries.
 * @param refs An array of CIDs as
 * base58btc encoded strings pointing to various entries which come before
 * this entry.
 * @return A promise which contains an instance of
 */
declare function create(identity: Identity, id: string, payload: unknown, clock?: Clock, next?: string[], refs?: string[]): Promise<Entry>;
/*
 * Verifies an entry signature.
 * @param identities Identities system to use
 * @param entry The entry being verified
 * @return A promise that resolves to a boolean value indicating if
 * the signature is valid.
 */
declare function verify(identities: Identities<unknown>, entry: Entry): Promise<boolean>;
/**
 * Decodes a serialized Entry from bytes
 * @param {Uint8Array} bytes
 * @return
 */
declare function decode(bytes: Uint8Array): Required<Entry>;
/**
 * Encodes an Entry and adds bytes field to it
 * @param entry
 * @return
 */
declare function encode(entry: Omit<Entry, 'hash' | 'bytes'>): Required<Entry>;
/**
 * Checks if an object is an Entry.
 * @param {*} obj
 * @return {boolean}
 */
declare function isEntry(obj: any): obj is Entry;
/** 
 * Determines whether two entries are equal.
 * @param {Entry} a An entry to compare.
 * @param {Entry} b An entry to compare.
 * @return True if a and b are equal, false otherwise. 
 */
declare function isEqual(a: Entry, b: Entry): boolean;
export default {
    create,
    verify,
    decode,
    encode,
    isEntry,
    isEqual
}