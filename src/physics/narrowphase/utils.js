import { Shape2D } from "../components/index.js"
/**
 * @param {Body2D} a
 * @param {Body2D} b
 */
export function canCollide(
  propA,
  propB
) {
  if (
    !propA.invmass &&
    !propB.invmass
  ) return false
  if (
    !(propA.group & propB.mask) ||
    !(propB.group & propA.mask)
  ) return false
  if (
    propA.sleep &&
    propB.sleep
  ) return false
  return true
}
/**
 * @param { Vector2} position
 * @param {number} radius
 * @param { Vector2} point
 */
export function circleContains(position, radius, point) {
  const dx = point.x - position.x,
    dy = point.y - position.y
  if (dx * dx + dy * dy > radius * radius)
    return false
  return true
}
/**
 * @param { Vector2[]} vertices
 * @param {Vector2} point 
 */
export function verticesContain(vertices, point) {
  const pointX = point.x,
    pointY = point.y,
    length = vertices.length
  let previous = vertices[length - 1],
    current
  if (length < 2) return false
  for (let i = 0; i < length; i++) {
    current = vertices[i];
    if ((pointX - previous.x) * (current.y - previous.y) +
      (pointY - previous.y) * (previous.x - current.x) < 0) {
      return false;
    }
    previous = current;
  }

  return true;
}
/**
 * @param {Shape2D} shape
 * @param { Vector2} point
 */
export function shapeContains(shape, point) {
  if (shape.type == Shape2D.CIRCLE)
    return circleContains(shape.vertices[0], shape.vertices[1].x, point)
  return verticesContain(shape.vertices, point)
}
export function generatePairID(idA, idB) {
  return idA > idB ? idA + " " + idB : idB + " " + idA
}