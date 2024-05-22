import { assert } from "../logger/index.js"

const indexerror = "Tried to index into `Bitset()` futher than its size."
const WORD_LENGTH = 32

export class Bitset {
  /**
   * @type {Uint32Array}
   */
  data
  /**
   * @type {number}
   */
  size
  /**
   * @param {number} [size]
   */
  constructor(size = 0) {
    this.data = new Uint32Array(Math.ceil(size / WORD_LENGTH))
    this.size = size
  }
  /**
   * @param {number} index
   * @returns {boolean}
   */
  get(index) {
    return Bitset.get(this, index)
  }
  /**
   * @param {number} index
   */
  set(index) {
    Bitset.set(this, index)
  }
  /**
   * @param {number} index
   */
  clear(index) {
    Bitset.clear(this, index)
  }
  /**
   * @param {number} size
   */
  resize(size) {
    Bitset.resize(this, size)
  }
  /**
   * @param {Bitset} bitset
   * @param {number} size
   * @returns {boolean}
   */
  static get(bitset, index) {
    assert(index < bitset.size, indexerror)

    const indexer = Math.floor(index / WORD_LENGTH)
    const mask = 1 << (index % WORD_LENGTH)

    return (bitset.data[indexer] & mask) != 0
  }
  /**
   * @param {Bitset} bitset
   * @param {number} size
   */
  static set(bitset, index) {
    assert(index < bitset.size, indexerror)

    const indexer = Math.floor(index / WORD_LENGTH)
    const mask = 1 << (index % WORD_LENGTH)

    bitset.data[indexer] |= mask
  }
  /**
   * @param {Bitset} bitset
   * @param {number} size
   */
  static clear(bitset, index) {
    assert(index < bitset.size, indexerror)

    const indexer = Math.floor(index / WORD_LENGTH)
    const mask = 1 << (index % WORD_LENGTH)

    bitset.data[indexer] &= ~mask
  }
  /**
   * @param {Bitset} bitset
   * @param {number} size
   */
  static resize(bitset, size) {
    const data = new Uint32Array(Math.ceil(size / WORD_LENGTH))
    data.set(bitset.data)

    bitset.data = data
    bitset.size = size
  }
}