export class NarrowPhase {
  /**
   * @param {CollisionPair[]} _contactList
   * @param {Manifold[]} _clmds
   * @returns {Manifold[]}
   */
  getCollisionPairs(_contactList, _clmds) {}
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
  static generateManifold(
    manifold,
    bodyA,
    bodyB,
    ){}
}