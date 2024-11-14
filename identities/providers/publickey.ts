/**
 * @description
 * The PublicKey Identity Provider signs and verifies an identity using the
 * public key of a private/public key pair.
 */
import type { IdentityProviderBuilder } from "./index";
import type { KeyStore } from "../../key-store";

/**
 * Instantiates the publickey identity provider.
 * @return A public key identity provider function.
 */
declare const PublicKeyIdentityProvider: IdentityProviderBuilder<{ keystore: KeyStore }, { id: string }, 'publickey'>
export default PublicKeyIdentityProvider