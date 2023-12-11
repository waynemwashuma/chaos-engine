import { Vector2 } from "../math/index.js"

export class RaycastResult{
  /**
   * @type {RayCastModes}
   */
  mode = RayCastModes.NONE
  collisions = []
}
export class RayCollisionResult{
  /**
   * @readonly
   * @type {Body}
   */
  object = null
  /**
   * @readonly
   * @type {RayPoint[]}
   */
  points = [ ]
  /**
   * @readonly
   * @type {Ray}
   */
  ray = null
  /**
   * @param {Ray} ray 
   * @param {Body} object
   */
  constructor(ray,object){
    this.ray = ray
    this.object = object
  }
}
export class RayPoint{
  /**
   * @readonly
   * @type {Vector2}
   */
  point = null
  /**
   * @readonly
   * @type {number}
   */
  distance = 0
  constructor(point,distance){
    this.point = point
    this.distance = distance
  }
}
/**
 * @enum {number}
 * @property NONE
 * @property NEAREST
 * @property ANY
 * @property FIRST
*/
export const RayCastModes = {
  NONE : 0,
  NEAREST:1,
  FIRST:2,
  ANY:3
}