# Typescript Notes

- [Intoduction](#introduction)
- [First Component](#first-component)
  - [Default vs Named Exports ](#default-vs-named-exports)

## Introduction

React is a JavaScript library for rendering user interfaces (UI). UI contains small units (buttons, images, lists) which you can combine in reusable, nestable components.

> A React component is a JavaScript or TypeScript function that returns JSX/TSX markup.

## First Component

**Step 1:** Export the component

React apps are split into many files. A component isn’t useful unless other parts of your app can use it.<code>export default</code> makes that possible. <code>export default</code> is a prefix (JS/TS standard); the component can be imported and used in other files easily.

´´´ts
// Greeting.tsx
export default function Greeting() {
return <h1>Hello</h1>;
}
´´´

#### Default vs Named Exports

**Default export**<br>

<ul>
<li>Used when a file has one main thing</li>
<li>Import without <code>{}</code></li>
<li>Can rename on import</li>
</ul>

```ts
// Footer.tsx
export default function Footer() {
  return <footer>Footer</footer>;
}

//Import
import Footer from "./Footer";
import MyFooter from "./Footer"; // also works
```

**Named exports**<br>

<ul>
<li>Used when a file has multiple exports</li>
<li>Import with <code>{}</code></li>
<li>Names must match (or use alias)
</li>
</ul>

**Default** → one main export, flexible name<br>
**Named** → multiple exports, strict names<br>

<ins>In React projects (common pattern)</ins><br>
Components (return JSX) → <b>default</b> export<br>
Utilities, hooks, API, constants → <b>named</b> exports<br>

> Default = “this file = one main thing”
> Named = “this file = a collection of things”

**Study Material:** [React Docs: Describing the UI](https://react.dev/learn/describing-the-ui)
[Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)
