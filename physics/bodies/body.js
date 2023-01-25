import {Vector} from"/utils/vector.js"

class Body {
  acceleration = new Vector()
  velocity = new Vector()
  _mass = 0
  inv_mass = 0
  _inertia = 0
  inv_inertia = 0
  rad = 0
  angularVelocity = 0
  restitution = 1
  layer = 1
  constructor(position, ...components) {
    this.position = new Vector().copy(position)
    this.components = components || []
    this.offests = [];
    this.mass = 1
    this.angle = 0
    for (let i = 0; i < components.length; i++) {
      if (components[i] == undefined)
        continue
      this.offests[i] = {
        position: components[i].position.clone(),
        angle: components[i].angle
      }
    }
  }
  set angle(angle) {
    this.rad = angle * Math.PI / 180
  }
  get angle() {
    return this.rad * 180 / Math.PI
  }
  set mass(x) {
    this._mass = x
    this.inv_mass = x == 0 ? 0 : 1 / x
    this.inertia = this.getInertia()
    this.components.forEach(comp => {
      comp.mass = this.mass
    })
  }
  get mass() {
    return this._mass
  }
  set inertia(x) {
    this._inertia = x
    this.inv_inertia = x == 0 ? 0 : 1 / x
  }
  get inertia() {
    return this._inertia
  }
  getInertia() {
    return this.mass
  }
  init(world) {
    this._global = world
  }
  update(dt) {
    this.velocity.add(this.acceleration.clone().multiply(dt))
    this.position.add(this.velocity.clone().multiply(dt))
    this.angle += this.angularVelocity * dt
    this.updateComponents()
  }
  updateComponents() {
    this.angle = this.angle > 360 ? 360 - this.angle : this.angle
    this.angle = this.angle < -360 ? 360 + this.angle : this.angle
    this.components.forEach((comp, i) => {
      comp.position.copy(this.position.clone().add(this.offests[i].position))
      comp.angle = this.offests[i].angle + this.angle
      comp.update()
    })
  }
  drawVelocity(ctx) {
    this.velocity.draw(ctx, this.position.x, this.position.y, "cyan")
  }
  draw(ctx) {
    this.components.forEach(component => {
      component.draw(ctx)
      //component.drawNormals(ctx)
    })
  }
  removeSelf() {
    this._global.remove(this)
    this._global = null
  }
  onCollision() {}
}
export {
  Body
}