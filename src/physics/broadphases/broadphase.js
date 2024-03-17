import { Entity } from "../../ecs/index.js";
import { BoundingBox } from "../../math/index.js";

/**
 * This is an abstract class that extended to classes that are used to filter out unnecessary collision checks to boost performance.
 * 
 * @abstract
 * @see QuadtreeBroadphase
 * @see GridBroadphase
 * @see AABBBroadphase
 */
export class Broadphase {
  /**
   * @param {Entity[][]} _bodies
   * @param {BoundingBox[][]} _bounds
   */
  update(_bodies,_bounds) {}
  /**
   * Gets all possibly colliding pairs.
   * 
   * @param {CollisionPair[]} _target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(_target) {return _target}

  /**
   * Returns bodies that are within the given bound.
   * 
   * @param {Bounds} _bounds Region to check in.
   * @param {Entity[]} _target Empty array to store results.
   * @returns {Entity[]}
   */
  query(_bounds, _target) {return _target}
}