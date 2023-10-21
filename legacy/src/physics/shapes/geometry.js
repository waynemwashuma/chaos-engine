class Geometry {
  constructor(pos, vertices) {
    this.vertices = []
    vertices.forEach(vertex => {
      this.vertices.push(vertex.clone().sub(pos))
    })
    this.normals = this.calcFaceNormals()
  }
  getNormals(rad) {
    let ar = []
    for (var i = 0; i < this.normals.length; i++) {
      ar.push(this.normals[i].clone().rotate(rad))
    }
    return ar
  }
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
  loop(vertices, pos, rad, n) {
    for (let i = 0; i < vertices.length; i++) {
      let vertex = vertices[i]
      vertex.rotate(rad)
      vertex.multiply(n)
      vertex.add(pos)
    }
    return vertices
  }
  transform(pos, rad, n) {
    let vertices = []
    for (var i = 0; i < this.vertices.length; i++) {
      vertices.push(this.vertices[i].clone())
    }
    this.loop(vertices, pos, rad, n)
    return vertices
  }
}

export {
  Geometry
}