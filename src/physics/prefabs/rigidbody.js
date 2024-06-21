import {
  PhysicsProperties,
  Shape2D
} from "../components/index.js"
import { Settings } from "../settings.js"


export function createRawRigidBody2D(
  mass,
  inertia,
  restitution = Settings.restitution,
  kineticfriction = Settings.kineticFriction,
  layer = 0,
  group = 0
) {
  const properties = new PhysicsProperties()
  properties.invmass = mass === 0 ? 0 : 1 / mass
  properties.invinertia = inertia === 0 ? 0 : 1 / inertia
  properties.group = group
  properties.layer = layer
  properties.restitution = restitution
  properties.kineticFriction = kineticfriction
  
  return [
    properties
  ]
}