import { clamp, rand } from "./math.js"
/**
 * A color manipulation class.
 */
export class Color {

  /**
   * @param {number} [r=0] - red component [0 .. 255]
   * @param {number} [g=0] - green component [0 .. 255]
   * @param {number} [b=0] - blue component [0 .. 255]
   * @param {number} [alpha=1.0] - alpha value [0.0 .. 1.0]
   */
  constructor(r = 0, g = 0, b = 0, alpha = 1.0) {
    this.set(r, g, b, alpha);
  }

  /**
   * Set this color to the specified value.
   * @param {number} r - red component [0 .. 255]
   * @param {number} g - green component [0 .. 255]
   * @param {number} b - blue component [0 .. 255]
   * @param {number} [alpha=1.0] - alpha value [0.0 .. 1.0]
   */
  set(r, g, b, alpha = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = alpha;
    return this;
  }

  /**
   * Create a new copy of this color object.
   * @returns {Color} Reference to the newly cloned object
   */
  clone() {
    return new Color().copy(this);
  }

  /**
   * Copy a color object or CSS color into this one.
   * @param {Color} color
   * @returns {Color} Reference to this object for method chaining
   */
  copy(color) {
    return this.set(color.r, color.g, color.b, color.a)
  }

  /**
   * Blend this color with the given one using addition.
   * @param {Color} color
   * @returns {Color} Reference to this object for method chaining
   */
  add(color) {
    this.r = clamp(this.r + color.r, 0, 255);
    this.g = clamp(this.g + color.g, 0, 255);
    this.b = clamp(this.b + color.b, 0, 255);
    this.a = (this.a + color.a) / 2;

    return this;
  }

  /**
   * Darken this color value by 0..1
   * @param {number} scale
   * @returns {Color} Reference to this object for method chaining
   */
  darken(scale) {
    scale = clamp(scale, 0, 1);
    this.r *= scale;
    this.g *= scale;
    this.b *= scale;

    return this;
  }

  /**
   * Linearly interpolate between this color and the given one.
   * @param {Color} color
   * @param {number} alpha - with alpha = 0 being this color, and alpha = 1 being the given one.
   * @returns {Color} Reference to this object for method chaining
   */
  lerp(color, alpha) {
    alpha = clamp(alpha, 0, 1);
    this.r += (color.r - this.r) * alpha;
    this.g += (color.g - this.g) * alpha;
    this.b += (color.b - this.b) * alpha;

    return this;
  }

  /**
   * Lighten this color value by 0..1
   * @param {number} scale
   * @returns {Color} Reference to this object for method chaining
   */
  lighten(scale) {
    scale = clamp(scale, 0, 1);
    this.r = clamp(this.r + (1 - this.r) * scale, 0, 1);
    this.g = clamp(this.g + (1 - this.g) * scale, 0, 1);
    this.b = clamp(this.b + (1 - this.b) * scale, 0, 1);

    return this;
  }

  /**
   * Generate random r,g,b values for this color object
   * @param {number} [min=0] - minimum value for the random range
   * @param {number} [max=255] - maxmium value for the random range
   * @returns {Color} Reference to this object for method chaining
   */
  random(min = 0, max = 255) {
    if (min < 0) {
      min = 0;
    }
    if (max > 255) {
      max = 255;
    }

    return this.set(
      rand(min, max),
      rand(min, max),
      rand(min, max),
      this.a
    );
  }


  toArray(array, offset = 0) {
    array[offset] = this.r
    array[offset + 1] = this.g
    array[offset + 2] = this.b
    array[offset + 3] = this.a

    return array
  }
}