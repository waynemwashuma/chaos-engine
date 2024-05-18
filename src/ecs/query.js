import { IndexedList } from "../dataStructures/index.js"

/**
 * @template {Tuple} T
 */
export class Query {
  /**
   * @type {Registry}
   */
  registry
  /**
   * @type {string[]}
   */
  descriptors
  /**
   * @type {any[][]}
   */
  components = []
  /**
   * @type {IndexedList<number,ArchetypeId>}
   */
  archmapper = new IndexedList()
  /**
   * @param {Registry} registry
   * @param {string[]} descriptors
   */
  constructor(registry, descriptors) {
    this.registry = registry
    this.descriptors = descriptors
    for (let i = 0; i < descriptors.length; i++) {
      this.components[i] = []
    }
  }
  raw() {
    return this.components
  }
  /**
   * @param {EachFunc<T>} callback
   */
  each(callback) {
    const components = new Array(this.descriptors.length)
    if (!this.components[0]) return
    for (let j = 0; j < this.components[0].length; j++) {
      for (let k = 0; k < this.components[0][j].length; k++) {
        for (let l = 0; l < this.descriptors.length; l++) {
          components[l] = this.components[l][j][k]
        }
        callback(components)
      }
    }
  }
  /**
   * @param {EachCombinationFunc<T>} callback
   */
  eachCombination(callback) {
    const components1 = new Array(this.descriptors.length)
    const components2 = new Array(this.descriptors.length)
    if (!this.components[0]) return
    //This... many people will be very upset.
    for (let j = 0; j < this.components[0].length; j++) {
      for (let k = 0; k < this.components[0][j].length; k++) {
        for (let l = j; l < this.components[0].length; l++) {
          const nextup = l === j ? k + 1 : 0
          for (let m = nextup; m < this.components[0][l].length; m++) {

            for (let n = 0; n < this.descriptors.length; n++) {
              components1[n] = this.components[n][j][k]
              components2[n] = this.components[n][l][m]
            }
            callback(components1, components2)
          }
        }
      }
    }
  }
  /**
   * @returns {T | null}
   */
  single() {
    const components = new Array(this.descriptors.length)
    if (!this.components || this.components[0][0] && !this.components[0][0][0]) return null

    for (let i = 0; i < this.descriptors.length; i++) {
      components[i] = this.components[i][0][0]
    }
    return components
  }
  count() {
    let sum = 0
    if (!this.components[0]) return 0
    for (let i = 0; i < this.components[0].length; i++) {
      sum += this.components[0][i].length
    }
    return sum
  }
}

/**
 * @template {Tuple} T
 * @callback EachFunc
 * @param {T} components
 * @returns {void}
 */
/**
 * @template {Tuple} T
 * @callback EachCombinationFunc
 * @param {T} components1
 * @param {T} components2
 * @returns {void}
 */