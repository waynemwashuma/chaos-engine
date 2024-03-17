/**
 * Checks if two AABB overlap
 * 
 * @param {BoundingBox} a
 * @param {BoundingBox} b
 */
export function AABBColliding(a, b) {
  return (
    a.min.x <= b.max.x &&
    a.max.x >= b.min.x &&
    a.min.y <= b.max.y &&
    a.max.y >= b.min.y
  )
}
/**
 * Checks if two BoundingCircles overlap
 * 
 * @param {BoundingCircle} a
 * @param {BoundingCircle} b
 */
export function boundSpheresColliding(a, b) {
  const distance = (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) +
    (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y)
  return distance < a.r * a.r + b.r * b.r;
}
/**
 * Checks if An AABB and a CircleBound overlap
 * 
 * @param {BoundingBox} a
 * @param {BoundingCircle} b
 */
export function AABBvsSphere(a, b) {
  const x = Math.max(a.min.x, Math.min(b.pos.x, a.max.x));
  const y = Math.max(a.min.y, Math.min(b.pos.y, a.max.y));
  const distance =
    (x - b.pos.x) * (x - b.pos.x) +
    (y - b.pos.y) * (y - b.pos.y)

  return distance < b.r * b.r;
}
/**
 * Checks if any AABB or/and a BoundingCircle overlap
 * 
 * @param {BoundingBox | BoundingCircle} bound1
 * @param {BoundingCircle | BoundingBox} bound2
 */
export function boundsColliding(bound1, bound2) {
  if (bound1.type === BoundType.BOX && bound2.type === BoundType.BOX)
    // @ts-ignore
    return AABBColliding(bound1, bound2)
  if (bound1.type === BoundType.CIRCLE && bound2.type === BoundType.CIRCLE)
    // @ts-ignore
    return boundSpheresColliding(bound1, bound2)
  if (bound1.type === BoundType.BOX)
    // @ts-ignore
    return AABBvsSphere(bound2, bound1)
  // @ts-ignore
  return AABBvsSphere(bound1, bound2)
}

export const BoundType = {
  BOX: 0,
  CIRCLE: 1,
}