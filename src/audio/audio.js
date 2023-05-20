import { Utils } from "../utils/index.js"

class Sfx {
  /**
   * 
   * @param {AudioContext} context 
   * @param {AudioBuffer} buffer
   */
  constructor(handler, buffer) {
    this.buffer = handler.ctx.createBufferSource()
    this.buffer.buffer = buffer
    this.finished = false
    this.id = -1
    let that = this
    this.buffer.onended = () => {
      handler.remove(that.id)
      that.finished = true
    }
  }
  play(offset = 0, delay = 0, loop = false) {
    this.buffer.start(delay, offset)
    this.buffer.loop = loop
  }
  disconnect() {
    this.buffer.disconnect()
  }
  connect(node) {
    this.buffer.connect(node)
  }
}
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
    this.toplay = {}
    this.gainNodes = [this.ctx.createGain()]
    this.gainNodes[0].connect(this.ctx.destination)
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
      }).catch(err => console.log(err))
  }
  playMusic(name) {
    this._backname = name
    if (!(name in this.sfx))
      return
    this._background = new Sfx(this, this.sfx[name])
    this._background.connect(this.gainNodes[0])
    this._background.play(0, 0, true)
  }
  playEffect(name, loop = false) {
    if (!(name in this.sfx)) {
      this.toplay[name] = this.toplay[name] || 0
      this.toplay[name] = +1
      return
    }
    let s = new Sfx(this, this.sfx[name])
    let id = this.playing.length
    s.id = id
    s.connect(this.gainNodes[0])
    this.playing.push(s)
    s.play(0, 0, loop)
    return s
  }
  playAll() {
    this.playing.forEach(sound => {
      sound.play()
    })
  }
  pauseAll() {
    this.playing.forEach(sound => {
      sound.stop()
    })
  }
  mute() {
    this._mute = this.gainNodes[0].gain
  }
  unmute() {
    this.gainNodes[0].gain = this._mute
  }
  remove(id) {
    if(id == -1)return
    Utils.removeElement(this.playing,id)
    if (id < this.playing.length)
      this.playing[id].id = id
  }
}

export {
  AudioHandler
}