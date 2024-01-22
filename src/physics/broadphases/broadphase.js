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
   * Checks to see if two bodies can proceed to have their bounding boxes checked 
   * 
   * @param {Body2D} a
   * @param {Body2D} b
   */
  canCollide(a, b) {
    if (a.mass == 0 && b.mass == 0)
      return false
    if (
      (a.mask.group !== 0 && b.mask.group !== 0) &&
      a.mask.group == b.mask.group
    ) return false
    if (a.mask.layer && b.mask.layer && a.mask.layer !== b.mask.layer)
      return false
    if (a.sleeping && b.sleeping) return false
    //console.log(a.mass,b.mass);
    return true
  }
  /**
   * Adds a body to the broadphase
   * 
   * @param {Body2D} obj
   */
  insert(obj) {}
  /**
   * Removes a body from the broadphase
   * 
   * @param {Body2D} obj
   */
  remove(obj) {}

  /**
   * Renders a representation of a broadphase
   */
  draw(ctx) {}
  /**
   * Updates the internals of the broadphase if needed.
   * 
   * @param {Body2D[]} bodies
   */
  update(bodies) {}
  /**
   * Gets all possibly colliding pairs.
   * 
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target) {}

  /**
   * Returns bodies that are within the given bound.
   * 
   * @param {Bounds} bounds Region to check in.
   * @param {Body2D[]} target Empty array to store results.
   * @returns {Body2D[]}
   */
  query(bounds, target) {}
}