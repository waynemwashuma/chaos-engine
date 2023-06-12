import { Broadphase } from "./broadphase.js"
import { naturalizePair } from "../../utils/index.js"

let floor = Math.floor
class Client {
  constructor(obj) {
    this.object = obj
    this.bounds = obj.bounds.clone()
  }
}

/**
 * This is a bounded broadphase that is used to speed up collision testing on dense number of objects over a small area.
 * 
 * @extends Broadphase
 */
class Grid extends Broadphase {
  bins = []
  bounds = null
  constructor(bounds, divX, divY) {
    super()
    this.bounds = bounds
    this.divX = divX
    this.divY = divY
    for (let i = 0; i < divX; i++) {
      let Xbin = []
      for (let j = 0; j < divY; j++) {
        Xbin.push([])
      }
      this.bins.push(Xbin)
    }
  }
  _hash(x, y) {
    let key = [0, 0],
      minX = this.bounds.min.x,
      minY = this.bounds.min.y,
      width = this.bounds.max.x - this.bounds.min.x,
      height = this.bounds.max.y - this.bounds.min.y

    key[0] = floor(((x - minX) / width) * this.divX)
    key[1] = floor(((y - minY) / height) * this.divY)
    return key
  }
  insert(body) {
    let [x1, y1] = this._hash(body.bounds.max.x, body.bounds.max.y)
    let [x2, y2] = this._hash(body.bounds.max.x, body.bounds.max.y)

    if (x1 > this.divX - 1 || x1 < 0) return
    if (y1 > this.divY - 1 || y1 < 0) return
    if (x2 > this.divX - 1 || x2 < 0) return
    if (y2 > this.divY - 1 || y2 < 0) return

    for (let i = x1; i < x2; i++) {
      for (var j = y1; j < y2; j++) {
        this.bins[i][j].push(body)
      }
    }
  }
  remove(body) {
    let [x1, y1] = this._hash(body.bounds.max.x, body.bounds.max.y)
    let [x2, y2] = this._hash(body.bounds.max.x, body.bounds.max.y)

    if (x1 > this.divX - 1 || x1 < 0) return
    if (y1 > this.divY - 1 || y1 < 0) return
    if (x2 > this.divX - 1. || x2 < 0) return
    if (y2 > this.divY - 1. || y2 < 0) return

    for (let i = x1; i < x2; i++) {
      for (var j = y1; j < y2; j++) {
        let index = this.bins[i][j].indexOf(body)
        this.bins[i][j].splice(index, 1)
      }
    }
  }

  _update(body) {
    remove(body)
    insert(body)
  }
  update(bodies){
    for (var i = 0; i < bodies.length; i++) {
      this._update(bodies[i])
    }
  }
  _naiveCheck(arr, ids, target) {
    for (var j = 0; j < arr.length; j++) {
      for (var k = j + 1; k < arr.length; k++) {
        let a = arr[j]
        let b = arr[k]
        let id = naturalizePair(a.id, b.id)

        if (ids.has(id)) continue
        if (!this.canCollide(a, b)) continue
        if (!a.bounds.intersects(b.bounds))
          continue
        ids.add(id)
        target.push({
          a,
          b
        })
      }
    }
  }
  getCollisionPairs(target) {
    //When bodies are in more than one bin,there is a possibility that they might show up in more than one collision,this remedies that.
    let ids = new Set()
    for (let i = 0; i < divX; i++) {
      for (let j = 0; j < divY; j++) {
        this._naiveCheck(this.bins[i][j], ids, target)
      }
    }
  }
}

export {
  Grid //as GridBroadphase
}