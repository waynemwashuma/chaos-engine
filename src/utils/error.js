let marker = `🚀Chaos Engine Says::::\n`
let mess = []

export const Err = {}

Err.warn = function (message) {
  console.warn(marker + message)
}

Err.throw = function (message) {
  throw new Error(marker + message)
}

Err.error = function (message) {
  console.error(marker + message)
}

Err.log = function (message) {
  console.log(marker + message);
}

Err.warnOnce = function (message) {
  if (mess.includes(message)) return
  mess.push(message)
  Err.warn(message)
}
Err.assert = function (test,errfunc,message){
  if(!test)errfunc(message)
  return test
}