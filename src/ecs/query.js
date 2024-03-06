class Query {
  /**
   * @type {string}
   */
  type = ""
  /**
   * @type {number}
   */
  number = 0
  /**
   * @type {any[][]}
   */
  components = [[]]
  /**
   * @param {string[]} componentTypes
   */
  constructor(...componentTypes) {
    this.type = componentTypes
    this.number = componentTypes.length
  }
  raw() {
    return this._components
  }
  /**
   * @param {} callback
  */
  each(callback) {
    const components = new Array(this._number)

    for (let i = 0; i < this._components[i].length; i++) {
      for (let j = 0; j < this._number; j++)
        components[j] = this.components[j][i]
      callback(...components)
    }
  }
}