# Typescript Notes

- [Intoduction](#introduction)
- [First Component](#first-component)
  - [Default vs Named Exports ](#default-vs-named-exports)
- [Writing Markup](#writing-markup)

## Introduction

React is a JavaScript library for rendering user interfaces (UI). UI contains small units (buttons, images, lists) which you can combine in reusable, nestable components.

> A React component is a JavaScript or TypeScript function that returns JSX/TSX markup.

## First Component

**Step 1:** Export the component

React apps are split into many files. A component isn’t useful unless other parts of your app can use it.<code>export default</code> makes that possible. <code>export default</code> is a prefix (JS/TS standard); the component can be imported and used in other files easily.

`ts
// Greeting.tsx
export default function Greeting() {
return <h1>Hello</h1>;
}
`

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

---

A file can have no more than one default export, but it can have as many named exports as you like.

**Step 2: Define the function**

[!IMPORTANT]: React components are regular JavaScript functions; Name with capital letter;

With function <code>Greeting() { }</code> you define a JavaScript function with the name <code>Greeting</code>.

**Step 3: Add markup**

Markup is written like HTML tags. But in reality it is JS/TS. This syntax is called JSX/TSX, and it allows us embed markup inside JavaScript/Typescript.

> JSX/TSX is a syntax extension

<code>
export default function Greeting() {
  return (
    <div>
    <h1>Hello</h1>
    <h4>World!</h4>
    </div>
  );
}
</code>

> markup isn’t all on the same line as the **return** keyword, then wrap it in a pair
> of parentheses <code>>()</code>

[!IMPORTANT]: Without parentheses, any code on the lines after **return** will be ignored!

**Study Material:** <br>
[React Docs: Describing the UI](https://react.dev/learn/describing-the-ui)<br>
[Your First Component](https://react.dev/learn/your-first-component)<br>
[Importing and Exporting Components](https://react.dev/learn/importing-and-exporting-components)<br>

## Writing Markup

Example of TSX Markup:

```ts
export default function Greeting() {
  return (
    <>
      <h1>Hello</h1>
      <p>Welcome!</p>
    </>
  );
}
```

Pay attiontion to **<>** and **</>**. These empty tags called **Fragment**. Fragments let you group things without leaving any trace in the browser HTML tree.
It can be replaced with **<div>** element. It is a ""root"" element.

**Why we need a ""root"" element**<br>

In JSX/TSX, a component must return one parent element. React expects a single element, not multiple siblings at the top level.<br>

[!IMPORTANT]: JSX looks like HTML, but it becomes JavaScript objects.
Since a function can return only one value, multiple JSX elements must be wrapped (e.g., in a tag or Fragment).<br>

JSX requires all tags to be closed: self-closing like <img /> and wrapping tags like <li>oranges</li>.<br>

**Study Material:**<br>
[Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)
