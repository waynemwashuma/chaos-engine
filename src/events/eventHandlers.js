function defaultCollisionHandler(clmds) {
  let a, b
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].bodyA.entity.getHandler("collision")
    b = clmds[i].bodyB.entity.getHandler("collision")

    if (a) a(
      clmds[i].bodyA.entity,
      clmds[i].bodyB.entity,
      clmds[i]
    )
    if (b) b(
      clmds[i].bodyB.entity,
      clmds[i].bodyA.entity,
      clmds[i]
    )
  }
}

function defaultPrecollisionHandler(clmds) {
  let a, b
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].a.entity.getHandler("precollision")
    b = clmds[i].b.entity.getHandler("precollision")

    if (a) a(
      clmds[i].a.entity,
      clmds[i].b.entity,
      clmds[i]
    )
    if (b) b(
      clmds[i].a.entity,
      clmds[i].b.entity,
      clmds[i]
    )
  }
}
export {
  defaultCollisionHandler,
  defaultPrecollisionHandler
}