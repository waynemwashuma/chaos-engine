import { Utils } from "../utils/index.js"
/**
 * This class is responsible for playing a singular sound.
*/
class Sfx {
  /**
   * @private
   * @type {AudioBuffer}
   */
  _soundBuffer = null
  /**
   * @private
   * @type {AudioBufferSourceNode}
   */
  _source = null
  /**
   * @private
   * @type {function}
   */
  _onended = null
  /**
   * @private
   * @type {AudioNode}
  */
  _destination = null
  /**
   * @private
   * @type {number}
  */
  _playingOffset = 0
  offset = 0
  loop = false
  delay = 0
  duration = 0
  /**
   * @param {AudioHandler} handler 
   * @param {AudioBuffer} buffer
   */
  constructor(handler, buffer) {
    this.handler = handler
    this.ctx = handler.ctx
    this._soundBuffer = buffer
    this._destination = handler.masterGainNode
    this.finished = false
    this.id = -1
    this.duration = buffer.duration

  }
  set onended(x) {
    this._onended = x
  }
  /**
   * Plays an sfx from the beginning.
  */
  play() {
    this._playingOffset = this.offset
    this.resume()
  }
  /**
   * Continues playing an sfx from where it was paused.
  */
  resume() {
    this._source = this.ctx.createBufferSource()
    this._source.buffer = this._soundBuffer
    this._startTime = Date.now()
    this._source.connect(this._destination)
    this._source.start(this.delay, this._playingOffset, this.duration)
    this._source.loop = this.loop
  }
  /**
   * Halts playing of an sfx.
  */
  pause() {
    this._source.stop()
    let time = (Date.now() - this._startTime) / 1000 + this._playingOffset
    this._playingOffset = this.duration <= time ? this.offset : time
  }
  /**
   * Disconnects this sfx from its current destination.
  */
  disconnect() {
    this._source.disconnect()
  }
  /**
   * Sets the given audionode to be the output destination of an sfx
   * 
   * @param {AudioNode} node
  */
  connect(node) {
    this._source.disconnect()
    this._destination = node
    this._source.connect(node)
  }
}

/**
 * Manages playing of audio using Web Audio.
*/
class AudioHandler {
  ctx = new AudioContext()
  sfx = {}
  _backname = ""
  _background = null
  playing = []
  toplay = {}
  baseUrl = ""
  _mute = 1
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
          this.playMusic(name)
        if (name in this.toplay) {
          this.playEffect(name)
        }
      }).catch(err => console.log(err))
  }
  /**
   * Loads all audio from the loader.
  */
  loadFromLoader(loader) {
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
  }
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
    this._background.connect(this.masterGainNode)
    this._background.play(0, 0, true)
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
   * Pauses currently playing sounds.
  */
  pauseAll() {
    this.playing.forEach(sound => {
      sound.stop()
    })
  }
  /**
   * Sets the volume to zero.Sounds will continue playing but not be audible.
  */
  mute() {
    this._mute = this.masterGainNode.gain
    this.masterGainNode.gain = 0
    
  }
  /**
   * Restores the volume before it was muted.
  */
  unmute() {
    this.masterGainNode.gain = this._mute
  }
  /**
   * Removes an sfx from the handler and disconnects it from its destination.
  */
  remove(sfx) {
    let id = this.playing.indexOf(sfx)
    if (id == -1) return
    sfx.disconnect()
    Utils.removeElement(this.playing, id)
  }
}

export {
  AudioHandler
}