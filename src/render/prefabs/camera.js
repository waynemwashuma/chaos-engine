import { createTransform2D } from "../../transform/index.js"
import { Camera } from "../components/index.js"

export function createCamera2D(x, y, a, sX, sY) {
  return [...createTransform2D(x, y, a), new Camera()]
}