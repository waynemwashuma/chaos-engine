import { Broadphase } from "./broadphase.js"
import { naturalizePair } from "../utils/index.js"

class Client {
  constructor(obj) {
    this.object = obj
  }
}

/**
 * This is a bounded broadphase that is used to speed up collision testing on dense number of objects over a small area.
 * 
 * @extends Broadphase
 */
class Grid extends Broadphase {
  bins = [
    [[], [], []],
    [[], [], []]
    ]
  bounds = null
  constructor(bounds, divX, divY) {
    this.bounds = bounds
    for (let i = 0; i < divX; i++) {
      let Xbin = []
      for (var i = 0; i < divY; i++) {
        Xbin.push([])
      }
      this.bin.push(Xbin)
    }
  }
  hash(x, y) {

  }
  insert(body) {

  }
  remove(body) {

  }
  update(body) {
    remove(body)
    insert(body)
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
    for (var i = 0; i < this.bins.length; i++) {
      this._naiveCheck(this.bins[i], ids, target)
    }
  }
}

export {
  Grid // as GridBroadphase
}