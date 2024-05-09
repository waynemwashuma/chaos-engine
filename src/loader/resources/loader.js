import { LoadManager } from './loadmanager.js';
import { warn, error, throws } from '../../logger/index.js';
import { getURLName, getURLExtension } from "./utils.js"

/**
 * @template T
 */
export class Loader {
  /**
   * @type {{ [x: string]: T; }}
   */
  _resources = {}
  manager
  baseUrl = ""
  constructor(manager = new LoadManager()) {
    this.manager = manager
  }
  name() {
    return this.constructor.name
  }
  /**
   * @param {string} _extension
   */
  verify(_extension) {
    return true
  }
  /**
   * @abstract
   * @param {Response} _request
   * @returns {Promise<T | undefined>}
   */
  async parse(_request) {
    return new Promise(()=>{})
  }
  /**
   * @param {string} url
   */
  async load(url) {
    const fullurl = this.baseUrl + url
    const name = getURLName(url)
    const extension = getURLExtension(url)

    if (this._resources[name])
      return warn("Duplicate load of \"" + fullurl + "\".")
    if (!this.verify(extension))
      return error(`\`${this.name()}\` could not load "${fullurl}" as it does not support the extension ${extension}.`)

    const request = await fetch(fullurl)

    LoadManager.itemStart(this.manager, fullurl)
    const resource = await this.parse(request)
    if (resource) this._resources[name] = resource
    LoadManager.itemFinish(this.manager, request)
    LoadManager.finish(this.manager)
  }
  /**
   * @param {string} name
   */
  get(name) {
    const resource = this._resources[name]
    if (!resource) throws(`\`${this.name()}\` could not find the resource "${name}" `)
    return resource
  }
}