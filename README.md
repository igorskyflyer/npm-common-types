<h1 align="center">CommonTypes</h1>

<br>

<p align="center">
  🔦 Provides frequently used types for your TypeScript projects. 🫏
</p>

<br>
<br>

<div align="center">
  <blockquote>
    <br>
    <h4>💖 Support further development</h4>
    <span>I work hard for every project, including this one and your support means a lot to me!
    <br>
    Consider buying me a coffee. ☕
    <br>
    <strong>Thank you for supporting my efforts! 🙏😊</strong></span>
    <br>
    <br>
    <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="150"></a>
    <br>
    <br>
    <a href="https://github.com/igorskyflyer"><em>@igorskyflyer</em></a>
    <br>
    <br>
    <br>
  </blockquote>
</div>

<br>
<br>

## 📃 Table of contents

- [Usage](#-usage)
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
- [Examples](#-examples)
- [Changelog](#-changelog)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

---

<br>
<br>

## 🕵🏼 Usage

Install it by executing:

```shell
npm i -D "@igor.dvlpr/common-types"
```

<br>

## 🤹🏼 API

### `KeysOf<Type>`

Extracts all keys from a `Type`.

<br>

> [!TIP] 
> **CAN** be used with generics as well.
>

<br>

`example.ts`
```ts
type ArrayKeys = KeysOf<Array<string>> // 'at' | 'concat' | 'copyWithin', etc.
```

---

### `TypeOfValues<Type>`

Extracts all value types of a `Type`. Works with top-level properties only.

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

Extracts all methods from a `Type`.

<br>

> [!CAUTION] 
> Can **NOT** be used with generics.
>

<br>

`example.ts`
```ts
type NumberMethods = MethodsOf<Number> // 'toString' | 'toFixed' | 'toExponential' | 'toPrecision' | 'valueOf' | 'toLocaleString'
```

---

### `PropertiesOf<Type>`

Extracts all properties from a `Type`.

<br>

> [!CAUTION] 
> Can **NOT** be used with generics.
>

<br>

`example.ts`
```ts
type StringProperties = PropertiesOf<String> // 'length'
```

---

### `DeepPartial<Type>`

Constructs a type with all top-level and nested properties of `Type` set to optional.

<br>

> [!TIP]
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

Extracts all keys from a `Type` that are of type `KeyType`.

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

Constructs a generic `Function`-*like* type with typed arguments and the return value.

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

Recursively removes all leading whitespace from a `String` type `Input`.

<br>

`example.ts`
```ts
type Id = '    ID'
type ProperId = TrimLeft<Id>

const id: ProperId = '   ID' // ERROR: does NOT accept leading whitespace
```
---

### `TrimRight<Input>`

Recursively removes all trailing whitespace from a `String` type `Input`.

<br>

`example.ts`
```ts
type Id = 'ID     '
type ProperId = TrimRight<Id>

const id: ProperId = 'ID    ' // ERROR: does NOT accept leading whitespace
```
---

### `Trim<Input>`

Recursively removes all leading and trailing whitespace from a `String` type `Input`.

<br>

`example.ts`
```ts
type Id = '    ID     '
type ProperId = Trim<Id>

const id: ProperId = '   ID    ' // ERROR: does NOT accept leading nor trailing whitespace
```

<br>

> [!TIP]
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

Gets the method signature `Method` of type `Type`.

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

> [!WARNING]
> It only checks the key names, not their types!
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
type NewPerson = Extend<IPerson, { name: string }> //only accepts non-existing keys, will return `never` here
const newPerson: NewPerson = {
  name: 'John Doe',
  children: 2
} // will error

type NewestPerson = Extend<IPerson, { profession: string }> //only accepts non-existing properties/methods
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

## ✨ Examples

`utils.ts`
```ts
import type { Callback } from '@igor.dvlpr/common-types'

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

---

## 📝 Changelog

📑 Changelog is available here: [CHANGELOG.md](https://github.com/igorskyflyer/npm-common-types/blob/main/CHANGELOG.md).

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-common-types/blob/main/LICENSE).

---

## 🧬 Related

[@igor.dvlpr/windev](https://www.npmjs.com/package/@igor.dvlpr/windev)

> _🍃 Provides ways of checking whether a path is a legacy Windows device. 💾_

<br>

[@igor.dvlpr/magic-queryselector](https://www.npmjs.com/package/@igor.dvlpr/magic-queryselector)

> _🪄 A TypeScript-types patch for querySelector/querySelectorAll, make them return types you expect them to! 🔮_

<br>

[@igor.dvlpr/jmap](https://www.npmjs.com/package/@igor.dvlpr/jmap)

> _🕶️ Reads a JSON file into a Map. 🌻_

<br>

[@igor.dvlpr/node-clone-js](https://www.npmjs.com/package/@igor.dvlpr/node-clone-js)

> _🧬 A lightweight JavaScript utility allowing deep copy-by-value of nested objects, arrays and arrays of objects. 🪁_

<br>

[@igor.dvlpr/extendable-string](https://www.npmjs.com/package/@igor.dvlpr/extendable-string)

> _🦀 ExtendableString allows you to create strings on steroids that have custom transformations applied to them, unlike common, plain strings.. 🪀_

---

<br>

### 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
