/**
 * @template {Tuple} T
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
   * @type {any[][] | null}
   */
  components = null
  /**
   * @param {string[]} componentTypes
   */
  constructor(componentTypes) {
    this.type = componentTypes
    this.number = componentTypes.length
  }
  raw() {
    return this.components
  }
  /**
   * @param {EachFunc<T>} callback
   */
  each(callback) {
    const components = new Array(this.number)
    if (!this.components) return
    for (let j = 0; j < this.components[0].length; j++) {
      for (let k = 0; k < this.components[0][j].length; k++) {
        for (let l = 0; l < this.number; l++) {
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
    const components1 = new Array(this.number)
    const components2 = new Array(this.number)
    if (!this.components) return
    //This... many people will be very upset.
    for (let j = 0; j < this.components[0].length; j++) {
      for (let k = 0; k < this.components[0][j].length; k++) {
        for (let l = j; l < this.components[0].length; l++) {
          const nextup = l === j ? k + 1 : 0
          for (let m = nextup; m < this.components[0][l].length; m++) {

            for (let n = 0; n < this.number; n++) {
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
    const components = new Array(this.number)
    if(!this.components || this.components[0][0] && !this.components[0][0][0])return null

    for (let i = 0; i < this.number; i++) {
      components[i] = this.components[i][0][0]
    }
    return components
  }
  count(){
    let sum = 0
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