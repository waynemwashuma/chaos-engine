import {rand} from "../math.js"
import {Interpolation} from "../interpolation.js"
export class Noise {
  /**
   * @param {number} seed
   */
  constructor(seed = rand() * Number.MAX_SAFE_INTEGER) {
    this.seed = seed
  }
  /**
   * @param {number} x
   */
  get1D(x) {
    x += this.seed
    x = BigInt((x << 13) ^ x)
    x = (x * (x * x * 15731n + 789221n) + 1376312589n)
    x = parseInt(x.toString(2).slice(-31), 2)
    return 1.0 - x / 1073741824
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  get2D(x, y) {
    const intX = Math.floor(x)
    const intY = Math.floor(y)

    const tx = x - intX
    const ty = y - intY

    const a = this.get1D(intX + intY)
    const b = this.get1D(intX + 1 + intY)

    const c = this.get1D(intX + intY + 1)
    const d = this.get1D(intX + 1 + intY + 1)
    return Interpolation.cosine(
      Interpolation.cosine(a, b, tx),
      Interpolation.cosine(c, d, ty),
      ty
    )
  }
}