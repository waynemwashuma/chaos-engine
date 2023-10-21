const AABB = {
  AABBColliding(a, b){
    return (
      a.min.x <= b.max.x &&
      a.max.x >= b.min.x &&
      a.min.y <= b.max.y &&
      a.max.y >= b.min.y
    )
  },
  boundSpheresColliding(a, b) {
    const distance = (a.x - b.x) * (a.x - b.x) +
      (a.y - b.y) * (a.y - b.y)
    return distance < a.r * a.r + b.r * b.r;
  },
  AABBvsSphere(aabb, sphere) {
    const x = Math.max(box.min.x, Math.min(sphere.pos.x, box.max.x));
    const y = Math.max(box.min.y, Math.min(sphere.pos.y, box.max.y));
    const distance =
      (x - sphere.pos.x) * (x - sphere.pos.x) +
      (y - sphere.pos.y) * (y - sphere.pos.y)

    return distance < sphere.radius;
  }
}

export {
  AABB
}