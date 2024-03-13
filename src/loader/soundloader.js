import { DEVICE } from "../device/index.js"
import { Loader } from "./loader.js"

export class SoundLoader {
  /**
   * @type {{ [x: string]: any; }}
   */
  resources = {}
  manager
  baseUrl = ""
  constructor(manager = new LoadManager()) {
    this.manager = manager
  }
  verify(extension){
    if (!DEVICE.supportedAudio.includes(extension))return true
    return false
  }
  /**
   * @param {string} url
   */
  parse(request) {
    if(!request.ok) return null
    const raw = await request.arrayBuffer()

    return {
      buffer: raw
    }
  }
}