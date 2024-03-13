import { getURLName, getURLExtension } from "./utils.js"

export class Loader {
  /**
   * @type {{ [x: string]: any; }}
   */
  _resources = {}
  manager
  baseUrl = ""
  constructor(manager = new LoadManager()) {
    this.manager = manager
  }
  name(){
    return this.constructor.name
  }
  verify(_extension) {
    return true
  }
  parse(_request) {}
  /**
   * @param {string} url
   */
  async load(url) {
    const fullurl = this.baseUrl + url
    const name = getURLName(url)
    const extension = getURLExtension(url)

    if (this.resources[name])
      return warn("Duplicate load of \"" + fullurl + "\".")
    if (!this.verify(extension))
      return error(`\`${this.name()}\` could not load "${fullurl}" as it does not support the extension ${extension}.`)

    const request = await fetch(fullurl)

    LoadManager.itemStart(this.manager, fullurl)
    const resource = this.parse(request)
    if (resource) this.resources[name] = resource
    LoadManager.itemFinish(this.manager, request)
    LoadManager.finish(this.manager)
  }
  get(name) {
    const resource = this.resource[name]
    if(!resource)throws(`\`${this.name()}\` could not find the resource "${name}" `)
    return resource
  }
}