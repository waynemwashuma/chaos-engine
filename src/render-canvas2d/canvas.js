
import { Renderer,Material,BufferGeometry, Sprite } from "../render/index.js"
import { deprecate } from "../logger/index.js"
import { Vector2 } from "../math/index.js"
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
  /**
   * @deprecated
   * @param {string} selector
   * @param {boolean} focus
   */
  bindTo(selector,focus = true){
    deprecate("Renderer2D().bindTo()","Renderer2D.bindTo()")
    Renderer.bindTo(this,selector,focus)
  }
    /**
   * @deprecated
   * @param {number} x
   * @param {number} y
   */
    setViewport(x,y){
      deprecate("Renderer2D().setViewport()","Renderer2D.setViewport()")
      Renderer.setViewport(this,x,y)
    }
  /**
   * @deprecated
   */
  clear() {
    deprecate("Renderer2D().clear()","Renderer2D.clear()")
    Renderer2D.clear(this)
  }
  /**
   * @param {Renderer2D} renderer
   */
  static clear(renderer) {
    renderer.ctx.setTransform()
    const h = renderer.height,
      w = renderer.width
    renderer.ctx.clearRect(0, 0, w, h)
  }
  /**
   * @template {BufferGeometry} T
   * @template {Material} U
   * @param {CanvasRenderingContext2D} ctx
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {Sprite<T,U>} sprite
   * @param {number} dt
   */
  static render(
    ctx,
    sprite,
    position,
    orientation,
    scale,
    dt
  ) {
    ctx.save()
    ctx.beginPath()
    ctx.translate(position.x, position.y)
    ctx.rotate(orientation)
    ctx.scale(scale.x, scale.y)
    // @ts-ignore
    Material.render(sprite.material,ctx, dt, sprite.geometry.drawable)
    ctx.closePath()
    ctx.restore()
  }
}