import { Vector2 } from "../math/index.js"

export class RaycastResult {
  //TODO - Make this property work
  /**
   * @type {RayCastModes}
   */
  mode = RayCastModes.NONE
  /**
   * @type {RayCollisionResult[]}
   */
  collisions = []
}
export class RayCollisionResult {
  /**
   * @type {Body2D}
   */
  object = null
  /**
   * @readonly
   * @type {RayPoint[]}
   */
  points = []
  /**
   * @type {Ray}
   */
  ray = null
  /**
   * @param {Ray} ray 
   * @param {Body2D} object
   */
  constructor(ray, object) {
    this.ray = ray
    this.object = object
  }
}
export class RayPoint {
  /**
   * @type {Vector2}
   */
  point = null
  /**
   * @type {number}
   */
  distance = 0
  /**
   * @param {Vector2} point
   * @param {number} distance
  */
  constructor(point, distance) {
    this.point = point
    this.distance = distance
  }
}
/**
 * @readonly
 * @enum {number}
 */
export const RayCastModes = {
  NONE: 0,
  NEAREST: 1,
  FIRST: 2,
  ANY: 3
}