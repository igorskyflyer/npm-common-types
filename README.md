<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-common-types/main/media/common-types.png" alt="Icon of Common Types" width="256" height="256">
  <h1>Common Types</h1>
</div>

<br>

<h4 align="center">
  🔦 Provides frequently used types for your TypeScript projects. 🦄
</h4>

<br>
<br>

## 📃 Table of Contents

- [Features](#-features)
- [API](#-api)
  - [KeysOf\<Type>](#keysoftype)
  - [TypeOfValues\<Type>](#typeofvaluestype)
  - [MethodsOf\<Type>](#methodsoftype)
  - [PropertiesOf\<Type>](#propertiesoftype)
  - [DeepPartial\<Type>](#deeppartialtype)
  - [Promisable\<Type>](#promisabletype)
  - [EnumKeys\<Type, KeyType>](#enumkeystype-keytype)
  - [Func<Args, FnReturn>](#funcargs-fnreturn)
  - [Callback<Args, FnReturn>](#callbackargs-fnreturn)
  - [TrimLeft\<Input>](#trimleftinput)
  - [TrimRight\<Input>](#trimrightinput)
  - [Trim\<Input>](#triminput)
  - [IsGeneric\<Type>](#isgenerictype)
  - [MethodSignature\<Type, Method>](#methodsignaturetype-method)
  - [Override\<Type, Changes>](#overridetype-changes)
  - [HasOverlap\<FirstType, SecondType>](#hasoverlapfirsttype-secondtype)
  - [Extend\<Type, Changes>](#extendtype-changes)
  - [MethodName\<Type, Method>](#methodnametype-method)
- [Usage](#-usage)
- [API](#-api)
- [Examples](#️-examples)
- [Changelog](#-changelog)
- [Support](#-support)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🤖 Features

- 🗝 Get all keys of a type with `KeysOf`
- 📦 Extract all value types from top-level properties via `TypeOfValues`
- 🔍 Identify only method keys using `MethodsOf`
- 🧾 Identify only property keys using `PropertiesOf`
- 🌿 Make every property (nested too) optional with `DeepPartial`
- ⏳ Accept sync or async values using `Promisable`
- 🎯 Find keys whose values match a specific type via `EnumKeys`
- 🛠 Define generic function signatures with `Func` or `Callback`
- ✂ Remove leading/trailing whitespace in string types with `TrimLeft`, `TrimRight`, `Trim`
- ❓ Detect generic types using `IsGeneric`
- 📜 Get a method’s exact signature with `MethodSignature`
- 📝 Override existing keys with new types via `Override`
- 🚫 Prevent extending with overlapping keys using `Extend`
- 🔑 Validate a method exists and return its name with `MethodName`

<br>
<br>

## 🕵🏼 Usage

Install it by executing any of the following, depending on your preferred package manager:

```bash
pnpm add @igorskyflyer/common-types
```

```bash
yarn add @igorskyflyer/common-types
```

```bash
npm i @igorskyflyer/common-types
```

<br>
<br>

## 🤹🏼 API

### `KeysOf<Type>`

Extracts all keys from the type `Type`.

<br>

> 💡 **TIP**
>
> **CAN** be used with generics as well.
>

<br>

`example.ts`
```ts
type ArrayKeys = KeysOf<Array<string>> // 'at' | 'concat' | 'copyWithin', etc.
```

---

### `TypeOfValues<Type>`

Extracts all value types of the type `Type`. Works with top-level properties only.

<br>

`IPerson.ts`
```ts
interface IPerson {
  firstName: string
  lastName: string
  zip: number
  isMember: boolean
}
```

<br>

`example.ts`
```ts
type ValueTypes = TypeOfValues<IPerson> // string | number | boolean
```

---

### `MethodsOf<Type>`

Extracts all methods from the type `Type`.

<br>

> 🛑 **CAUTION**
>
> Can **NOT** be used with generics.
>

<br>

`example.ts`
```ts
type NumberMethods = MethodsOf<Number> // 'toString' | 'toFixed' | 'toExponential' | 'toPrecision' | 'valueOf' | 'toLocaleString'
```

---

### `PropertiesOf<Type>`

Extracts all properties from the type `Type`.

<br>

> 🛑 **CAUTION**
>
> Can **NOT** be used with generics.
>

<br>

`example.ts`
```ts
type StringProperties = PropertiesOf<String> // 'length'
```

---

### `DeepPartial<Type>`

Constructs a type with all top-level and nested properties of the type `Type` set to optional.

<br>

> 💡 **TIP**
>
> See also TypeScript's built-in utility type [`Partial<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) ![An external link](https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/external.svg).
>

<br>

`IPerson.ts`
```ts
interface IPerson {
  name: string
  address: {
    city: string
    zip: number
  }
}
```

<br>

`example.ts`
```ts
type PersonOptional = DeepPartial<IPerson>

/**
 * PersonOptional:
 *  {
 *    name?: string
 *    address?: {
 *      city?: string
 *      zip?: number
 *    }
 *  }
 */
```

---

### `Promisable<Type>`

Provides a convenient way to allow flexibility in handling values that could either be immediate or asynchronously resolved.

<br>

`example.ts`
```ts
const immediateValue: number = 42
const promiseValue: Promisable<number> = Promise.resolve(42)

async function handleValue(value: Promisable<number>) {
  const result = await processValue(value)
  console.log(result) // Will log the number 42, whether value was a direct number or a Promise resolving to 42
}

handleValue(immediateValue)
handleValue(promiseValue)
```

---

### `EnumKeys<Type, KeyType>`

Extracts all keys from the `Type` that are of the type `KeyType`.

<br>

`IConfig`
```ts
interface IConfig {
  apiUrl: string
  timeout: number
  isEnabled: boolean
  retryAttempts: number
}
```

<br>

`example.ts`
```ts
type ConfigNumbers = EnumKeys<IConfig, number> // 'timeout' | 'retryAttempts'
```

---

### `Func<Args, FnReturn>`

Constructs a generic `Function`-*like* type with the arguments of type `Args` and the return value of type `FnReturn`.

<br>

`example.ts`
```ts
function process(items: number[], callback: Func<number, boolean>): boolean {
  // shortened for brevity
  // do NOT access your Array immediately :)
  for (let i = 0; i < items.length; i++) {
    if (callback(items[i])) {
      return true
    }
  }

  return false
}

process([1, 1, 8, 1], (item) => {
  if (item % 2 === 0) {
    return true
  }

  return false
}) // returns true
```

---

### `Callback<Args, FnReturn>`

Alias of [`Func<Args, FnReturn>`](#funcargs-fnreturn).

---

### `TrimLeft<Input>`

Recursively removes all leading whitespace from the `String` type `Input`.

<br>

`example.ts`
```ts
type Id = '    ID'
type ProperId = TrimLeft<Id>

const id: ProperId = '   ID' // ERROR: does NOT accept leading whitespace
```
---

### `TrimRight<Input>`

Recursively removes all trailing whitespace from the `String` type `Input`.

<br>

`example.ts`
```ts
type Id = 'ID     '
type ProperId = TrimRight<Id>

const id: ProperId = 'ID    ' // ERROR: does NOT accept leading whitespace
```
---

### `Trim<Input>`

Recursively removes all leading and trailing whitespace from the `String` type `Input`.

<br>

`example.ts`
```ts
type Id = '    ID     '
type ProperId = Trim<Id>

const id: ProperId = '   ID    ' // ERROR: does NOT accept leading nor trailing whitespace
```

<br>

> 💡 **TIP**
>
> A very cool usage of the [`Trim<Input>`](#triminput) type is implemented in the [`magic-querySelector`](https://github.com/igorskyflyer/npm-magic-queryselector) project.
>

---

### `IsGeneric<Type>`

Returns a Boolean whether the type `Type` is a generic.

<br>

`example.ts`
```ts
type ArrayIsGeneric = IsGeneric<Array<string>> // true
type NumberIsGeneric = IsGeneric<number> // false
```
---

### `MethodSignature<Type, Method>`

Gets the method signature `Method` of the type `Type`.

<br>

`example.ts`
```ts
type NumberToFixedMethod = MethodSignature<Number, 'toFixed'> // expects (fractionDigits?: number) => string
```

---

### `Override<Type, Changes>`

Overrides the type `Type` with the new type of `Changes`.

<br>

`IPerson`
```ts
interface IPerson {
  name: string
  children: boolean
}
```

<br>

`example.ts`
```ts
const person: IPerson = {
  name:'John Doe',
  children: true
}

type NewPerson = Override<IPerson, { children: number }> //only accepts existing keys

const newPerson: NewPerson = {
  name:'John Doe',
  children: 2
}
```

---

### `HasOverlap<FirstType, SecondType>`

Checks whether the types `FirstType` and `SecondType` overlap, i.e. have the same keys.

<br>

> ⚠️ **WARNING**
>
> It only checks the key names, **NOT** their **TYPES**!
>

<br>

`IPerson`
```ts
interface IPerson {
  name: string
  children: boolean
}
```

<br>

`example.ts`
```ts
type PersonOverlap = HasOverlap<
  IPerson,
  {
    name: string
    children: boolean
  }
> // returns true
```
---

### `Extend<Type, Changes>`

Extends the type `Type` with the new type of `Changes` with only non-existent keys in type `Type`.

<br>

`IPerson`
```ts
interface IPerson {
  name: string
  children: number
}
```

<br>

`example.ts`
```ts
type NewPerson = Extend<IPerson, { name: string }> //only accepts non-existing keys
// will return `never` here
const newPerson: NewPerson = {
  name: 'John Doe',
  children: 2
} // will error

type NewestPerson = Extend<IPerson, { profession: string }> //only accepts non-existing keys
const newestPerson: NewestPerson = {
  name: 'John Doe',
  children: 2,
  profession: 'Developer'
} // will NOT error
```

---

### `MethodName<Type, Method>`

Checks for the existence of the method `Method` in the type of `Type` and returns it if found.

<br>

`example.ts`
```ts
type NumberToFixedMethod = MethodName<Number, 'toFixed'> // toFixed
```

---

## 🗒️ Examples

`utils.ts`
```ts
import type { Callback } from '@igorskyflyer/common-types'

function process(
  items: number[],
  callback: Callback<number, boolean>
): boolean {
  // shortened for brevity
  // do NOT access your Array immediately :)
  for (let i = 0; i < items.length; i++) {
    if (callback(items[i])) {
      return true
    }
  }

  return false
}

const result = process([1, 1, 8, 1], (item) => {
  if (item % 2 === 0) {
    return true
  }

  return false
}) // returns true

console.log(result)

```

<br>
<br>

## 📝 Changelog

📑 The changelog is available here, [CHANGELOG.md](https://github.com/igorskyflyer/npm-common-types/blob/main/CHANGELOG.md).

<br>
<br>

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-common-types/blob/main/LICENSE).

<br>
<br>

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

<br>
<br>

## 🧬 Related

[@igorskyflyer/windev](https://www.npmjs.com/package/@igorskyflyer/windev)

> _🍃 Provides ways of checking whether a path is a legacy Windows device. 💾_

<br>

[@igorskyflyer/magic-queryselector](https://www.npmjs.com/package/@igorskyflyer/magic-queryselector)

> _🪄 A TypeScript-types patch for querySelector/querySelectorAll, make them return types you expect them to! 🔮_

<br>

[@igorskyflyer/jmap](https://www.npmjs.com/package/@igorskyflyer/jmap)

> _🕶️ Reads a JSON file into a Map. 🌻_

<br>

[@igorskyflyer/clone](https://www.npmjs.com/package/@igorskyflyer/clone)

> _🧬 A lightweight JavaScript utility allowing deep copy-by-value of nested objects, arrays and arrays of objects. 🪁_

<br>

[@igorskyflyer/extendable-string](https://www.npmjs.com/package/@igorskyflyer/extendable-string)

> _🦀 ExtendableString allows you to create strings on steroids that have custom transformations applied to them, unlike common, plain strings.. 🪀_

<br>
<br>
<br>

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
