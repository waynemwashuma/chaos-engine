import { Transform } from "../../intergrator/index.js"
export class CameraOffset2D extends Transform{}
export class Camera{}
export function createCamera2D(x, y, a, sX, sY) {
  return [new Transform(x,y,a),new CameraOffset2D(),new Camera()]
}