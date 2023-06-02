import { Utils } from "/src/utils/index.js"
import { ObjType } from "../settings.js"


class Composite {
  constructor(bodies, constraints, composites) {
    this.bodies = bodies
    this.constraints = constraints
  }
  get physicsType() {
    return ObjType.COMPOSITE
  }
  init(entity) {
    this.bodies.forEach(e => {
      e.init(entity)
    })
  }
  add(object) {
    if (object.physicsType === ObjType.CONSTRAINT)
      this.constraints.push(object)
    this.bodies.push(object)
  }
}
Utils.inheritComponent(Composite)
export {
  Composite
}