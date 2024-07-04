import { PhysicsProperties, Shape2D } from "../components/index.js"
import { warn } from "../../logger/index.js"
/**
 * @type {ComponentHook<PhysicsProperties>}
 */
export function physicspropertiesAddHook(component, entity, registry) {
  const collider = registry.get(entity, "shape2d")

  if (!collider)return warn("No `Shape2D` component detected on entity " + entity + ".Note that this entity's body will misbehave.")
  
  const mass = component.invmass ? 1 / component.invmass : 0
  const inertia = Shape2D.calcInertia(collider, mass)
  component.invinertia = inertia ? 1 / inertia : 0
}
/**
 * @type {ComponentHook<PhysicsProperties>}
 */
export function physicspropertiesRemoveHook(component, entity, registry) {

}