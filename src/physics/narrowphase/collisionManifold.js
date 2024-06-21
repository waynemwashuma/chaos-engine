import { Vector2, Angle, clamp, sq } from "../../math/index.js"
import { Settings } from "../settings.js"
/**
 */
export class CollisionManifold {
  /**
   * @type {Entity}
   */
  entityA
  /**
   * @type {Entity}
   */
  entityB
  /**
   * @type {Vector2}
   */
  velocityA
  /**
   * @type {Vector2}
   */
  velocityB
  /**
   * @type {Angle}
   */
  rotationA
  /**
   * @type {Angle}
   */
  rotationB
  /**
   * @type {Vector2}
   */
  positionA
  /**
   * @type {Vector2}
   */
  positionB
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
   * @type {number[]}
   */
  nbias = [0.0, 0.0]
  /**
   * @type {Jacobian[]}
   */
  nJacobian = [new Jacobian(), new Jacobian()]
  /**
   * @type {Jacobian[]}
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
  /**
   * @type {number[]}
   */
  effectiveMassN = [0, 0]
  /**
   * @type {number}
   */
  effectiveMassT = [0, 0]
  /**
   * @type {number[]}
   */
  nLambda = [0, 0]
  /**
   * @type {number[]}
   */
  tLambda = [0, 0]
  /**
   * @type {number}
   */
  invmassA = 0
  /**
   * @type {number}
   */
  invmassB = 0
  /**
   * @type {number}
   */
  invinertiaA = 0
  /**
   * @type {number}
   */
  invinertiaB = 0
  /**
   * @param {Entity} a
   * @param {Entity} b
   * @param {Movable} mA
   * @param {Movable} mB
   * @param {Body2D} bA
   * @param {Body2D} bA
   */
  constructor(a, b, pA, pB, vA, vB, rA, rB) {
    this.entityA = a
    this.entityB = b
    this.velocityA = vA
    this.velocityB = vB
    this.rotationA = rA
    this.rotationB = rB
    this.positionA = pA
    this.positionB = pB
  }
  /**
   * @param {Jacobian} jacobian
   * @param {Movable} movableA
   * @param {Movable} movableB
   * @param {number} lambda
   */
  static applyImpulse(
    jacobian,
    velocityA,
    velocityB,
    rotationA,
    rotationB,
    invmassA,
    invmassB,
    invinertiaA,
    invinertiaB,
    lambda
  ) {
    const va = Vector2.multiplyScalar(jacobian.va, invmassA * lambda)
    const vb = Vector2.multiplyScalar(jacobian.vb, invmassB * lambda)

    Vector2.add(velocityA, va, velocityA)
    Vector2.add(velocityB, vb, velocityB)
    rotationA.value += invinertiaA * jacobian.wa * lambda
    rotationB.value += invinertiaB * jacobian.wb * lambda
  }
  /**
   * @param {CollisionManifold} manifold
   * @param {Movable} movableA
   * @param {Movable} movableB
   * @param {Vector2} positionA
   * @param {Vector2} positionB
   * @param {number} inv_dt
   */
  static prepare(
    manifold,
    positionA,
    positionB,
    velocityA,
    velocityB,
    rotationA,
    rotationB,
    propA,
    propB,
    inv_dt
  ) {
    const { axis, overlap, tangent, contactPoints, contactNo } = manifold.contactData
    const { invmassA, invmassB, invinertiaA, invinertiaB } = manifold

    for (let i = 0; i < contactNo; i++) {
      manifold.impulse[i] = 0
      manifold.tImpulse[i] = 0
      const ca1 = Vector2.sub(contactPoints[i], positionA)
      const ca2 = Vector2.sub(contactPoints[i], positionB)
      const va = Vector2.crossScalar(ca1, rotationA.value)
      Vector2.add(va, velocityA, va)
      const vb = Vector2.crossScalar(ca2, rotationB.value)
      Vector2.add(vb, velocityB, vb)
      const relativeVelocity = Vector2.sub(vb, va, vb)
      const normalVelocity = Vector2.dot(axis, relativeVelocity)

      manifold.nJacobian[i].set(
        axis,
        Vector2.reverse(axis),
        Vector2.cross(ca1, axis),
        -Vector2.cross(ca2, axis)
      )

      manifold.tJacobian[i].set(
        tangent,
        Vector2.reverse(tangent),
        Vector2.cross(ca1, tangent),
        -Vector2.cross(ca2, tangent)
      )

      manifold.nbias[i] = -(Settings.posDampen * inv_dt) * Math.max(overlap - Settings.penetrationSlop, 0.0)
      manifold.nbias[i] += (manifold.restitution) * Math.min(normalVelocity, 0.0)
      const kn =
        invmassA +
        invmassB +
        manifold.nJacobian[i].wa * invinertiaA * manifold.nJacobian[i].wa +
        manifold.nJacobian[i].wb * invinertiaB * manifold.nJacobian[i].wb;
      const kt =
        invmassA +
        invmassB +
        manifold.tJacobian[i].wa * invinertiaA * manifold.tJacobian[i].wa +
        manifold.tJacobian[i].wb * invinertiaB * manifold.tJacobian[i].wb;

      manifold.effectiveMassN[i] = kn > 0.0 ? 1.0 / kn : 0.0;
      manifold.effectiveMassT[i] = kt > 0.0 ? 1.0 / kt : 0.0;
    }
  }
  /**
   * @param {CollisionManifold} manifold
   */
  static solve(
    manifold
  ) {
    const { velocityA, velocityB, rotationA, rotationB, invmassA, invmassB, invinertiaA, invinertiaB } = manifold
    for (let i = 0; i < manifold.contactData.contactNo; i++) {
      const nvaDot = Vector2.dot(
        manifold.nJacobian[i].va,
        velocityA
      )
      const nvbDot = Vector2.dot(
        manifold.nJacobian[i].vb,
        velocityB
      )
      const tvaDot = Vector2.dot(
        manifold.tJacobian[i].va,
        velocityA
      )
      const tvbDot = Vector2.dot(
        manifold.tJacobian[i].vb,
        velocityB
      )
      const jv = nvaDot +
        manifold.nJacobian[i].wa * rotationA.value +
        nvbDot +
        manifold.nJacobian[i].wb * rotationB.value;
      const jt =
        tvaDot +
        manifold.tJacobian[i].wa * rotationA.value +
        tvbDot +
        manifold.tJacobian[i].wb * rotationB.value;
      let nLambda = manifold.effectiveMassN[i] * -(jv + manifold.nbias[i]);
      let tLambda = manifold.effectiveMassT[i] * -(jt);
      const oldImpulse = manifold.impulse[i]
      const oldtImpulse = manifold.tImpulse[i]

      manifold.impulse[i] = Math.max(0.0, nLambda);
      const maxfriction = manifold.impulse[i] * manifold.kineticFriction
      manifold.tImpulse[i] = clamp(tLambda, -maxfriction, maxfriction)
      manifold.nLambda[i] = manifold.impulse[i]
      manifold.tLambda[i] = manifold.tImpulse[i]
    }
    for (let i = 0; i < manifold.contactData.contactNo; i++) {

      CollisionManifold.applyImpulse(
        manifold.nJacobian[i],
        manifold.velocityA,
        manifold.velocityB,
        manifold.rotationA,
        manifold.rotationB,
        invmassA,
        invmassB,
        invinertiaA,
        invinertiaB,
        manifold.nLambda[i]
      )
      if (manifold.nLambda[i] <= 0) {
        manifold.tLambda[i] = 0
        continue
      }
      CollisionManifold.applyImpulse(
        manifold.tJacobian[i],
        manifold.velocityA,
        manifold.velocityB,
        manifold.rotationA,
        manifold.rotationB,
        invmassA,
        invmassB,
        invinertiaA,
        invinertiaB,
        manifold.tLambda[i]
      )
    }
  }
  /**
   * @param {CollisionManifold} manifold
   */
  static solveSimple(manifold, inv_dt) {

    const normal = manifold.contactData.axis
    const overlap = manifold.contactData.overlap
    const penetration = (overlap + Settings.penetrationSlop) * inv_dt * Settings.posDampen
    for (let i = 0; i < manifold.contactData.contactNo; i++) {
      const armA = Vector2.sub(
        manifold.contactData.contactPoints[i],
        manifold.positionA
      )
      const armB = Vector2.sub(
        manifold.contactData.contactPoints[i],
        manifold.positionB
      )

      const ra = Vector2.crossScalar(
        armA,
        manifold.rotationA.value
      )
      const rb = Vector2.crossScalar(
        armB,
        manifold.rotationB.value
      )
      const va = Vector2.add(ra, manifold.velocityA)
      const vb = Vector2.add(rb, manifold.velocityB)

      const rv = Vector2.sub(vb, va)
      const nv = Vector2.dot(rv, normal) 
      const kn = 1 / (
        manifold.invmassA +
        manifold.invmassB +
        sq(Vector2.cross(armA, normal)) * manifold.invinertiaA +
        sq(Vector2.cross(armB, normal)) * manifold.invinertiaB
      )
      const j = (nv + penetration) * kn * ( manifold.restitution)
      
      manifold.impulse[i] = Math.max(j, 0.0)
    }
  }
  /**
   * @param {CollisionManifold} manifold
   */
  static applyImpulseSimple(manifold) {
    const normal = manifold.contactData.axis
    for (let i = 0; i < manifold.contactData.contactNo; i++) {
      const armA = Vector2.sub(
        manifold.contactData.contactPoints[i],
        manifold.positionA
      )
      const armB = Vector2.sub(
        manifold.contactData.contactPoints[i],
        manifold.positionB
      )
      const jn = Vector2.multiplyScalar(normal, manifold.impulse[i])
      applyImpulse(
        manifold.velocityA,
        manifold.rotationA,
        armA,
        jn,
        manifold.invmassA,
        manifold.invinertiaA
      )
      applyImpulse(
        manifold.velocityB,
        manifold.rotationB,
        armB,
        jn,
        -manifold.invmassB,
        -manifold.invinertiaB
      )
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
   * @type {Vector2[]}
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
  /**
   * @param {Vector2} [va]
   * @param {Vector2} [vb]
   * @param {number} [wa]
   * @param {number} [wb]
   */
  constructor(va, vb, wa, wb) {
    this.set(va, vb, wa, wb)
  }
  /**
   * @param {Vector2} [va]
   * @param {Vector2} [vb]
   * @param {number} [wa]
   * @param {number } [wb]
   */
  set(va, vb, wa, wb) {
    if (va) Vector2.copy(va, this.va)
    if (vb) Vector2.copy(vb, this.vb)
    if (wa) this.wa = wa
    if (wb) this.wb = wb
  }
}

function applyImpulse(velocity, rotation, arm, impulse, invMass, invInertia) {
  applyVelocityImpulse(velocity, impulse, invMass)
  applyAngularImpulse(rotation, arm, impulse, invInertia)
}

function applyVelocityImpulse(velocity, impulse, invMass) {
  const jn = Vector2.multiplyScalar(impulse, invMass)
  Vector2.add(velocity, jn, velocity)
}

function applyAngularImpulse(angle, arm, impulse, invInertia) {
  angle.value += Vector2.cross(arm, impulse) * invInertia
}