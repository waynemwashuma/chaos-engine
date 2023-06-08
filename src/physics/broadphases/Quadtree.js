import { AABB } from "../AABB/index.js"
import { Broadphase } from "./broadphase.js"
import { Utils } from "../../utils/index.js"
class Node {
  constructor(bounds) {
    this.children = []
    this.objects = []
    this.parent = null
    this.global = null
    this.index = -1
    this.root = null
    this.bounds = bounds
    this.hasObjects = false
    this.depth = -1
    this.dims = {
      x: this.bounds.max.x - this.bounds.min.x,
      y: this.bounds.max.y - this.bounds.min.y
    }
  }
  add(node) {
    node.index = this.children.length
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
  split(depth = 1) {
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
    if (depth <= 1) return
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
  childrenHaveObj() {
    return this.children.length > 0 || (
      this.children[0].hasObjects ||
      this.children[1].hasObjects ||
      this.children[2].hasObjects ||
      this.children[3].hasObjects
    )
  }
  intersects(bounds) {
    if (bounds.r)
      return AABB.AABBvsSphere(this.bounds, bounds)
    return AABB.AABBColliding(this.bounds, bounds)
  }
  contains(bounds) {
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
  insertObject(obj) {
    if (!this.contains(obj.bounds))
      return false
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {
        let r = this.children[i].insertObject(obj)
        if (r) {
          this.hasObjects = true
          return true
        }
      }
    }
    if (this.contains(obj.bounds)) {
      this.objects.push(obj)
      obj.lastPosition.copy(obj.bounds.pos)
      this.hasObjects = true
      return true
    }
    return false
  }
  isInNode(position) {
    if (
      position.x > this.bounds.min.x &&
      position.y > this.bounds.min.y &&
      position.x < this.bounds.max.x &&
      position.y < this.bounds.max.y
    )
      return true
    return false
  }
  isRootNode() {
    return !this.parent
  }
  updateObject(obj) {
    this.removeObject(obj)
    this.global.insert(obj)
    return true
  }
  removeObject(obj) {
    if (!this.isInNode(obj.lastPosition))
      return false
    let t = this.objects.indexOf(obj)
    if (t !== -1) {
      Utils.removeElement(this.objects, t)
      if (
        this.objects.length == 0 &&
        this.childrenHaveObj()
      ) this.hasObjects = false
      return true
    }
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {

        let r = this.children[i].removeObject(obj)
        if (r) {
          if (
            this.objects.length == 0 &&
            this.childrenHaveObj()
          ) this.hasObjects = false
          return true
        }
      }
    }
    return false
  }
  traverse(func, target) {
    if (!this.isLeafNode()) {
      for (var i = 0; i < 4; i++) {
        let t = this.children[i].traverse(func, target)
        if (t != undefined &&
          (typeof t == "object" && t.length)) return target
      }
    }
    func(this, target)
    if (this.isRootNode()) {
      return target
    }
  }
  getCollisionPairs(target, stack) {
    if (!this.hasObjects) return
    if (!this.isLeafNode()) {
      Utils.appendArr(stack, this.objects)
      for (var i = 0; i < 4; i++) {
        this.children[i].getCollisionPairs(target, stack)
      }
      Utils.popArr(stack, this.objects.length)
    }
    let length = stack.length,
      obLength = this.objects.length,
      a, b
    if (obLength == 0) return
    for (var i = 0; i < obLength; i++) {
      for (var j = i + 1; j < obLength; j++) {
        a = this.objects[i]
        b = this.objects[j]
        if (a.index == b.index) continue
        if (!this.global.canCollide(a, b)) continue
        if (!a.bounds.intersects(b.bounds))
          continue
        target.push({
          a,
          b
        })
      }
    }
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < obLength; j++) {
        a = stack[i]
        b = this.objects[j]
        if (!this.global.canCollide(a, b)) continue
        if (!a.bounds.intersects(b.bounds))
          continue
        target.push({
          a,
          b
        })
      }
    }


  }
}

/**
 * This is a bounded broadphase that is used to speed up collision testing on sparse number of objects over a large area.
 */
class Tree extends Broadphase {
  /**
   * @param {Bounds} bounds The region it operates on.
   * @param {number} [maxdepth=3] Maximum number of branches.
   * 
   */
  constructor(bounds, maxdepth = 3) {
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
    super()
    this._root = new Node(bounds)
    this._root.global = this
    this._root.depth = 0
    this.maxDepth = maxdepth
    this.bounds = bounds

    if (maxdepth) this._root.split(maxdepth)
  }
  /**
   * @inheritdoc
   * @param {Body} obj
   */
  insert(obj) {
    if (!this._root.contains(obj.bounds))
      return //console.log("out of bounds");
    this._root.insertObject(obj)
  }
  /**
   * @inheritdoc
   * @param {Body} obj
   */
  remove(obj) {
    let r = this._root.removeObject(obj)
    return r
  }
  /**
   * @inheritdoc
   * @param {array<Body>} bodies
   */
  update(bodies) {
    for (var i = 0; i < bodies.length; i++) {
      this.remove(bodies[i])
      this.insert(bodies[i])
    }

  }
  /**
   * @inheritdoc
   * @param {Bounds} bounds Region to check in.
   * @param {array} target Empty array to store results.
   * @returns {array<Body>}
   */
  query(bounds, target) {
    this._root.query(bounds, target)
    return target
  }
  /**
   * A depth first search of the quadtree that applies the given function to its nodes.
   * 
   * @param {function} func The function that checks every node unless it returns true.
   * 
   */
  traverse(func) {
    return this._root.traverse(func)
  }
  /**
   * @inheritdoc
   */
  draw(ctx) {
    this._root.traverse(e => {
      if (e.hasObjects) {
        e.children.forEach(r => r.draw(ctx))
      }
    })
    ctx.fillStyle = "black"
  }
  /**
   * Rezises a quadtree to a new bound size.
   * This method should not be used without care.
   * 
   * @param {Bounds} bounds.
   * 
  */
  recalculateBounds(bounds) {
    if (!bounds) return
    let ob = this._root.traverse((e, arr) => {
      let length = e.objects.length
      for (var i = 0; i < length; i++) {
        arr.push(e.objects[i])
      }
    }, [])
    this._root = new Node(bounds)
    this._root.split()
    ob.forEach(e => {
      this.insert(ob)
    })
  }
  /**
   * @inheritdoc
   * @param {array} target Empty array to store results.
   * @returns {array<Body>}
   */
  getCollisionPairs(target) {
    this._root.getCollisionPairs(target, [])
  }
}

export {
  Tree as QuadTreeBroadphase,
}


/**
 * @typedef Bounds
 * @property {Vector_like} max
 * @property {Vector_like} min
 */

/**
 * @typedef Vector_like
 * @property {number} x
 * @property {number} y
 */