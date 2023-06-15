const input = "src/index.js";
const name = "chaos"

let banner = `/*
 * Wayne Mwashuma
 * {@link https://github.com/waynemwashuma/chaos engine}
 * @copyright Wayne Mwashuma (@waynemwashuma)
 * @license MIT
 */`
export default [{
    // UMD
    input,
    plugins: [],
    output: {
      file: `dist/${name}.umd.js`,
      format: "umd",
      name: "CHAOS",
      esModule: false,
      exports: "named",
      sourcemap: true,
      banner
    },
  },
  {
    // ESM
    input,
    plugins: [],
    output: {
      file: `dist/${name}.umd.js`,
      format: "esm",
      exports: "named",
      sourcemap: true,
    },
  },
];