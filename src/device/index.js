/**
 * Contains values showing which features are supported,general model of the device and browser used.
 */

export const DEVICE = {
  /**
   * Whether this device supports WebGPU
   * 
   * @type {boolean}
   */
  webgpu: false,
  /**
   * Whether this device supports WebGL
   * 
   * @type {boolean}
   */
  webgl: false,
  /**
   * Whether this device supports 2D canvas
   * 
   * @type {boolean}
   */
  canvas: false,
  /**
   * Whether this device supports WebAudio
   * 
   * @type {boolean}
   */
  webAudio: false,
  /**
   * Whether this device supports Audio tag.
   * 
   * @type {boolean}
   */
  audio: false,

  /**
   * A list of audio extensions this device supports.
   * 
   * @type {string[]}
   */
  supportedAudio: [],
  //Todo - Get the supported images correctly
  /**
   * A list of image extensions this device supports.
   * 
   * @type {string[]}
   */
  supportedImages: ["png","jpeg","svg","jpg"],

  /**
   * Whether this device uses windows
   * 
   * @type {boolean}
   */
  windows: false,
  /**
   * Whether this device uses MacOS
   * 
   * @type {boolean}
   */
  mac: false,
  /**
   * Whether this device uses android
   * 
   * @type {boolean}
   */
  android: false,
  /**
   * Whether this device uses linux
   * 
   * @type {boolean}
   */
  linux: false,
  /**
   * Whether this device uses IOS
   * 
   * @type {boolean}
   */
  ios: false,

  /**
   * If browser used is Chrome.
   * 
   * @type {boolean}
   */
  chrome: false,
  /**
   * If browser used is FireFox.
   * 
   * @type {boolean}
   */
  firefox: false,
  /**
   * If browser used is Edge.
   * 
   * @type {boolean}
   */
  edge: false,
  /**
   * If browser used is Internet Explorer.
   * 
   * @type {boolean}
   */
  ie: false,
  /**
   * If browser used is Safari.
   * 
   * @type {boolean}
   */
  safari: false,
  /**
   * If browser used is Opera.
   * 
   * @type {boolean}
   */
  opera: false

}
const ua = navigator.userAgent
const ae = new Audio()

if (/Android/.test(ua)) {
  DEVICE.android = true
}
else if (/iP[ao]d|iPhone/i.test(ua)) {
  DEVICE.ios = true
}
else if (/Linux/.test(ua)) {
  DEVICE.linux = true
}
else if (/Mac OS/.test(ua)) {
  DEVICE.mac = true
}
else if (/Windows/.test(ua)) {
  DEVICE.windows = true
}


if (window.AudioContext && window.AudioBuffer && window.AudioBufferSourceNode) {
  DEVICE.webAudio = true
}

if (/Chrome/.test(ua)) {
  DEVICE.chrome = true;
}
else if (/Firefox/.test(ua)) {
  DEVICE.firefox = true;
}
else if (/Trident/.test(ua)) {
  DEVICE.edge = true;
}
else if (/Opera/.test(ua))
{
  DEVICE.opera = true;
}
else if (/Safari/.test(ua))
{
  DEVICE.safari = true;
}

if (DEVICE.audio = !!ae.canPlayType)
{
  if (ae.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("ogg")
  }

  if (ae.canPlayType('audio/mpeg;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("mp3")
  }
  if (ae.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("wav")
  }

  if (ae.canPlayType('audio/x-m4a;').replace(/^no$/,'') || ae.canPlayType('audio/aac;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("m4a")
  }
}

DEVICE.canvas = !!window.CanvasRenderingContext2D;
DEVICE.webgl = !!window.WebGLRenderingContext;

Object.freeze(DEVICE)
Object.freeze(DEVICE.supportedAudio)
Object.freeze(DEVICE.supportedImages)