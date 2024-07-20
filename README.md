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

### `KeysOf<Obj>`

Extract all keys from an object.

<br>

> [!TIP] 
> **Can** be used with generics as well.
>

<br>

```ts
type ArrayKeys = KeysOf<Array<string>> // 'at' | 'concat' | 'copyWithin', etc.
```

---

### `MethodsOf<Obj>`

Extract all methods from an object.

<br>

> [!CAUTION] 
> Can **NOT** be used with generics.
>

<br>

```ts
type NumberMethods = MethodsOf<Number> // 'toString' | 'toFixed' | 'toExponential' | 'toPrecision' | 'valueOf' | 'toLocaleString'
```

---

### `PropertiesOf<Obj>`

Extract all properties from an object.

<br>

> [!CAUTION] 
> Can **NOT** be used with generics.
>

<br>

```ts
type StringProperties = PropertiesOf<String> // number | 'length'
```

---

### `DeepPartial<Type>`

Constructs a type with all top-level and nested properties of `Type` set to optional.

<br>

> [!TIP]
> See also TypeScript's built-in utility [`Partial<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) ![An external link](https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/external.svg)
>

<br>

```ts
type StringProperties = DeepPartial<String> // number | 'length'
```

---

## ✨ Examples

`utils.mts`
```ts

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

### 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
