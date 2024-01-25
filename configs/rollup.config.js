const pkg = require("../package.json")
pkg.name = "chaos"
const fs = require("fs")
const input = "src/index.js";
const created = `2023-${new Date().getFullYear()}`

const license = fs.readFileSync('LICENSE', 'utf8');
const banner = `/*
 * @author ${pkg.author}
 * {@link ${pkg.repository.url}}
 * @copyright  ${created} ${pkg.author}
 *
 * @license ${pkg.license}
 * @version ${pkg.version}
 */
 /*
 ${license}
 */
 `
 
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