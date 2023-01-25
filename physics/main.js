import { SAT, SATResponse } from "./SAT/index.js"
import { AABB } from "./AABB/index.js"
import { Geometry, Shape, Line, Circle, Rectangle } from "./shapes/index.js"
import { Body, Wall,HeightMap } from "./bodies/index.js"
import {Constraint,DistanceConstraint,AngleConstraint} from "./constraints/index.js"
import {World} from "./world/index.js"


function createBoundingBox(x, y, w, h) {
  let l1 = new Wall(x + w / 2, y, w)
  let l2 = new Wall(x + w, y + h / 2, h)
  let l3 = new Wall(x + w / 2, y + h, w)
  let l4 = new Wall(x, y + h / 2, h)
  l2.angle = 90
  l4.angle = 90
  return [l1, l2, l3, l4]
}


export {
  Body,
  World,
  Shape,
  Line,
  Circle,
  Rectangle,
  Geometry,
  Wall,
  createBoundingBox,
  Constraint,
  DistanceConstraint,
  AngleConstraint,
  HeightMap
}