// Author: Igor Dimitrijević (@igorskyflyer)

/**
 * Extracts all keys from the type `Type`.
 * @since v1.0.0
 */
export type KeysOf<Type> = keyof Type
/**
 * Extracts all value types of the type `Type`.
 *
 * Works with top-level properties only.
 * @since v1.0.0
 */
export type TypeOfValues<Type> = Type[keyof Type]

/**
 * Extracts all methods from the type `Type`.
 * @since v1.0.0
 */
export type MethodsOf<Type extends object> = {
  [Key in KeysOf<Type>]: Key extends string
    ? Type[Key] extends Func
      ? Key
      : never
    : never
}[keyof Type]

/**
 * Extracts all properties from the type `Type`.
 * @since v1.0.0
 */
export type PropertiesOf<Type extends object> = {
  [Key in KeysOf<Type>]: Key extends string
    ? Type[Key] extends Func
      ? never
      : Key
    : never
}[keyof Type]

/**
 * Constructs a type with all top-level and nested properties of the type `Type` set to optional.
 * @since v1.0.0
 * @see Partial\<Type>
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
 */
export type DeepPartial<Type> = {
  [Property in keyof Type]?: Type[Property] extends object
    ? DeepPartial<Type[Property]>
    : Type[Property]
}

/**
 * Provides a convenient way to allow flexibility in handling values that could either be immediate or asynchronously resolved.
 * @since v1.0.0
 */
export type Promisable<Type> = Type | Promise<Type>

/**
 * Extracts all keys from the `Type` that are of the type `KeyType`.
 * @since v1.0.0
 */
export type EnumKeys<Type extends object, KeyType> = {
  [K in keyof Type]: Type[K] extends KeyType ? K : never
}[keyof Type]

/**
 * Constructs a generic `Function`-*like* type with the arguments of type `Args` and the return value of type `FnReturn`.
 * @since v1.0.0
 */
export type Func<Args = any, FnReturn = void> = (...args: Args[]) => FnReturn

/**
 * Alias of `Func<Args, FnReturn>`.
 * @since v1.0.0
 * @see Func\<Args, FnReturn>
 */
export type Callback<Args = any, FnReturn = void> = Func<Args, FnReturn>

/**
 * Recursively removes all leading whitespace from the `String` type `Input`.
 * @since v1.0.0
 */
export type TrimLeft<Input extends string> = Input extends ` ${infer Rest}`
  ? TrimLeft<Rest>
  : Input

/**
 * Recursively removes all trailing whitespace from the `String` type `Input`.
 * @since v1.0.0
 */
export type TrimRight<Input extends string> = Input extends `${infer Rest} `
  ? TrimRight<Rest>
  : Input

/**
 * Recursively removes all leading and trailing whitespace from the `String` type `Input`.
 * @since v1.0.0
 */
export type Trim<Input extends string> = Input extends ` ${infer Rest}`
  ? Trim<Rest>
  : Input extends `${infer Rest} `
    ? Trim<Rest>
    : Input

/**
 * Returns a Boolean whether the type `Type` is a generic.
 * @since v1.1.0
 */
export type IsGeneric<Type> = Type extends infer Inferred
  ? Inferred extends object
    ? true
    : false
  : false

/**
 * Gets the method signature `Method` of the type `Type`.
 * @since v1.2.0
 */
export type MethodSignature<
  Type extends object,
  Method extends MethodsOf<Type>
> = Type[Method] extends Func ? Type[Method] : never

/**
 * Overrides the type `Type` with the new type of `Changes`.
 * @since v1.3.0
 */
export type Override<
  Type extends object,
  Changes extends { [Key in KeysOf<Type>]?: unknown }
> = Omit<Type, keyof Changes> & Changes

/**
 * Checks whether the types `FirstType` and `SecondType` overlap, i.e. have the same keys.
 * @since v1.3.0
 */
type HasOverlap<FirstType, SecondType> = {
  [Key in keyof SecondType]: Key extends keyof FirstType ? true : false
}[keyof SecondType] extends true
  ? true
  : false

/**
 * Extends the type `Type` with the new type of `Changes` with only non-existent keys in type `Type`.
 * @since v1.3.0
 */
export type Extend<Type extends object, Changes extends object> = HasOverlap<
  Type,
  Changes
> extends true
  ? never
  : Type & Changes

/**
 * Checks for the existence of the method `Method` in the type of `Type` and returns it if found.
 * @since v1.3.0
 */
export type MethodName<
  Type extends object,
  Method extends KeysOf<Type>
> = Type[Method] extends Func ? Method : never
