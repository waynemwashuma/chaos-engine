import { Vector2 } from "../../math/index.js"

export class Geometry {
  /**
   * @type {Vector2[]}
   */
  vertices
  /**
   * @type {Vector2[]}
   */
  normals
  /**
   * @type {Vector2[]}
   */
  _dynNormals
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices
    this.normals = Geometry.calcFaceNormals(vertices)
    // @ts-ignore
    this._dynNormals = this.normals.map(e => Vector2.copy(e))
  }

  /**
   * @param {Geometry} geometry
   * @param {number} angle
   * @param {Vector2[]} out
   */
  static getNormals(geometry, angle, out = []) {
    for (let i = 0; i < geometry.normals.length; i++) {
      const normal = Vector2.rotate(geometry.normals[i], angle)
      // @ts-ignore
      out.push(normal)
    }
    return out
  }
  /**
   * @param {Vector2[]} vertices
   * @returns {Vector2[]}
   */
  static calcFaceNormals(vertices) {
    const axes = []
    let previous = vertices[vertices.length - 1]
    for (let i = 0; i < vertices.length; i++) {
      const current = vertices[i]
      const axis = Vector2.sub(previous, current)
      Vector2.normal(axis, axis)
      Vector2.normalize(axis, axis)

      previous = current
      // @ts-ignore
      if (!checkifEquals(axis, axes))
        axes.push(axis)
    }
    // @ts-ignore
    return axes
  }
  /**
   * @param {Vector2[]} vertices
   * @param {Vector2} pos
   * @param {number} angle
   * @param {Vector2} scale
   * @param {Vector2[]} out
   */
  static transform(vertices, pos, angle, scale, out) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    for (let i = 0; i < vertices.length; i++) {
      const vertex = out[i]
      Vector2.rotateFast(vertices[i], cos, sin, vertex)
      Vector2.multiply(vertex, scale, vertex)
      Vector2.add(vertex, pos, vertex)
    }
  }
}

/**
 * @param {Vector2} axis
 * @param {Vector2[]} axes
 */
function checkifEquals(axis, axes) {
  for (let i = 0; i < axes.length; i++)
    if (Vector2.absEqual(axis, axes[i]))
      return true
  return false
}