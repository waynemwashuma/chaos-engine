import path from "path"
import {defineConfig} from "vite"

export default defineConfig({
    build:{
        lib:{
            entry:path.resolve(__dirname,"src/index.js"),
            name:'Chaos',
            fileName:function (format) {
                
                return `chaos.${format}.js`
            }
        }
    }
})