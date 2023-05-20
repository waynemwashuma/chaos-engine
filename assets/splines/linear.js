import {Vector} from "../index.js"

function Linear(p1,p2,t){
  return Vector.lerp(p1,p2,t)
}

export{
  Linear
}