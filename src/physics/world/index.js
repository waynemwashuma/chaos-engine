import { deprecate } from "../../logger/index.js"
/**
 * @deprecated
 * Class responsible for updating bodies,constraints and composites.
 */
export class World2D {

  constructor() {
    deprecate("World2D()", "Physics2DPlugin()")
    throws("breaking deprecation encountered.")
  }
}

/**
 * Todo - Remove in version 1.0.0
 * @deprecated
 */
export class World extends World2D {
  /**
   * @inheritdoc
   */
  constructor() {
    deprecate("World()", "World2D()")
    // @ts-ignore
    super(...arguments)
  }
}