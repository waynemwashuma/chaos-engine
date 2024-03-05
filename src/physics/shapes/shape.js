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
   * @type {string}
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type {string}
   */
  get CHAOS_OBJ_TYPE() {
    return "shape"
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
   * 
   * @param { Vector2 } axis
   * @param { Vector2[] } target 
   * @returns { Vector2[] }
   */
  getVertices(axis, target) {
    return this.vertices
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
  toJson() {
    let obj = {
      type: this.CHAOS_OBJ_TYPE,
      geometry: this.geometry.toJson(),
      shapeType: this.type,
      offset: this.offPosition.toJson(),
      offAngle: this.offAngle
    }
    return obj
  }
  fromJson(obj) {
    this.offAngle = obj.offAngle
    this.offPosition = obj.offset
    this.geometry.fromJson(obj.geometry)
    this.vertices = this.geometry.vertices.map(v => v.clone())
  }
  static CIRCLE = 0
  static POLYGON = 1
}

export {
  Shape
}