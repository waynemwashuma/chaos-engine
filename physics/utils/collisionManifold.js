import { SAT, SATResponse } from "../SAT/index.js"

class CollisionManifold {
  constructor(body1, body2, manifold, world) {
    this.bodies = [body1, body2]
    this.manifold = manifold
    this._global = world
  }
  resolvePenetration() {
    SATResponse.applyPenetrationResolution(...this.bodies, this.manifold)
    let manifold = SAT.shapesInBodyCollided(...this.bodies)
    this._global.collisionManifolds.push(new CollisionManifold(...this.bodies, manifold, this.world))
  }
  resolveCollision() {
    let { axis, contactPoint, overlap } = this.manifold
    SATResponse.CalcSeparationVelocities(...this.bodies, axis, contactPoint)
  }
  applyContactForce(dt) {
    let [velocity1, velocity2] = SATResponse.ApplyContactForce(...this.bodies, this._global.gravitationalAcceleration, this.manifold, dt)

    //temporary fix for circle
    //if(this.bodies[0] instanceof Circle)
    //velocity1.reverse()
    //if(this.bodies[1] instanceof Circle)
    //velocity2.reverse()

    this.bodies[0].velocity.add(velocity1)
    this.bodies[1].velocity.add(velocity2)
  }
  resolve(dt) {
    this.resolvePenetration()
    this.resolveCollision()
    this.applyContactForce(dt)
  }
}

export {
  CollisionManifold
}