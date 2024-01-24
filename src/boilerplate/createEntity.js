import { Entity } from "../ecs/index.js"
import { Transform, Movable } from "../intergrator/index.js"
import {Bound} from '../bounds/index.js';
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