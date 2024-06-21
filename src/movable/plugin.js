import {
  Velocity2D,
  Rotation2D,
  Acceleration2D,
  Torque2D,
  Velocity3D,
  Rotation3D,
  Acceleration3D,
  Torque3D
} from "./components/index.js"
import {Dimension} from "../utils/index.js"

export class MovablePlugin {
  /**
   * @type {MovablePluginOptions}
   */
  options
  /**
   * @param {MovablePluginOptions} options
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
        .registerType(Velocity2D)
        .registerType(Rotation2D)
        .registerType(Acceleration2D)
        .registerType(Torque2D)
    }
    if (
      dimension === Dimension.three ||
      dimension === Dimension.both
    ) {
      app
        .registerType(Velocity3D)
        .registerType(Rotation3D)
        .registerType(Acceleration3D)
        .registerType(Torque3D)
    }
  }
}

/**
 * @typedef MovablePluginOptions
 * @property {Dimension} [dimension]
 */