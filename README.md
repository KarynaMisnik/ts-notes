# Typescript Notes

- [Intoduction](#introduction)
- [First Component](#first-component)

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

**Study Material:** [React Docs: Describing the UI](https://react.dev/learn/describing-the-ui)
