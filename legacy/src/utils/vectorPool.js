import {Vector} from "./vector.js"

class VectorPool {
  constructor(number = 100) {
    this._pool = [].fill(new Vector(),0,number)
  }
  getVector(x = 0,y = 0){
    if (this._pool.length) {
      return this.pool.pop().set(x,y)
    }
    return new Vector(x,y)
  }
  returnVector(vec){
    this._pool.push(vec)
  }
}

export{
  VectorPool
}