import type { AccessController, AccessControllersBuilder } from ".";

export interface OrbitDBAccessController extends AccessController<'orbitdb'> {
    write: string[]

    /**
     * Gets a list of identities with the specified capability.
     * @param {string} capability A capability (e.g. write).
     * @return {Array} One or more addresses with the spcified capability.
     */
    get: (capability: string) => Promise<string[]>
    /**
     * Checks whether an identity has a capability.
     * @param {string} capability A capability (e.g. write).
     * @param {string} key An id of an identity.
     * @return {boolean} True if the identity has the capability, false otherwise.
     */
    hasCapability: (capability: string, key: string) => Promise<boolean>
    /**
     * Grants a capability to an identity, storing it to the access control
     * database.
     * @param {string} capability A capability (e.g. write).
     * @param {string} key An id of an identity.
     */
    grant: (capability: string, key: string) => Promise<void>
    /**
     * Revokes a capability from an identity, removing it from the access control
     * database.
     * @param {string} capability A capability (e.g. write).
     * @param {string} key An id of an identity.
     */
    revoke: (capability: string, key: string) => Promise<void>
    /**
     * Close the underlying access control database.
     */
    close: () => Promise<void>
    /**
     * Drop the underlying access control database.
     */
    drop: () => Promise<void>
}

declare const OrbitDBAccessController: AccessControllersBuilder<{ write?: string[] }, OrbitDBAccessController>
export default OrbitDBAccessController