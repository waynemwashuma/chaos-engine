const marker = `🚀Chaos Engine Says::::\n`
const mess = []

export const Logger = {
  /**
   * Logs out a warning to the console.
   *
   * @param {string} message
   */
  warn(message) {
    console.warn(marker + message)
  },
  /**
   * Throws a fatal error.
   * 
   * @param {string} message
   */
  throws(message) {
    throw new Error(marker + message)
  },
  /**
   * Logs out a non fatal error to the console.
   * 
   * @param {string} message
   */
  error(message) {
    console.error(marker + message)
  },

  /**
   * Logs out a message to the console.
   * 
   * @param {string} message
   */
  log(message) {
    console.log(marker + message);
  },
  /**
   * Logs out a warning once to the console.
   * 
   * @param {string} message
   */
  warnOnce(message) {
    if (mess.includes(message)) return
    mess.push(message)
    this.warn(message)
  },
  /**
   * Logs out a message,warning or error to the console according to the supplied log function.
   * 
   * @param {boolean} test
   * @param {string} message
   * @param {(message:string)=>void} errfunc
   */
  assert(test, errfunc, message) {
    if (!test) errfunc(message)
    return test
  },
  /**
   * Logs out a warning to the console.
   * 
   * @param {string} original
   * @param {string} [replacement]
   */
  deprecate(original, replacement = "") {
    let message = `"${original}" has been depreciated.`
    if (replacement !== "")
      message += `Use "${replacement}" instead.`
    this.warnOnce(message)
  }
}