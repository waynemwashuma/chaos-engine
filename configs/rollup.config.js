import { readFileSync } from "fs"
import { resolve } from "path";
import { cwd } from "process";
const pkg = JSON.parse(readFileSync(resolve(cwd(), "./package.json")).toString())

pkg.name = "chaos"
const input = "src/index.js";
const created = `2023-${new Date().getFullYear()}`

const license = readFileSync('LICENSE', 'utf8');
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
export default [{
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