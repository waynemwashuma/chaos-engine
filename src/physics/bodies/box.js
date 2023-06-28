import{Body} from "./body.js"
import {Vector} from"../../math/index.js"
import {Rectangle} from "../shapes/index.js"

/**
 * A body with a rectangle shape on it.
 * 
 * @augments Body
*/
class Box extends Body {
  /**
   * @param {number} w
   * @param {number} h
  */
  constructor(w,h) {
    super(new Rectangle(w,h))
    this.inertia = Rectangle.calcInertia(this._mass,w,h)
    
  }
  /**
   * @inheritdoc
   * @type number 
  */
  set mass(x){
    this._mass = x
    this.inv_mass = x === 0 ? 0 : 1 / x
    this.inertia = Rectangle.calcInertia(x,this.shapes[0].width,this.shapes[0].height)
  }
  get mass(){
    return this._mass
  }
}

export {
  Box
}