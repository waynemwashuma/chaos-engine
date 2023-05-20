import {ObjType} from "../settings.js"

class Constraint {
  constructor(body1, body2) {
    this.body1 = body1
    this.body2 = body2
    this.stiffness = 50
    this.dampening = 0.03
  }
  get physicsType(){
    return ObjType.COMPOSITE
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "constraint"
  }
  behavior(body1, body2) {
    body2.position.copy(body1.position)
  }
  update(dt) {
    this.behavior(this.body1,this.body2,dt)
  }
}
export {
  Constraint
}