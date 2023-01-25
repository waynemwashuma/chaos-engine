class Geometry {
  constructor(pos, vertices) {
    this.vertices = []
    vertices.forEach(vertex => {
      this.vertices.push(vertex.clone().sub(pos))
    })
    this.normals = this.calcFaceNormals()
  }
  getNormals(rad) {
    return this.normals.map(el => el.clone().rotate(rad))
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
  applyRotation(rad, vertex) {
    vertex.rotate(rad)
  }
  applyScale(n = 1, vertex) {
    vertex.multiply(n)
  }
  applyReposition(pos, vertex) {
    vertex.add(pos)
  }
  loop(vertices, pos, rad, n) {
    for (let i = 0; i < vertices.length; i++) {
      let vertex = vertices[i]
      this.applyRotation(rad, vertex)
      this.applyScale(n, vertex)
      this.applyReposition(pos, vertex)
    }
    return vertices
  }
  transform(pos, rad, n) {
    let vertices = this.vertices.map(el => el.clone())
    this.loop(vertices, pos, rad, n)
    return vertices
  }
}

export{
  Geometry
}