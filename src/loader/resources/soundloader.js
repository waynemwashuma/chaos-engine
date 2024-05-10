import { DEVICE } from "../../device/index.js"
import { Sound } from "../../asset/index.js"
import { Loader } from "./loader.js"

/**
 * @extends {Loader<Sound>}
 */
export class SoundLoader extends Loader {
  /**
   * @type {OfflineAudioContext}
   */
  decoder = new OfflineAudioContext({
    sampleRate: 44100,
    length: 512
  })
  /**
   * @inheritdoc
   * @param {string} extension
   */
  verify(extension) {
    if (DEVICE.supportedAudio.includes(extension)) return true
    return false
  }
  placeholder(){
    return Sound.PLACEHOLDER
  }
  /**
   * @param {Response} request
   */
  async parse(request) {
    const raw = await request.arrayBuffer()
    const audiobuffer = await this.decoder.decodeAudioData(raw)

    return new Sound(audiobuffer, raw)
  }
}