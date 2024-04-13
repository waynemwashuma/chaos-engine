import { Manager } from "../ecs/index.js"
import { Renderer2D } from "./canvas.js"
import { Viewport, Sprite, Material } from "../render/index.js"
import { deprecate } from "../logger/index.js"
export class Canvas2DRendererPlugin {
  constructor(options = {}) {
    if (!options.viewport)
      options.viewport = new Viewport()

    this.renderer = options.viewport
    this.camera = options.camera
    this.enableSorting = options.enableSorting ?? false
    if (!options.viewport.domElement.parentElement)
      document.body.append(options.viewport.domElement)
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource(this.renderer)
    manager.setResource(this.renderer.domElement.getContext("2d"))
    if (this.enableSorting)
      manager.registerSystem(updateSortedSprites)
    else
      manager.registerSystem(updateSprites)
  }
}

function updateSprites(manager) {
  const [transforms, sprites] = manager.query(["transform", "sprite"]).raw()
  const dt = manager.getResource("delta")
  const viewport = manager.getResource("viewport")
  /**@type {CanvasRenderingContext2D}*/
  const ctx = manager.getResource("canvasrenderingcontext2d")
  const camquery = manager.query(["transform", "camera"]).single()
  if (!camquery) return
  const camtransform = camquery[0]
  ctx.clearRect(0, 0, viewport.width, viewport.height)
  ctx.save()
  ctx.translate(
    camtransform.position.x,
    camtransform.position.y
  )
  ctx.rotate(
    camtransform.orientation
  )
  ctx.scale(
    camtransform.scale.x,
    camtransform.scale.y
  )
  for (let i = 0; i < sprites.length; i++) {
    for (let j = 0; j < sprites[i].length; j++) {
      Sprite.render(
        ctx,
        sprites[i][j],
        transforms[i][j].position,
        transforms[i][j].orientation,
        transforms[i][j].scale,
        dt
      )
    }
  }
  ctx.restore()
}

function updateSortedSprites(manager) {
  const [transform, sprite] = manager.query(["transform", "sprite"]).raw()
  const transforms = transform.slice().flat()
  const sprites = sprite.slice().flat()
  const dt = manager.getResource("delta")
  const viewport = manager.getResource("viewport")
  const ctx = manager.getResource("canvasrenderingcontext2d")
  const [camtransform, _] = manager.query(["transform", "camera"]).single()
  quickSort(
    sprites,
    (i, j) => {
      return Material.getUniform(sprites[i].material, "zIndex") <
        Material.getUniform(sprites[j].material, "zIndex")
    },
    (i, j) => {
      const temp1 = sprite[j]
      const temp2 = transform[j]

      sprite[j] = sprite[i]
      sprite[i] = temp1
      transform[j] = transform[i]
      transform[i] = temp2
    }
  )

  Renderer2D.clear(ctx, viewport.width, viewport.height)
  ctx.rotate(
    camera.transform.orientation
  )
  ctx.scale(
    camera.transform.scale.x,
    camera.transform.scale.y
  )
  ctx.translate(
    camera.transform.position.x,
    camera.transform.position.y
  )
  for (let j = 0; j < sprites.length; j++) {
    Sprite.render(
      ctx,
      sprites[j],
      transforms[j].position,
      transforms[j].orientation,
      transforms[j].scale,
      dt
    )
  }
}

/**
 * @template T
 * @param {T[]} arr The array to sort.
 * @param {CompareFunc} compareFunc Makes comparisons on the elements on the array.Default is to return true if the lhs is less than rhs.
 * @param {SwapFunc} swapFunc Function to swap the elements in the array
 * @param {number} [min=0]
 * @param {number} [max=arr.length]
 */
function quickSort(arr, compareFunc, swapFunc, min = 0, max = arr.length - 1) {
  if (min < max) {
    let i = min - 1
    for (let j = min; j < max; j++) {
      if (compareFunc(j, max)) {
        i++
        swapFunc(i, j)
      }
    }
    swapFunc(i + 1, max)
    quickSort(arr, compareFunc, swapFunc, min, i)
    quickSort(arr, compareFunc, swapFunc, i + 2, max)
  }
}
export class Renderer2DPlugin extends Canvas2DRendererPlugin {
  constructor() {
    deprecate("Renderer2DPlugin()", "Canvas2DRendererPlugin()")
    super(...arguments)
  }
}
/**
 * @callback CompareFunc
 * @param {number} i
 * @param {number} j
 * @returns {boolean}
 */

/**
 * @callback SwapFunc
 * @param {number} i
 * @param {number} j
 * @returns {void}
 */