import { Movable } from "./movableComponent.js"
import { Transform } from "./transformComponent.js"
import { Bound } from "./boundsComponent.js"
import { Entity } from "./entity.js"

/**
 * @param {number} x x-position of entity 
 * @param {number} y y-position of entity 
 * @param {number} a angle in degrees
 */

export function createEntity(x, y, a) {
  return new Entity()
    .attach("transform", new Transform(x, y, a))
    .attach("movable", new Movable())
    .attach("bounds", new Bound())
}