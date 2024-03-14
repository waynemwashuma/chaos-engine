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
    this.normals = this.calcFaceNormals()
    this._dynNormals = this.normals.map(e => e.clone())
  }
  /**
   * @param {number} rad
   * @param {Vector2[]} target
   */
  static getNormals(geometry,rad, target) {
    target = target || []
    for (var i = 0; i < geometry.normals.length; i++) {
      target.push(geometry._dynNormals[i].copy(geometry.normals[i]).rotate(rad))
    }
    return target
  }
  /**
   * @private
   * @returns {Vector2[]}
   */
  calcFaceNormals() {
    const axes = [],
      { vertices } = this
    for (var i = 0; i < vertices.length; i++) {
      let axis = vertices[i >= vertices.length ? vertices.length - 1 : i]
        .clone()
        .sub(vertices[i + 1 >= vertices.length ? 0 : i + 1]).normal()
      for (var j = 0; j < axes.length; j++) {
        if (axis.equals(axes[j]) || axis.clone().reverse().equals(axes[j])) {
          axis = null
          break
        }
      }
      if (!axis) continue
      axes.push(axis)
    }
    return axes
  }
  /**
   * @param {Geometry} geometry
   * @param {number} n
   * @param {Vector2[]} vertices
   * @param {Vector2} pos
   * @param {number} rad
   */
  static transform(geometry, vertices, pos, rad, scale) {
    for (let i = 0; i < geometry.vertices.length; i++) {
      let vertex = vertices[i]
      vertex.copy(geometry.vertices[i])
      vertex.rotate(rad)
      vertex.set(
        pos.x + vertex.x * scale.x,
        pos.y + vertex.y * scale.y,
      )
    }
  }
}