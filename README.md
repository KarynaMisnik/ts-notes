# Typescript Notes

- [Intoduction](#introduction)
- [First Component](#first-component)
  - [Default vs Named Exports ](#default-vs-named-exports)
- [Writing Markup](#writing-markup)
- [JavaScript in JSX with Curly Braces](#javascript-in-jsx-with-curly-braces)
- [Passing Props to a Component](#passing-props-to-a-component)

## Introduction

React is a JavaScript library for rendering user interfaces (UI). UI contains small units (buttons, images, lists) which you can combine in reusable, nestable components.

> A React component is a JavaScript or TypeScript function that returns JSX/TSX markup.

## First Component

**Step 1:** Export the component

React apps are split into many files. A component isn’t useful unless other parts of your app can use it.<code>export default</code> makes that possible. <code>export default</code> is a prefix (JS/TS standard); the component can be imported and used in other files easily.<br>

```ts
// Greeting.tsx
export default function Greeting() {
return <h1>Hello</h1>;
}

```

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

> [!IMPORTANT]
> React components are regular JavaScript functions; Name with capital letter;

With function <code>Greeting() { }</code> you define a JavaScript function with the name <code>Greeting</code>.

**Step 3: Add markup**

Markup is written like HTML tags. But in reality it is JS/TS. This syntax is called JSX/TSX, and it allows us embed markup inside JavaScript/Typescript.

> JSX/TSX is a syntax extension

```ts
export default function Greeting() {
  return (
    <div>
    <h1>Hello</h1>
    <h4>World!</h4>
    </div>
  );
}

```

> markup isn’t all on the same line as the **return** keyword, then wrap it in a pair of parentheses <code>>()</code>

> [!IMPORTANT]
> Without parentheses, any code on the lines after **return** will be ignored!

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
It can be replaced with <code>div</code> element. It is a "root" element.

**Why we need a "root" element**<br>

In JSX/TSX, a component must return one parent element. React expects a single element, not multiple siblings at the top level.<br>

> [!IMPORTANT]
> JSX looks like HTML, but it becomes JavaScript objects.
> Since a function can return only one value, multiple JSX elements must be wrapped (e.g., in a tag or Fragment).<br>

JSX requires all tags to be closed: self-closing like <code>img</code> and wrapping tags like <code>li</code>.<br>

**Study Material:**<br>
[Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx)

## Javascript in JSX with curly braces

| Use case                          | Example TSX/JSX                                                                       | Notes                                               |
| --------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Insert JS variable or expression  | `tsx<br>const name = "Alice";<br>return <h1>Hello, {name}!</h1>;`                     | Evaluates any JS expression                         |
| Inline CSS / style object         | `tsx<br>return <div style={{ color: "red", fontSize: "20px" }}>Hi</div>;`             | Outer `{}` = TSX expression, inner `{}` = JS object |
| Dynamic props                     | `tsx<br>const disabled = true;<br>return <button disabled={disabled}>Click</button>;` | Can pass variables or expressions to props          |
| Objects / arrays in expressions   | `tsx<br>const user = { name: "Bob" };<br>return <p>{user.name}</p>;`                  | Any JS object/array can be inserted                 |
| Inline calculations / expressions | `tsx<br>const a = 2, b = 3;<br>return <p>{a + b}</p>;`                                | Can compute values on the fly                       |
| Mapping arrays to elements        | `tsx<br>const nums = [1,2,3];<br>return <ul>{nums.map(n => <li>{n}</li>)}</ul>;`      | Loop through arrays in JSX                          |

> [!IMPORTANT]
> In TSX/JSX, **{}** always means “evaluate this JavaScript expression here.”

## Passing Props to a Component

- React components use **props** to communicate. <br>
- Parents pass data to children via props. <br>
- Props can be any JavaScript value: string, number, object, array, or function. <br>
- **Best practice:** use props instead of nested functions inside components for cleaner, reusable code.<br>

**Declaring props**

```js
function Avatar({ person, size }) {
  // ...
}
```

> Pay attention to **()** and **{}**;

This syntax is called **“destructuring”** and is equivalent to reading properties from a function parameter:

```js
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

To give a prop a default value to fall back on when no value is specified:<br>

```js
function Avatar({ person, size = 100 }) {
  // ...
}
```

> [!IMPORTANT]
> Default values only replace <code>undefined</code> or missing props, not <code>null</code>, <code>zero</code> or other falsy values.

**Example of default value:**<br>

```ts
function Button({ size = 10 }: { size?: number | null }) {
  return <button>{size}</button>;
}
```

**Spread syntax**

**Example 1: Forwarding props to a child**

```ts
type ButtonProps = {
  size?: number;
  disabled?: boolean;
  children: React.ReactNode;
};

function Button({ size = 10, ...rest }: ButtonProps) {
  return <button {...rest} style={{ fontSize: size }}>{rest.children}</button>;
}

// Usage
<Button disabled={true}>Click me</Button>
```

`...rest` collects all remaining props (here, **disabled** and **children**).

`<button {...rest}>` spreads them onto the actual `<button>` element.

**Example 2: Wrapping a component**

```ts
function FancyButton(props: ButtonProps) {
  return <Button {...props} style={{ color: "red" }} />;
}

// Usage
<FancyButton size={20} disabled>Press me</FancyButton>
```

<code>...props</code> passes all props from <code>FancyButton</code> to <code>Button</code> without manually specifying each one.

<ins>When it’s useful</ins><br>

<ul>
<li>You don’t want to manually pass every prop.</li>
<li>You are wrapping a component or creating higher-order components.</li>
<li>You want to combine custom props with default/added props.</li>
</ul>

**Passing JSX/TSX as children**<br>

**Example:**<br>

```ts
function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="card">
      <h2>Internal Title</h2>
      {children}  {/* Render extra content from parent if any */}
    </div>
  );
}

// App.js
function App() {
  return (
    <Card>
      <p>Extra content from App!</p>
    </Card>
  );
}
```

`children` is optional: if you render `<Card />`, the component’s internal content always shows; `children` is only needed to render extra nested content passed from the parent.

**Study Material:**<br>
[Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
