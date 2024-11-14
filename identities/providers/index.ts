import type { Await } from "../../types"
import type { IdentityRaw } from "../identity"
import PublicKeyIdentityProvider from "./publickey"

export interface IdentityProviderBuilderMap {
    'ipfs': typeof PublicKeyIdentityProvider,
}

export interface IdentityProviderBuilder<BuilderOption = unknown, ProviderParams = unknown, Type extends string = string> {
    (options: BuilderOption): () => Await<Provider<ProviderParams, Type>>
    type: Type
    verifyIdentity: (identity: IdentityRaw) => boolean
}

export type CreateProvider<ProviderParams = unknown, Type extends string = string> = () => Await<Provider<ProviderParams, Type>>

export interface Provider<Params, Type extends string> {
    type: Type
    /**
    * Gets the id.
    * @param {Params} params The id to retrieve.
    * @return The identity's id.
    */
    getId: (params: Params) => Promise<string>

    /**
     * Signs an identity using the identity's id.
     * @param {Uint8Array} data The identity data to sign.
     * @param {Params} params One or more parameters for configuring Database.
     * @return {string} A signature.
     * @instance
     */
    signIdentity: (data: Uint8Array, params: Params) => Promise<string>
}

declare function useIdentityProvider(accessController: IdentityProviderBuilder): void
declare function getIdentityProvider(type: string): IdentityProviderBuilder
declare function getIdentityProvider<T extends keyof IdentityProviderBuilderMap>(type: T): IdentityProviderBuilderMap[T]

export { useIdentityProvider, getIdentityProvider, PublicKeyIdentityProvider }