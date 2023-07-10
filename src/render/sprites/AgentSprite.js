import { Sprite } from "./sprite.js"
import { Vector } from "../../math/index.js"
import { circle,rect,vertices,stroke,fill } from "../utils/index.js"

let path = [
  new Vector(-10, -10),
  new Vector(-10, 10),
  new Vector(20, 0)
  ]
  /**
   * Used for debugging agents.
   * 
   * @augments Sprite
  */
export class AgentSprite extends Sprite {
  /**
   * 
   * @private
   * @type Agent
   */
  agent = null
  /**
   * @param {Entity} entity
   */
  init(entity) {
    super.init(entity)
    this.requires("agent")
    this.agent = entity.get("agent")
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    vertices(ctx,path, true)
    fill(ctx,"purple")
    stroke(ctx,"black")
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.agent.draw(ctx)
    super.render(ctx)
  }
}