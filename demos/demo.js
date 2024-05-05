import {
  App,
  Viewport,
  RAFPlugin,
  Canvas2DRendererPlugin,
  Physics2DPlugin,
  TweenPlugin,
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

export function init(selector) {
  manager
    .registerPlugin(new RAFPlugin())
    .registerPlugin(new Physics2DPlugin())
    .registerPlugin(new Canvas2DRendererPlugin())
    .registerPlugin(new TweenPlugin())
    .registerDebugger(new Body2DDebugger())
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

async function loadAssets(manager) {
  await soundloader.load("assets/hit.mp3")
  await imageloader.load("assets/warrior.png")
}