import { Sprite } from "./sprite.js"
import { Vector } from "../../utils/index.js"


let path = [
  new Vector(-10,-10),
  new Vector(-10,10),
  new Vector(20,0)
  ]
export class AgentSprite extends Sprite {
  constructor() {
    super()
    this.agent = null
  }
  init(entity) {
    super.init(entity)
    this.requires("agent")
    this.agent = entity.get("agent")
  }
  draw(renderer){
    renderer.vertices(path,true)
    renderer.fill("purple")
    renderer.stroke("black")
  }
  update(renderer) {
    this.agent.draw(renderer)
    super.update(renderer)
    
  }
}