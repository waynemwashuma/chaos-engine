function* generator() {
  for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    yield i
  }
}
let a = generator()
function IDgenerator() {
  return a.next().value
}

export{
  IDgenerator
}