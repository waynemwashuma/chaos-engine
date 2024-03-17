import { Vector2 } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { BoundingBox } from "../../math/index.js"
import { Settings } from "../settings.js"
import { Shape } from "../shapes/index.js"
import { deprecate } from "../../logger/index.js"

/**
 * Holds information needed for collision detection and response.
 * 
 */
export class Body2D {
  /**
   * Unique identification of a body.
   * 
   * @readonly
   * @type {number}
   */
  id = Utils.generateID()
  /**
   * Inverse mass of the body.
   * 
   * @type {number}
   */
  inv_mass = 0
  /**
   * Inverse inertia of the body.
   * 
   * @type {number}
   */
  inv_inertia = 0
  /**
   * The bounciness of the body between 0 and 1.
   * 
   * @type {number}
   * @default Settings.restitution
   */
  restitution = Settings.restitution
  /**
   * The friction of the body between 0 and 1 that affects it before it moves.
   * 
   * @type {number}
   * @default Settings.staticFriction
   */
  staticFriction = Settings.staticFriction
  /**
   * The friction of the body between 0 and 1that affects it after it moves.
   * 
   * @type {number}
   * @default Settings.kineticFriction
   */
  kineticFriction = Settings.kineticFriction
  /**
   * The padding of the body's bounds.
   * 
   * @type {number}
   * @default Settings.boundPadding
   */
  boundPadding = Settings.boundPadding
  /**
   * Used to describe how bodies will collide with each other.
   * Bodies in the same layer or layer 0 will always collide with each other unless they are in different groups.
   * Bodies in the same group will not collied with each other.
   * 
   * @type {{layer:number, group: number}}
   * @default -1
   */
  mask = {
    layer: 0,
    group: 0
  }
  /**
   * The shape of the body.
   * 
   * @readonly
   * @type {Shape}
   */
  shape
  /**
   * Whether the body should sleep when at rest or not.
   * 
   * @type {boolean}
   * @default Settings.allowSleep
   */
  allowSleep = Settings.allowSleep
  /**
   * If the body is asleep or not.
   * 
   * @type {boolean}
   */
  sleeping = false
  /**
   * Whether the body should detect collisions with bounds only.If true,no collision response will occur.Precollision event only will be fired.
   * 
   * @type {boolean}
   * @default Settings.aabbDetectionOnly
   */
  aabbDetectionOnly = Settings.aabbDetectionOnly
  /**
   * Whether the body should respond to collisions.If false,no collision response will occur but collision events will still be fired.
   * 
   * @type {boolean}
   * @default Settings.collisionResponse
   */
  collisionResponse = Settings.collisionResponse
  /**
   * Whether or not the bounds should be automatically updated.
   * 
   * @type {boolean}
   * @default Settings.autoUpdateBound
   */
  autoUpdateBound = Settings.autoUpdateBound
  /**
   * @param {Shape} shape
   */
  constructor(shape) {
    Body2D.setType(this,Settings.type)
    this.shape = shape
    Body2D.setMass(this,1)
  }
  /**
   * Type of a body.It includes the static and dynamic for now.
   * Static bodies do not move and do not react to collisions.
   * Dynamic bodies move and respond to collisions.
   * Kinematic bodies move but do not respond to collisions.
   * 
   * @deprecated
   * @example
   * @type {number}
   * let body = new Body2D()
   * body.type = Body2D.STATIC
   * 
   */
  set type(x) {
    deprecate("Body2D().type","Body2D.setType()")
    if (x === Body2D.STATIC) this.mass = 0
  }
  get type() {
    deprecate("Body2D().type")
    return 0
  }
  /**
   * @deprecated
   * @type {number} 
   */
  set mass(x) {
    deprecate("Body2D().mass")
    this.inv_mass = x === 0 ? 0 : 1 / x
    this.inv_inertia = 1 / Shape.calcInertia(this.shape,this.mass)
  }
  get mass() {
    deprecate("Body2D().mass")
    return 1 / this.inv_mass
  }
  /**
   * Density of a body.
   *
   * @deprecated
   * @type {number}
   */
  set density(x) {
    deprecate("Body2D().density")
    const area = Shape.getArea(this.shape)
    this.inv_mass = 1 / (x * area)
  }
  get density() {
    deprecate("Body2D().density")
    const area = Shape.getArea(this.shape)
    return this.inv_mass * 1 / area
  }
  /**
   * Rotational inertia of a body.
   * 
   * @deprecated
   * @type number
   */
  set inertia(x) {
    deprecate("Body2D().inertia")
    this.inv_inertia = x == 0 ? 0 : 1 / x
  }
  get inertia() {
    deprecate("Body2D().inertia")
    return 1 / this.inv_inertia
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @deprecated
   * @param { Vector2} v The anchor arm
   * @returns {number}
   */
  setAnchor(v) {
    deprecate("Ball().setAnchor()")
    return 0
  }
  /**
   * Gets an anchor in its local space coordinate form.
   * Treat the returned value as read-only.
   * 
   * @deprecated
   * @param {number} index the position of the
   * @returns { Vector2}
   */
  getAnchor(index) {
    deprecate("Ball().getAnchor()")
    return new Vector2()
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @deprecated
   * @param {number} index The position of the anchor.
   * @param {Vector2} [target] Vector2 to store results in.
   * @returns {Vector2}
   * @param {number} angle
   */
  getLocalAnchor(index,angle,target = new Vector2()) {
    deprecate("Ball().getLocalAnchor()")
    return target
  }
  /**
   * Calculates the bounds of the body
   * 
   * @param {BoundingBox} bound
   * @param {Body2D} body Body2D to calculate max and min from
   * @param {Number} padding increases the size of the bounds
   */
  static calculateBounds(body,bound,padding = 0) {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER

    const shape = body.shape
    if (shape.type == Shape.CIRCLE) {
      const position = shape.vertices[0]
      const radius = shape.vertices[1].x
      const idx = position.x - radius,
        idy = position.y - radius,
        mdx = position.x + radius,
        mdy = position.y + radius
      if (!minX || idx < minX) minX = idx
      if (!maxX || mdx > maxX) maxX = mdx
      if (!minY || idy < minY) minY = idy
      if (!maxY || mdy > maxY) maxY = mdy
    } else {
      for (let j = 0; j < shape.vertices.length; j++) {
        let vertex = shape.vertices[j]
        if (vertex.x < minX) minX = vertex.x
        if (vertex.x > maxX) maxX = vertex.x
        if (vertex.y < minY) minY = vertex.y
        if (vertex.y > maxY) maxY = vertex.y
      }
    }
    bound.min.x = minX - padding
    bound.max.x = maxX + padding
    bound.min.y = minY - padding
    bound.max.y = maxY + padding
  }
  /**
   * This updates the world coordinates of shape and bounds.
   * @param {Body2D} body
   * @param {Vector2} position
   * @param {number} orientation
   * @param {Vector2} scale
   * @param {BoundingBox} bounds
   */
  static update(body,position,orientation,scale,bounds) {
    Shape.update(body.shape,position,orientation,scale)
    if (body.autoUpdateBound)
      Body2D.calculateBounds(body,bounds)
  }
  /**
   * @param {Body2D} body
   * @param {number} mass
   */
  static setMass(body,mass) {
    body.inv_mass = mass === 0 ? 0 : 1 / mass
    Body2D.setInertia(body,Shape.calcInertia(body.shape,mass))
  }
  /**
   * @param {Body2D} body
   * @param {number} inertia
   */
  static setInertia(body,inertia) {
    body.inv_inertia = inertia === 0 ? 0 : 1 / inertia
  }
  /**
   * @param {Body2D} body
   * @param {number} type
   */
  static setType(body,type) {
    if (type !== Body2D.STATIC) return
    body.inv_mass = 0
    body.inv_inertia = 0
  }
  /**
   * @param {Body2D} body
   * @param {number} density
   */
  static setDensity(body,density) {
    const area = Shape.getArea(body.shape)
    Body2D.setMass(body,density * area)
  }
  /**
   *Body2D type that dictates a body cannot move nor respond to collisions.
   * 
   * @readonly
   * @type {number}
   */
  static STATIC = 0
  /**
   * Body2D type that dictates a body can move and respond to collisions.
   * 
   * @readonly
   * @type {number}
   */
  static DYNAMIC = 2
}

/**
 * Todo - Remove in version 1.0.0
 * @deprecated
 */
export class Body extends Body2D {
  /**
   * @inheritdoc
   * @param {Shape} shape
   */
  constructor(shape) {
    deprecate("Body()","Body2D()")
    super(shape)
  }
}