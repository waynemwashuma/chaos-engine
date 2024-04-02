import {
  Manager,
  Viewport,
  Renderer2DPlugin,
  Physics2DPlugin,
  TweenPlugin,
  fpsDebugger,
  bodyDebugger,
  Storage,
  LoadManager,
  SoundLoader,
  ImageLoader
} from "/src/index.js"

export const examples = new Map()
export const loadmanager = new LoadManager()
export const imageloader = new ImageLoader(loadmanager)
export const soundloader = new SoundLoader(loadmanager)

export const manager = new Manager()
export const viewport = new Viewport()

export function init(selector) {

  Viewport.bindTo(viewport, document.querySelector("#can"))
  Viewport.set(viewport, innerWidth, innerHeight * 0.5)

  //viewport.camera.transform.scale.y = -1
  //viewport.camera.transform.position.y = viewport.width

  play(Storage.get("setup"))
  window.onresize = () => {
    Viewport.set(viewport, innerWidth, innerHeight * 0.5)

  }
  window.onorientationchange = () => {
    Viewport.set(viewport, innerWidth, innerHeight * 0.5)
  }
}
export function play(name) {
  manager.clear()
  Storage.set("setup", name)
  if (examples.has(name))
    examples.get(name)(manager)
}
export function register(n, f) {
  examples.set(n, f)
}

soundloader.load("assets/hit.mp3")
///imageloader.load("assets/dust.jpg")
imageloader.load("assets/warrior.png")

//Tweens
manager.registerPlugin(new TweenPlugin("tweenVector2"))

//Physics
manager.registerPlugin(new Physics2DPlugin())

//Renderer
manager.registerPlugin(new Renderer2DPlugin({
  viewport
}))

//debuggers
fpsDebugger(manager)
bodyDebugger(manager, {
  clearRenderer: false,
  drawCollisionArm: false
})