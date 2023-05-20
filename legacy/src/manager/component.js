import { Vector } from "../utils/vector.js"
import { Angle } from "../utils/degree.js"
import { Body, Ball } from "../physics/bodies/index.js"
import { Mesh, BodyMesh } from "../render/meshes/index.js"

class Component {
  _position = new Vector()
  _rotation = new Angle()
  constructor(position) {
    this.position = position || new Vector()
    this.name = this.constructor.name;
    this._parent = null;
    this.body = new Ball(this.position, 10)
    this.mesh = new BodyMesh(this.body)
  }

  destroy() {
    this._parent.manager.remove(this)

    this._parent = null
  }

  set parent(p) {
    this._parent = p;
  }
  initFromParent(parent) {
    parent.manager.add(this)
    this.parent = parent
  }
  init(global) {
    this.body.init(this)
    this.mesh.init(this)
  }
  getComponent(n) {
    return this._parent.getComponent(n);
  }

  get manager() {
    return this._parent.Manager;
  }
  broadcast(msg) {
    if (this._parent) this._parent.broadcast(msg)
  }
  get parent() {
    return this._parent;
  }
  set position(p) {
    this._position.copy(p)
    this.broadcast({
      topic: 'update.position',
      value: this._position,
    });
  }

  set rotation(r) {
    this._rotation.copy(r)
    this.broadcast({
      topic: 'update.rotation',
      value: this._rotation,
    })
  }
  set velocity(x) {
    this.body.velocity.copy(x)
  }
  set accelaration(x) {
    this.body.accelaration.copy(x)
  }
  get position() {

    return this._position
  }

  get rotation() {
    return this._rotation
  }
  get velocity() {
    return this.body.velocity
  }
  get accelaration() {
    return this.body.accelaration
  }
  findEntity(n) {
    return this._parent.findEntity(n);
  }
  set angle(x){
   this._rotation.degree = x
  }
  get angle() {
    return this._rotation.degree 
  }
  update(dt) {}

  registerHandler(n, h) {
    this._parent.registerHandler(n, h);
  }
}
export {
  Component
}