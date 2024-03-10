import { Vector2 } from "../../math/index.js"
import { Geometry } from "./geometry.js"
import { ShapeType } from "../settings.js"

let tmp1 = new Vector2()

/**
 * This class makes a body tangible
 * to collision detection and response.Without it,the body will not be able to interact with other bodies.
 */
class Shape {
  /**
   * Used to determine what type of shape this is.
   * 
   * @type {number}
   * @readonly
   */
  type = ShapeType.POLYGON
  /**
   * @type {number}
   */
  angle = 0
  /**
   * The vertices describing the shape.
   * 
   * @type {Vector2[]}
   */
  vertices = null
  /**
   * Keeps the original normals and vertices of this shape
   * 
   * @type {Geometry}
   */
  geometry = null

  /**
   * @param { Vector2[]} vertices The vertices of the shape in local space coordinates.
   * @param { Vector2} [offset=vector] offset position relative to parent body
   * @param {number} [offsetAngle=0] offset angle relative to parent body.
   */
  constructor(vertices, offset = new Vector2(), offsetAngle = 0) {
    this.offPosition = offset
    this.offAngle = offsetAngle * Math.PI / 180
    this.vertices = vertices.map(v => v.clone())
    this.geometry = new Geometry(vertices)
  }

  /**
   * The area occupied by a shape.
   * @type {number}
   */
  get area() {
    return 0
  }
  /**
   * Returns the normals of the faces when rotated.
   * 
   * @param {Shape} shape
   * @param { Vector2[]} [target=[]] An array where results are stored.
   * @returns { Vector2[]}
   */
  getNormals(shape, target) {
    return this.geometry.getNormals(this.angle, target)
  }
  /**
   * Transforms the local coordinates of the vertices to world coordinates.
   * 
   * @template {Shape} T
   * @param {T} shape
   * @param {Vector2} position the world position of the body
   * @param {number} angle the orientation of body
   * @param {number} scale the scale of the body
   */
  static update(shape, position, angle, scale) {
    shape.angle = angle
    if (shape.type === ShapeType.CIRCLE) {
      shape.position.copy(position)
      return
    }
    Geometry.transform(
      shape.geometry,
      shape.vertices,
      position,
      angle,
      scale
    )
  }

  /**
   * Returns the world coordinates of the vertices.
   * @template {Shape} T
   * @param {T} shape
   * @param { Vector2 } axis
   * @param { Vector2[] } target
   * @returns { Vector2[] }
   */
  static getVertices(shape, axis, target = []) {
    if (shape.type === Shape.POLYGON) return shape.vertices
    const v1 = new Vector2().copy(axis).multiply(-shape.vertices[1].x).add(shape.vertices[0])
    const v2 = new Vector2().copy(axis).multiply(shape.vertices[1].x).add(shape.vertices[0])
    target[0] = v1
    target[1] = v2
    return target
  }

  /**
   * Calculates the inertia of a given shape.
   * 
   * @virtual
   * @returns {number}
   */
  static calcInertia() {
    throw new Error("Implement in the children classes")
  }
  static CIRCLE = 0
  static POLYGON = 1
}

export {
  Shape
}