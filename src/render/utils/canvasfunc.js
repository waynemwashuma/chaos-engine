/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function line(ctx, x1, y1, x2, y2) {
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function rect(ctx, x, y, w, h) {
  ctx.rect(x, y, w, h)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function circle(ctx, x, y, r) {
  ctx.arc(x, y, r, 0, Math.PI * 2)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function vertices(ctx, vertices, close = true) {
  if (vertices.length < 2) return;
  ctx.moveTo(vertices[0].x, vertices[0].y)
  for (var i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y)
  }
  if (close)
    ctx.lineTo(vertices[0].x, vertices[0].y)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function arc(ctx, x, y, r, start, end) {
  ctx.arc(x, y, r, start, end)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function fillText(ctx, text, x, y) {
  ctx.fillText(text, x, y)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function fill(ctx, color = "black", fillRule) {
  ctx.fillStyle = color
  ctx.fill(fillRule)
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function stroke(ctx, color = "black", width = 1) {
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.stroke()
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawImage(
  ctx,
  img,
  x,
  y,
  w = img.width,
  h = img.height,
  ix = 0,
  iy = 0
) {
  ctx.drawImage(img, w * ix, h * iy, w, h,
    x,
    y,
    w, h)
}