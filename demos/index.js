import {
  Manager,
  Renderer2D,
  World2D,
  Intergrator,
  TweenManager,
  fpsDebugger,
  bodyDebugger,
  Storage
} from "/src/index.js"

export const manager = new Manager()
export const renderer = new Renderer2D()
export const world = new World2D()
export const tweener = new TweenManager()
export const demos = {
  manager,
  renderer,
  world,
  examples: new Map(),
  init: function(selector) {
    Renderer2D.bindTo(renderer,selector)
    Renderer2D.setViewport(renderer,innerWidth, innerHeight * 0.5)
    renderer.domElement.style.backgroundColor = "black"
    //renderer.camera.transform.scale.y = -1
    //renderer.camera.transform.position.y = renderer.width
    
    this.setup(Storage.get("setup"))
    window.onresize = () => {
      renderer.setViewport(innerWidth, innerHeight * 0.5)
    }
    window.onorientationchange = () => {
      renderer.setViewport(innerWidth, innerHeight * 0.5)
    }
  },
  setup: function(name) {
    manager.clear()
    Storage.set("setup",name)
    if(this.examples.has(name))
    this.examples.get(name)(manager)
  },
  play(n) {
    this.setup(n)
  },
  register(n, f) {
    this.examples.set(n, f)
  }
}

manager.setResource("renderer", renderer)
manager.setResource("world", world)
manager.setResource("tweener",tweener)

//Tweener
manager.registerSystem((dt, manager) => {
  const tweener = manager.getResource("tweener")

  TweenManager.update(tweener, dt)
})

//Intergrator
manager.registerSystem((dt, manager) => {
  const [transform, movable] = manager.query("transform", "movable").raw()

  Intergrator.update(transform, movable, 1/60)
})

//Physics
manager.registerSystem((dt, manager) => {
  const [entity, transform, movable, bounds, body] = manager.query("entity", "transform", "movable", "bounds", "body").raw()
  World2D.update(manager, world, entity, transform, movable, bounds, body, dt)
})

//Renderer
manager.registerSystem((dt, manager) => {
  const [transform, sprite] = manager.query("transform", "sprite").raw()
  Renderer2D.update(renderer, transform, sprite, dt)
}) /**/

//debuggers
fpsDebugger(manager)
bodyDebugger(manager,{
  clearRenderer: false,
  drawCollisionArm:false
})