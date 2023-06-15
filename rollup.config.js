const pkg = require("./package.json")

const input = "src/index.js";
const created = "2023"
const banner = `/*
 * @author ${pkg.author}
 * {@link ${pkg.repository}
 * @copyright  ${created} ${pkg.author}
 * @license ${pkg.license}
 *
 * 
 */`
module.exports = [{
    // UMD
    input,
    plugins: [],
    output: {
      file: `dist/${pkg.name}.umd.js`,
      format: "umd",
      name: pkg.name.toUpperCase(),
      esModule: false,
      exports: "named",
      sourcemap: false,
      banner
    },
  },
  {
    // ESM
    input,
    plugins: [],
    output: {
      file: `dist/${pkg.name}.module.js`,
      format: "esm",
      exports: "named",
      sourcemap: false,
      banner
    },
  },
];