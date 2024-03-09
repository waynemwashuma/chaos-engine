import { Vector2, naturalizePair } from "../../math/index.js"
import { SAT } from "../SAT/index.js";
import { NarrowPhase } from "./Narrowphase.js"
import { CollisionManifold } from "./collisionManifold.js"

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
export class SATNarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
   clmdrecord = new Map()
  getCollisionPairs(manager, contactList, clmds = []) {
    for (let i = 0; i < contactList.length; i++) {
      const { a, b } = contactList[i]
      const [bodyA] = manager.get(a, "body")
      const [bodyB] = manager.get(b, "body")

      if (!NarrowPhase.canCollide(bodyA, bodyB)) continue
      if (bodyA.aabbDetectionOnly || bodyB.aabbDetectionOnly) continue

      bodyA.sleeping = false
      bodyB.sleeping = false
      const id = bodyA.id > bodyB.id ? bodyA.id + " " + bodyB.id : bodyB.id + " " + bodyA.id
      if (!this.clmdrecord.has(id))
        this.clmdrecord.set(id, new CollisionManifold(a, b))
      const manifold = this.clmdrecord.get(id)
      const collisionData = manifold.contactData
      collisionData.overlap = -Infinity
      collisionData.done = false
      SAT.shapesInBodyCollided(bodyA, bodyB, collisionData)
      if (collisionData.overlap < 0 || !collisionData.done) continue
      manifold.restitution = bodyA.restitution < bodyB.restitution ? bodyA.restitution : bodyB.restitution
      manifold.staticFriction = bodyA.staticFriction < bodyB.staticFriction ? bodyA.staticFriction : bodyB.staticFriction
      manifold.kineticFriction = bodyA.kineticFriction < bodyB.kineticFriction ? bodyA.kineticFriction : bodyB.kineticFriction
      //if (bodyA.collisionResponse && bodyB.collisionResponse)
      clmds.push(manifold)
    }
    return clmds
  }
}