import { Utils } from "../utils/index.js"

/**
 * Manages playing of audio using Web Audio.
 */
export class AudioHandler {
  /**
   * Audio context to use.
   * 
   *  @private
   * @type {AudioContext}
   */
  ctx = new AudioContext()
  /**
   * List of audio buffers to use.
   * 
   * @private
   * @type {AudioBufferSourceNode[]}
   */
  sfx = []
  /**
   * Volume to resume playing when unmuted.
   * 
   * @private
   * @type {number}
   */
  _mute = 1
  /**
   * Master volume for all sounds.
   * 
   * @private
   * @type {GainNode}
   */
  masterGainNode
  constructor() {
    this.masterGainNode = this.ctx.createGain()
    this.masterGainNode.connect(this.ctx.destination)
  }
  /**
   * Plays a sound.
   * 
   * @param {Sound} sound 
   * @param {boolean} [loop]
   * @param {number} [offset]
   * @param {number} [delay]
   * @param {number} [duration]
   * @returns {PlaybackId}
   */
  play(sound, loop = false, delay = 0, offset = 0, duration = sound.audiobuffer.duration) {
    const source = this.ctx.createBufferSource()
    source.buffer = sound.audiobuffer
    source.connect(this.masterGainNode)
    source.start(delay, offset, duration)
    source.loop = loop
    return this.sfx.push(source) - 1
  }
  mute() {
    this._mute = this.masterGainNode.gain.value
    this.masterGainNode.gain.value = 0
  }
  /**
   * 
   */
  unmute() {
    this.masterGainNode.gain.value = this._mute
  }
  /**
   * @param {PlaybackId} id
   */
  stop(id) {
    this.sfx[id].disconnect()
    Utils.removeElement(this.playing, id)
  }
}

/**
 * @typedef {number} PlaybackId
*/