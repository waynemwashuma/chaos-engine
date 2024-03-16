import { Manager } from "../ecs/index.js"
import { Renderer2D } from "./canvas.js"

export class Renderer2DPlugin {
  constructor(renderer = new Renderer2D()) {
    this.renderer = renderer
    this.camera = renderer.camera
    if (!renderer.domElement.parentElement)
      document.body.append(renderer.domElement)
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    manager.setResource("renderer", this.renderer)
    manager.setResource("ctx",this.renderer.ctx)
    manager.setResource("camera",this.camera)
    manager.registerSystem(manager => {
      const [transforms, sprites] = manager.query("transform", "sprite").raw()
      const dt = manager.getResource("delta")
      const renderer = manager.getResource("renderer")
      const ctx = manager.getResource("ctx")
      const camera = manager.getResource("camera")
      
      Renderer2D.clear(renderer)
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
        Renderer2D.render(
          ctx,
          sprites[i][j],
          transforms[i][j].position,
          transforms[i][j].orientation,
          transforms[i][j].scale,
          dt
        )
      }
    }
      ctx.save()
    })
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