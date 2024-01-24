import { BodySprite } from "../render/index.js"

/**
 * @param {Manager} manager
 * @param {BodyDebbuggerOptions} options
 */
export function bodyDebugger(manager, options = {}) {
  Object.assign(options, {
    drawBounds: true,
    drawPosition: false,
    drawVelocity: false
  })
  manager.registerSystem("bodydebugger", {
    key: new Map(),
    renderer: null,
    init(manager) {
      this.renderer = manager.getSystem('renderer')
      manager.events.add('add', (entity) => {
        if (entity.has('body')) {
          entity.manager.getSystem('bodydebugger').add(entity.get("body"))
        }
        manager.events.add('remove', (entity) => {
          if (entity.has('body')) {
            entity.manager.getSystem('bodydebugger').remove(entity.get("body"))
          }
        })
      })
    },
    add(body) {
      const sprite = new BodySprite(body)
      sprite.drawBounds = options.drawBounds
      sprite.drawPosition = options.drawPosition
      sprite.drawVelocity = options.drawVelocity
      sprite.init(body.entity)
      this.renderer.add(sprite)
      this.key.set(body, sprite)
    },
    remove(body) {
      const sprite = this.key.get(body)
      this.renderer.remove(sprite)
      this.key.delete(body)
    },
    update() {}
  })
}

/**
 * @typedef BodyDebbuggerOptions
 * @property {boolean} drawBounds
 * @property {boolean} drawPosition
 * @property {boolean} drawVelocity
 */