const RHI = Math.PI / 180,
  RHI_INV = 1 / RHI

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

function sq(x) {
  return x * x
}

function exp(x, e = 2) {
  return x ** e
}

function sqrt(x) {
  return Math.sqrt(x)
}

function lerp(a, b, t) {
  return a + t * (b - a)
}

function round(number, precision = 4) {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}

function clamp(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

function map(v, x1, y1, x2, y2) {
  return x2 + v * (y2 - x2) / (y1 - x1)
}

function naturalizePair(a, b) {
  if (a > b)
    return (a + b) * (a + b + 1) / 2 + a;
  return (a + b) * (a + b + 1) / 2 + b;
}

function degToRad(deg) {
  return deg * RHI
}

function radToDeg(deg) {
  return deg * RHI_INV
}
export {
  rand,
  round,
  exp,
  sq,
  sqrt,
  lerp,
  clamp,
  naturalizePair,
  map,
  degToRad,
  radToDeg
}