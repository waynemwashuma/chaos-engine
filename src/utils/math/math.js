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
export {
  rand,
  round,
  exp,
  sq,
  sqrt,
  lerp,
  clamp,
  naturalizePair,
  map
}