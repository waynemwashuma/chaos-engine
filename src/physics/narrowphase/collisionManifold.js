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
    movableA.velocity.add(jacobian.va.clone().multiply(bodyA.inv_mass * lambda));
    movableB.velocity.add(jacobian.vb.clone().multiply(bodyB.inv_mass * lambda));
    movableA.rotation += bodyA.inv_inertia * jacobian.wa * lambda;
    movableB.rotation += bodyB.inv_inertia * jacobian.wb * lambda;
  }

  static prepare(manifold, bodyA, bodyB, movableA, movableB, positionA, positionB, inv_dt) {
    const { axis, overlap, tangent, contactPoints, contactNo } = manifold.contactData

    for (let i = 0; i < contactNo; i++) {
      const ca1 = contactPoints[i].clone().sub(positionA)
      const ca2 = contactPoints[i].clone().sub(positionB)
      //console.log(ca1)
      //console.log(ca2)

      manifold.nbias[i] = 0.0;
      manifold.nJacobian[i].set(
        axis,
        axis.clone().reverse(),
        (ca1.cross(axis)),
        -ca2.cross(axis)
      );
      manifold.tJacobian[i].set(
        tangent,
        tangent.clone().reverse(),
        ca1.cross(tangent),
        -ca2.cross(tangent)
      );
      manifold.impulse[i] = 0
      manifold.tImpulse[i] = 0
      const va = new Vector2()
        .set(ca1.y * -movableA.rotation, ca1.x * movableA.rotation)
        .add(movableA.velocity)
      const vb = new Vector2()
        .set(ca2.y * -movableB.rotation, ca2.x * movableB.rotation)
        .add(movableB.velocity)
      const relativeVelocity = vb.sub(va)
      const normalVelocity = axis.dot(relativeVelocity);
      //manifold.contactData.tangent.multiply(-Math.sign(manifold.contactData.tangent.dot(relativeVelocity)))
      if (Settings.positionCorrection)
        manifold.nbias[i] = -(Settings.posDampen * inv_dt) * Math.max(overlap - Settings.penetrationSlop, 0.0);
      manifold.nbias[i] += (manifold.restitution + 0.5) * Math.min(normalVelocity, 0.0);
      const k =
        bodyA.inv_mass +
        bodyB.inv_mass +
        manifold.nJacobian[i].wa * bodyA.inv_inertia * manifold.nJacobian[i].wa +
        manifold.nJacobian[i].wb * bodyB.inv_inertia * manifold.nJacobian[i].wb;
      manifold.effectiveMass[i] = k > 0.0 ? 1.0 / k : 0.0;

      //throw console.log(k )
    }
    //throw ""
  }
  static solve(manifold, movableA, movableB, bodyA, bodyB) {
    const { contactNo } = manifold.contactData

    for (let i = 0; i < contactNo; i++) {

      const jv =
        manifold.nJacobian[i].va.dot(movableA.velocity) +
        manifold.nJacobian[i].wa * movableA.rotation +
        manifold.nJacobian[i].vb.dot(movableB.velocity) +
        manifold.nJacobian[i].wb * movableB.rotation;
      const jt =
        manifold.tJacobian[i].va.dot(movableA.velocity) +
        manifold.tJacobian[i].wa * movableA.rotation +
        manifold.tJacobian[i].vb.dot(movableB.velocity) +
        manifold.tJacobian[i].wb * movableB.rotation;
      let nLambda = manifold.effectiveMass[i] * -(jv + manifold.nbias[i]);
      let tLambda = manifold.effectiveMass[i] * -(jt);
      const oldImpulse = manifold.impulse[i]
      const oldtImpulse = manifold.tImpulse[i]
      if (Settings.impulseAccumulation) {
        manifold.impulse[i] = Math.max(0.0, manifold.impulse[i] + nLambda);
        const maxfriction = manifold.impulse[i] * manifold.kineticFriction
        manifold.tImpulse[i] = Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction ?
          tLambda :
          tLambda * manifold.kineticFriction
        manifold.nLambda[i] = manifold.impulse[i] - oldImpulse
        manifold.tLambda[i] = manifold.tImpulse[i] - oldtImpulse
      }
      else {
        manifold.impulse[i] = Math.max(0.0, nLambda);
        manifold.tImpulse[i] = Math.abs(tLambda) <= manifold.impulse[i] * manifold.staticFriction ?
          tLambda :
        tLambda * manifold.kineticFriction
        manifold.nLambda[i] = manifold.impulse[i]
        manifold.tLambda[i] = manifold.tImpulse[i]
        //if (Math.abs(manifold.impulse[i]) > 3000) throw console.log(manifold, jv)
      }
    }
    for (let i = 0; i < contactNo; i++) {
      /*CollisionManifold.applyImpulse(
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
}
export class CollisionData {
  /**
   * @type {number}
   */
  overlap = -Infinity
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
    if (va) this.va.copy(va)
    if (vb) this.vb.copy(vb)
    if (wa) this.wa = wa
    if (wb) this.wb = wb
  }
}