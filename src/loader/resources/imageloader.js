import { DEVICE } from "../../device/index.js"
import { Loader } from "./loader.js"
import { Picture } from "../../asset/index.js"
import { Vector2 } from "../../math/index.js"

/**
 * @extends {Loader<Picture>}
 */
export class ImageLoader extends Loader {
  /**
   * @param {string} extension
   */
  verify(extension) {
    if (DEVICE.supportedImages.includes(extension)) return true
    return false
  }
  placeholder() {
    return Picture.PLACEHOLDER
  }
  /**
   * @param {Response} request
   */
  async parse(request) {
    const raw = await request.arrayBuffer()
    const dimensions = await getDimensions(raw)
    return new Picture(raw,dimensions)
  }
}

/**
 * @param {BlobPart} raw
 * @returns {Promise<Vector2>}
 */
function getDimensions(raw) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([raw]))
    const img = new Image()
    img.onload = e => {
      resolve(new Vector2(img.width, img.height))
      URL.revokeObjectURL(url)
    }
    img.src = url

  })
}