# vite-plugin-require-plus

[![npm](https://img.shields.io/npm/v/vite-plugin-require-plus.svg)](https://www.npmjs.com/package/vite-plugin-require-plus)

> can let vite projects to support `require` [vite-plugin-require-plus](https://www.npmjs.com/package/vite-plugin-require-plus)

Install and use to achieve painless support `require`

&nbsp;

## Install

```
npm i vite-plugin-require-plus | pnpm add vite-plugin-require-plus
```

---

## Usage

```ts
import vitePluginRequire from "vite-plugin-require-plus";

export default {
  plugins: [
    vitePluginRequire({
      // @fileRegex RegExp
      // optional：default file processing rules are as follows
      // fileRegex:/(.js?|.ts?|.jsx?|.tsx?|.vue)$/
    }),
  ],
};
```
