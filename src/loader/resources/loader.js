import { LoadManager } from './loadmanager.js';
import { warn, error, throws, assert } from '../../logger/index.js';
import { getURLName, getURLExtension } from "./utils.js"

/**
 * @template T
 */
export class Loader {
  /**
   * @private
   * @type {Map<string,T>}
   */
  assets = new Map()
  /**
   * @type {LoadManager}
   */
  manager
  /**
   * @type {string}
   */
  baseUrl = ""
  constructor(manager = new LoadManager()) {
    this.manager = manager
  }
  /**
   * @returns {T}
   */
  placeholder() {
    throws(`Implement the method: \`${this.constructor.name}().placeholder()\``)
  }
  /**
   * @param {string} _extension
   * @returns {boolean}
   */
  verify(_extension) {
    throws(`Implement the method: \`${this.constructor.name}().verify()\``)
    return true
  }
  /**
   * @abstract
   * @param {Response} _request
   * @returns {Promise<T | undefined>}
   */
  async parse(_request) {
    throws(`Implement the method: \`${this.constructor.name}().parse()\``)
    return new Promise(() => {})
  }
  /**
   * @param {string} url
   */
  load(url) {
    const fullurl = this.baseUrl + url
    const name = getURLName(url)
    const extension = getURLExtension(url)
    if (this.assets.has(name))
      return warn("Duplicate asset load of \"" + fullurl + "\".")
    if (!this.verify(extension))
      return error(`\`${this.constructor.name}\` could not load "${url}" as it does not support the extension ".${extension}".`)
    this.assets.set(name, this.placeholder())
    this._load(fullurl, name)
  }
  /**
   * @private
   * @param {string} url
   * @param {string} name
   */
  async _load(url, name) {
    const request = await fetch(url)
    LoadManager.itemStart(this.manager, url)
    if (!request.ok)
      return LoadManager.itemError(this.manager, request)
    const resource = await this.parse(request)
    if (resource) this.assets.set(name, resource)
    LoadManager.itemFinish(this.manager, request)
    LoadManager.finish(this.manager)
  }
  /**
   * @param {string} name
   */
  get(name) {
    const resource = this.assets.get(name)
    assert(resource, `\`${this.constructor.name}\` could not find the asset "${name}".`)
    return resource
  }
}