// Author: Igor Dimitrijević (@igorskyflyer)

export type KeysOf<Type> = keyof Type
export type TypeOfValues<Type> = Type[keyof Type]

export type MethodsOf<Type extends object> = {
  [Key in KeysOf<Type>]: Key extends string
    ? Type[Key] extends Func
      ? Key
      : never
    : never
}[keyof Type]

export type PropertiesOf<Type extends object> = {
  [Key in KeysOf<Type>]: Key extends string
    ? Type[Key] extends Func
      ? never
      : Key
    : never
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

export type Func<Args = any, FnReturn = void> = (...args: Args[]) => FnReturn

// alias of Func<T, R>
export type Callback<Args = any, FnReturn = void> = Func<Args, FnReturn>

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

export type MethodSignature<
  Type extends object,
  Method extends MethodsOf<Type>
> = Type[Method] extends Func ? Type[Method] : never

export type Override<
  Type extends object,
  Changes extends { [Key in KeysOf<Type>]?: unknown }
> = Omit<Type, keyof Changes> & Changes

type HasOverlap<Type, Changes> = {
  [Key in keyof Changes]: Key extends keyof Type ? true : false
}[keyof Changes] extends true
  ? true
  : false

export type Extend<Type extends object, Changes extends object> = HasOverlap<
  Type,
  Changes
> extends true
  ? never
  : Type & Changes

export type MethodName<
  Type extends object,
  Method extends KeysOf<Type>
> = Type[Method] extends Func ? Method : never
