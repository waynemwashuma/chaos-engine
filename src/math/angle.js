import { Logger } from "../logger/index.js"

/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 */
class Angle {

  /**
   * Orientation in radians.
   * 
   * @private
   * @type number
   */
  _value = 0
  /**
   * Cosine of the angle.
   * 
   * @private
   * @type number
   */
  _cos = 0
  /**
   * Cosine of the angle.
   * 
   * @private
   * @type number
   */
  _sin = 0
  /**
   * @param {number} [deg=0] Orientation in degrees.
   */

  //TODO - Change this to radians instead
  constructor(deg = 0) {
    this.value = deg * Math.PI/180
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "angle"
  }
  /**
   * The orientation in degrees.
   * @deprecated
   */
  set degree(x) {
    Logger.deprecate("Angle.degree")
    this.value = x * Math.PI / 180
  }
  get _rad(){
    return this._value
  }
  set _rad(x){
    this._value = x
  }
  get _deg(){
    return this.value * 180/Math.PI
  }
  set _deg(x){
    this.value = x * Math.PI/180
  }
  /**
   * The orientation in radians.
   * 
   * @deprecated
   */
  set radian(x) {
    Logger.deprecate("Angle.radian", "Angle.value")
    this.value = x
  }
  get radian() {
    Logger.deprecate("Angle.radian", "Angle.value")
    return this.value
  }
  get degree() {
    Logger.deprecate("Angle.degree")
    return this.value * 180/Math.PI
  }
  /**
   * The angle in radians.
   * @type number
   */
  get value() {
    return this._value
  }
  set value(x) {
    this._value = x
    this._cos = Math.cos(x)
    this._sin = Math.sin(x)
  }
  /**
   * @type number
   */
  get cos() {
    return this._cos
  }
  /**
   * @type number
   */
  get sin() {
    return this._sin
  }
  /**
   * Copies the orientation of another angle.
   * 
   * @param {Angle} angle
   */
  copy(angle) {
    this.value = angle.value
  }

  fromJSON(obj) {
    this.value = obj.val
  }
  /**
   * @returns {{
     deg: number,
     type:string | number
   }}
   */
  toJson() {
    return {
      val: this.value,
      type: this.CHAOS_OBJ_TYPE
    }
  }
}

export {
  Angle
}