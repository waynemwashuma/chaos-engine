import { Broadphase } from "./broadphase.js"

class NaiveBroadphase extends Broadphase {
  constructor(world) {
    super()
    this.bodies = world.objects
  }
  query(bound, target) {
    closeObjects = target || []
    for (var i = 0; i < this.objects.length; i++) {
      let ob = this.world.objects[i]
      if (ob.bounds.intersects(bound) < dist)
        closeObjects.push(ob)
    }
    return closeObjects
  }
  getCollisionPairs(target) {
    target = target || []
    let bodies = this.bodies,
      length = bodies.length
    for (let i = 0; i < length; i++) {
      let a = bodies[i]
      for (let j = i + 1; j < length; j++) {
        let b = bodies[j]
        if(!this.canCollide(a,b))continue
        if (!a.bounds.intersects(b.bounds))
          continue
        let list = {
          a,
          b
        }
        if (a.aabbDetectionOnly || b.aabbDetectionOnly) continue
        if (!a.shapes.length || !b.shapes.length) continue
        target.push(list)
      }
    }
    return target
  }

}

export {
  NaiveBroadphase
}