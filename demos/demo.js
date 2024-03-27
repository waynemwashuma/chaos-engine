import {
  Manager,
  Renderer2D,
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
export const renderer = new Renderer2D()

export function init(selector) {
  Renderer2D.bindTo(renderer, selector)
  Renderer2D.setViewport(renderer, innerWidth, innerHeight * 0.5)
  renderer.domElement.style.backgroundColor = "black"
  //renderer.camera.transform.scale.y = -1
  //renderer.camera.transform.position.y = renderer.width

  play(Storage.get("setup"))
  window.onresize = () => {
    renderer.setViewport(innerWidth, innerHeight * 0.5)
  }
  window.onorientationchange = () => {
    renderer.setViewport(innerWidth, innerHeight * 0.5)
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
manager.registerPlugin(new Renderer2DPlugin(renderer))

//debuggers
fpsDebugger(manager)
bodyDebugger(manager, {
  clearRenderer: false,
  drawCollisionArm: false
})

let a = 0;
let t = performance.now();
for(let i = 0;i<100000000;i++){
  let b = a + 1;
  a = b.valueOf();
};
console.log(performance.now()-t);