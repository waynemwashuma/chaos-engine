import { readFileSync,writeFileSync,readdirSync } from "fs";
import { join,resolve } from "path";

const inputDir1 = resolve(process.cwd(),"src")
const inputDir2 = resolve(process.cwd(),"dist")
const files = readdirSync(inputDir1,{recursive:true})
    .filter(str => str.includes("typedef"))
    .filter(path => path.includes(".js"))
const outputfiles = readdirSync(inputDir2)

let blob = ""
for (const file of files) {
    blob += readFileSync(join(inputDir1,file.toString()),{ encoding: "utf-8" }) + "\n"
}

for (const filename of outputfiles) {
    if (filename.includes('.d.ts') || filename.includes('.min.')) continue

    const output = readFileSync(join(inputDir2,filename),{ encoding: "utf-8" }) + blob

    writeFileSync(join(inputDir2,filename),output)
}