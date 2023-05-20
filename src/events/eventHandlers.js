function defaultCollisionHandler(clmds) {
  let a, b
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].bodyA.parent.getHandler("collision")
    b = clmds[i].bodyB.parent.getHandler("collision")

    if (a) a(
      clmds[i].bodyA.parent,
      clmds[i].bodyB.parent,
      clmds[i]
    )
    if (b) b(
      clmds[i].bodyB.parent,
      clmds[i].bodyA.parent,
      clmds[i]
    )
  }
}

function defaultPrecollisionHandler(clmds) {
  let a, b
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].a.parent.getHandler("precollision")
    b = clmds[i].b.parent.getHandler("precollision")

    if (a) a(
      clmds[i].a.parent,
      clmds[i].b.parent,
      clmds[i]
    )
    if (b) b(
      clmds[i].a.parent,
      clmds[i].b.parent,
      clmds[i]
    )
  }
}
export {
  defaultCollisionHandler,
  defaultPrecollisionHandler
}