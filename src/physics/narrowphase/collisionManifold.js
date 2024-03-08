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
   * @type {number}
   */
  impulse = 0
  tImpulse = 0
  /**
   * @type {Vector2}
   */
  ca1 = new Vector2()
  /**
   * @type {Vector2}
   */
  ca2 = new Vector2()
  /**
   * @type {number}
   */
  nbias = 0
  /**
   * @type {Jacobian}
   */
  nJacobian = new Jacobian()
  /**
   * @type {Jacobian}
   */
  tJacobian = new Jacobian()
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
  /**
   * @param {T} a
   * @param {T} b
   */
  constructor(a, b) {
    this.entityA = a
    this.entityB = b
  }
  static applyImpulse(jacobian, movableA, movableB, bodyA, bodyB, lambda) {
    movableA.velocity.add(jacobian.va.clone().multiply(bodyA.inv_mass * lambda));
    movableB.velocity.add(jacobian.vb.clone().multiply(bodyB.inv_mass * lambda));
    movableA.rotation += bodyA.inv_inertia * jacobian.wa * lambda;
    movableB.rotation += bodyB.inv_inertia * jacobian.wb * lambda;
  }
  static calculateArms(manifold, positionA, positionB) {
    const { collisionData } = manifold

    if (collisionData.contactNo == 2) {
      Vector2.lerp(
        collisionData.verticesA[0],
        collisionData.verticesA[1],
        0.5,
        manifold.ca1
      ).sub(positionA)
      Vector2.lerp(
        collisionData.verticesB[0],
        collisionData.verticesB[1],
        0.5,
        manifold.ca2
      ).sub(positionB)
    } else {
      manifold.ca1.copy(collisionData.verticesA[0]).sub(positionA)
      manifold.ca2.copy(collisionData.verticesB[0]).sub(positionB)
    }
  }
  static prepare(manifold, bodyA, bodyB, movableA, movableB, inv_dt) {
    const { ca1, ca2 } = manifold
    const { axis, overlap, tangent } = manifold.contactData
    axis.reverse()
    tangent.reverse()
    manifold.nbias = 0.0;
    manifold.nJacobian.set(
      axis.clone().reverse(),
      axis,
      -(ca1.cross(axis)),
      ca2.cross(axis)
    );
    manifold.tJacobian.set(
      tangent.clone().reverse(),
      tangent,
      -(ca1.cross(tangent)),
      ca2.cross(tangent)
    );
    manifold.impulse = 0
    manifold.tImpulse = 0

    const va = new Vector2()
      .set(ca1.y * -movableA.rotation, ca1.x * movableA.rotation)
      .add(movableA.velocity)
    const vb = new Vector2()
      .set(ca2.y * -movableB.rotation, ca2.x * movableB.rotation)
      .add(movableB.velocity)
    const relativeVelocity = va.sub(vb)
    const normalVelocity = axis.dot(relativeVelocity);

    if (Settings.positionCorrection)
      manifold.nbias = -(Settings.posDampen * inv_dt) * Math.max(overlap - Settings.penetrationSlop, 0.0);
    manifold.nbias += manifold.restitution * Math.min(normalVelocity, 0.0);
    const k =
      bodyA.inv_mass +
      bodyB.inv_mass +
      manifold.nJacobian.wa * bodyA.inv_inertia * manifold.nJacobian.wa +
      manifold.nJacobian.wb * bodyB.inv_inertia * manifold.nJacobian.wb;
    manifold.effectiveMass = k > 0.0 ? 1.0 / k : 0.0;
  }
  static solve(manifold, movableA, movableB, bodyA, bodyB) {
    const jv =
      manifold.nJacobian.va.dot(movableA.velocity) +
      manifold.nJacobian.wa * movableA.rotation +
      manifold.nJacobian.vb.dot(movableB.velocity) +
      manifold.nJacobian.wb * movableB.rotation;
    const jt =
      manifold.tJacobian.va.dot(movableA.velocity) +
      manifold.tJacobian.wa * movableA.rotation +
      manifold.tJacobian.vb.dot(movableB.velocity) +
      manifold.tJacobian.wb * movableB.rotation;
    let nLambda = manifold.effectiveMass * -(jv + manifold.nbias);
    let tLambda = manifold.effectiveMass * -(jt);

    const oldimpulse = manifold.impulse
    const oldtimpulse = manifold.tImpulse

    if (Settings.impulseAccumulation) {
      manifold.impulse = Math.max(0.0, manifold.impulse + nLambda);
      manifold.tImpulse = Math.abs(tLambda) <= manifold.impulse * manifold.staticFriction ?
        tLambda :
        tLambda * manifold.kineticFriction
    }
    else {
      manifold.impulse = Math.max(0.0, nLambda);
      manifold.tImpulse = Math.abs(tLambda) <= manifold.impulse * manifold.staticFriction ?
        tLambda :
        tLambda * manifold.kineticFriction

    }
    if (Settings.impulseAccumulation) {
      nLambda = manifold.impulse - oldimpulse
      tLambda = manifold.tImpulse - oldtimpulse
    } else {
      nLambda = manifold.impulse
      tLambda = manifold.tImpulse
    }
    CollisionManifold.applyImpulse(
      manifold.tJacobian,
      movableA,
      movableB,
      bodyA,
      bodyB,
      tLambda
    ) /***/
    CollisionManifold.applyImpulse(
      manifold.nJacobian,
      movableA,
      movableB,
      bodyA,
      bodyB,
      nLambda
    )
  }
}
export class CollisionData {
  /**
   * @type {number}
   */
  lastOverlap = 0
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
  verticesA = [new Vector2(), new Vector2()]
  /**
   * @type {number}
   */
  verticesB = [new Vector2(), new Vector2()]
  /**
   * @type {number}
   */
  vertShapeA = null
  /**
   * @type {number}
   */
  vertShapeB = null
    /**
   * @type {number}
   */
  contactPoints = [new Vector2(), new Vector2()]
  /**
   * @type {number}
   */
  contactNo = 0
  /**
   * @type {number}
   */
  shapes = []
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