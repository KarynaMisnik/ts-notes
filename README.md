# Typescript Notes

- [Intoduction](#introduction)
- [The Backstory](#the-backstory)
- [How TS runs](#how-ts-runs)
- [Type System Design in TypeScript](#type-system-design-in-typescript)
  - [How Are Types Checked?](#how-are-types-checked)
  - [How Are Types Inferred?](#how-are-types-inferred)
- [First Component](#first-component)
  - [Default vs Named Exports ](#default-vs-named-exports)
- [Writing Markup](#writing-markup)
- [JavaScript in JSX with Curly Braces](#javascript-in-jsx-with-curly-braces)
- [Passing Props to a Component](#passing-props-to-a-component)

## Introduction

React is a JavaScript library for rendering user interfaces (UI). UI contains small units (buttons, images, lists) which you can combine in reusable, nestable components.

> A React component is a JavaScript or TypeScript function that returns JSX/TSX markup.


## The Backstory

TypeScript was created by Microsoft, led by **<a href='https://en.wikipedia.org/wiki/Anders_Hejlsberg'>Anders Hejlsberg</a>**, who also created:

<ul>
<li>Turbo Pascal (1983)</li>
<li>Delphi (1995)</li>
<li>Was the chief architect of C# at Microsoft</li>
</ul>
 
He's deeply experienced in building programming languages — especially those that combine strong typing with developer productivity.

📅 When was TypeScript released?

<ul>
  <li>Announced: October 2012</li>
  <li>Open-sourced: Same time, under Apache License 2.0</li>
  <li>1.0 release: April 2014</li>
</ul>

❓ Why was TypeScript created?

🚨 The core problem: JavaScript wasn't scaling well

By the late 2000s–early 2010s:

<ul>
  <li>JS was being used for larger, more complex apps (like SPAs and cross-platform apps)</li>
  <li>Teams were struggling with maintainability</li>
  <li>There was no type system, making large codebases brittle</li>
  <li>Refactoring was dangerous and hard</li>
  <li>Code editors had limited ability to help (no IntelliSense, no good autocomplete)</li>
</ul>

Microsoft was building large web-based tools like Visual Studio Online, and they needed a better JavaScript.

🎯 TypeScript’s Goals (original design)

Add static types to JavaScript: So you can catch errors before running code

Be a superset of JavaScript: Any JS file should be valid TypeScript

Support modern JavaScript features: Even before browsers did (e.g. ES6 modules, classes)

Enable tooling: Powerful autocompletion, go-to-definition, refactoring

So it’s not a new language from scratch — it’s more like JavaScript++ with safety, structure, and tooling built in.

🤝 TypeScript vs JavaScript

| Feature              | JavaScript                 | TypeScript                                     |
| -------------------- | -------------------------- | ---------------------------------------------- |
| Type System          | Dynamic (no static types)  | Static typing (optional, via type annotations) |
| Compilation          | Interpreted by browsers    | Compiled to JavaScript                         |
| Tooling Support      | Basic                      | Advanced (IntelliSense, refactoring, etc.)     |
| Error Checking       | Runtime only               | Compile-time and runtime                       |
| Modern JS Features   | ES6+ (depends on engine)   | Supports latest features, even before browsers |
| Adoption             | Universal                  | Growing, especially for large projects         |
| Learning Curve       | Lower                      | Slightly higher (due to types)                 |
| Code Maintainability | Harder for large codebases | Easier, especially for teams                   |

📈 Today

<ul>
  <li>Used by &gt;90% of professional JS developers (State of JS 2023)</li>
  <li>Backed by Microsoft but developed in the open on GitHub</li>
  <li>Powers major frameworks:
    <ul>
      <li>Angular (built with TS)</li>
      <li>React + Vue (heavily support TS)</li>
    </ul>
  </li>
  <li>Enables modern tools like:
    <ul>
      <li>VS Code (built in TS)</li>
      <li>Deno (TS-native runtime)</li>
      <li>SvelteKit, Next.js, etc.</li>
    </ul>
  </li>
</ul>

🧠 Summary

TypeScript was created by Anders Hejlsberg at Microsoft in 2012 to solve theproblem of JavaScript not scaling well for large applications. It adds optionalstatic typing, tooling support, and modern features while staying compatible withJavaScript. It's now a core part of the modern web development stack.

## How TS runs

🧠 First: TypeScript Is Not a Runtime Language

TypeScript doesn’t run — it transpiles to JavaScript, which does run.

🚦 The Lifecycle of a TypeScript File

Step 1: You write TypeScript

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Step 2: TypeScript Compiler (tsc) checks your code

It parses the file into an **Abstract Syntax Tree (AST)**

It type-checks that your code is valid:

Are <code>a</code> and <code>b</code> numbers?

Does the return type match?

If there’s a problem, it reports at compile time

If not, it moves on to...

Step 3: Transpilation to JavaScript

```ts
function add(a, b) {
  return a + b;
}
```

The type annotations are completely removed. They are only for your development-time safety and clarity.

This JavaScript is what’s actually run by the JS engine (V8, SpiderMonkey, etc.)

⚙️ TypeScript vs JavaScript Engine

| Concern                               | TypeScript handles        | JavaScript engine handles |
| ------------------------------------- | ------------------------- | ------------------------- |
| Type checking                         | ✅                        | ❌                        |
| Type annotations                      | ✅ (strips them)          | ❌                        |
| Transpilation                         | ✅                        | ❌                        |
| Runtime execution                     | ❌                        | ✅                        |
| Error reporting                       | Compile-time              | Runtime only              |
| Modern JS features support            | ✅ (even before browsers) | ✅                        |
| Memory management, garbage collection | ❌                        | ✅                        |

So TypeScript is a compile-time helper. It makes sure your code is more likely to work at runtime, but it has no presence at runtime.

🧰 What Does the TypeScript Compiler (tsc) Do?

The compiler does 3 main things:

Parsing – turns your <code>.ts</code> file into a syntax tree

Type checking – uses the TS type system to validate your code

Emitting JavaScript – produces <code>.js</code> output that removes all TS-specific syntax

🧪 What Makes TS Powerful?

Structural typing (aka "duck typing"): TS types are based on shape, not classes

Type inference: You don’t have to annotate everything — TS infers from usage

Generics: Add type-safe flexibility to your functions and components

Control Flow Analysis: TS can track how types change through conditions:

```ts
function print(x: string | number) {
  if (typeof x === "string") {
    // here x is narrowed to string
  }
}
```

## Type System Design in TypeScript

💡 What Are Types?

A type is a description of what a value is allowed to be.
TypeScript types model the shape of your data, so you can reason about it at compile time, before the code runs.

🔹 Primitive Types

These represent the basic building blocks of data:

```ts
let x: string = "hello";
let y: number = 42;
let z: boolean = true;
let n: null = null;
let u: undefined = undefined;
```

> These match JavaScript’s typeof values.

🔹 Literal Types

A literal type restricts a value to exactly one option:

```ts
let color: "red"; // only allowed to be "red"
```

🔹 Union Types

A union type means a value can be one of several types:

```ts
let direction: "left" | "right" | "up" | "down";
let id: number | string;
```

> Very useful for modeling flexible APIs and conditional logic.

🔹 Tuple Types

Tuples are fixed-length arrays with known types at each position:

```ts
let point: [number, number] = [3, 4];
let userEntry: [string, number, boolean] = ["Alice", 30, true];
```

🔹 Object Types (including interfaces)

These define structured shapes:

```ts
type User = {
  id: number;
  name: string;
  isAdmin?: boolean; // optional property
};
```

> Interfaces and types both let you model object structures, but interfaces also support inheritance.

🔹 Enum Types (optional, use with caution)

Enums give named constants:

```ts
enum Role {
  Admin,
  Editor,
  Viewer,
}
```

They compile to JavaScript, unlike most TS-only types. Some devs prefer <code>union</code> string literals instead (<code>"admin" | "editor"</code>).

🔹 Function Types

You can describe inputs and outputs:

```ts
let sum: (a: number, b: number) => number;
```

> You can also describe callbacks, overloads, and currying.

🔹 Generic Types

Used to define types that work over a range of types:

```ts
function identity<T>(value: T): T {
  return value;
}
```

> Generics keep type relationships intact — they’re the core of reusable, type-safe abstractions.

#### 🧪 How Are Types Checked?

The TypeScript compiler uses structural typing (not nominal typing like Java or C#).

If it looks like the expected type (structure-wise), it is acceptable.

This means:

```ts
type Point = { x: number; y: number };

const a = { x: 1, y: 2, z: 3 }; // extra property is OK
const b: Point = a; // ✅ This works (extra props ignored)
```

Type Checking Process

1. TS builds an AST (Abstract Syntax Tree) from your code

2. It maps type annotations and inferences

3. It uses flow analysis to track variable types

4. It compares the structure of values against expected types

5. If it finds a mismatch, it throws a compile-time error

It’s not runtime type checking — your program will still run even if your types are wrong (unless you catch them during build or test).

#### 🔍 How Are Types Inferred?

TypeScript uses type inference to reduce how much you have to annotate manually.

🔸 Basic inference

```ts
let count = 10; // inferred as number
let name = "Alex"; // inferred as string
```

> TS infers from the initial value.

🔸 Contextual typing

In functions or callbacks, the context can drive inference:

```ts
window.addEventListener("click", (event) => {
  // TS knows event is a MouseEvent here
  console.log(event.clientX);
});
```

🔸 Return type inference

If you don’t specify a return type, TS will infer it from the return expression:

```ts
function square(x: number) {
  return x * x; // inferred return type: number
}
```

> But in complex functions, explicit types are better for clarity and safety.

🔸 Best Common Type Inference

For arrays and unions:

```ts
let items = [1, 2, 3]; // inferred: number[]
let mix = [1, "two", true]; // inferred: (string | number | boolean)[]
```

> TS looks for a "best common type" to describe everything in the array.

🔸 Control Flow Type Analysis

TypeScript tracks variable types as your logic runs:

```ts
function print(value: string | number) {
  if (typeof value === "string") {
    // TS narrows the type here to string
    console.log(value.toUpperCase());
  } else {
    // here it's number
    console.log(value.toFixed(2));
  }
}
```

> This dynamic narrowing makes code both safe and flexible.

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
