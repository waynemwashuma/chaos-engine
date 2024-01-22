import { Component } from "../ecs/index.js"
import { Shape } from "../physics/index.js"
import { Ray } from "./ray.js"
import { Vector2 } from "../math/index.js"
import { RayCastModes, RayCollisionResult, RayPoint, RaycastResult } from "./raycastresult.js"

export class Raycaster extends Component {
  /**
   * @type {Ray[]}
   */
  rays = []
  /**
   * @type {Ray[]}
   */
  collisionResults = []
  /**
   * @private
   * @type {Ray[]}
   */
  _number = 0
  /**
   * @private
   * @type {Ray[]}
   */
  _angle = 0
  /**
   * @private
   * @type {Ray[]}
   */
  _transform = null
  /**
   * @private
   * @type {number}
   */
  _lastangle = 0
  mode = RayCastModes.ANY
  constructor(number = 1, angleSpace = 0) {
    super()
    this._angle = angleSpace
    this._number = number
  }
  /**
   * @inheritdoc
  */
  init(entity) {
    this.requires(entity, "transform")
    this._transform = entity.get("transform")

    const halfview = this._number * this._angle / 2
    for (let a = -halfview; a <= halfview; a += this._angle) {
      this.rays.push(new Ray(new Vector2(), Vector2.fromRad(a)))
      if (this._angle == 0) break
    }
  }
  /**
   * @param {Body2D[]} bodies
  */
  update(bodies) {
    this.collisionResults = []
    const angle = this._transform.orientation.value
    const rotangle = angle - this._lastangle
    for (var i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]
      ray.origin.copy(this._transform.position)
      ray.direction.rotate(rotangle)
    }
    this._lastangle = angle
    for (let i = 0; i < bodies.length; i++) {
      const shapes = bodies[i].shapes

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        if (shape.type === Shape.POLYGON)
          this.testVertices(shape.vertices, bodies[i])
        if (shape.type === Shape.CIRCLE)
          this.testCircle(shape.position, shape.radius, bodies[i])
      }
    }
  }
  /**
   * @private
  */
  testCircle(position, radius, body) {
    let results = new RaycastResult()
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];

      results.collisions.push(testraycircle(ray, position, radius, body))
    }
    this.collisionResults.push(results)
  }
    /**
     * @private
     */
  testVertices(vertices, body) {
    let results = new RaycastResult()
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];

      results.collisions.push(testray(ray, vertices, body))
    }
    this.collisionResults.push(results)
  }
}
/**
 * @private
 */
function testray(ray, vertices, body) {
  const origin = ray.origin
  const direction = ray.direction
  const results = new RayCollisionResult(ray, body)

  let res = testSingleEdge(
    vertices[vertices.length - 1],
    vertices[0], origin, direction
  )
  if (res != void 0)
    results.points.push(
      new RayPoint(
        res,
        res.clone().sub(origin)
        .magnitudeSquared()
      )
    )
  for (let i = 0; i < vertices.length - 1; i++) {
    let res = testSingleEdge(
      vertices[i], vertices[i + 1],
      origin, direction
    )
    if (res != void 0)
      results.points.push(
        new RayPoint(
          res,
          res.clone().sub(origin)
          .magnitudeSquared()
        )
      )
  }
  return results
}

/**
 * @private
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

/**
 * @private
 */
function testraycircle(ray, center, radius, body) {
  const results = new RayCollisionResult(ray, body)

  const x1 = ray.origin.x
  const y1 = ray.origin.y
  const x2 = ray.direction.x
  const y2 = ray.direction.y

  const x3 = center.x
  const y3 = center.y
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