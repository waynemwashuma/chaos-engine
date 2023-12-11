import { Component } from "../ecs/index.js"
import { Ray } from "./ray.js"
import { Vector2 } from "../math/index.js"
import { RayCastModes, RayCollisionResult, RayPoint, RaycastResult } from "./raycastresult.js"

export class Raycaster extends Component {
  rays = []
  collisionResults = []
  _number = 0
  _angle = 0
  _transform = null
  _lastangle = 0
  mode = RayCastModes.ANY
  constructor(number = 1, angleSpace = 0) {
    super()
    this._angle = angleSpace
    this._number = number
  }
  init(entity) {
    this.requires(entity, "transform")
    this._transform = entity.get("transform")

    const halfview = this._number * this._angle / 2
    for (let a = -halfview; a <= halfview; a += this._angle) {
      this.rays.push(new Ray(new Vector2(), Vector2.fromRad(a)))
      if (this._angle == 0) break
    }
  }
  update(bodies) {
    this.collisionResults = []
    const angle = this._transform.orientation.value
    const rotangle = angle - this._lastangle

    this._transform.orientation.value += 0.01
    for (var i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]
      ray.origin.copy(this._transform.position)
      ray.direction.rotate(rotangle)
    }
    this._lastangle = angle
    for (let i = 0; i < bodies.length; i++) {
      const shapes = bodies[i].shapes

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        this.testVertices(shape.vertices, bodies[i])
      }
    }
  }
  testVertices(vertices, body) {
    let results = new RaycastResult()
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];

      results.collisions.push(testray(ray, vertices, body))
    }
    this.collisionResults.push(results)
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(...this._transform.position)
    this.rays.forEach(r => {
      ctx.moveTo(0, 0)
      ctx.lineTo(
        r.direction.x * r.maxLength,
        r.direction.y * r.maxLength
      )
      ctx.lineWidth = 2
    })
    ctx.strokeStyle = "rgba(255,255,255,0.5)"
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    this.collisionResults.forEach(r => {
      r.collisions.forEach(c => {
        c.points.forEach(p => {
          ctx.beginPath()
          ctx.arc(...p.point, 3, 0, Math.PI * 2)
          ctx.strokeStyle = "white"
          ctx.stroke()
          ctx.closePath()
        })
      })
    })
  }
}
function testray(ray, vertices, body) {
  const origin = ray.origin
  const direction = ray.direction
  const results = new RayCollisionResult(ray, body)

  let res = testSingleEdge(vertices[vertices.length - 1], vertices[0], origin, direction)
  if (res != void 0)
    results.points.push(
      new RayPoint(
        res,
        res.clone().sub(origin).magnitude()
      )
    )
  for (let i = 0; i < vertices.length - 1; i++) {
    let res = testSingleEdge(vertices[i], vertices[i + 1], origin, direction)
    if (res != void 0)
      results.points.push(
        new RayPoint(
          res,
          res.clone().sub(origin).magnitude()
        )
      )
    return results
  }
}
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