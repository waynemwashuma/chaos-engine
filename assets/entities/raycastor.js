import { Entity, Vector, Sprite } from "/src/index.js"

class RayMesh extends Sprite {
  constructor(position, rays) {
    super(position)
    this.rays = rays
  }
  update(ctx) {
    this.rays.forEach(r => {
      r.draw(ctx)
    })
  }
}

class Ray {
  constructor(position, direction) {
    this.position = position
    this.direction = Vector.degToVector(direction)
    this.angle = direction
    this.closest = null
    this.length = 700
  }
  init(parent) {
    this.position = parent.position
    this.orientation = parent.orientation
  }
  castToEdge(v1, v2, v3, d) {
    //p = position of ray,d = ray direction
    let x4 = v3.x + d.x
    let y4 = v3.y + d.y
    let denominator = (v1.x - v2.x) * (v3.y - y4) - (v1.y - v2.y) * (v3.x - x4)
    
    if (!denominator) return null
    let t = ((v1.x - v3.x) * (v3.y - y4) - (v1.y - v3.y) * (v3.x - x4))/denominator
    
    if (t < 0 || t > 1) return null
    
    let u = -((v1.x - v2.x) * (v1.y - v3.y) - (v1.y - v2.y) * (v1.x - v3.x)) / denominator
    if (u < 0) return null
    const contactPoint = new Vector()
    contactPoint.x = v1.x + t * (v2.x - v1.x)
    contactPoint.y = v1.y + t * (v2.y - v1.y)

    return { contactPoint, dist: this.position.distanceToSquared(contactPoint) }
  }
  castToCircle(object) {
    if (!object.radius) return null
    let dir = this.direction.normal()
    let p = this.position.clone().sub(object.position)
    let mag = object.radius - p.magnitude()

    let dist = dir.dot(p)
    let facing = dir.cross(p) > 0
    if (!facing && mag < 0) return null
    let sin = dist / object.radius
    if (sin > 1 || sin < -1) return null
    let angle = Math.asin(sin)
    let dist2 = Math.cos(angle) * object.radius
    let p1 = object.position.clone().add(dir.multiply(dist))
    dir.copy(this.direction).multiply(dist2)
    let p2 = p1.clone().add(dir)
    let p3 = p1.clone().sub(dir)
    if ((mag >= 0) || p2.distanceToSquared(this.position) < p3.distanceToSquared(this.position))
      return {
        contactPoint: p2,
        dist: p2.distanceToSquared(this.position)
      }
    return {
      contactPoint: p3,
      dist: p3.distanceToSquared(this.position)
    }
  }
  castOnShape(object) {
    let a
    const { vertices } = object
    if (!vertices.length) return this.castToCircle(object)
    for (var i = 1; i < vertices.length; i++) {
      let info = this.castToEdge(vertices[i - 1], vertices[i], this.position, this.direction)
      if (info && (!a || a.dist > info.dist))
        a = info
    }
    if (vertices.length > 2) {
      let info = this.castToEdge(vertices[vertices.length - 1], vertices[0], this.position, this.direction)
      if (info && (!a || a.dist > info.dist))
        a = info
    }
    return a
  }
  castOnBody(object) {
    let a
    object.components.forEach(shape => {
      let info = this.castOnShape(shape)
      if (!info) return null;
      if (!a || a.dist > info.dist)
        a = info
    })
    return a
  }
  castTo(objects) {
    let hitObjects = []
    for (var i = 0; i < objects.length; i++) {
      let info = this.castOnBody(objects[i])
      if (info) info.object = objects[i]
      hitObjects.push(info)
    }
    hitObjects = hitObjects.filter(o => !!o)
    hitObjects.sort((a, b) => {
      if (a.dist < b.dist) return -1
      return 1
    })
    if (hitObjects.length) {
      hitObjects.forEach(ob => {
        if (!this.closest || this.closest.dist > ob.dist) this.closest = ob
      })
    }
    return hitObjects
  }
  draw(ctx) {
    let fill = "rgba(255,255,255,0.3)"
    ctx.save()
    if (this.closest) {
      this.closest.contactPoint.clone().sub(this.position).draw(ctx, this.position.x, this.position.y, fill)
    } else {
      this.direction.draw(ctx, this.position.x, this.position.y, fill, this.length)
    }
    ctx.restore()
  }
  update() {
    this.closest = null
    this.direction = Vector.degToVector(this.orientation.degree + this.angle)
  }
}

class Raycastor extends Entity {
  constructor(position, angleView = 0, number = 0) {
    super(position)
    this.rays = []
    for (var i = this.angle - angleView / 2; i <= this.angle + angleView / 2; i += (angleView / number)) {
      let ray = new Ray(this.position, i)
      ray.init(this)
      this.rays.push(ray)
    }
    delete this.body
    this.mesh = new RayMesh(this.position, this.rays)
  }
  update(dt) {
    super.update(...arguments)
    this.rays.forEach(r => r.update())
    return this.castInto(this.manager.world)
  }
  castInto(world) {
    let t = new Set()
    this.rays.forEach(r => {
      let object = r.castTo(world.objects)
      t.add(...object)
    })
    return Array.from(t)
  }

}
export {
  Raycastor,
  Ray
}