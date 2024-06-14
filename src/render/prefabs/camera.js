import { createTransform2D } from "../../transform/index.js"
import { Camera } from "../components/index.js"

export function createCamera2D(x, y, a, sX = 1, sY = 1) {
  return [...createTransform2D(x, y, a, sX, sY), new Camera()]
}