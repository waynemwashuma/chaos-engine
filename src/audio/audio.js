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
export {
  Sfx
}