/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 */
class Angle {
  /**
   * Orientation in degrees.
   * 
   * @private
   * @type number
   */
  _deg = 0
  /**
   * Orientation in radians.
   * 
   * @private
   * @type number
   */
  _rad = 0
  /**
   * @param {number} [deg=0] Orientation in degrees.
   */
  //TODO - Change this to radians instead
  constructor(deg = 0) {
    this._deg = deg || 0
    this._rad = deg * Math.PI / 180 || 0
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
   */
  set degree(x) {
    this._deg = x
    this._rad = x * Math.PI / 180
  }
  /**
   * The orientation in radians.
   */
  set radian(x) {
    this._rad = x
    this._deg = x * 180 / Math.PI
  }
  get radian() {
    return this._rad
  }
  get degree() {
    return this._deg
  }
  /**
   * Copies the orientation of another angle.
   * 
   * @param {Angle} angle
   */
  copy(angle) {
    this.degree = angle.degree
  }
  /**
   * @param {{}} obj
   */
  static fromJSON(obj) {
    //TODO - When converted to rad on the first todo,change the naming
    return new Angle(obj.deg)
  }
  /**
   * @returns {{
     deg: number,
     type:string | number
   }}
   */
  static toJson() {
    return {
      deg:this._deg,
      type:this.CHAOS_OBJ_TYPE
    }
  }
}

export {
  Angle
}