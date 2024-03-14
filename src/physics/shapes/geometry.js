import { Vector2 } from "../../math/index.js"

export class Geometry {
  /**
   * @type {Vector2[]}
   */
  vertices = null
  /**
   * @type {Vector2[]}
   */
  normals = null
  /**
   * @type {Vector2[]}
   */
  _dynNormals = null
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices
    this.normals = Geometry.calcFaceNormals(vertices)
    this._dynNormals = this.normals.map(e => Vector2.copy(e))
  }
  /**
   * @param {number} rad
   * @param {Vector2[]} target
   */
  static getNormals(geometry, angle, target) {
    target = target || []
    for (let i = 0; i < geometry.normals.length; i++) {
      const normal = Vector2.rotate(geometry.normals[i], angle)
      target.push(normal)
    }
    return target
  }
  /**
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
      if (!checkifEquals(axis, axes))
        axes.push(axis)
    }
    return axes
  }
  /**
   * @param {Geometry} original
   * @param {number} n
   * @param {Vector2[]} vertices
   * @param {Vector2} pos
   * @param {number} rad
   */
  static transform(vertices, pos, angle, scale, out) {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    for (let i = 0; i < vertices.length; i++) {
      const vertex = out[i]
      Vector2.rotateFast(vertices[i], cos, sin, vertex)
      Vector2.multiply(vertex,scale,vertex)
      Vector2.add(vertex,pos,vertex)
    }
  }
}

function checkifEquals(axis, axes) {
  for (let i = 0; i < axes.length; i++)
    if (Vector2.absEqual(axis, axes[i]))
      return true
  return false
}