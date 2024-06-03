import { assert } from "../logger/index.js"

/**
 * @template T
 */
export class View {
  /**
   * @readonly
   * @type {number}
   */
  length = 0
  /**
   * @readonly
   * @type {number}
   */
  offset = 0
  /**
   * @type {Array<T>}
   */
  array
  /**
   * @param {Array<T>} arr
   * @param {number} offset
   * @param {number} length
   */
  constructor(arr, offset, length) {
    this.array = arr
    this.offset = offset
    this.length = length

    assert(offset + length < arr.length, "The `View()`'s range is beyond the range of the provided array.")
  }
}

export class RawView {
  /**
   * @type {number}
   */
  length = 0
  /**
   * @type {number}
   */
  offset = 0
    /**
   * @param {number} offset
   * @param {number} length
   */
  constructor(offset, length) {
    this.offset = offset
    this.length = length
  }
}