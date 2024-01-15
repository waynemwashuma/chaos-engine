import { DEVICE } from "../device/index.js"
import { Err } from "../utils/index.js"
import { getURLName, getURLExtension } from "./utils.js"

export class SoundLoader {
  resources = []
  onSingleFinish = () => {}
  onfinish = () => {}
  baseUrl = ""
  async load(urls) {
    for (var url of urls) {
      const name = getURLName(url)
      const extension = getURLExtension(url)

      if (!DEVICE.supportedAudio.includes(extension)) {
        Err.error("`SoundLoader()` could not load in \"" + url + "\" : Unsupported extension name.")
        continue
      }

      const request = await fetch(url)

      if (!request.ok) {
        Err.error("`SoundLoader()` could not load in \"" + url + "\" : Resource not found.")
        continue
      }

      const raw = await request.arrayBuffer()

      this.resources[name] = {
        buffer: raw
      }
      this.onSingleFinish(url,this.resources[name])
    }
    this.onfinish(this.resources)
  }
}