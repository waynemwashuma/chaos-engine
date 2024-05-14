import {
  App,
  Viewport,
  TimePlugin,
  Canvas2DRendererPlugin,
  Physics2DPlugin,
  AudioPlugin,
  TweenPlugin,
  LoaderPlugin,
  FPSDebugger,
  Body2DDebugger,
  Storage,
  createCamera2D
} from "/src/index.js"

export const examples = new Map()
export const manager = new App()

export function init(selector) {
  manager
    .registerPlugin(new LoaderPlugin())
    .registerPlugin(new TimePlugin())
    .registerPlugin(new Physics2DPlugin())
    .registerPlugin(new Canvas2DRendererPlugin())
    .registerPlugin(new TweenPlugin())
    .registerPlugin(new AudioPlugin())
    .registerDebugger(new Body2DDebugger({
      drawBounds: true,
    }))
    .registerDebugger(new FPSDebugger())
    .registerStartupSystem(loadAssets)
    .registerStartupSystem(setupViewport)
    .registerStartupSystem(setupCamera)
    .run()
}
export function play(name) {
  manager.registry.clear()
  setupCamera(manager.registry)
  Storage.set("setup", name)
  if (examples.has(name))
    examples.get(name)(manager.registry)
}
export function register(n, f) {
  examples.set(n, f)
}

function setupCamera(manager) {
  manager.create(createCamera2D())
}

function setupViewport(manager) {
  const viewport = manager.getResource("viewport")

  viewport.bindTo(document.querySelector("#can"))
  viewport.set(innerWidth, innerHeight * 0.5)
  window.onresize = () => {
    viewport.set(innerWidth, innerHeight * 0.5)
  }
  window.onorientationchange = () => {
    viewport.set(innerWidth, innerHeight * 0.5)
  }
}

function loadAssets(manager) {
  const soundloader = manager.getResource("soundloader")
  const imageloader = manager.getResource("imageloader")
  soundloader.load("assets/hit.mp3")
  imageloader.load("assets/warrior.png")
}