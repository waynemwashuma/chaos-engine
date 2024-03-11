import { Renderer } from "./renderer.js"
import { Sprite } from "../sprites/index.js"
import { Transform } from "../../intergrator/index.js"

/**
 * Renders images and paths to the 2D context of a canvas.
 * 
 * @extends Renderer
 */
export class Renderer2D extends Renderer {
  /**@type {CanvasRenderingContext2D }*/
  ctx
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas = document.createElement("canvas"), context = canvas.getContext('2d')) {
    if (!context) throw "Could not get a 2d context"
    super(canvas)
    this.ctx = context
  }
  clear() {
    this.ctx.setTransform()
    const h = this.height,
      w = this.width
    this.ctx.clearRect(0, 0, w, h)
  }
  /**
   * @param {number} dt
   * @param {Transform[][]} transforms
   * @param {Sprite<any,any>[][]} sprites
   * @param {Renderer2D} renderer
   */
  static update(renderer, transforms, sprites, dt) {
    renderer.camera.update()
    renderer.clear()
    renderer.ctx.save()
    renderer.ctx.rotate(
      renderer.camera.transform.orientation
    )
    renderer.ctx.scale(
      renderer.camera.transform.scale.x,
      renderer.camera.transform.scale.y
    )
    renderer.ctx.translate(
      renderer.camera.transform.position.x,
      -renderer.camera.transform.position.y
    )
    for (let i = 0; i < sprites.length; i++) {
      for (let j = 0; j < sprites[i].length; j++) {
        Sprite.render(
          renderer.ctx,
          sprites[i][j],
          transforms[i][j].position,
          transforms[i][j].orientation,
          transforms[i][j].scale,
          dt
        )
      }
    }
    renderer.ctx.restore()
  }
  requestFullScreen() {
    // @ts-ignore
    this.domElement.parentElement.requestFullscreen()
  }
}