let marker = `🚀Chaos Engine Says::::\n`
let mess = []

/**
 * A set of functions to streamline logging of items to the console
 */
export const Err = {}

/**
 * Logs out a warning to the console.
 * 
 * @memberof Err
 * @param {string} message
 */
Err.warn = function(message) {
  console.warn(marker + message)
}

/**
 * Throws a fatal error.
 * 
 * @memberof Err
 * @param {string} message
 */
Err.throw = function(message) {
  throw new Error(marker + message)
}

/**
 * Logs out a non fatal error to the console.
 * 
 * @memberof Err
 * @param {string} message
 */
Err.error = function(message) {
  console.error(marker + message)
}

/**
 * Logs out a message to the console.
 * 
 * @memberof Err
 * @param {string} message
 */
Err.log = function(message) {
  console.log(marker + message);
}
/**
 * Logs out a warning once to the console.
 * 
 * @memberof Err
 * @param {string} message
 */
Err.warnOnce = function warnOnce(message) {
  if (mess.includes(message)) return
  mess.push(message)
  Err.warn(message)
}
/**
 * Logs out a message,warning or error to the console according to the supplied log function.
 * 
 * @memberof Err
 * @param {boolean} test
 * @param {string} message
 * @param {Function} errfunc
 */
Err.assert = function(test, errfunc, message) {
  if (!test) errfunc(message)
  return test
}

/**
 * Logs out a warning to the console.
 * 
 * @memberof Err
 * @param {string} message
 */
Err.deprecate = function deprecate(original, replacement = "") {
  let message = `"${original}" has been depreciated.`
  if (replacement !== "")
    message += `Use "${replacement}" instead.`
  Err.warnOnce(message)
}