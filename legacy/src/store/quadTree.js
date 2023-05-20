import { AABB } from "../physics/index.js"
class Node {
  constructor(bounds) {
    this.children = []
    this.objects = []
    this.parent = null
    this.global = null
    this.root = null
    this.bounds = bounds
    this.depth = -1
    this.dims = {
      x: this.bounds.max.x - this.bounds.min.x,
      y: this.bounds.max.y - this.bounds.min.y
    }
  }
  add(node) {
    this.children.push(node)
    node.depth = this.depth + 1
    node.parent = this
    node.global = this.global
  }
  clear() {
    for (var i = 0; i < this.children.length; i++) {
      const node = nodes[i]

      this.children.remove(node)
      node.parent = null
      node.global = null
    }
  }
  split(depth = 0) {
    let w = this.dims.x / 2
    let h = this.dims.y / 2
    let topLeft = new Node({
      min: {
        x: this.bounds.min.x,
        y: this.bounds.min.y
      },
      max: {
        x: this.bounds.min.x + w,
        y: this.bounds.min.y + h
      }
    })
    let topRight = new Node({
      min: {
        x: this.bounds.min.x + w,
        y: this.bounds.min.y
      },
      max: {
        x: this.bounds.max.x,
        y: this.bounds.max.y - h
      }
    })
    let bottomLeft = new Node({
      min: {
        x: this.bounds.min.x,
        y: this.bounds.min.y + h
      },
      max: {
        x: this.bounds.max.x - w,
        y: this.bounds.max.y
      }
    })
    let bottomRight = new Node({
      min: {
        x: this.bounds.min.x + w,
        y: this.bounds.min.y + h
      },
      max: {
        x: this.bounds.max.x,
        y: this.bounds.max.y
      }
    })
    this.add(topLeft)
    this.add(topRight)
    this.add(bottomLeft)
    this.add(bottomRight)
    if (depth <= 0) return
    this.children.forEach(e => e.split(depth - 1))
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = "blue"
    ctx.strokeRect(this.bounds.min.x, this.bounds.min.y, this.dims.x, this.dims.y)
    ctx.stroke()
    ctx.closePath()
  }
  isLeafNode() {
    return this.children.length == 0
  }
  intersects(bounds) {
    if (bounds.r)
      return AABB.AABBvsSphere(this.bounds, bounds)
    return AABB.AABBColliding(this.bounds, bounds)
  }
  fits(bounds) {
    return (
      bounds.max.x < this.bounds.max.x &&
      bounds.max.y < this.bounds.max.y &&
      bounds.min.x > this.bounds.min.x &&
      bounds.min.y > this.bounds.min.y
    )
  }
  query(bounds, target) {
    if (!this.intersects(bounds))
      return target
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].query(bounds, target)
      }
    }
    for (var i = 0; i < this.objects.length; i++) {
      let a = this.objects[i]
      if (a.bounds.intersects(bounds))
        target.push(a)
    }
    return target
  }
  insertObject(obj, maxReached = false) {
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {
        let r = this.children[i].insertObject(obj)
        if (r) {
          return true
        }
      }
    }
    if (this.fits(obj.bounds)) {
      this.objects.push(obj)
      return true
    }
    return false
  }
  isInNode(obj) {
    if (
      obj.position.x > this.bounds.min.x &&
      obj.position.y > this.bounds.min.y &&
      obj.position.x < this.bounds.max.x &&
      obj.position.y < this.bounds.max.y
    )
      return true
    return false
  }
  isRootNode() {
    return !this.parent
  }
  updateObject(obj) {
    if (!this.isInNode(obj))
      return false
    if (!this.objects.includes(obj)) {
      this.children.forEach(e => {
        e.updateObject(obj)
      })
    }
    this.removeObject(obj)
    this.global.insert(obj)
  }
  removeObject(obj) {
    if (!this.isInNode(obj))
      return
    if (!this.objects.includes(obj)) {
      this.children.forEach(e => {
        e.removeObject(obj)
      })
      return false
    }
    this.objects.splice(this.objects.indexOf(obj), 1)
  }
  traverse(func) {
    let r = func(this)
    if (r) return r
    this.children.forEach(e => {
      e.traverse(func)
    })
  }
  traverseAll(func, target) {
    target = target || []
    let r = func(this)
    if (r) target.push(r)
    this.children.forEach(e => {
      e.traverseAll(func, target)
    })
    return target
  }
}
class Tree {
  constructor(bounds, maxdepth = 10) {
    bounds = bounds || {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 1000,
        y: 1000
      }
    }
    this._root = new Node(bounds)
    this._root.global = this
    this._root.depth = 0
    this.maxDepth = maxdepth
    this.bounds = bounds
  }
  insert(obj) {
    if (!this._root.fits(obj.bounds))
      return
    this._root.insertObject(obj)
  }
  remove(obj) {
    this._root.remove(obj)
  }
  query(bounds, target) {
    target = target || []
    this._root.query(bounds, target)
    return target
  }
  traverse(func) {
    this._root.traverse(func)
  }
  draw(ctx) {
    this._root.traverse(e => e.draw(ctx))
    ctx.fillStyle = "black"
  }
  recalculateBounds(bounds) {
    if (!bounds) return
    let ob = this._root.traverseAll(e => {
      return e.objects
    })
    ob = ob.flat()
    this._root = new Node(bounds)
    this._root.split(3)
    ob.forEach(e => {
      this.insert(ob)
    })
  }
  update(obj) {
    obj
    this._root.updateObject(obj)
  }
  remove(obj) {
    this._root.removeObject(obj)
  }
}

export {
  Tree as QuadTree,
}