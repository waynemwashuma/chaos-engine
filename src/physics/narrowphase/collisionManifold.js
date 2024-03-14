import { Vector2, clamp } from "../../math/index.js"
import { Settings } from "../settings.js"
/**
 * @template T
 */
export class CollisionManifold {
  /**
   * @type {T}
   */
  entityA
  /**
   * @type {T}
   */
  entityB
  movableA
  movableB
  bodyA
  bodyB
  /**
   * @type {CollisionData}
   */
  contactData = new CollisionData()
  /**
   * @type {number[]}
   */
  impulse = [0.0, 0.0]
  /**
   * @type {number[]}
   */
  tImpulse = [0.0, 0.0]
  /**
   * @type {number}
   */
  nbias = [0.0, 0.0]
  /**
   * @type {Jacobian}
   */
  nJacobian = [new Jacobian(), new Jacobian()]
  /**
   * @type {Jacobian}
   */
  tJacobian = [new Jacobian(), new Jacobian()]
  /**
   * @type {number}
   */
  restitution = 0
  /**
   * @type {number}
   */
  staticFriction = 0
  /**
   * @type {number}
   */
  kineticFriction = 0
  effectiveMass = [0, 0]
  nLambda = [0, 0]
  tLambda = [0, 0]
  /**
   * @param {T} a
   * @param {T} b
   */
  constructor(a, b) {
    this.entityA = a
    this.entityB = b
  }
  static warmstart(manifold, movableA, movableB, bodyA, bodyB) {
    const { contactNo } = manifold.contactData

    for (let i = 0; i < contactNo; i++) {
      CollisionManifold.applyImpulse(
        manifold.tJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.tLambda[i]
      ) /***/
      CollisionManifold.applyImpulse(
        manifold.nJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.nLambda[i]
      )

    }
  }

  static applyImpulse(jacobian, movableA, movableB, bodyA, bodyB, lambda) {
    const velA = movableA.velocity
    const velB = movableB.velocity
    const va = Vector2.multiplyScalar(jacobian.va, bodyA.inv_mass * lambda)
    const vb = Vector2.multiplyScalar(jacobian.vb, bodyB.inv_mass * lambda)

    Vector2.add(velA, va, velA)
    Vector2.add(velB, vb, velB)
    movableA.rotation += bodyA.inv_inertia * jacobian.wa * lambda
    movableB.rotation += bodyB.inv_inertia * jacobian.wb * lambda
  }

  static prepare(manifold, bodyA, bodyB, movableA, movableB, positionA, positionB, inv_dt) {
    const { axis, overlap, tangent, contactPoints, contactNo } = manifold.contactData

    for (let i = 0; i < contactNo; i++) {
      manifold.impulse[i] = 0
      manifold.tImpulse[i] = 0
      const ca1 = Vector2.sub(contactPoints[i], positionA)
      const ca2 = Vector2.sub(contactPoints[i], positionB)
      const va = Vector2.crossScalar(ca1, movableA.rotation)
      Vector2.add(va, movableA.velocity, va)
      const vb = Vector2.crossScalar(ca2, movableB.rotation)
      Vector2.add(vb, movableB.velocity, vb)
      const relativeVelocity = Vector2.sub(vb, va, vb)

      manifold.nbias[i] = 0.0;
      manifold.nJacobian[i].set(
        axis,
        Vector2.reverse(axis),
        Vector2.cross(ca1, axis),
        -Vector2.cross(ca2, axis)
      );

      //manifold.contactData.tangent.multiply(-Math.sign(manifold.contactData.tangent.dot(relativeVelocity)))
      manifold.tJacobian[i].set(
        tangent,
        Vector2.reverse(tangent),
        Vector2.cross(ca1, tangent),
        -Vector2.cross(ca2, tangent)
      );
      const normalVelocity = Vector2.dot(axis, relativeVelocity);

      if (Settings.positionCorrection)
        manifold.nbias[i] = -(Settings.posDampen * inv_dt) * Math.max(overlap - Settings.penetrationSlop, 0.0);
      manifold.nbias[i] += (manifold.restitution) * Math.min(normalVelocity, 0.0);
      const k =
        bodyA.inv_mass +
        bodyB.inv_mass +
        manifold.nJacobian[i].wa * bodyA.inv_inertia * manifold.nJacobian[i].wa +
        manifold.nJacobian[i].wb * bodyB.inv_inertia * manifold.nJacobian[i].wb;
      manifold.effectiveMass[i] = k > 0.0 ? 1.0 / k : 0.0;
    }
  }
  static solve(manifold, movableA, movableB, bodyA, bodyB) {
    const { contactNo } = manifold.contactData

    for (let i = 0; i < contactNo; i++) {
      const nvaDot = Vector2.dot(
        manifold.nJacobian[i].va,
        movableA.velocity
      )
      const nvbDot = Vector2.dot(
        manifold.nJacobian[i].vb,
        movableB.velocity
      )
      const tvaDot = Vector2.dot(
        manifold.tJacobian[i].va,
        movableA.velocity
      )
      const tvbDot = Vector2.dot(
        manifold.tJacobian[i].vb,
        movableB.velocity
      )
      const jv = nvaDot +
        manifold.nJacobian[i].wa * movableA.rotation +
        nvbDot +
        manifold.nJacobian[i].wb * movableB.rotation;
      const jt =
        tvaDot +
        manifold.tJacobian[i].wa * movableA.rotation +
        tvbDot +
        manifold.tJacobian[i].wb * movableB.rotation;
      let nLambda = manifold.effectiveMass[i] * -(jv + manifold.nbias[i]);
      let tLambda = manifold.effectiveMass[i] * -(jt);
      const oldImpulse = manifold.impulse[i]
      const oldtImpulse = manifold.tImpulse[i]
      if (Settings.impulseAccumulation) {
        manifold.impulse[i] = Math.max(0.0, manifold.impulse[i] + nLambda);
        manifold.tImpulse[i] = Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction ?
          tLambda :
          tLambda * manifold.kineticFriction
        manifold.nLambda[i] = manifold.impulse[i] - oldImpulse
        manifold.tLambda[i] = manifold.tImpulse[i] - oldtImpulse
      }
      else {
        manifold.impulse[i] = Math.max(0.0, nLambda);
        const maxfriction = manifold.impulse[i] * manifold.kineticFriction
        manifold.tImpulse[i] = clamp(tLambda, -maxfriction, maxfriction) //Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction ?
        //tLambda :
        //-manifold.impulse[i] * manifold.kineticFriction
        manifold.nLambda[i] = manifold.impulse[i]
        manifold.tLambda[i] = manifold.tImpulse[i]
        //console.log(Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction)
        //if (Math.abs(manifold.tImpulse[i]) > 3000) throw console.log(manifold, jt)
      }
    }
    for (let i = 0; i < contactNo; i++) {

      CollisionManifold.applyImpulse(
        manifold.nJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.nLambda[i]
      )
      if (manifold.nLambda[i] <= 0) continue
      CollisionManifold.applyImpulse(
        manifold.tJacobian[i],
        movableA,
        movableB,
        bodyA,
        bodyB,
        manifold.tLambda[i]
      ) /***/
    }
  }
}
export class CollisionData {
  /**
   * @type {number}
   */
  overlap = 0
  /**
   * @type {boolean}
   */
  done = false
  /**
   * @type {Vector2}
   */
  axis = new Vector2()
  /**
   * @type {Vector2}
   */
  tangent = new Vector2()
  /**
   * @type {number}
   */
  contactPoints = [new Vector2(), new Vector2()]
  /**
   * @type {number}
   */
  contactNo = 0
}
class Jacobian {
  /**
   * @type {Vector2}
   */
  va = new Vector2()
  /**
   * @type {number}
   */
  wa = 0
  /**
   * @type {Vector2}
   */
  vb = new Vector2()
  /**
   * @type {number}
   */
  wb = 0
  constructor(va, vb, wa, wb) {
    this.set(va, vb, wa, wb)
  }
  set(va, vb, wa, wb) {
    if (va) Vector2.copy(va,this.va)
    if (vb) Vector2.copy(vb,this.vb)
    if (wa) this.wa = wa
    if (wb) this.wb = wb
  }
}