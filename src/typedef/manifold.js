/**
 * @typedef CollisionPair
 * @property {Body} a
 * @peoperty {Body} b
*/

/**
 * @typedef Manifold
 * @property {Body} bodyA 
 * @property {Body} bodyB
 * @property {ContactManifold} contactData
 * @property {number} stmp
 * @property {number} impulse
 * @property {boolean} persistent 
 * @property {Vector} ca1
 * @property {Vector} ca2
 * @property {number} restitution
 * @property {number} staticFriction
 * @property {number} kineticFriction
 * @property {Vector} velA
 * @property {Vector} velB
 * @property {number} rotA
 * @property {number} rotB
 */

/**
 * @typedef ContactManifold
 * @property {number} lastOverlap
 * @property {number} overlap=-Infinity
 * @property {boolean} done=false
 * @property {Vector} axis
 * @property {Vector[]} verticesA
 * @property {Vector[]} verticesB
 * @property {Shape} vertShapeA
 * @property {Shape} vertShapeB
 * @property {number} contactNo
 * @property {number} indexA
 * @property {number} indexB
 */
 export {}