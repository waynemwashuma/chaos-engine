import { BodySprite } from "../render/index.js"

/**
 * @param {Manager} manager
 */
export function bodyDebugger(manager) {
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