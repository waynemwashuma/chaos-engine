import { Vector } from "../../utils/index.js"
import { Geometry } from "./geometry.js"
import { Angle } from "../../utils/index.js"
import { ShapeType } from "../settings.js"

let tmp1 = new Vector()

/**
 * This class makes a body tangible
 * to collision detection and response.Without it,the body will not be able to interact with other bodies.
 */
class Shape {
  /**
   * Used to determine what type of shape this is.
   * 
   * @type number
   * @readonly
   */
  type = ShapeType.POLYGON
  /**
   * The offset angle of this shape from this body's angle.
   * 
   * @type number
   */
  offAngle = 0
  /**
   * The offset position of this shape from this body's position.
   * 
   * @type Vector
   */
  offPosition = null
  /**
   * The vertices describing the shape.
   * 
   * @type Array<Vector>
  */
  vertices = null
  /**
   * Keeps the original normals and vertices of this shape
   * 
   * @type Geometry
  */
  geometry = null

  /**
   * @param {array<vector>} vertices The vertices of the shape in local space coordinates.
   * @param {Vector} [offset=vector] offset position relative to parent body
   * @param {number} [offsetAngle=0] offset angle relative to parent body.
   */
  constructor(vertices, offset = new Vector(), offsetAngle = 0) {
    this.offPosition = offset
    this.offAngle = offsetAngle * Math.PI / 180
    this.vertices = vertices.map(v => v.clone())
    this.geometry = new Geometry(vertices)
  }

  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "shape"
  }
  /**
   * Returns the normals of the faces when rotated.
   * 
   * @param {} body
   * @param {} [target=[]] An array where results are stored.
   * @returns {Array<Vector>}
   */
  getNormals(body, target) {
    return this.geometry.getNormals(this.angle, target)
  }
  /**
   * Transforms the local coordinates of the vertices to world coordinates.
   * 
   * @param {vector} position the world position of the body
   * @param {number} angle the orientation of body
   * @param {number} scale the scale of the body
   */
  update(position, angle, scale) {
    this.angle = this.offAngle + angle
    this.geometry.transform(this.vertices, tmp1.copy(position).add(this.offPosition), this.angle, 1 || scale, position)
  }

  /**
   * Returns the world coordinates of the vertices.
   * 
   * @returns {Array<Vector>}
   */
  getVertices() {
    return this.vertices
  }

  /**
   * Calculates the inertia of a given shape.
   * 
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