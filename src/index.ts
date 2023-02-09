import { Plugin } from "vite";
import { transformRequire } from "./lib";
import { parseComponent } from "vue-template-compiler";
export default function vitePluginRequire(opts?: {
  fileRegex?: RegExp;
  log?: (...arg: any[]) => void;
}): Plugin {
  const { fileRegex = /(.js?|.ts?|.jsx?|.tsx?|.vue)$/ } = opts || {};
  return {
    enforce: "pre",
    apply: "build",
    name: "vite-plugin-require",
    async transform(code: string, id: string) {
      //  Exclude files in node_modules
      if (/\/node_modules\//g.test(id)) return;
      let newCode = code;
      if (fileRegex.test(id)) {
        if (/(.vue)$/.test(id)) {
          let parseCode = parseComponent(newCode);
          let parseScript = parseCode?.script?.content;
          let parseTemplate = `<template>\n${parseCode?.template?.content}</template>`;
          let parseStyle = parseCode.styles.reduce(
            (cur, item) =>
              cur + item.scoped
                ? `<style lang="${item.lang}" scoped="${item.scoped}">${item.content}`
                : `<style lang="${item.lang}">${item.content}`,
            ""
          );
          let result = transformRequire(parseScript, id);
          if (result.replaced) {
            parseScript = result.code;
          }
          newCode ==
            parseTemplate +
              `<script lang="${parseCode?.script.lang}">` +
              parseScript +
              "</script>" +
              parseStyle;
        } else {
          let result = transformRequire(newCode, id);
          if (result.replaced) {
            newCode = result.code;
          }
        }
      }
      return {
        code: newCode,
        map: null,
      };
    },
  };
}
