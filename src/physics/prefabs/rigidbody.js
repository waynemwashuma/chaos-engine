import {
  PhysicsProperties,
  Shape2D
} from "../components/index.js"
import { Settings } from "../settings.js"
import { createTransform2D } from "../../transform/index.js"
import { createMovable2D } from "../../movable/index.js"
import { BoundingBox } from "../../math/index.js"

export function createRigidBody2D(
  x = 0,
  y = 0,
  a = 0,
  mass = 1,
  restitution = Settings.restitution,
  kineticfriction = Settings.kineticFriction,
  mask = 0xFFFFFFFFn,
  group = 0xFFFFFFFFn
) {
  const properties = new PhysicsProperties()
  properties.invmass = mass === 0 ? 0 : 1 / mass
  properties.group = group
  properties.mask = mask
  properties.restitution = restitution
  properties.kineticFriction = kineticfriction
  
  return [
    ...createTransform2D(x,y,a),
    ...createMovable2D(),
    new BoundingBox(),
    properties
  ]
}
