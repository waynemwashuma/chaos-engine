/**
 * @typedef CollisionPair
 * @property {Body} a
 * @property {Body} b
*/

/**
 * @typedef Manifold
 * @property {Body} bodyA 
 * @property {Body} bodyB
 * @property {ContactManifold} contactData
 * @property {number} stmp
 * @property {number} impulse
 * @property {boolean} persistent 
 * @property { Vector2} ca1
 * @property { Vector2} ca2
 * @property {number} restitution
 * @property {number} staticFriction
 * @property {number} kineticFriction
 * @property { Vector2} velA
 * @property { Vector2} velB
 * @property {number} rotA
 * @property {number} rotB
 */

/**
 * @typedef ContactManifold
 * @property {number} lastOverlap
 * @property {number} overlap=-Infinity
 * @property {boolean} done=false
 * @property { Vector2} axis
 * @property { Vector2[]} verticesA
 * @property { Vector2[]} verticesB
 * @property {Shape} vertShapeA
 * @property {Shape} vertShapeB
 * @property {number} contactNo
 * @property {number} indexA
 * @property {number} indexB
 */