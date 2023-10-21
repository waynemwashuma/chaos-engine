let { cos, sin, min, max } = Math;

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

function sq(x) {
  return x * x
}

function exp(x, e) {
  return x ** e
}

function sqrt(x) {
  return Math.sqrt(x)
}

function lerp(x, y, t) {
  return x + t * (y - x)
}

function round(number, precision = 4) {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}
export {
  rand,
  round,
  min,
  max,
  cos,
  sin,
  exp,
  sq,
  sqrt,
  lerp
}