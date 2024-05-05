import {
  Transform,
  Vector2,
  Canvas2DMaterial,
  Position2DTween,
  BufferGeometry,
  Easing,
  TweenRepeat,
  TweenFlip,
  createTransform2D,
  initCanvas2DGeometry
} from "/src/index.js"

export function animation(manager) {
  const renderer = manager.getResource("viewport")
  const tweener = manager.getResource("tweener")
  const offset = 100,
    stride = 100

  const easings = Object.keys(Easing)
  for (let i = offset; i < renderer.width - offset; i += stride) {
    const easeName = easings[(i - offset) / stride]
    manager.create(
      createText(i, 100, easeName)
    )
    manager.create(
      createAnimation(
        Easing[easeName],
        i,
        renderer.height / 2,
        tweener
      )
    )
  }
}

function createAnimation(easing, width, height) {
  const geometry = BufferGeometry.quad2D(50, 50)
  initCanvas2DGeometry(geometry)
  return [
    ...createTransform2D(width, 200),
    geometry,
    Canvas2DMaterial.basic({
      fill: "white"
    }),
    new Position2DTween(
      new Vector2(width, 200),
      new Vector2(width, height),
      4,
      true,
      true,
      easing
    ),
    new TweenRepeat(),
    new TweenFlip()
  ]
}

function createText(x, y, text) {
  const geometry = new BufferGeometry([])
  BufferGeometry.setAttribute(geometry, "position", [])
  initCanvas2DGeometry(geometry)
  const material = Canvas2DMaterial.text({ text })
  return [
    ...createTransform2D(x, y),
    geometry,
    material
  ]
}