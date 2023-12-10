//import { BoundingBox } from "../../math/index.js"
import { Broadphase } from "./broadphase.js"
//import { Utils }from "../../utils/index.js"

/**
 * This is an unbounded broadphase used to speed up collision testing.
 * This can be used generally as it is faster than naive broadphase when a lot of objects are involved in the physics simulation.
 * 
 * @extends Broadphase
*/
export class AABBBroadphase extends Broadphase{
  
}