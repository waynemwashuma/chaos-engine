import { Err } from "../utils/index.js"

class Component {
  constructor() {
    this.parent = null;
  }
  get CHOAS_CLASSNAME(){
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE(){
    return "component"
  }
  destroy() {
    this.parent = null
  }

  getComponent(n) {
    return this.parent.getComponent(n);
  }

  init(parent) {
    this.parent = parent
  }

  update(dt) {}

  requires(...names) {
    for (var i = 0; i < names.length; i++)
      if (!this.parent.has(names[i]))
        Err.throw(`The component \`${this.CHOAS_TYPE}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${this.parent.id}`)
  }
  get(name){
    return this.parent.get(name)
  }
  query(bound,target = []){
    return this.parent.query(bound,target)
  }
}
export {
  Component
}