/**
 * This module is used to check if bounds of a body overlap
 */
export const Overlaps = {
  /**
   * Checks if two AABB overlap
   * 
   * @param {BoundingBox} a
   * @param {BoundingBox} b
   */
  AABBColliding(a, b) {
    return (
      a.min.x <= b.max.x &&
      a.max.x >= b.min.x &&
      a.min.y <= b.max.y &&
      a.max.y >= b.min.y
    )
  },
  /**
   * Checks if two BoundingCircles overlap
   * 
   * @param {BoundingCircle} a
   * @param {BoundingCircle} b
   */
  boundSpheresColliding(a, b) {
    const distance = (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) +
      (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y)
    return distance < a.r * a.r + b.r * b.r;
  },
  /**
   * Checks if An AABB and a CircleBound overlap
   * 
   * @param {BoundingBox} a
   * @param {BoundingCircle} b
   */
  AABBvsSphere(a, b) {
    const x = Math.max(a.min.x, Math.min(b.pos.x, a.max.x));
    const y = Math.max(a.min.y, Math.min(b.pos.y, a.max.y));
    const distance =
      (x - b.pos.x) * (x - b.pos.x) +
      (y - b.pos.y) * (y - b.pos.y)

    return distance < b.r * b.r;
  },
  /**
   * Checks if any AABB or/and a BoundingCircle overlap
   * 
   * @param {BoundingBox | BoundingCircle} a
   * @param {BoundingCircle | BoundingBox} b
   */
  colliding(bound1, bound2) {
    if (bound1.max && bound2.max)
      return Overlaps.AABBColliding(bound1, bound2)
    if (bound1.r && bound2.r)
      return Overlaps.boundSpheresColliding(bound1, bound2)
    if (bound1.r)
      return Overlaps.AABBvsSphere(bound2, bound1)
    return Overlaps.AABBvsSphere(bound1, bound2)
  }
}