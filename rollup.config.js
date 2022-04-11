import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";
import dev from "rollup-plugin-dev";

export default {
  input: "src/main.js",
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
    dev({ dirs: ["dist"], port: 3000 }),
  ],
};
