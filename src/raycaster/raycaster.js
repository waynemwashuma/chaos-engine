import { Component } from "../ecs/index.js"
import { Ray } from "./ray.js"
import { Vector2 } from "../math/index.js"

export class Raycaster extends Component {
  rays = []
  initialDir = []
  _number = 0
  _angle = 0
  _transform = null
  _lastangle = 0
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
      this.initialDir.push(Vector2.fromRad(a))
      if (this._angle == 0) break
    }
  }
  update(bodies) {
    const angle = this._transform.orientation.value
    const rotangle = angle - this._lastangle
    
    for (var i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]
      ray.origin.copy(this._transform.position)
      ray.direction.rotate(rotangle)
    }
    this._lastangle = angle
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.translate(...this._transform.position)

    this.rays.forEach(r => {
      ctx.moveTo(0, 0)
      ctx.lineTo(
        r.direction.x * r.maxLength,
        r.direction.y * r.maxLength
      )
    })
    ctx.lineWidth = 2
    ctx.strokeStyle = "rgba(255,255,255,0.5)"
    ctx.stroke()
  }
  add() {
    throw "noooo"
  }
}