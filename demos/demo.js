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
  manager
    .registerPlugin(new RAFPlugin())
    .registerPlugin(new Physics2DPlugin())
    .registerPlugin(new Renderer2DPlugin({
      viewport
    }))
    .registerDebugger(new Body2DDebugger({
      clearRenderer: false,
      drawCollisionArm: false
    }))
    .registerStartupSystem(setupCamera)
    .registerDebugger(new FPSDebugger())
    .run()

  play(Storage.get("setup") || "")
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

soundloader.load("assets/hit.mp3")
imageloader.load("assets/warrior.png")