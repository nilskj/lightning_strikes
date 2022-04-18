import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import dev from "rollup-plugin-dev";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    dir: "dist",
    format: "iife",
  },
  plugins: [
    copy({
      targets: [
        { src: "public/*", dest: "dist/" },
        { src: "squids/*.min.js", dest: "dist/" },
      ],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    terser(),
    typescript(),
    dev({ dirs: ["dist"], port: 3000 }),
  ],
};
