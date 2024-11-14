/**
 * @description
 * IPFSBlockStorage uses IPFS to store data as raw blocks.
 */

import type { Storage } from "./storage";
import { Helia } from "@helia/interface";

/**
 * Creates an instance of IPFSBlockStorage.
 * @function
 * @param {Object} params One or more parameters for configuring
 * IPFSBlockStorage.
 * @param {IPFS} params.ipfs An IPFS instance.
 * @param {boolean} [params.pin=false] True, if the block should be pinned,
 * false otherwise.
 * @param {number} [params.timeout=30000] A timeout in ms.
 * @return {Storage} An instance of IPFSBlockStorage.
 */
declare const IPFSBlockStorage: (params?: {
    ipfs: Pick<Helia, 'blockstore' | 'pins'>;
    pin?: boolean;
    timeout?: number;
}) => Storage

export default IPFSBlockStorage