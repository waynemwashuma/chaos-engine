/**
 * This provides a way to fire off an entity's collision event handler registered to it.
 * 
 * @param {array<{}>} clmds an array of collision manifolds
*/
function defaultCollisionHandler(clmds) {
  let a, b
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].bodyA.entity.getHandler("collision")
    b = clmds[i].bodyB.entity.getHandler("collision")

    if (a) a.call(
      clmds[i].bodyA.entity,
      clmds[i].bodyB.entity,
      clmds[i]
    )
    if (b) b.call(
      clmds[i].bodyB.entity,
      clmds[i].bodyA.entity,
      clmds[i]
    )
  }
}

/**
 * This provides a way to fire off an entity's precollision event handler registered to it
 * 
 * @param {array<{}>} clmds an array of collision manifolds
*/
function defaultPrecollisionHandler(clmds) {
  let a, b
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].a.entity.getHandler("precollision")
    b = clmds[i].b.entity.getHandler("precollision")

    if (a) a.call(
      clmds[i].a.entity,
      clmds[i].b.entity,
      clmds[i]
    )
    if (b) b.call(
      clmds[i].b.entity,
      clmds[i].a.entity,
      clmds[i]
    )
  }
}
export {
  defaultCollisionHandler,
  defaultPrecollisionHandler
}