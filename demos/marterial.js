import {
  BufferGeometry,
  Canvas2DMaterial,
  initCanvas2DGeometry,
  createTransform2D
} from "/src/index.js"
const assets = {
  static: "./assets/warrior.png"
}

export async function materials(manager) {
  const viewport = manager.getResource("viewport")
  const geometry = BufferGeometry.quad2D(50, 50)
  const img = new Image()
  const materials = [
    Canvas2DMaterial.basic(),
    Canvas2DMaterial.image({
      image: img
    }),
    Canvas2DMaterial.text({
      text: "here it is"
    })
  ]

  img.src = assets.static
  initCanvas2DGeometry(geometry)
  for (let i = 0; i < materials.length; i++) {
    manager.create(createsprite(60 + 120 * i, 120, geometry, materials[i]))
  }
}

function createsprite(x, y, geometry, material) {
  return [
    ...createTransform2D(x, y),
    geometry,
    material
  ]
}