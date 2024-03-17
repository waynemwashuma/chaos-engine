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
    if(!this.components)return
    // @ts-ignore
    for (let i = 0; i < this.components[i].length; i++) {
      for (let j = 0; j < this.number; j++)
        // @ts-ignore
        components[j] = this.components[j][i]
      // @ts-ignore
      callback(...components)
    }
  }
}

/**
 * @typedef {import("typescript").TupleType} Tuple
 */