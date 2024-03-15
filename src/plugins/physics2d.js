import { World2D } from "../physics/index.js"
import { Intergrator } from "../intergrator/index.js"

export function Physics2DPlugin(manager) {
  const world = new World2D()
  manager.registerSystem((dt, manager) => {
    const [transform, movable] = manager.query("transform", "movable").raw()

    Intergrator.update(transform, movable, 1 / 60)
  })

  //Physics
  manager.registerSystem((dt, manager) => {
    const [entity, transform, movable, bounds, body] = manager.query("entity", "transform", "movable", "bounds", "body").raw()
    World2D.update(manager, world, entity, transform, movable)
  })
  return world
}