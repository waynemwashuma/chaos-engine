import { Entity, Manager } from "../../ecs/index.js"
import { Body2D } from "../bodies/index.js"
import { CollisionManifold } from "./collisionManifold.js"

export class NarrowPhase {
  /**
   * @param {CollisionPair[]} _contactList
   * @param {CollisionManifold<Entity>[]} [_clmds]
   * @returns {CollisionManifold<Entity>[]}
   * @param {Manager} _manager
   */
  getCollisionPairs(_manager,_contactList, _clmds = []) {return _clmds}
  /**
   * Checks to see if two bodies can proceed to have their bounding boxes checked 
   * 
   * @param {Body2D} a
   * @param {Body2D} b
   */
  static canCollide(a, b) {
    if (!a.inv_mass && !b.inv_mass )
      return false
    if (
      (a.mask.group && b.mask.group) &&
      a.mask.group == b.mask.group
    ) return false
    if (a.mask.layer && b.mask.layer && a.mask.layer !== b.mask.layer)
      return false
    if (a.sleeping && b.sleeping) return false
    return true
  }
}