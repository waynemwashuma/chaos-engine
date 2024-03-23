import {
  Sprite,
  Transform,
  BoxGeometry,
  BasicMaterial,
  StaticImageMaterial,
  SpriteMaterial,
  TextMaterial,
  Vector2
} from "/src/index.js"
const assets = {
  static: "./assets/warrior.png"
}

export function materials(manager) {
  manager.clear()
  const geometry = new BoxGeometry(50, 50)

  //Basic material
  const material1 = new BasicMaterial()
  createsprite(manager, 60, 60, geometry, material1)

  //Static Image material
  const img = new Image()
  img.src = assets.static
  const material2 = new StaticImageMaterial({
    image: img
  })

  createsprite(manager, 170, 60, geometry, material2)

  //Sprite material
  const img2 = new Image()
  img2.src = assets.static

  const material3 = new SpriteMaterial({
    image: img2,
    width: 150,
    height: 100,
    frameRate: 1 / 10,
  })
  
  //will remove when the texture loader is complete.
  img2.onload = () => {
    SpriteMaterial.setup(material3, img2.width, img2.height, 7, 11)
    SpriteMaterial.setAction(material3, 1)
  }
  const material4 = new TextMaterial({
    text: "here it is",
    center: true
  })
  createsprite(manager, 380, 60, geometry, material4)
  createsprite(manager, 290, 60, geometry, material3)
  
  //doing this in an actual game would be catastrophic.
  let r = 0
  setInterval(() => {
    SpriteMaterial.setAction(material3, r)
    r += r < 9 ? 1 : -9
  }, 4000)
}

function createsprite(manager, x, y, geometry, material) {
  return manager.create({
    "transform": new Transform(x, y),
    "sprite": new Sprite(geometry, material)
  })
}