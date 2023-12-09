export class RaycastResult{
  ray = null
  mode = RayCastModes.NONE
  collisions = []
}
export class RayCollisionResult{
  distance = 0
  object = null
  points = [ ]
  ray = null
}

/**
 * @enum {number}
 * 
*/
export const RayCastModes = {
  NONE : 0,
  NEAREST:1,
  FIRST:2,
  ANY:3
}