import {
  Vector,
  DistanceConstraint,
  Entity,
  Box,
  Ball,
  Composite,
  BodySprite
} from  "/dist/chaos.module.js"
export function car(manager) {
  let world = manager.getSystem("world")

  world.gravity = 980
}