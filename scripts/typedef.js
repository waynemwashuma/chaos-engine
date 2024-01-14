import { readFileSync ,writeFileSync,readdirSync } from "fs";
import { join,resolve } from "path";

let inputDir1 = resolve(process.cwd(),"src","typedef")
let inputDir2 = resolve(process.cwd(),"dist")
let files = readdirSync(inputDir1)
let outputfiles = readdirSync(inputDir2)

let blob = ""
for (const file of files) {
    blob += readFileSync(join(inputDir1,file),{encoding:"utf-8"})
}

for (const filename of outputfiles) {
    if(filename.includes('.d.ts') || filename.includes('.min.'))continue

    let output = readFileSync(join(inputDir2,filename),{encoding:"utf-8"}) + blob

    writeFileSync(join(inputDir2,filename),output)
}