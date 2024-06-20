/**
 * @template {Command} T
 */
export class CommandQueue {
  /**
   * @private
   * @type {CommandFn<T>}
   */
  command
  /**
   * @private
   * @type {T[]}
   */
  queue = []
  /**
   * @param {CommandFn<T>} [command]
   */
  constructor(commandfn = defaultCommandFn) {
    this.command = commandfn
  }
  /**
   * @param {T} command
   */
  add(command) {
    this.queue.push(command)
  }
  /**
   * @param {Registry} registry
   */
  apply(registry) {
    for (let i = 0; i < this.queue.length; i++) {
      this.command(this.queue[i], registry)
    }
  }
  clear() {
    this.queue.length = 0
  }
  /**
   * @returns {Readonly<T[]>}
   */
  getQueue() {
    return this.queue
  }
  /**
   * @returns {number}
   */
  size() {
    return this.queue.length
  }
}
 
 /**
  * @type {CommandFn}
 */
 function defaultCommandFn(command,registry) {
   command.execute(registry)
 }
 
 /**
 * @template {Command} T
 * @callback CommandFn
 * @param {T} command
 * @param {Registry} registry
 */