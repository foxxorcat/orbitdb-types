import type { AccessController, AccessControllersBuilder } from ".";
import type { Storage } from "../storage";

export interface IPFSAccessController extends AccessController<'ipfs'> {
    write: string[]
}

/**
 * Defines an IPFS access controller.
 * @param {Object} options Various options for configuring the
 * IPFSAccessController.
 * @param {Array<string>} [params.write] An array of identity ids who can write to the
 * database.
 * @param {Storage} [params.storage] An instance of a compatible storage.
 * @return {IPFSAccessController} An
 * IPFSAccessController function.
 */
declare const IPFSAccessController: AccessControllersBuilder<{
    write?: string[],
    storage?: Storage
}, IPFSAccessController>

export default IPFSAccessController