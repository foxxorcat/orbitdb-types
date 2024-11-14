export interface OrbitDBAddress {
    protocol: string
    hash: string
    address: string
    toString(): OrbitDBAddressString
}

export type OrbitDBAddressString = `/orbitdb/${string}`
/**
 * Validates an OrbitDB database address.
 * @function
 * @param {OrbitDBAddress|string} address An OrbitDB database address.
 * @return {boolean} True if the address is a valid OrbitDB database address,
 * false otherwise.
 */
declare const isValidAddress: (address: { toString(): string }) => address is Pick<OrbitDBAddress, 'toString'>
/**
 * @property {string} protocol Protocol prefix "/orbitdb/".
 * @property {string} hash The hash of the database manifest.
 * @property {string} address The full database address.
 */
declare const OrbitDBAddress: (address: OrbitDBAddress | string) => OrbitDBAddress
/**
 * Parses an OrbitDB database address.
 * @function
 * @param {OrbitDBAddress|string} address A valid OrbitDB database address.
 * @return {OrbitDBAddress} An instance of OrbitDBAddress.
 * @throws Not a valid OrbitDB address if no address if provided.
 * @throws Not a valid OrbitDB address if address is invalid.
 */
declare const parseAddress: (address: OrbitDBAddress | string) => OrbitDBAddress

export { OrbitDBAddress as default, isValidAddress, parseAddress }
