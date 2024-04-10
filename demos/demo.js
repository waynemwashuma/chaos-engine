import {
  App,
  Viewport,
  RAFPlugin,
  Renderer2DPlugin,
  Physics2DPlugin,
  FPSDebugger,
  Body2DDebugger,
  Storage,
  LoadManager,
  SoundLoader,
  ImageLoader,
  createCamera2D
} from "/src/index.js"

const loadmanager = new LoadManager()
const imageloader = new ImageLoader(loadmanager)
const soundloader = new SoundLoader(loadmanager)
export const examples = new Map()
export const manager = new App()
export const viewport = new Viewport()

export function init(selector) {
  Viewport.bindTo(viewport, document.querySelector("#can"))
  Viewport.set(viewport, innerWidth, innerHeight * 0.5)
  window.onresize = () => {
    Viewport.set(viewport, innerWidth, innerHeight * 0.5)
  }
  window.onorientationchange = () => {
    Viewport.set(viewport, innerWidth, innerHeight * 0.5)
  }
  manager.registry.create(createCamera2D())
  manager
    .registerPlugin(new RAFPlugin())
    .registerPlugin(new Physics2DPlugin())
    .registerPlugin(new Renderer2DPlugin({
      viewport
    }))
    .registerDebugger(new FPSDebugger())
    .registerDebugger(new Body2DDebugger({
      clearRenderer: false,
      drawCollisionArm: false
    }))
    .run()
  play(Storage.get("setup") || "")
}
export function play(name) {
  manager.registry.clear()
  manager.registry.create(createCamera2D())
  Storage.set("setup", name)
  if (examples.has(name))
    examples.get(name)(manager.registry)
}
export function register(n, f) {
  examples.set(n, f)
}

soundloader.load("assets/hit.mp3")
imageloader.load("assets/warrior.png")
console.log(manager)