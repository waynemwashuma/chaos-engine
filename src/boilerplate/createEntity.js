import { Entity } from "../ecs/index.js"
import { deprecate, throws } from "../logger/index.js";
/**
 * @deprecated
 * @param {number} x x-position of entity 
 * @param {number} y y-position of entity 
 * @param {number} a angle in degrees
 */

export function createEntity(x, y, a) {
  deprecate("createEntity()","Manager().create()")
  throws("Breaking deprecation encountered")
  return new Entity()
}