import {
  Sprite,
  Transform,
  BufferGeometry,
  BasicMaterial,
  StaticImageMaterial,
  SpriteMaterial,
  Vector2,
  createEntity
} from "/src/index.js"
const assets = {
  static: "./assets/warrior.png"
}


export function materials(manager) {
  manager.clear()
  let geometry = new BufferGeometry([
  new Vector2(-50, -50),
  new Vector2(-50, 50),
  new Vector2(50, 50),
  new Vector2(50, -50)
  ])

  //Basic material
  let material1 = new BasicMaterial()
  createsprite(manager, 60, 60, geometry, material1)

  //Static Image material
  let img = new Image()
  img.src = assets.static
  let material2 = new StaticImageMaterial(img)
  material2.offset.x = -material2.width / 2
  material2.offset.y = -material2.height / 2

  createsprite(manager, 170, 60, geometry, material2)

  //Sprite material
  let img2 = new Image()
  img2.src = assets.static

  let material3 = new SpriteMaterial(img)
  material3.width = 150
  material3.height = 100
  img2.onload = () => {
    material3.setup(7, 11)
    material3.frameRate = 1 / 10
    material3.setAction(1)
  }
  createsprite(manager, 290, 60, geometry, material3)

  let r = 0
  setInterval(() => {
    material3.setAction(r)
    r += r < 9 ? 1 : -9
  }, 10000)
}

function createsprite(manager, x, y, geometry, material) {
  return manager.create({
    "transform": new Transform(x, y),
    "sprite": new Sprite(geometry, material)
  })
}