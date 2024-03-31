import { Body2D, Shape2D } from "../physics/index.js"
import { Ray } from "./ray.js"
import { Vector2 } from "../math/index.js"
import { RayCollisionResult, RayPoint } from "./raycastresult.js"

export class Raycast2D {
  /**
   * @template  T
   * @param {Ray} ray
   * @param {Body2D} body
   * @param {T} value
   * @returns {RayCollisionResult<T>}
   */
  static castToBody(ray, body, value) {
    return Raycast2D.cast(ray,body.shapes[0],value)
  }
  /**
   * @template {Shape2D} T
   * @template  U
   * @param {Ray} ray
   * @param {T} shape
   * @param {U} value
   * @param {RayCollisionResult<U>} results
   */
  static cast(ray, shape, value, results = new RayCollisionResult(value)) {
    if (shape.type === Shape2D.POLYGON)
      return Raycast2D.testVertices(ray, shape.vertices, results)
    if (shape.type === Shape2D.CIRCLE)
      return Raycast2D.testCircle(ray, shape.vertices[0], shape.vertices[1].x, results)
    return results
  }
  /**
   * @template T
   * @param {Ray} ray
   * @param {Vector_like} position
   * @param {number} radius
   * @param {RayCollisionResult<T>} results 
   */
  static testCircle(ray, position, radius, results) {
    const x1 = ray.origin.x
    const y1 = ray.origin.y
    const x2 = ray.direction.x
    const y2 = ray.direction.y

    const x3 = position.x
    const y3 = position.y
    const x4 = x3 - x1
    const y4 = y3 - y1
    const r = radius

    const proj = x2 * x4 + y2 * y4
    const delta = proj * proj - ((x4 * x4 + y4 * y4) - r * r)
    const sqrtDelta = Math.sqrt(delta)
    const distance1 = proj + sqrtDelta
    const distance2 = proj - sqrtDelta

    if (delta < 0 || distance1 < 0) return results
    results.points.push(new RayPoint(
      new Vector2(
        x1 + distance1 * x2,
        y1 + distance1 * y2
      ), distance1 * distance1
    ))
    if (delta === 0 || (distance2 < 0)) return results
    results.points.push(new RayPoint(
      new Vector2(
        x1 + distance2 * x2,
        y1 + distance2 * y2
      ),
      distance2 * distance2
    ))
    return results
  }
  /**
   * @template T
   * @param {Ray} ray
   * @param {Vector2[]} vertices
   * @param {RayCollisionResult<T>} result 
   */
  static testVertices(ray, vertices, result) {
    const origin = ray.origin
    const direction = ray.direction

    const res = testSingleEdge(
      vertices[vertices.length - 1],
      vertices[0], ray.origin, ray.direction
    )
    if (res) result.points.push(
      new RayPoint(
        res,
        Vector2.magnitudeSquared(Vector2.sub(res,origin))
      )
    )
    for (let i = 0; i < vertices.length - 1; i++) {
      let res = testSingleEdge(
        vertices[i], vertices[i + 1],
        origin, direction
      )
      if (res) result.points.push(
        new RayPoint(
          res,
          Vector2.magnitudeSquared(Vector2.sub(res,origin))
        )
      )
    }
    return result
  }
}

/**
 * @param {Vector2} v1
 * @param {Vector2} v2
 * @param {Vector2} or
 * @param {Vector2} dir
 */
function testSingleEdge(v1, v2, or, dir) {
  const x1 = v1.x
  const y1 = v1.y
  const x2 = v2.x
  const y2 = v2.y
  const x3 = or.x
  const y3 = or.y
  const x4 = dir.x + x3
  const y4 = dir.y + y3
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

  if (den === 0) return null

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den

  if (
    t > 0 && t < 1 &&
    u > 0
  ) return new Vector2(
    x1 + t * (x2 - x1),
    y1 + t * (y2 - y1)
  )
  return null
}