import * as fs from "fs";
import * as path from "path";

let inputDir1 = path.resolve(process.cwd(),"../src","typedef")
let inputDir2 = path.resolve(process.cwd(),"../dist")
let files = fs.readdirSync(inputDir1)
let outputfiles = fs.readdirSync(inputDir2)

let blob = ""
for (const file of files) {
    blob += fs.readFileSync(path.join(inputDir1,file),{encoding:"utf-8"})
}

for (const filename of outputfiles) {
    if(filename.includes('.d.ts') || filename.includes('.min.'))continue

    let output = fs.readFileSync(path.join(inputDir2,filename),{encoding:"utf-8"}) + blob

    fs.writeFileSync(path.join(inputDir2,filename),output)
}