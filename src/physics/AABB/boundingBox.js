import { Overlaps } from "./overlap.js"
import { Component } from "../../ecs/component.js"

/**
 * A rectangular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
export class BoundingBox extends Component {
  /**
   * 
   * @type Vector_like
   */
  pos = null
  /**
   * The upper limit of the bounding box
   * 
   * @type Vector_like
   */
  max = null
  /**
   * The lower limit of the bounding box
   * 
   * @type Vector_like
   */
  min = null
  /**
   * @param {number} [minX=0]
   * @param {number} [minY=0]
   * @param {number} [maxX=0]
   * @param {number} [maxY=0]
   */
  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    super()
    this.pos = {
      x: 0,
      y: 0
    }
    this.max = {
      x: maxX,
      y: maxY
    }
    this.min = {
      x: minX,
      y: minY
    }
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param {BoundingCircle | BoundingBox} bound the bound to check  intersection with
   * @returns boolean
   **/
  intersects(bound) {
    if (bound.r)
      return Overlaps.AABBvsSphere(this, bound)
    return Overlaps.AABBColliding(this, bound)
  }
  /**
   * Calculates the bounds of the body
   * 
   * @param {Body} body Body to calculate max and min from
   * @param {Number} padding increases the size of the bounds
   */
  calculateBounds(body, padding = 0) {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER

    if (body.shapes.length == 0) {
      this.min.x = body.position.x
      this.max.x = body.position.x
      this.min.y = body.position.y
      this.max.y = body.position.y
      this.pos.x = body.position.x
      this.pos.y = body.position.y
      return
    }
    for (var i = 0; i < body.shapes.length; i++) {
      let shape = body.shapes[i]
      if (shape.type == 0) {
        let idx = body.position.x - shape.radius,
          idy = body.position.y - shape.radius,
          mdx = body.position.x + shape.radius,
          mdy = body.position.y + shape.radius
        if (!minX || idx < minX) minX = idx
        if (!maxX || mdx > maxX) maxX = mdx
        if (!minY || idy < minY) minY = idy
        if (!maxY || mdy > maxY) maxY = mdy
        continue
      }
      for (var j = 0; j < shape.vertices.length; j++) {
        let vertex = shape.vertices[j]
        if (vertex.x < minX) minX = vertex.x
        if (vertex.x > maxX) maxX = vertex.x
        if (vertex.y < minY) minY = vertex.y
        if (vertex.y > maxY) maxY = vertex.y
      }
    }
    this.min.x = minX - padding
    this.max.x = maxX + padding
    this.min.y = minY - padding
    this.max.y = maxY + padding
    this.pos.x = body.position.x
    this.pos.y = body.position.y
  }
  /**
   * Translates this bound to the given position.
   * 
   * @param {Vector} pos
   */
  update(pos) {
    let dx = pos.x - this.pos.x
    let dy = pos.y - this.pos.y

    this.pos.x = pos.x
    this.pos.y = pos.y
    this.min.x += dx
    this.max.x += dx
    this.min.y += dy
    this.max.y += dy
  }
  /**
   * Deep copies a bounding box to a new one.
   * 
   * @returns BoundingBox
   */
  clone() {
    return new BoundingBox(this.min.x, this.min.y, this.max.x, this.max.y)
  }
  /**
   * Deep copies another bounding box.
   * 
   * @param {BoundingBox} bounds
   */
  copy(bounds) {
    this.pos.x = bounds.pos.x
    this.pos.y = bounds.pos.y
    this.min.x = bounds.min.x
    this.min.y = bounds.min.y
    this.max.x = bounds.max.x
    this.max.y = bounds.max.y
  }
  toJson() {
    return {
      posX: this.pos.x,
      posY: this.pos.y,
      minX: this.min.x,
      minY: this.min.y,
      maxX: this.max.x,
      maxY: this.max.y,
    }
  }
  fromJson(obj) {
    this.pos.x = obj.posX
    this.pos.y = obj.posY
    this.min.x = obj.minX
    this.min.y = obj.minY
    this.max.x = obj.maxX
    this.max.y = obj.maxY
  }
  /**
   * Combines two bounds to create a new one that covers the previous two.
   * 
   * @param {BoundingBox} bound1 
   * @param {BoundingBox} bound2 
   * @param {BoundingBox} target Bound to store results into.
   * @returns BoundingBox
   */
  static union(bound1, bound2, target) {
    target = target || new BoundingBox()

    target.max.x = bound1.max.x > bound2.max.x ? bound1.max.x : bound2.max.x
    target.max.y = bound1.max.y > bound2.max.y ? bound1.max.y : bound2.max.y
    target.min.x = bound1.min.x < bound2.min.x ? bound1.min.x : bound2.min.x
    target.min.y = bound1.min.y < bound2.min.y ? bound1.min.y : bound2.min.y
    return target
  }
}