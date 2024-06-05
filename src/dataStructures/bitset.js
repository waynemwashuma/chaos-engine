import { assert } from "../logger/index.js"

const indexerror = "Tried to index into `Bitset()` futher than its size."
const oplengtherror = "`Bitset`s should be of equal size to apply the operation."

//Must match with the bit length of element in the typed array.
const WORD_LENGTH = 32
const WORD_LOG = Math.log2(WORD_LENGTH)

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
   * @param {Bitset} other
   * @returns {this}
   */
  and(other) {
    return Bitset.and(this, other, this)
  }
  /**
   * @param {Bitset} other
   * @returns {this}
   */
  or(other) {
    return Bitset.or(this, other, this)
  }
  /**
   * @param {Bitset} other
   * @returns {this}
   */
  xor(other) {
    return Bitset.xor(this, other, this)
  }
  /**
   * @param {Bitset} other
   * @returns {this}
   */
  not() {
    return Bitset.not(this, this)
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

    const indexer = index >>> WORD_LOG
    const mask = 1 << index

    return (bitset.data[indexer] & mask) != 0
  }
  /**
   * @param {Bitset} bitset
   * @param {number} size
   */
  static set(bitset, index) {
    assert(index < bitset.size, indexerror)

    const indexer = index >>> WORD_LOG
    const mask = 1 << index

    bitset.data[indexer] |= mask
  }
  /**
   * @param {Bitset} bitset
   * @param {number} index
   */
  static clear(bitset, index) {
    assert(index < bitset.size, indexerror)

    const indexer = index >>> WORD_LOG
    const mask = 1 << index

    bitset.data[indexer] &= ~mask
  }
  /**
   * @param {Bitset} bitset
   * @param {number} size
   */
  static resize(bitset, size) {
    const length = Math.ceil(size / WORD_LENGTH)
    if(length < bitset.data.length)return
    
    const data = new Uint32Array(length)
    data.set(bitset.data)

    bitset.data = data
    bitset.size = size
  }
  /**
   * @param {Bitset} bitset1
   * @param {Bitset} bitset2
   * @param {Bitset} out
   * @returns {Bitset}
   */
  static and(bitset1, bitset2, out = new Bitset(bitset1.size)) {
    assert(bitset1.size === bitset2.size,oplengtherror + "`Bitset.and()`")
    for (let i = 0; i < bitset1.size; i++) {
      out.data[i] = bitset1.data[i] & bitset2.data[i]
    }
    return out
  }
  /**
   * @param {Bitset} bitset1
   * @param {Bitset} bitset2
   * @param {Bitset} out
   * @returns {Bitset}
   */
  static or(bitset1, bitset2, out = new Bitset(bitset1.size)) {
    assert(bitset1.size === bitset2.size,oplengtherror + "`Bitset.or()`")
    for (let i = 0; i < bitset1.size; i++) {
      out.data[i] = bitset1.data[i] | bitset2.data[i]
    }
    return out
  }
  /**
   * @param {Bitset} bitset1
   * @param {Bitset} bitset2
   * @param {Bitset} out
   * @returns {Bitset}
   */
  static xor(bitset1, bitset2, out = new Bitset(bitset1.size)) {
    assert(bitset1.size === bitset2.size,oplengtherror + "`Bitset.xor()`")
    for (let i = 0; i < bitset1.size; i++) {
      out.data[i] = bitset1.data[i] ^ bitset2.data[i]
    }
    return out
  }
  /**
   * @param {Bitset} bitset
   * @param {Bitset} out
   * @returns {Bitset}
   */
  static not(bitset, out = new Bitset(bitset.size)) {
    for (let i = 0; i < bitset.size; i++) {
      out.data[i] = ~bitset.data[i]
    }
    return out
  }
}