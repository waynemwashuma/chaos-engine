import { Manager } from "../ecs/index.js"
import { Viewport } from "../render/index.js"
import { assert } from "../logger/index.js"
import { drawImage } from "./canvas.js"
import { MaterialType,Canvas2DMaterial } from "./components/index.js"
export class Canvas2DRendererPlugin {
  constructor(options = {}) {
    this.renderer = options.viewport
    this.camera = options.camera
    this.enableSorting = options.enableSorting ?? false
  }
  /**
   * @param {Manager} manager
   */
  register(manager) {
    const viewport = new Viewport()
    manager.setResource(viewport)
    document.body.append(viewport.domElement)
    manager.setResource(viewport.domElement.getContext("2d"))
    if (this.enableSorting)
      manager.registerSystem(renderSortedSprites)
    else
      manager.registerSystem(renderSprites)
  }
}

function renderSprites(manager) {
  const query = manager.query(["transform", "buffergeometry", "canvas2dmaterial"])
  const dt = manager.getResource("delta")
  const viewport = manager.getResource("viewport")
  /**@type {CanvasRenderingContext2D}*/
  const ctx = manager.getResource("canvasrenderingcontext2d")
  const camquery = manager.query(["transform", "camera"]).single()
  assert(camquery,"Please add a camera entity to the scene.")
  const camtransform = camquery[0]
  ctx.clearRect(0, 0, viewport.width, viewport.height)
  ctx.save()
  ctx.translate(
    camtransform.position.x,
    camtransform.position.y
  )
  ctx.rotate(
    camtransform.orientation
  )
  ctx.scale(
    camtransform.scale.x,
    camtransform.scale.y
  )

  query.each(([transform, geometry,material]) => {
    ctx.save()
    ctx.beginPath()
    ctx.translate(transform.position.x, transform.position.y)
    ctx.rotate(transform.orientation)
    ctx.scale(transform.scale.x, transform.scale.y)
    // @ts-ignore
    renderMaterial(ctx, material, geometry.drawable, dt)
    ctx.closePath()
    ctx.restore()
  })
  ctx.restore()
}

function renderSortedSprites(manager) {
  const [transform, geometry, material] = manager.query(["transform", "buffergeometry", "canvas2dmaterial"]).raw()
  const tra = transform.slice().flat()
  const geo = geometry.slice().flat()
  const mat = material.slice().flat()

  const dt = manager.getResource("delta")
  const viewport = manager.getResource("viewport")
  const ctx = manager.getResource("canvasrenderingcontext2d")
  
  const camquery = manager.query(["transform", "camera"]).single()
  assert(camquery,"Please add a camera entity to the scene.")
  const camtransform = camquery[0]
  quickSort(
    mat,
    (i, j) => {
      return Canvas2DMaterial.getUniform(mat[i], "zIndex") <
        Canvas2DMaterial.getUniform(mat[j], "zIndex")
    },
    (i, j) => {
      const temp1 = mat[j]
      const temp2 = tra[j]
      const temp3 = geo[j]

      mat[j] = mat[i]
      mat[i] = temp1
      tra[j] = tra[i]
      tra[i] = temp2
      geo[j] = geo[i]
      geo[i] = temp3
    }
  )

  ctx.clearRect(0, 0, viewport.width, viewport.height)
  ctx.rotate(
    camera.transform.orientation
  )
  ctx.scale(
    camera.transform.scale.x,
    camera.transform.scale.y
  )
  ctx.translate(
    camera.transform.position.x,
    camera.transform.position.y
  )
  for (let j = 0; j < sprites.length; j++) {
    Sprite.render(
      ctx,
      sprites[j],
      transforms[j].position,
      transforms[j].orientation,
      transforms[j].scale,
      dt
    )
  }
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

/**
 * @template T
 * @param {T[]} arr The array to sort.
 * @param {CompareFunc} compareFunc Makes comparisons on the elements on the array.Default is to return true if the lhs is less than rhs.
 * @param {SwapFunc} swapFunc Function to swap the elements in the array
 * @param {number} [min=0]
 * @param {number} [max=arr.length]
 */
function quickSort(arr, compareFunc, swapFunc, min = 0, max = arr.length - 1) {
  if (min < max) {
    let i = min - 1
    for (let j = min; j < max; j++) {
      if (compareFunc(j, max)) {
        i++
        swapFunc(i, j)
      }
    }
    swapFunc(i + 1, max)
    quickSort(arr, compareFunc, swapFunc, min, i)
    quickSort(arr, compareFunc, swapFunc, i + 2, max)
  }
}
/**
 * @callback CompareFunc
 * @param {number} i
 * @param {number} j
 * @returns {boolean}
 */

/**
 * @callback SwapFunc
 * @param {number} i
 * @param {number} j
 * @returns {void}
 */