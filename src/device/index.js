export const DEVICE = {
  webgpu: false,
  webgl: false,
  canvas: false,
  webAudio: false,
  audio: false,

  supportedAudio: [],
  supportedImages: [],

  windows: false,
  mac: false,
  android: false,
  linux: false,
  ios: false,

  chrome: false,
  firefox: false,
  edge: false,
  ie: false,
  safari: false,
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
  this.edge = true;
}
else if (/Opera/.test(ua))
{
  this.opera = true;
}
else if (/Safari/.test(ua))
{
  this.safari = true;
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

  if (ae.canPlayType('audio/x-m4a;') || ae.canPlayType('audio/aac;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("m4a")
  }
}

DEVICE.canvas = !!window.CanvasRenderingContext2D;
DEVICE.webgl = !!window.WebGLRenderingContext;

Object.freeze(DEVICE)
Object.freeze(DEVICE.supportedAudio)
Object.freeze(DEVICE.supportedImages)