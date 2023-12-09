let marker = `🚀Chaos Engine Says::::\n`
let mess = []

/**
 * Logs out a warning to the console.
 *
 * @param {string} message
 */
export function warn(message) {
  console.warn(marker + message)
}

/**
 * Throws a fatal error.
 * 
 * @param {string} message
 */
export function throws(message) {
  throw new Error(marker + message)
}

/**
 * Logs out a non fatal error to the console.
 * 
 * @param {string} message
 */
export function error(message) {
  console.error(marker + message)
}

/**
 * Logs out a message to the console.
 * 
 * @param {string} message
 */
export function log(message) {
  console.log(marker + message);
}
/**
 * Logs out a warning once to the console.
 * 
 * @param {string} message
 */
export function warnOnce(message) {
  if (mess.includes(message)) return
  mess.push(message)
  warn(message)
}
/**
 * Logs out a message,warning or error to the console according to the supplied log function.
 * 
 * @param {boolean} test
 * @param {string} message
 * @param {Function} errfunc
 */
export function assert(test, errfunc, message) {
  if (!test) errfunc(message)
  return test
}

/**
 * Logs out a warning to the console.
 * 
 * @param {string} message
 */
export function deprecate(original, replacement = "") {
  let message = `"${original}" has been depreciated.`
  if (replacement !== "")
    message += `Use "${replacement}" instead.`
  warnOnce(message)
}