import { deprecate } from "../logger/index.js"

/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 */
export class Angle {

  /**
   * Orientation in radians.
   * 
   * @private
   * @type {number}
   */
  value = 0
  /**
   * @param {number} [rad=0] angle in radians.
   */
  constructor(rad = 0) {
    this.value = rad
  }
  /**
   * The orientation in degrees.
   * @deprecated
   */
  set degree(x) {
    deprecate("Angle.degree")
    this.value = x * Math.PI / 180
  }
  /**
   * The orientation in radians.
   * 
   * @deprecated
   */
  set radian(x) {
    deprecate("Angle().radian", "Angle().value")
    this.value = x
  }
  get radian() {
    deprecate("Angle().radian", "Angle().value")
    return this.value
  }
  get degree() {
    deprecate("Angle().degree")
    return this.value * 180/Math.PI
  }
  /**
   * Copies the orientation of another angle.
   * 
   * @param {Angle} angle
   */
  static copy(angle) {
    this.value = angle.value
  }
}