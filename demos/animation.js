import {
  Vector2,
  Sprite,
  BufferGeometry,
  BasicMaterial,
  Tween,
  createEntity,
  Vector2Update,
  Easing,
  TextMaterial,
  BoxGeometry
} from "/src/index.js"
let path = [
  new Vector2(-25, -25),
  new Vector2(-25, 25),
  new Vector2(25, 25),
  new Vector2(25, -25)
  ]
let geometry = new BoxGeometry(25,25)
let material = new BasicMaterial()

material.fill = "blue"

export function animation(manager) {
  const renderer = manager.getSystem("renderer")
  const tweener = manager.getSystem("tween")
  const offset = 100,
    stride = 100

  const easings = Object.keys(Easing)
  for (let i = offset; i < renderer.width - offset; i += stride) {
    const easeName = easings[(i - offset) / stride]
    const text = createText(i, 100, easeName)

    const entity = createAnimation(
      Easing[easeName],
      i,
      renderer.height/2,
      tweener
    )
    const bounds = createEntity(i,renderer.height/4 + 100).attach("sprite",new Sprite(
      new BoxGeometry(stride, renderer.height / 2),
      new BasicMaterial()
    ))
    manager.add(bounds)
    manager.add(text)
    manager.add(entity)
    
    
  }
}

function createAnimation(easing, width, height, tweener, renderer) {
  let box = createEntity(width, 100)
  let tween = new Tween(
    box.get("transform").position
  )
  let tween2 = new Tween(
    box.get("transform").position
  )
  tween
    .from(new Vector2(width, 200))
    .to(new Vector2(width, height))
    .duration(4)
    .onUpdate(Vector2Update)
    .easing(easing).play()

  tween2
    .from(new Vector2(width, height))
    .to(new Vector2(width, 200))
    .duration(4)
    .onUpdate(Vector2Update)
    .easing(easing)
  tween.chain(tween2)
  tween2.chain(tween)

  box.attach("sprite", new Sprite(
    geometry, material
  ))

  tweener.add(tween2)
  tweener.add(tween)
  return box
}

function createText(x, y, text) {
  const entity = createEntity(x, y)
  const material = new TextMaterial(text)
  entity.attach("sprite", new Sprite(
    geometry,
    material
  ))
  material.center = true
  return entity
}