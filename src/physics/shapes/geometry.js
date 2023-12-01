export class Geometry {
  /**
   * @type Vector2[]
   */
  vertices = null
  /**
   * @type Vector2[]
   */
  normals = null
  /**
   * @type Vector2[]
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
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "geometry"
  }
  /**
   * @param {number} rad
   * @param { Vector2[]} target
   */
  getNormals(rad, target) {
    target = target || []
    for (var i = 0; i < this.normals.length; i++) {
      target.push(this._dynNormals[i].copy(this.normals[i]).rotate(rad))
    }
    return target
  }
  /**
   * @private
   * @returns Vector2[]
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
   * @param {number} n
   * @param { Vector2[]} vertices
   * @param { Vector2} pos
   * @patam {number} rad
   */
  transform(vertices, pos, rad, n) {
    for (let i = 0; i < this.vertices.length; i++) {
      let vertex = vertices[i]
      vertex.copy(this.vertices[i])
      vertex.rotate(rad)
      vertex.multiply(n)
      vertex.add(pos)
    }
  }
  toJson(){
    let obj = {
      vertices:this.vertices.map((v)=>v.toJson())
    }
    return obj
  }
  fromJson(obj){
    this.vertices = obj.vertices.map(v=>new Vector2().fromJson(v))
    this.normals = this.calcFaceNormals()
    this._dynNormals = this.normals.map(e => e.clone())
  }
}