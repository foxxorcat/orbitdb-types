import { Helia } from "@helia/interface"
import { Libp2p, PubSub } from "@libp2p/interface"

export type Await<T> = Promise<T> | T

/**
 * 去除T独有的部分
 */
export type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never
}

/**
 * 去取T共有的部分
 */
export type Within<T, U> = {
    [P in Extract<keyof T, keyof U>]?: never
}

export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

/**
 * 使类型T和U相互排斥
 */
export type XOR<T, U> = (T | U) extends object
    ? (Prettify<Without<T, U> & U>) | (Prettify<Without<U, T> & T>)
    : T | U


export type OneOrMore<T, U> = T | U | T & U

export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => Await<infer R> ? R : any;
export type FunctionParam<T extends (param: any) => any> = T extends (params: infer R) => any ? R : any
export type ReturnType2<T extends { (...args: any): any }> = T extends { (...args: any): Await<infer R> } ? R : any

export type IPFS = Pick<Helia, 'blockstore' | 'pins'> & { libp2p: Libp2p<{ pubsub: PubSub }> }
export type MiniIPFS = {
    blockstore: RequiredBy<Partial<Helia['blockstore']>, 'get' | 'put'>;
    pins: RequiredBy<Partial<Helia['pins']>, 'add' | 'isPinned'>;
    libp2p: RequiredBy<
        Partial<Libp2p<{ pubsub: PubSub }>>,
        'peerId' | 'services'
        | 'unhandle' | 'handle' | 'dialProtocol'
    >
}
export type PartialBy<T, K extends keyof T> = {
    [P in K]?: T[P];
} & Omit<T, K>
export type RequiredBy<T, K extends keyof T> = {
    [P in K]-?: T[P];
} & Pick<T, K>

/** 获取数组的类型 */
export type ArrayType<T> = T extends Array<infer R> ? R : never
/** 获取方法参数类型 */
export type FunctionArgs<T> = T extends (...args: infer Args) => any ? Args : never
export type FunctionArg<T> = T extends (...args: infer Args) => any ? ArrayType<Args> : never