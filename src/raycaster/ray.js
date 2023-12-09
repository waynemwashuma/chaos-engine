import { Vector2 } from "../math/index.js"

export class Ray {
  maxLength = 1000;
  constructor(origin = new Vector2(), direction = new Vector2()) {
    this._origin = origin
    this._direction = direction
  }
  get direction() {
    return this._direction
  }
  set direction(x) {
    this._direction.copy(x)
  }
  get origin() {
    return this._origin
  }
  set origin(x) {
    this._origin.copy(x)
  }
  setOrigin(x, y) {
    this._origin.set(x, y)
  }
  setDirection(x, y) {
    this._direction.set(x, y)
  }
}