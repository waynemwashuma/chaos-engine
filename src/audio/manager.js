import { Utils } from "../utils/index.js"
import { Sfx } from "./audio.js"

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
   *  @private
   * @type {Object<string,AudioBuffer>}
   */
  sfx = {}
  /**
   * The name of the background music playing.
   * 
   *  @private
   * @type {string}
   */
  _backname = ""
  /**
   * The audiobuffer of the background music.
   * 
   *  @private
   * @type {Sfx | null }
   */
  _background = null
  /**
   * List of playing sounds
   * 
   * @private
   * @type {Sfx[]}
   */
  playing = []
  /**
   * What to play after loading the audiobuffers.
   * 
   * @private
   * @type {Record<string,number>}
   */
  toplay = {}
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
  /**
   * @type {string}
   */
  baseUrl = ""
    /**
     * If the manager can play a sound.
   * @type boolean
   */
  canPlay = false
  constructor() {
    this.masterGainNode = this.ctx.createGain()
    this.masterGainNode.connect(this.ctx.destination)
    this.canPlay = this.ctx.state == "running"
    let that = this
    window.addEventListener("pointerdown", function resume() {
      that.ctx.resume()
      if (that.ctx.state == "running") {
        removeEventListener("pointerdown", resume)
        that.canPlay = true
      }
    })
  }
  /**
   * Load a sound into a sound manager
   * 
   * @param {string} src
   */
  load(src) {
    let name = src.split(".")[0]
    fetch(this.baseUrl + "/" + src)
      .then(e => e.arrayBuffer())
      .then(e => this.ctx.decodeAudioData(e))
      .then(e => {
        this.sfx[name] = e
        if (this._backname == name)
          this.playBackgroundMusic(name)
        if (name in this.toplay) {
          this.playEffect(name)
        }
      }).catch(err => console.log(err))
  }
  /**
   * Loads all audio from the loader.
   * 
   * @param {*} loader
   */
  /*loadFromLoader(loader) {
    for (var n in loader.sfx) {
      let name = n
      this.ctx.decodeAudioData(loader.sfx[n]).then(e => {
        this.sfx[n] = e
        if (this._backname == name)
          this.playMusic(name)
        if (name in this.toplay) {
          this.playEffect(name)
        }
      })
    }
  }*/
  /**
   * Plays a single audio as the background in a loop throughout the game
   * 
   * @param {string} name
   */
  playBackgroundMusic(name) {
    this._backname = name
    if (!(name in this.sfx))
      return
    this._background = new Sfx(this, this.sfx[name])
    this._background.loop = true
    this._background.play()
  }
  /**
   * Plays a sound only once.
   * 
   * @param {string} name Name of audio to play.
   * @param {number} [offset] Where to start playing the audio.It is in seconds.
   * @param {number} [duration] how long in seconds will the audio defaults to total duration of the selected audio. 
   */
  playEffect(name, offset = 0, duration = 0) {
    if (!(name in this.sfx)) {
      this.toplay[name] = 1
      return
    }
    let s = new Sfx(this, this.sfx[name])
    let id = this.playing.length
    s.id = id
    s.offset = offset
    if (duration)
      s.duration = duration
    this.playing.push(s)
    s.play()
  }

  /**
   * Creates and returns an SFX.
   * 
   * @param {string} name
   * @rerurns Sfx
   */
  createSfx(name) {
    ///throw error if name is not in this.
    return new Sfx(this, this.sfx[name])
  }
  /**
   * Pauses currently playing sounds.
   */
  pauseAll() {
    this.playing.forEach(sound => {
      sound.pause()
    })
  }
  /**
   * Sets the volume to zero.Sounds will continue playing but not be audible.
   */
  mute() {
    if(!this.masterGainNode)return
    this._mute = this.masterGainNode.gain.value
    this.masterGainNode.gain.value = 0

  }
  /**
   * Restores the volume before it was muted.
   */
  unmute() {
    this.masterGainNode.gain.value = this._mute
  }
  /**
   * Removes an sfx from the handler and disconnects it from its destination.
   * 
   * @param {Sfx} sfx
   */
  remove(sfx) {
    let id = this.playing.indexOf(sfx)
    if (id == -1) return
    sfx.disconnect()
    Utils.removeElement(this.playing, id)
  }
}