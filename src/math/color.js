import { clamp, rand } from "./math.js"
import { Logger } from "../logger/index.js"

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
   * @deprecate
   * Set this color to the specified value.
   * @param {number} r - red component [0 .. 255]
   * @param {number} g - green component [0 .. 255]
   * @param {number} b - blue component [0 .. 255]
   * @param {number} [alpha=1.0] - alpha value [0.0 .. 1.0]
   * @returns {Color} Reference to this object for method chaining
   */
  set(r, g, b, alpha = 1.0) {
    Logger.deprecate("Color().set()", "Color.set()")
    return Color.set(this, r, g, b, alpha)
  }
  /**
   * @deprecate
   * Create a new copy of this color object.
   * @returns {Color} Reference to the newly cloned object
   */
  clone() {
    Logger.deprecate("Color().clone()", "Color.copy()")
    return Color.copy(this);
  }
  /**
   * @deprecate
   * Copy a color object or CSS color into this one.
   * @param {Color} color
   * @returns {Color} Reference to this object for method chaining
   */
  copy(color) {
    Logger.deprecate("Color().copy()", "Color.copy()")

    return Color.copy(color, this)
  }
  /**
   * Blend this color with the given one using addition.
   * 
   * @deprecated
   * @param {Color} color
   * @returns {Color} Reference to this object for method chaining
   */
  add(color) {
    Logger.deprecate("Color().add()", "Color.add()")

    this.r = clamp(this.r + color.r, 0, 255);
    this.g = clamp(this.g + color.g, 0, 255);
    this.b = clamp(this.b + color.b, 0, 255);
    this.a = (this.a + color.a) / 2;

    return this;
  }
  /**
   * Darken this color value by 0..1
   * 
   * @deprecated
   * @param {number} scale
   * @returns {Color} Reference to this object for method chaining
   */
  darken(scale) {
    Logger.deprecate("Color().darken()", "Color.darken()")

    scale = clamp(scale, 0, 1);
    this.r *= scale;
    this.g *= scale;
    this.b *= scale;

    return this;
  }
  /**
   * Lighten this color value by 0..1
   * 
   * @deprecated
   * @param {number} scale
   * @returns {Color} Reference to this object for method chaining
   */
  lighten(scale) {
    Logger.deprecate("Color().lighten()", "Color.lighten()")

    scale = clamp(scale, 0, 1);
    this.r = clamp(this.r + (1 - this.r) * scale, 0, 1);
    this.g = clamp(this.g + (1 - this.g) * scale, 0, 1);
    this.b = clamp(this.b + (1 - this.b) * scale, 0, 1);

    return this;
  }
  /**
   * Linearly interpolate between this color and the given one.
   * @deprecated
   * @param {Color} color
   * @param {number} alpha - with alpha = 0 being this color, and alpha = 1 being the given one.
   * @returns {Color} Reference to this object for method chaining
   */
  lerp(color, alpha) {
    Logger.deprecate("Color().lerp()", "Color.lerp()")

    alpha = clamp(alpha, 0, 1);
    this.r += (color.r - this.r) * alpha;
    this.g += (color.g - this.g) * alpha;
    this.b += (color.b - this.b) * alpha;

    return this;
  }
  /**
   * Generate random r,g,b values for this color object
   * @deprecated
   * @param {number} [min=0] - minimum value for the random range
   * @param {number} [max=255] - maxmium value for the random range
   * @returns {Color} Reference to this object for method chaining
   */
  random(min = 0, max = 255) {
    Logger.deprecate("Color().random()", "Color.random()")

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
  /**
   * @param {number[]} array
   */
  toArray(array, offset = 0) {
    Logger.deprecate("Color().toArray()")

    array[offset] = this.r
    array[offset + 1] = this.g
    array[offset + 2] = this.b
    array[offset + 3] = this.a

    return array
  }
  static random(min = 0, max = 255, out = new Color()) {
    return Color.set(
      out,
      rand(min, max),
      rand(min, max),
      rand(min, max)
    );
  }
  static set(color, r, g, b, a = 1.0) {
    color.r = r;
    color.g = g;
    color.b = b;
    color.a = alpha;
    return color;
  }
  static copy(color, out = new Color()) {
    return Color.set(out, color.r, color.g, color.b, color.a)
  }
  static add(color1, color2, out = new Color()) {
    out.r = clamp(color1.r + color2.r, 0, 255);
    out.g = clamp(color1.g + color2.g, 0, 255);
    out.b = clamp(color1.b + color2.b, 0, 255);
    out.a = (color1.a + color.a) / 2;

    return out;
  }
  static sub(color1, color2, out = new Color()) {
    out.r = clamp(color1.r - color2.r, 0, 255);
    out.g = clamp(color1.g - color2.g, 0, 255);
    out.b = clamp(color1.b - color2.b, 0, 255);
    out.a = (color1.a + color.a) / 2;

    return out;
  }
  static darken(color, scale, out = new Color()) {
    scale = clamp(scale, 0, 1)

    out.r = color.r * scale;
    out.g = color.g * scale;
    out.b = color.b * scale;
    out.a = color.a
    return this;
  }
  static lighten(color, scale, out = new Color()) {
    scale = clamp(scale, 0, 1);
    out.r = clamp(color.r + (1 - color.r) * scale, 0, 1);
    out.g = clamp(color.g + (1 - color.g) * scale, 0, 1);
    out.b = clamp(color.b + (1 - color.b) * scale, 0, 1);

    return out;
  }
  static lerp(color1, color2, t, out = new Color()) {
    out.r += color.r + (color1.r - color2.r) * t;
    out.g += color.g + (color1.g - color2.g) * t;
    out.b += color.b + (color1.b - color2.b) * t;
    out.a = color1.a + (color1.a - color2.a) * t;

    return out
  }
}