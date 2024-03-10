import { Vector2 } from "../math/index.js"

/**
 * @template T
*/
export class RayCollisionResult {
  /**
   * @type {T}
   */
  object
  /**
   * @readonly
   * @type {RayPoint[]}
   */
  points = []
  /**
   * @param {T} object
   */
  constructor(object) {
    this.object = object
  }
}
export class RayPoint {
  /**
   * @type {Vector2}
   */
  point
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