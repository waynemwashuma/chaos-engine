import { error } from "../../logger/index.js"

export class LoadManager {
  _total = 0
  _sucessful = 0
  _failed = 0
  onItemFinish = NOOP
  onItemStart = NOOP
  onItemError = NOOP
  onFinish = NOOP
  onError = NOOP
  /**
   * @param {LoadManager} manager
   * @param {string} url
   */
  static itemStart(manager, url) {
    manager._total += 1
    manager.onItemStart(url)
  }
  /**
   * @param {Response} request
   * @param {LoadManager} manager
   */
  static itemFinish(manager, request) {
    manager._sucessful += 1
    manager.onItemFinish(request)
  }
  /**
   * @param {LoadManager} manager
   */
  static finish(manager) {
    if (manager._sucessful + manager._failed === manager._total) manager.onFinish()
  }
  /**
   * @param {LoadManager} manager
   * @param {Response} request
   */
  static itemError(manager, request) {
    error("Could not load the resource \"" + request.url + "\".Resource was not found.")
    manager._failed += 1
    manager.onItemError()
  }
}

/**
 * @param {*} _args
 * @returns {void}
 */
function NOOP(..._args) {}