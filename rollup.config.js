import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";

export default {
  input: "src/main.js",
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    copy({
      targets: [{ src: "public/*", dest: "dist/" }],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
};
