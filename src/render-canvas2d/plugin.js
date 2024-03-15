import { Renderer2D } from "./canvas.js"

export function Renderer2DPlugin(manager) {
  const renderer = new Renderer2D()
  
  manager.registerSystem((dt, manager) => {
    const [transform, sprite] = manager.query("transform", "sprite").raw()
    Renderer2D.update(renderer, transform, sprite, dt)
  })
  return renderer
}