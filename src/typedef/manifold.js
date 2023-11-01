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
 * @property { Vec2} ca1
 * @property { Vec2} ca2
 * @property {number} restitution
 * @property {number} staticFriction
 * @property {number} kineticFriction
 * @property { Vec2} velA
 * @property { Vec2} velB
 * @property {number} rotA
 * @property {number} rotB
 */

/**
 * @typedef ContactManifold
 * @property {number} lastOverlap
 * @property {number} overlap=-Infinity
 * @property {boolean} done=false
 * @property { Vec2} axis
 * @property { Vec2[]} verticesA
 * @property { Vec2[]} verticesB
 * @property {Shape} vertShapeA
 * @property {Shape} vertShapeB
 * @property {number} contactNo
 * @property {number} indexA
 * @property {number} indexB
 */