import { Sprite } from "./sprite.js"
import { BufferGeometry } from "../geometry/index.js"
import { BasicMaterial } from "../material/index.js"
import { Vector } from "../../math/index.js"
import { circle, rect, vertices, stroke, fill } from "../utils/index.js"

let geometry = new BufferGeometry([
  new Vector(-10, -10),
  new Vector(-10, 10),
  new Vector(20, 0)
  ])
let material = new BasicMaterial()
material.fill = "purple"
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
  constructor() {
    super(geometry,material)
  }
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
  render(ctx) {
    this.agent.draw(ctx)
    super.render(ctx)
  }
}