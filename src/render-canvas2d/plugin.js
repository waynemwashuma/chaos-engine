import { Viewport } from "../render/index.js"
import { assert } from "../logger/index.js"
import { drawImage } from "./canvas.js"
import { MaterialType, Canvas2DMaterial } from "./components/index.js"
export class Canvas2DRendererPlugin {
  constructor(options = {}) {}
  /**
   * @param {App} manager
   */
  register(manager) {
    const viewport = new Viewport()
    manager.setResource(viewport)
    document.body.append(viewport.domElement)
    manager.setResource(viewport.domElement.getContext("2d"))
    manager.registerSystem(renderSprites)
  }
}

function renderSprites(manager) {
  const query = manager.query(["position2d", "orientation2d", "scale2d", "buffergeometry", "canvas2dmaterial"])
  const dt = manager.getResource("delta")
  const viewport = manager.getResource("viewport")
  /**@type {CanvasRenderingContext2D}*/
  const ctx = manager.getResource("canvasrenderingcontext2d")
  const camera = manager.query(["position2d", "orientation2d", "scale2d", "camera"]).single()
  assert(camera, "Please add a camera entity to the scene.")
  const [position, orientation, scale] = camera
  ctx.clearRect(0, 0, viewport.width, viewport.height)
  ctx.save()
  ctx.translate(
    position.x,
    position.y
  )
  ctx.rotate(
    orientation.value
  )
  ctx.scale(
    scale.x,
    scale.y
  )

  query.each(([position, orient, scale, geometry, material]) => {
    ctx.save()
    ctx.beginPath()
    ctx.translate(position.x, position.y)
    ctx.rotate(orient)
    ctx.scale(scale.x, scale.y)
    // @ts-ignore
    renderMaterial(ctx, material, geometry.drawable, dt)
    ctx.closePath()
    ctx.restore()
  })
  ctx.restore()
}

function renderMaterial(ctx, material, path, dt) {
  switch (material.type) {
    case MaterialType.BASIC:
      renderBasic(ctx, material, path)
      break;
    case MaterialType.TEXT:
      renderText(ctx, material)
      break;
    case MaterialType.IMAGE:
      renderImage(ctx, material)
      break;
  }
}

function renderBasic(ctx, material, path) {
  const wireframe = Canvas2DMaterial.getUniform(material, 'wireframe')
  const fill = Canvas2DMaterial.getUniform(material, 'fill')
  const stroke = Canvas2DMaterial.getUniform(material, 'stroke')
  ctx.fillStyle = fill
  ctx.strokeStyle = stroke
  if (!wireframe)
    ctx.fill(path)
  ctx.stroke(path)
}

function renderText(ctx, material) {
  const text = Canvas2DMaterial.getUniform(material, 'text')
  const textAlign = Canvas2DMaterial.getUniform(material, 'center')
  const font = Canvas2DMaterial.getUniform(material, 'font')
  const fill = Canvas2DMaterial.getUniform(material, 'fill')
  const stroke = Canvas2DMaterial.getUniform(material, 'stroke')

  ctx.textAlign = textAlign
  ctx.fillStyle = fill
  ctx.strokeStyle = stroke
  ctx.font = font
  ctx.fillText(text, 0, 0)
  ctx.strokeText(text, 0, 0)
}

function renderImage(ctx, material) {
  const image = Canvas2DMaterial.getUniform(material, 'image')
  const width = Canvas2DMaterial.getUniform(material, 'width')
  const height = Canvas2DMaterial.getUniform(material, 'height')
  const frameWidth = Canvas2DMaterial.getUniform(material, 'frameWidth')
  const frameHeight = Canvas2DMaterial.getUniform(material, 'frameHeight')
  const frameX = Canvas2DMaterial.getUniform(material, 'frameX')
  const frameY = Canvas2DMaterial.getUniform(material, 'frameY')
  drawImage(
    ctx,
    image,
    -width / 2,
    -height / 2,
    frameWidth,
    frameHeight,
    frameX,
    frameY,
    width,
    height
  )
}