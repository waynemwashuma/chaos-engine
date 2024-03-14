import { DEVICE } from "../device/index.js"
import { Loader } from "./loader.js"

export class SoundLoader extends Loader {
  verify(extension){
    if (DEVICE.supportedAudio.includes(extension))return true
    return false
  }
  /**
   * @param {string} url
   */
  async parse(request) {
    if(!request.ok) return null
    const raw = await request.arrayBuffer()

    return {
      buffer: raw
    }
  }
}