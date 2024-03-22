/**
 * @template T
 */
export class Query {
  /**
   * @type {string[]}
   */
  type = []
  /**
   * @type {number}
   */
  number = 0
  /**
   * @type {T | null}
   */
  components = null
  /**
   * @param {string[]} componentTypes
   */
  constructor(...componentTypes) {
    this.type = componentTypes
    this.number = componentTypes.length
  }
  raw() {
    return this.components
  }
  /**
   * @param {(comp:T)=>void} callback
   */
  each(callback) {
    const components = new Array(this.number)
    if (!this.components) return
    for (let j = 0; j < this.components[0].length; j++) {
      for (let k = 0; k < this.components[0][j].length; k++) {
        for (let l = 0; l < this.number; l++) {
          components[l] = this.components[l][j][k]
        }
        callback(...components)
      }
    }
  }
}

/**
 * @typedef {import("typescript").TupleType} Tuple
 */