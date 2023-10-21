class CollisionManifold {
  constructor(body1, body2, manifold,ca1,ca2) {
    this.body1 = body1
    this.body2 = body2
    this.manifold = manifold
    this.impulse = 0
    this.ca1 = ca1
    this.ca2 = ca2
  }
}

export {
  CollisionManifold
}