import { DEVICE } from "../device/index.js"
import { Logger } from "../logger/index.js"
import { getURLName, getURLExtension } from "./utils.js"

export class TextureLoader {
  /**
   * @type {{ [x: string]: { buffer: ArrayBuffer, dimensions: any; } }}
   */
  resources = {}
  onSingleFinish = () => {}
  onfinish = () => {}
  baseUrl = ""
  /**
   * @param {string[]} urls
   */
  async load(urls) {
    for (const url of urls) {
      const name = getURLName(url)
      const extension = getURLExtension(url)

      if (!DEVICE.supportedImages.includes(extension)) {
        Logger.error("`ImageLoader()` could not load in \"" + url + "\" : Unsupported extension name.")
        continue
      }

      const request = await fetch(url)

      if (!request.ok) {
        Logger.error("`ImageLoader()` could not load in \"" + url + "\" : Resource not found.")
        continue
      }

      const raw = await request.arrayBuffer()
      const imgUrl = URL.createObjectURL(new Blob([raw]))
      const dimensions = await getDimensions(imgUrl)

      URL.revokeObjectURL(imgUrl)
      this.resources[name] = {
        buffer: raw,
        dimensions
      }
      this.onSingleFinish()
    }
    this.onfinish()
  }
}

/**
 * @param {string} url
 */
function getDimensions(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = e => {
      resolve({
        width: img.width,
        height: img.height
      })
    }
    img.src = url
  })
}