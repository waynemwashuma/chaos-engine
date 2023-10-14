import { Vector, naturalizePair } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { SAT } from "../SAT/index.js";
import { ObjType } from "../settings.js"

import { NarrowPhase } from "./Narrowphase.js"
import { Settings } from "../settings.js"


/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
export class SATNarrowPhase extends NarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} clmds
   */
  getCollisionPairs(contactList, clmds) {
    for (var i = 0; i < contactList.length; i++) {
      let { a, b } = contactList[i]
      a.sleeping = false
      b.sleeping = false
      let id = naturalizePair(a.id, b.id)
      if (!this.records.has(id))
        this.records.set(id, {
          bodyA: a,
          bodyB: b,
          contactData: {
            lastOverlap: 0,
            overlap: -Infinity,
            done: false,
            axis: new Vector(),
            verticesA: [],
            verticesB: [],
            vertShapeA: null,
            vertShapeB: null,
            contactNo: 0,
            shapes: [],
            indexA: 0,
            indexB: 0
          },
          stmp: -1,
          impulse: 0,
          persistent: false,
          ca1: new Vector(),
          ca2: new Vector(),
          restitution: 0,
          staticFriction: 0,
          kineticFriction: 0,
          velA: new Vector(),
          velB: new Vector(),
          rotA: 0,
          rotB: 0
        })
      let manifold = this.records.get(id)
      let collisionData = manifold.contactData
      collisionData.overlap = -Infinity
      collisionData.done = false
      SAT.shapesInBodyCollided(a, b, collisionData)
      if (collisionData.overlap < 0 || !collisionData.done) continue
      if (collisionData.contactNo == 2) {
        Vector.lerp(
          collisionData.verticesA[0],
          collisionData.verticesA[1],
          0.5,
          manifold.ca1
        ).sub(a.position)
        Vector.lerp(
          collisionData.verticesB[0],
          collisionData.verticesB[1],
          0.5,
          manifold.ca2
        ).sub(b.position)
      } else {
        manifold.ca1.copy(collisionData.verticesA[0]).sub(a.position)
        manifold.ca2.copy(collisionData.verticesB[0]).sub(b.position)
      }
      manifold.restitution = a.restitution < b.restitution ? a.restitution : b.restitution
      manifold.staticFriction = a.staticFriction < b.staticFriction ? a.staticFriction : b.staticFriction
      manifold.kineticFriction = a.kineticFriction < b.kineticFriction ? a.kineticFriction : b.kineticFriction
      if (a.collisionResponse && b.collisionResponse)
        clmds.push(manifold)
    }
  }
}