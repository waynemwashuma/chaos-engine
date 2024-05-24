import { assert } from "../../logger/index.js"
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
    const profile = new Profile()
    this.profiles.set(label, profile)
    return profile
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
    const profile = this.profiles.has(label) ? this.get(label) : this.set(label)
    profile.lastTick = performance.now()
  }
  /**
   * @param {string} label
   */
  end(label) {
    const profile = this.get(label)

    if (!profile) return

    profile.delta = performance.now() - profile.lastTick
  }
}