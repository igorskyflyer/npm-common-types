// Author: Igor Dimitrijević (@igorskyflyer)

export type KeysOf<Type> = keyof Type
export type TypeOfValues<Type> = Type[keyof Type]

export type MethodsOf<Type> = {
  [Key in keyof Type]: Type[Key] extends Function ? Key : never
}[keyof Type]

export type PropertiesOf<Type extends object> = {
  [Key in keyof Type]: Type[Key] extends Function ? never : Key
}[keyof Type]

export type DeepPartial<Type> = {
  [Property in keyof Type]?: Type[Property] extends object
    ? DeepPartial<Type[Property]>
    : Type[Property]
}

export type Promisable<Type> = Type | Promise<Type>

export type EnumKeys<Type extends object, KeyType> = {
  [K in keyof Type]: Type[K] extends KeyType ? K : never
}[keyof Type]

export type Func<Args = any, ReturnType = void> = (
  ...args: Args[]
) => ReturnType

// alias of Func<T, R>
export type Callback<Args = any, ReturnType = void> = Func<Args, ReturnType>

export type TrimLeft<Input extends string> = Input extends ` ${infer Rest}`
  ? TrimLeft<Rest>
  : Input

export type TrimRight<Input extends string> = Input extends `${infer Rest} `
  ? TrimRight<Rest>
  : Input

export type Trim<Input extends string> = Input extends ` ${infer Rest}`
  ? Trim<Rest>
  : Input extends `${infer Rest} `
    ? Trim<Rest>
    : Input

export type IsGeneric<Type> = Type extends infer Inferred
  ? Inferred extends object
    ? true
    : false
  : false
