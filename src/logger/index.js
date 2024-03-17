const marker = `🚀Chaos Engine:\n\n`
const mess = [""]
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
  deprecate("Logger.throws()", "throws()")

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
 * @param {(message:string)=>void} errfunc
 */
export function assert(test, message,errfunc = throws) {
  if (!test) errfunc(message)
  return test
}
/**
 * Logs out a warning to the console.
 * 
 * @param {string} original
 * @param {string} [replacement]
 */
export function deprecate(original, replacement = "") {
  let message = `\`${original}\` has been depreciated.`
  if (replacement !== "")
    message += `Use \`${replacement}\` instead.`
  warnOnce(message)
}
/**
 * @deprecated
*/
export const Logger = {
  /**
   * Logs out a warning to the console.
   * @deprecated
   * @param {string} message
   */
  warn(message) {
    deprecate("Logger.warn()", "warn()")
    console.warn(marker + message)
  },
  /**
   * Throws a fatal error.
   * @deprecated
   * @param {string} message
   */
  throws(message) {
    deprecate("Logger.throws()", "throws()")
    throw new Error(marker + message)
  },
  /**
   * Logs out a non fatal error to the console.
   * @deprecated
   * @param {string} message
   */
  error(message) {
    deprecate("Logger.error()", "error()")

    console.error(marker + message)
  },

  /**
   * Logs out a message to the console.
   * @deprecated
   * @param {string} message
   */
  log(message) {
    deprecate("Logger.log()", "log()")

    console.log(marker + message);
  },
  /**
   * Logs out a warning once to the console.
   * @deprecated
   * @param {string} message
   */
  warnOnce(message) {
    deprecate("Logger.warnOnce()", "warnOnce()")

    if (mess.includes(message)) return
    mess.push(message)
    this.warn(message)
  },
  /**
   * Logs out a message,warning or error to the console according to the supplied log function.
   * @deprecated
   * @param {boolean} test
   * @param {string} message
   * @param {(message:string)=>void} errfunc
   */
  assert(test, message,errfunc = throws) {
    deprecate("Logger.assert()", "assert()")

    if (!test) errfunc(message)
    return test
  },
  /**
   * Logs out a warning to the console.
   * @deprecated
   * @param {string} original
   * @param {string} [replacement]
   */
  deprecate(original, replacement = "") {
    deprecate("Logger.deprecate()", "deprecate()")
    let message = `"${original}" has been depreciated.`
    if (replacement !== "")
      message += `Use "${replacement}" instead.`
    this.warnOnce(message)
  }
}