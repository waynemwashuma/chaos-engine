import { Vector2 } from "../../math/index.js"
import { Geometry } from "./geometry.js"
import { ShapeType } from "../settings.js"
import { deprecate } from "../../logger/index.js"
/**
 * This class makes a body tangible
 * to collision detection and response.Without it,the body will not be able to interact with other bodies.
 */
export class Shape2D {
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
  vertices
  /**
   * Keeps the original normals and vertices of this shape
   * 
   * @type {Geometry}
   */
  geometry

  /**
   * @param { Vector2[]} vertices The vertices of the shape in local space coordinates.
   */
  constructor(vertices) {
    // @ts-ignore
    this.vertices = vertices.map(v => Vector2.copy(v))
    this.geometry = new Geometry(vertices)
  }
  static rectangle(width, height) {
    let v1 = new Vector2(-width / 2, -height / 2)
    let v2 = new Vector2(-width / 2, height / 2)
    let v3 = new Vector2(width / 2, height / 2)
    let v4 = new Vector2(width / 2, -height / 2)
    return new Shape2D([v1, v2, v3, v4])
  }
  /**
   * @param {number} base Length of one side.
   * @param {number} height Length of a second side.
   * @param {number} angle The angle between the two sides.
   */
  static triangle(base, height, angle) {
    const l1 = new Vector2(base)
    const l2 = Vector2.fromAngle(angle)
    Vector2.multiplyScalar(l2, -height / Math.sin(angle), l2)

    const center = new Vector2(-(l1.x + l2.x) / 3, -l2.y / 3)
    return new Shape2D([
      center,
      // @ts-ignore
      Vector2.add(l1, center, l1),
      // @ts-ignore
      Vector2.add(l2, center, l2)
    ])
  }
  /**
   * Returns the normals of the faces when rotated.
   * @param {Shape2D} shape
   * @param {Shape2D} refshape
   * @param {Vector2[]} [out] An array where results are stored.
   * @returns {Vector2[]}
   */
  static getNormals(shape, refshape, out = []) {
    if (shape.type === Shape2D.POLYGON) return Geometry.getNormals(shape.geometry, shape.angle, out)
    let vertex = null
    if (refshape.type === Shape2D.POLYGON)
      vertex = getNearVertex(shape.vertices[0], shape.vertices)
    if (!vertex)
      vertex = refshape.vertices[0]
    const normal = Vector2.copy(vertex)
    Vector2.sub(normal, shape.vertices[0], normal)
    Vector2.normalize(normal, normal)
    // @ts-ignore
    out.push(normal)

    return out
  }
  /**
   * Transforms the local coordinates of the vertices to world coordinates.
   * 
   * @param {Shape2D} shape
   * @param {Vector2} position the world position of the body
   * @param {number} angle the orientation of body
   * @param {Vector2} scale the scale of the body
   */
  static update(shape, position, angle, scale) {
    shape.angle = angle
    if (shape.type === ShapeType.CIRCLE) {
      Vector2.copy(position, shape.vertices[0])
      return
    }
    Geometry.transform(
      shape.geometry.vertices,
      position,
      angle,
      scale,
      shape.vertices
    )
  }

  /**
   * Returns the world coordinates of the vertices.
   * @template {Shape2D} T
   * @param {T} shape
   * @param { Vector2 } axis
   * @param { Vector2[] } out
   * @returns { Vector2[] }
   */
  static getVertices(shape, axis, out = []) {
    if (shape.type === Shape2D.POLYGON)
      return shape.vertices

    const v1 = Vector2.multiplyScalar(axis, -shape.vertices[1].x)
    const v2 = Vector2.multiplyScalar(axis, shape.vertices[1].x)

    Vector2.add(v1, shape.vertices[0], v1)
    Vector2.add(v2, shape.vertices[0], v2)

    // @ts-ignore
    out[0] = v1
    // @ts-ignore
    out[1] = v2

    return out
  }
  /**
   * TODO - Actually implement this
   * @param {Shape2D} shape
   */
  static getArea(shape) {
    if (shape.type === Shape2D.POLYGON) {
      return 0
    }
    return 0
  }
  /**
   * Calculates the inertia of a given shape.
   * 
   * @param {Shape2D} shape
   * @param {number} mass
   * @returns {number}
   */
  static calcInertia(shape, mass) {
    const vertices = shape.vertices
    if (shape.type === Shape2D.CIRCLE) {
      const radius = vertices[1].x
      return mass * (radius * radius) * 0.5
    }
    const vertexCount = vertices.length
    let numerator = 0.0
    let denominator = 0.0
    let i = vertexCount - 1
    for (let j = 0; j < vertexCount; ++j) {
      const v1 = vertices[i]
      const v2 = vertices[j]
      const crs = Math.abs(Vector2.cross(v1, v2))
      numerator += crs * (Vector2.dot(v2, v2) + Vector2.dot(v1, v2) + Vector2.dot(v1, v1))
      denominator += crs
      i = j
    }
    return mass * numerator / (denominator * 6.0)
  }
  static CIRCLE = 0
  static POLYGON = 1
}
/**
 * @deprecated
 */
export class Shape extends Shape2D {
  constructor() {
    deprecate("Shape()", "Shape2D()")
    //@ts-ignore
    super(...arguments)
  }
}
/**
 * @param {Vector2} position
 * @param {Vector2[]} vertices
 */
function getNearVertex(position, vertices) {
  let vertex = Vector2.ZERO
  let min = -Infinity
  for (let i = 0; i < vertices.length; i++) {
    const a = Vector2.distanceToSquared(vertices[i], position)
    if (min > a) {
      vertex = vertices[i]
      min = a
    }
  }
  return vertex
}