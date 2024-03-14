import { error } from "../logger/index.js"

export class LoadManager {
  _total = 0
  _sucessful = 0
  _failed = 0
  onItemFinish = NOOP
  onItemStart = NOOP
  onFinish = NOOP
  onError = NOOP
  static itemStart(manager, url) {
    manager._total += 1
    manager.onItemStart(url)
  }
  /**
   * @param {Request} request
   */
  static itemFinish(manager, request) {
    if (!request.ok)
      return LoadManager.itemError(manager, request)

    manager._sucessful += 1
    manager.onItemFinish(request)
  }
  static finish(manager) {
    if (manager._sucessful + manager._failed === manager._total) manager.onFinish()
  }
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