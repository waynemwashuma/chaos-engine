import { Vector2, naturalizePair } from "../../math/index.js"
import { SAT } from "../SAT/index.js";
import { NarrowPhase } from "./Narrowphase.js"


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

      const manifold = {
        entityA: a,
        entityB: b,
        contactData: {
          lastOverlap: 0,
          overlap: -Infinity,
          done: false,
          axis: new Vector2(),
          tangent:new Vector2(),
          verticesA: [],
          verticesB: [],
          vertShapeA: null,
          vertShapeB: null,
          contactNo: 0,
          shapes: [],
          indexA: 0,
          indexB: 0
        },
        impulse: 0,
        ca1: new Vector2(),
        ca2: new Vector2(),
        restitution: 0,
        staticFriction: 0,
        kineticFriction: 0,
        velA: new Vector2(),
        velB: new Vector2(),
        rotA: 0,
        rotB: 0
      }
      
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