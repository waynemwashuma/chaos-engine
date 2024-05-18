import { Interpolation } from "../interpolation.js"
export class Noise {
  /**
   * @param {number} x
   */
  static get1D(x, seed) {
    x += seed
    x = BigInt((x << 13) ^ x)
    x = (x * (x * x * 15731n + 789221n) + 1376312589n)
    x = parseInt(x.toString(2).slice(-31), 2)
    return 1.0 - x / 1073741824
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  static get2D(x, y, seed) {
    const intX = Math.floor(x)
    const intY = Math.floor(y)

    const tx = x - intX
    const ty = y - intY

    const a = Noise.get1D(intX + intY, seed)
    const b = Noise.get1D(intX + 1 + intY, seed)
    const c = Noise.get1D(intX + intY + 1, seed)
    const d = Noise.get1D(intX + 1 + intY + 1, seed)
    
    return Interpolation.cosine(
      Interpolation.cosine(a, b, tx),
      Interpolation.cosine(c, d, ty),
      ty
    )
  }
}