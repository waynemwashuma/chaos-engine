import {
  Position2D,
  Orientation2D,
  Scale2D,
  Position3D,
  Orientation3D,
  Scale3D
} from "./components/index.js"
import { Dimension } from "../utils/index.js"
export class TransformPlugin {
  /**
   * @type {TransformPluginOptions}
   */
  options
  /**
   * @param {TransformPluginOptions} options
   */
  constructor(options = {}) {
    options.dimension = options.dimension ?? Dimension.both
    this.options = options
  }
  register(app) {
    const { dimension } = this.options
    if (
      dimension === Dimension.two ||
      dimension === Dimension.both
    ) {
      app
        .registerType(Position2D)
        .registerType(Orientation2D)
        .registerType(Scale2D)
    }
    if (
      dimension === Dimension.three ||
      dimension === Dimension.both
    ) {
      app
        .registerType(Position3D)
        .registerType(Orientation3D)
        .registerType(Scale3D)
    }
  }
}

/**
 * @typedef TransformPluginOptions
 * @property {Dimension} [dimension]
 */