import { DEVICE } from "../device/index.js"
import { Loader } from "./loader.js"

export class ImageLoader extends Loader {
  verify(extension) {
    if (DEVICE.supportedImages.includes(extension)) return true
    return false
  }
  /**
   * @param {string[]} urls
   */
  async parse(request) {
    if (!request.ok) return

    const raw = await request.arrayBuffer()
    const dimensions = await getDimensions(raw)
    return {
      buffer: raw,
      dimensions
    }
  }
}

/**
 * @param {string} url
 */
function getDimensions(raw) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([raw]))
    const img = new Image()
    img.onload = e => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.src = url
    URL.revokeObjectURL(url)
  })
}