import {
  App,
  TimePlugin,
  InputPlugin,
  TransformPlugin,
  MovablePlugin,
  ProfilerPlugin,
  Canvas2DRendererPlugin,
  Physics2DPlugin,
  AudioPlugin,
  TweenPlugin,
  LoaderPlugin,
  FPSDebugger,
  Body2DDebugger,
  Storage,
  Vector2,
  sq,
  createCamera2D,
  Shape2D
} from "/src/index.js"

export const examples = new Map()
export const app = new App()
const appTarget = "#can"
export function init() {
  app
    .registerPlugin(new TransformPlugin())
    .registerPlugin(new MovablePlugin())
    .registerPlugin(new ProfilerPlugin())
    .registerPlugin(new LoaderPlugin())
    .registerPlugin(new TimePlugin())
    .registerPlugin(new InputPlugin())
    .registerPlugin(new Physics2DPlugin({
      profile: true
    }))
    .registerPlugin(new Canvas2DRendererPlugin())
    .registerPlugin(new TweenPlugin())
    .registerPlugin(new AudioPlugin())
    .registerDebugger(new Body2DDebugger({
      drawBounds: false,
      drawVelocity: true,
      drawContacts: true
    }))
    .registerDebugger(new FPSDebugger())
    .registerStartupSystem(loadAssets)
    .registerStartupSystem(setupViewport)
    .registerStartupSystem(setupCamera)
    .registerStartupSystem(setupInput)
    .registerUpdateSystem(debugInput)
    .run()
}
export function play(name) {
  app.registry.clear()
  setupCamera(app.registry)
  Storage.set("setup", name)
  if (examples.has(name))
    examples.get(name)(app.registry)
}
export function register(n, f) {
  examples.set(n, f)
}

function setupCamera(app) {
  app.create(createCamera2D())
}

function setupViewport(app) {
  const viewport = app.getResource("viewport")

  viewport.bindTo(document.querySelector(appTarget))
  viewport.set(innerWidth, innerHeight * 0.5)
  window.onresize = () => {
    viewport.set(innerWidth, innerHeight * 0.5)
  }
  window.onorientationchange = () => {
    viewport.set(innerWidth, innerHeight * 0.5)
  }
}

function setupInput(app) {
  const event = app.getResource("domeventhandler")
  event.bindTo(document.querySelector(appTarget))
}

function loadAssets(app) {
  const soundloader = app.getResource("soundloader")
  const imageloader = app.getResource("imageloader")
  soundloader.load("assets/hit.mp3")
  imageloader.load("assets/warrior.png")
}

function debugInput(registry){
  const touch = registry.getResource("touches").getOne()
  console.log(touch)
  
}
window.app = app