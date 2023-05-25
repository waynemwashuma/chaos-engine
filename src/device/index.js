export const DEVICE = {
  webgpu: false,
  webgl: false,
  canvas2d: false,
  canvas: false,
  webAudio: false,

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
  safari: false,

}
let ua = navigator.userAgent

if (/Android/.test(ua))
{
  DEVICE.android = true;
}
else if (/iP[ao]d|iPhone/i.test(ua))
{
  DEVICE.ios = true;
}
else if (/Linux/.test(ua))
{
  DEVICE.linux = true;
}
else if (/Mac OS/.test(ua))
{
  DEVICE.mac = true;
}
else if (/Windows/.test(ua))
{
  DEVICE.windows = true;
}


if(window.AudioContext){
  DEVICE.webAudio = true
}
console.log(DEVICE);
console.log(ua);


Object.freeze(DEVICE)