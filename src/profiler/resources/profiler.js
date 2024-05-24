import { assert } from "../../logger/index.js"
const labelerror = "The label provided has not been set into `Profiler()`.Use `Profiler().set()` to set the label.The label is "
export class Profile {
  lastTick = 0
  delta = 0
}

export class Profiler {
  /**
   * @type {Map<string,Profile>}
   */
  profiles = new Map()
  /**
   * @param {string} label
   */
  set(label) {
    this.profiles.set(label, new Profile())
  }
  /**
   * @param {string} label
   * @returns {Profile}
   */
  get(label) {
    return this.profiles.get(label)
  }
  /**
   * @param {string} label
   */
  start(label) {
    const profile = this.get(label)
    
    assert(profile, labelerror + `"${label}"`)

    profile.lastTick = performance.now()
  }
  /**
   * @param {string} label
   */
  end(label) {
    const profile = this.get(label)
    
    assert(profile, labelerror + `"${label}"`)
    
    profile.delta = performance.now() - profile.lastTick
  }
}