import { Broadphase } from "./broadphase.js"
import { naturalizePair } from "../../math/index.js"
import { Utils } from "../../utils/index.js"
import * as _ from "../../typedef/index.js"

let floor = Math.floor
class Client {
  constructor(body) {
    this.body = body
    this.bounds = body.bounds.clone()
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

    key[0] = floor(
      ((x - minX) / width) * this.divX)
    key[1] = floor(((y - minY) / height) * this.divY)
    return key
  }
  /**
   * @inheritdoc
   * @private
   * @param {Client} client
   */
  _insert(client) {
    client.bounds.copy(client.body.bounds)
    let [x1, y1] = this._hash(client.bounds.min.x, client.bounds.min.y)
    let [x2, y2] = this._hash(client.bounds.max.x, client.bounds.max.y)


    if (x1 > this.divX - 1 || x1 < 0) return
    if (y1 > this.divY - 1 || y1 < 0) return
    if (x2 > this.divX - 1 || x2 < 0) return
    if (y2 > this.divY - 1 || y2 < 0) return

    for (let i = x1; i <= x2; i++) {
      for (var j = y1; j <= y2; j++) {
        this.bins[i][j].push(client)
      }
    }
  }
  /**
   * @inheritdoc
   * @param {Body} body
   */
  insert(body) {
    let client = body.client
    if (client == null) {
      client = body.client = new Client(body)
    }
    this._insert(client)
  }
  /**
   * @inheritdoc
   * @private
   * @param {Client} client
   */
  _remove(client) {
    let [x1, y1] = this._hash(client.bounds.max.x, client.bounds.max.y)
    let [x2, y2] = this._hash(client.bounds.max.x, client.bounds.max.y)

    if (x1 > this.divX - 1 || x1 < 0) return
    if (y1 > this.divY - 1 || y1 < 0) return
    if (x2 > this.divX - 1. || x2 < 0) return
    if (y2 > this.divY - 1. || y2 < 0) return

    for (let i = x1; i <= x2; i++) {
      for (let j = y1; j <= y2; j++) {
        let index = this.bins[i][j].indexOf(client)
        Utils.removeElement(this.bins[i][j], index)
      }
    }
  }
  /**
   * @inheritdoc
   * @param {Body} body
   */
  remove(body) {
    if (body.client === null) return
    this._remove(body.client)
  }
  /**
   * @inheritdoc
   * @private
   * @param {Body} body
   */
  _update(body) {
    this._remove(body.client)
    this._insert(body.client)
  }
  /**
   * @inheritdoc
   * @param {Body[]} bodies
   */
  update(bodies) {
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
  /**
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target) {
    //When bodies are in more than one bin,there is a possibility that they might show up in more than one collision,this remedies that.
    let ids = new Set()
    for (let i = 0; i < divX; i++) {
      for (let j = 0; j < divY; j++) {
        this._naiveCheck(this.bins[i][j], ids, target)
      }
    }
    return target
  }
}

export {
  Grid //as GridBroadphase
}