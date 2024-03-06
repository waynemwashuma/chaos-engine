import { Vector2, naturalizePair } from "../../math/index.js"
import { SAT } from "../SAT/index.js";
import { NarrowPhase } from "./Narrowphase.js"
import {CollisionManifold} from "./collisionManifold.js"

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
export class SATNarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
  getCollisionPairs(manager, contactList, clmds = []) {
    for (let i = 0; i < contactList.length; i++) {
      const { a, b } = contactList[i]
      const [transformA,bodyA] = manager.get(a,"transform", "body")
      const [transformB,bodyB] = manager.get(b,"transform","body")

      if (!NarrowPhase.canCollide(bodyA, bodyB)) continue
      if (bodyA.aabbDetectionOnly || bodyB.aabbDetectionOnly) continue

      bodyA.sleeping = false
      bodyB.sleeping = false

      const manifold = new CollisionManifold(a,b)
      
      const collisionData = manifold.contactData
      collisionData.overlap = -Infinity
      collisionData.done = false
      SAT.shapesInBodyCollided(bodyA, bodyB, collisionData)
      if (collisionData.overlap < 0 || !collisionData.done) continue
      if (collisionData.contactNo == 2) {
        Vector2.lerp(
          collisionData.verticesA[0],
          collisionData.verticesA[1],
          0.5,
          manifold.ca1
        ).sub(transformA.position)
        Vector2.lerp(
          collisionData.verticesB[0],
          collisionData.verticesB[1],
          0.5,
          manifold.ca2
        ).sub(transformB.position)
      } else {
        manifold.ca1.copy(collisionData.verticesA[0]).sub(transformA.position)
        manifold.ca2.copy(collisionData.verticesB[0]).sub(transformB.position)
      }
      manifold.restitution = bodyA.restitution < bodyB.restitution ? bodyA.restitution : bodyB.restitution
      manifold.staticFriction = bodyA.staticFriction < bodyB.staticFriction ? bodyA.staticFriction : bodyB.staticFriction
      manifold.kineticFriction = bodyA.kineticFriction < bodyB.kineticFriction ? bodyA.kineticFriction : bodyB.kineticFriction
      //if (bodyA.collisionResponse && bodyB.collisionResponse)
      clmds.push(manifold)
    }
    return clmds
  }
}