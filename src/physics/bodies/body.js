import { Vector2, degToRad, radToDeg } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import { BoundingBox } from "../../math/index.js"
import { ObjType, Settings } from "../settings.js"
import { Shape } from "../shapes/index.js"
import { Movable, Transform } from "../../intergrator/index.js"
import { Logger } from "../../logger/index.js"

/**
 * Holds information needed for collision detection and response.
 * 
 */
export class Body2D {
  /**
   * Unique identification of a body.
   * 
   * @type {number}
   */
  id = Utils.generateID()
  /**
   * Type of the body e.g Dynamic, Kinematic or Static.
   * 
   * @private
   * @type {number}
   */
  _type = 0
  /**
   * Anchors of the body in local space.
   * 
   * @private
   * @type {Vector2[]}
   */
  _localanchors = []
  /**
   * The original anchors of the body in local space.
   * 
   * @private
   * @type {Vector2[]}
   */
  anchors = []
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
   * Shapes a body is comprised of.
   * 
   * @type {Shape[]}
   */
  shapes
  /**
   * Whether the body should sleep when at rest or not.
   * 
   * @type {boolean}
   * @default Settings.allowSleep
   */
  allowSleep = false//Settings.allowSleep
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
   * @param {Shape[]} shapes
   */
  constructor(...shapes) {
    this.type = Settings.type
    this.shapes = shapes
    this.mass = 1
    this.inertia = 1
  }
  /**
   * Type of a body.It includes the static and dynamic for now.
   * Static bodies do not move and do not react to collisions.
   * Dynamic bodies move and respond to collisions.
   * Kinematic bodies move but do not respond to collisions.
   * 
   * @example
   * let body = new Body2D()
   * body.type = Body2D.STATIC
   * 
   */
  set type(x) {
    if (x === Body2D.STATIC || x === Body2D.KINEMATIC) this.mass = 0
    this._type = x
  }
  get type() {
    return this._type
  }
  /**
   * @type string
   */
  /**
   * Mass of a body.
   * 
   * @type number
   */
  set mass(x) {
    this.inv_mass = x === 0 ? 0 : 1 / x
    if (x == 0) this.inertia = 0
  }
  get mass() {
    return 1/this.inv_mass
  }
  /**
   * Density of a body.
   *
   * @type number
   */
  set density(x) {
    let area = 0
    for (var i = 0; i < this.shapes.length; i++) {
      area += this.shapes[i].area
    }
    this.mass = x * area * 0.01
  }
  get density() {
    let area = 0
    for (var i = 0; i < this.shapes.length; i++) {
      area += this.shapes[i].area
    }
    return 100 * this.mass / area
  }
  /**
   * Rotational inertia of a body.
   * 
   * @type number
   */
  set inertia(x) {
    this.inv_inertia = x == 0 ? 0 : 1 / x
  }
  get inertia() {
    return 1/this.inv_inertia
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @param { Vector2} v The anchor arm
   * @returns {number}
   */
  setAnchor(v) {
    this.anchors.push(new Vector2(v.x, v.y))
    return this._localanchors.push(v) - 1
  }
  /**
   * Gets an anchor in its local space coordinate form.
   * Treat the returned value as read-only.
   * 
   * @param {number} index the position of the
   * @returns { Vector2}
   */
  getAnchor(index) {
    return this.anchors[index]
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @param {number} index The position of the anchor.
   * @param { Vector2} [target= Vector2] Vector2 to store results in.
   * @returns { Vector2}
   */
  getLocalAnchor(index, target = new Vector2()) {
    return target.copy(this._localanchors[index]).rotate(this.orientation.value)
  }

  static calculateBounds(body, bound, padding = 0) {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER

    for (let i = 0; i < body.shapes.length; i++) {
      const shape = body.shapes[i]
      if (shape.type == 0) {
        const idx = shape.position.x - shape.radius,
          idy = shape.position.y - shape.radius,
          mdx = shape.position.x + shape.radius,
          mdy = shape.position.y + shape.radius
        if (!minX || idx < minX) minX = idx
        if (!maxX || mdx > maxX) maxX = mdx
        if (!minY || idy < minY) minY = idy
        if (!maxY || mdy > maxY) maxY = mdy
        continue
      }
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
   * This updates the world coordinates of shapes, anchors and bounds.
   */
  static update(body, position, orientation, scale, bounds) {
    for (let i = 0; i < body.shapes.length; i++) {
      Shape.update(body.shapes[i], position, orientation, scale)
    }
    for (let i = 0; i < body.anchors.length; i++) {
      body.anchors[i].copy(body._localanchors[i]).rotate(orientation)
    }
    if (body.autoUpdateBound)
      Body2D.calculateBounds(body, bounds)
    //else
    //  bounds.update(position)
  }
  /**
   *Body2D type that dictates a body cannot move nor respond to collisions.
   * 
   * @static
   * @type number*/
  static STATIC = ObjType.STATIC
  /**
   * Body2D type that dictates a body can move but not respond to collisions.
   * 
   * @static
   * @type number
   */
  static KINEMATIC = ObjType.KINEMATIC
  /**
   * Body2D type that dictates a body can move and respond to collisions.
   * 
   * @static
   * @type number
   */
  static DYNAMIC = ObjType.DYNAMIC
}

/**
 * Todo - Remove in version 1.0.0
 * @deprecated
 */
export class Body extends Body2D {
  /**
   * @inheritdoc
   */
  constructor() {
    Logger.deprecate("Body()", "Body2D()")
    super(...arguments)
  }
}