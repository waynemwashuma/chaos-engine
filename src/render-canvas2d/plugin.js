import { Manager } from "../ecs/index.js"
import { Renderer2D } from "./canvas.js"
import { Viewport, Sprite, Camera2D } from "../render/index.js"

export class Renderer2DPlugin {
  constructor(options = {}) {
    options = {
      ...options,
      camera: new Camera2D(),
    }
    if (!options.viewport)
      options.viewport = new Viewport()
    this.renderer = options.viewport
    this.camera = options.camera
    if (!options.viewport.domElement.parentElement)
      document.body.append(options.viewport.domElement)
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource("viewport", this.renderer)
    manager.setResource("ctx", this.renderer.domElement.getContext("2d"))
    manager.setResource("camera", this.camera)
    manager.registerSystem(updateSprites)
  }
  /**
   * @param {number} width
   * @param {number} height
   */
  setViewport(width, height) {
    Renderer2D.setViewport(this.renderer, width, height)
  }
  /**
   * @param {string} selector
   */
  bindTo(selector) {
    Renderer2D.bindTo(this.renderer, selector)
  }
}

function updateSprites(manager) {
  const [transforms, sprites] = manager.query("transform", "sprite").raw()
  const dt = manager.getResource("delta")
  const viewport = manager.getResource("viewport")
  const ctx = manager.getResource("ctx")
  const camera = manager.getResource("camera")

  Renderer2D.clear(ctx, viewport.width, viewport.height)
  ctx.save()
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