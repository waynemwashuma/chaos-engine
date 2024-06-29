import { BufferGeometry } from "../../render/index.js"
import { initCanvas2DGeometry } from "../canvas.js"
/**
 * @type {ComponentHook<BufferGeometry>}
 */
export function buffergeometryAddHook(geometry, entity, registry) {

  initCanvas2DGeometry(geometry)
}
/**
 * @type {ComponentHook<BufferGeometry>}
 */
export function buffergeometryRemoveHook(component, entity, registry) {}