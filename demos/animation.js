import {
  Transform,
  Vector2,
  Sprite,
  BasicMaterial,
  Tween,
  BufferGeometry,
  Vector2Update,
  Easing,
  TextMaterial,
  BoxGeometry
} from "/src/index.js"

export function animation(manager) {
  const renderer = manager.getResource("renderer")
  const tweener = manager.getResource("tweener")
  const offset = 100,
    stride = 100

  const easings = Object.keys(Easing)
  for (let i = offset; i < renderer.width - offset; i += stride) {
    const easeName = easings[(i - offset) / stride]
    const text = createText(manager,i, 100, easeName)

    const entity = createAnimation(
      manager,
      Easing[easeName],
      i,
      renderer.height / 2,
      tweener
    )
  }
}

function createAnimation(manager, easing, width, height, tweener) {
  const transform = new Transform(width,100)
  const box = manager.create({
    transform,
    sprite: new Sprite(
      new BoxGeometry(50,50),
      new BasicMaterial()
    )
  })
  let tween = new Tween(
    transform.position
  )
  let tween2 = new Tween(
    transform.position
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
  tweener.add(tween2)
  tweener.add(tween)
  return box
}

function createText(manager, x, y, text) {
  const geometry = new BufferGeometry([])
  const material = new TextMaterial(text)
  const entity = manager.create({
    "transform": new Transform(x,y),
    "sprite": new Sprite(
      geometry,
      material
    )
  })
  material.center = true
  return entity
}