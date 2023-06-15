const input = "src/index.js";

const created = "2023"
const pkg ={
  name:"chaos",
  version:"0.7.0",
  repository:"https://github.com/waynemwashuma/chaos-engine",
  license:"MIT",
  author:"Wayne Mwahuma"
}
const name = "chaos"

const banner = `/*
 * @author ${pkg.author}
 * {@link ${pkg.repository}}
 * @copyright ${pkg.author} ${created}
 * @license ${pkg.license}
 *
 * 
 */`
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