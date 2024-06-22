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
  const commands = manager.getResource("entitycommands")
  const img = new Image()
  const materials = [
    Canvas2DMaterial.basic(),
    Canvas2DMaterial.image({
      image: img,
      frameWidth: 50,
      frameHeight: 50
    }),
    Canvas2DMaterial.text({
      text: "here it is"
    })
  ]

  img.src = assets.static
  initCanvas2DGeometry(geometry)
  for (let i = 0; i < materials.length; i++) {
    commands
      .spawn()
      .insertPrefab(createTransform2D(60 + 120 * i, 120))
      .insert(geometry)
      .insert(materials[i])
      .build()
  }
}