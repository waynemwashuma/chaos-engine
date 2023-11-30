import {
  Sprite,
  BufferGeometry,
  BasicMaterial,
  StaticImageMaterial,
  SpriteMaterial,
  Vector2,
  createEntity
} from "/src/index.js"
const assets = {
  static: "./assets/static2.jpeg"
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
  let sprite1 = createsprite(60, 60, geometry, material1)
  manager.add(sprite1)

  //Static Image material
  let img = new Image()
  img.src = assets.static
  let material2 = new StaticImageMaterial(img)
  let sprite2 = createsprite(170, 60, geometry, material2)
  manager.add(sprite2)

  //Sprite material
  let img2 = new Image()
  img2.src = assets.static

  let material3 = new SpriteMaterial(img)
  let sprite3 = createsprite(290, 60,geometry, material3)
  manager.add(sprite3)
  img2.onload = () => {
    material3.setup(9, 6)
    material3.frameRate = 1 / 10
  }
}

function createsprite(x, y, geometry, material) {
  let entity = createEntity(x, y)
  entity.attach("sprite", new Sprite(geometry, material))
  return entity
}