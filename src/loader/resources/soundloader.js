import { DEVICE } from "../../device/index.js"
import { Loader } from "./loader.js"

/**
 * @extends {Loader<{buffer: ArrayBuffer}>}
 */
export class SoundLoader extends Loader {
  /**
   * @inheritdoc
   * @param {string} extension
   */
  verify(extension){
    if (DEVICE.supportedAudio.includes(extension))return true
    return false
  }
  /**
   * @param {Response} request
   */
  async parse(request) {
    if(!request.ok) return
    const raw = await request.arrayBuffer()

    return {
      buffer: raw
    }
  }
}