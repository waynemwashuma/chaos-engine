import { DEVICE } from "../device/index.js"
import { Logger } from "../logger/index.js"
import { getURLName, getURLExtension } from "./utils.js"

export class SoundLoader {
  /**
   * @type {{ [x: string]: any; }}
   */
  resources = {}
  onSingleFinish = () => {}
  onfinish = () => {}
  baseUrl = ""
  /**
   * @param {string[]} urls
   */
  async load(urls) {
    for (var url of urls) {
      const name = getURLName(url)
      const extension = getURLExtension(url)

      if (!DEVICE.supportedAudio.includes(extension)) {
        Logger.error("`SoundLoader()` could not load in \"" + url + "\" : Unsupported extension name.")
        continue
      }

      const request = await fetch(url)

      if (!request.ok) {
        Logger.error("`SoundLoader()` could not load in \"" + url + "\" : Resource not found.")
        continue
      }

      const raw = await request.arrayBuffer()

      this.resources[name] = {
        buffer: raw
      }
      //this.onSingleFinish(url,this.resources[name])
    }
    //this.onfinish(this.resources)
  }
}