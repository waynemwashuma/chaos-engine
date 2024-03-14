import{Body2D} from "./body.js"
import {Rectangle,Shape} from "../shapes/index.js"

/**
 * A body with a rectangle shape on it.
 * 
 * @augments Body2D
*/
export class Box extends Body2D {
  /**
   * @param {number} w
   * @param {number} h
  */
  constructor(w,h) {
    super(new Rectangle(w,h))
    this.inertia = Shape.calcInertia(this.shapes[0],this.mass)
  }
  /**
   * @inheritdoc
   * @type number 
  */
  set mass(x){
    this._mass = x
    this.inv_mass = x === 0 ? 0 : 1 / x
    this.inertia = Shape.calcInertia(this.shapes[0],this.mass)
  }
  get mass(){
    return this._mass
  }
}