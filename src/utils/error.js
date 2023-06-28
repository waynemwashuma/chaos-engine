let marker = `🚀Chaos Engine Says::::\n`
let mess = []

/**
 * A set of functions to streamline logging of items to the console
*/
export const Err = {}

/**
 * Logs out a warning to the console.
 * 
 * @param {string} message
 */
Err.warn = function(message) {
  console.warn(marker + message)
}

/**
 * Throws a fatal error.
 * 
 * @param {string} message
 */
Err.throw = function(message) {
  throw new Error(marker + message)
}

/**
 * Logs out a non fatal error to the console.
 * 
 * @param {string} message
 */
Err.error = function(message) {
  console.error(marker + message)
}

/**
 * Logs out a message to the console.
 * 
 * @param {string} message
 */
Err.log = function(message) {
  console.log(marker + message);
}
/**
 * Logs out a warning once to the console.
 * 
 * @param {string} message
 */
Err.warnOnce = function(message) {
  if (mess.includes(message)) return
  mess.push(message)
  Err.warn(message)
}
/**
 * Logs out a message,warning or error to the console according to the supplied log function.
 * 
 * @param {boolean} test
 * @param {string} message
 * @param {Function} errfunc
 */
Err.assert = function(test, errfunc, message) {
  if (!test) errfunc(message)
  return test
}