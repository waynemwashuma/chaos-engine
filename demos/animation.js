import {
  Entity,
  Vector2,
  Box,
  Sprite,
  BufferGeometry,
  BasicMaterial,
  Tween,
  TweenManager,
  createEntity,
  Vector2Update,
  Easing
} from "/src/index.js"
let path = [
  new Vector2(-25,-25),
  new Vector2(-25,25),
  new Vector2(25,25),
  new Vector2(25,-25)
  ]
let geometry = new BufferGeometry(path)
let material = new BasicMaterial()

material.fill = "blue"

export function animation(manager) {
  let tweener = manager.getSystem("tween")

  let box = createEntity(200, 100)
  let tween = new Tween(
    box.get("transform").position
  )
  let tween2 = new Tween(
    box.get("transform").position
  )
  tween
    .from(new Vector2(200, 200))
    .to(new Vector2(200, 1200))
    .duration(4)
    .onUpdate(Vector2Update)
    .easing(Easing.linear).play()
  
  tween2
    .from(new Vector2(200, 1200))
    .to(new Vector2(200, 200))
    .duration(4)
    .onUpdate(Vector2Update)
    .easing(Easing.linear)
  tween.chain(tween2)
  tween2.chain(tween)
  box.attach("sprite", new Sprite(
      geometry, material
    ))
  manager.add(box)
  tweener.add(tween2)
  tweener.add(tween)
  console.log(tweener);
}