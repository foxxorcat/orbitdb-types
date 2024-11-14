import type { KeyValueDatastore, KeyValueDatastoreBuilder } from "./keyvalue";

export {
    type KeyValueDatastore as KeyValueIndexedDatastore,
    type KeyValueDatastoreBuilder as KeyValueIndexedDatastoreBuilder
}
declare const KeyValueIndexed: KeyValueDatastoreBuilder
export default KeyValueIndexed