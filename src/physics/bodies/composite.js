import { Utils } from "/src/utils/index.js"
import { ObjType } from "../settings.js"


class Composite {
  constructor() {
    this.bodies = []
    this.constraints = []
  }
  get physicsType() {
    return ObjType.COMPOSITE
  }
  init(entity) {
    this.bodies.forEach(e => {
      e.init(entity, true)
    })
  }
  add(object) {
    if (object.physicsType === ObjType.CONSTRAINT)
      return this.constraints.push(object)
    if (object.physicsType === ObjType.BODY)
      this.bodies.push(object)
  }
}
Utils.inheritComponent(Composite)
export {
  Composite
}