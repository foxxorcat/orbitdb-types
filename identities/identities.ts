import type { KeyStore } from "../key-store";
import type { Storage } from "../storage";
import type { IPFS } from "../types";
import type { IdentityRaw, IdentityRawStore, IdentityRawStoreVerify } from "./identity";
import type { CreateProvider } from "./providers";

export type CreateIdentityOption<ProviderParams, Type extends string = string> = {
    provider: CreateProvider<ProviderParams, Type>
} & ProviderParams

export interface Identities<ProviderParams> {
    /**
     * Creates an identity, adding it to storage.
     * @param {Object} options Various options for configuring a new identity.
     * @param {Function} [options.provider=PublicKeyIdentityProvider({keystore})] An instance of the Provider to use for generating an identity, e.g. PublicKeyIdentityProvider({ keystore })
     * @return {Identity} An instance of identity.
     */
    createIdentity: <Option = ProviderParams> (options: Option extends CreateIdentityOption<unknown> ? Option : { id: string }) => IdentityRawStoreVerify
    /**
     * Verifies an identity using the identity's provider.
     * @param identity The identity to verify.
     * @return True the identity is valid, false otherwise.
     */
    verifyIdentity: <T>(identity: T) => identity is T & IdentityRawStore
    /**
     * Gets an identity by hash.
     * @param hash An identity hash.
     * @return An instance of identity.
     */
    getIdentity(hash: string): IdentityRawStore
    /**
     * Signs data using an identity.
     * @param identity The identity to use for
     * signing.
     * @param data The data to sign.
     * @return The signed data.
     * @throws Private signing key not found from KeyStore when no signing key can
     * be retrieved.
     */
    sign: (identity: Pick<IdentityRaw, 'id'>, data: string) => Promise<string>;
    /**
     * Verifies data using a valid signature and publicKey.
     * @param signature A signature.
     * @param publicKey A public key.
     * @param data The data to be verified.
     * @return True if the the data is signed by the publicKey, false
     * otherwise.
     */
    verify: (signature: string, publicKey: string, data: string) => Promise<boolean>;

    keystore: KeyStore
}

/**
 * Creates an instance of Identities.
 * @function
 * @param {Object} params One or more parameters for configuring Identities.
 * @param {KeyStore} [params.keystore] A preconfigured KeyStore.
 * A KeyStore will be created in the path defined by the path param. If neither
 * Keystore nor path are defined, a new KeyStore is stored in ./orbitdb
 * identities.
 * @param {string} [params.path] The path to a KeyStore. If no path is
 * provided, the default is ./orbitdb/identities.
 * @param {Storage} [params.storage] An instance of a compatible storage
 * module.
 * @param {IPFS} [params.ipfs] An instance of IPFS. This param is not required
 * if storage is provided.
 * @return {Identities} An instance of Identities.
 * @instance
 */
declare const Identities: <ProviderParams = {}>(
    params: ({ storage: Storage } | { ipfs: IPFS }) & ({ keystore: KeyStore } | { path: string })
) => Promise<Identities<ProviderParams>>

export default Identities
