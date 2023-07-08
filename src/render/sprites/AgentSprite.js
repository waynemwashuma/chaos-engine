import { Sprite } from "./sprite.js"
import { Vector } from "../../math/index.js"


let path = [
  new Vector(-10, -10),
  new Vector(-10, 10),
  new Vector(20, 0)
  ]
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
   * @param {Renderer} renderer
   */
  draw(renderer) {
    renderer.vertices(path, true)
    renderer.fill("purple")
    renderer.stroke("black")
  }
  /**
   * @param {Renderer} renderer
   */
  render(renderer) {
    this.agent.draw(renderer)
    super.render(renderer)
  }
}