import { World } from "../physics/index.js"
import { Renderer } from "../render/renderer.js"
import {Loader} from "../loader/index.js"
import {
  Clock,
  Utils,
  Err
} from "../utils/index.js"
import {
  DOMEventHandler,
  EventDispatcher,
  defaultCollisionHandler,
  defaultPrecollisionHandler
} from "../events/index.js"
import { Input } from "../inputs/index.js"

class Manager {
  _rafID = undefined
  _classes = {}
  _componentLists = {}
  _systems = []
  _coreSystems = {
    world: null,
    renderer: null,
    input: null,
    events: null,
    audio:null
  }
  _initialized = false
  playing = false
  _systemsMap = {}
  _compMap = {}
  clock = new Clock()
  objects = []
  _accumulator = 0
  frameRate = 0
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  loader = new Loader()
  _update = accumulate => {
    let dt = this.clock.update(accumulate)

    if (this._accumulator < this.frameRate) {
      this._accumulator += dt
      this.RAF()
      return
    }
    if (this._coreSystems["events"]) {
      this._coreSystems['events'].trigger("updateStart")
    }
    this.update(dt)
    if (this._coreSystems["events"]) {
      this._coreSystems['events'].trigger("update")
      this._coreSystems['events'].trigger("updateEnd")
    }
    this._accumulator = 0
    this.RAF()
  }
  constructor(options = {}) {
    this.options = Object.assign({
      autoPlay: true
    }, options)
    this.loader.onfinish = e=>{
      this.init()
      this.play()
    }
    this.loader.loadAll(options.files)
  }
  init() {
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].init(this)
    }
    this.initSystems()
    if (this._coreSystems["events"]) {
      this._coreSystems['events'].trigger("init", this)
    }
    this.update(0)
    if(this.playing)this.play()
    this._initialized = true
  }
  add(object) {
    this.objects.push(object)
    object.init(this)
    if (this._coreSystems["events"]) {
      this._coreSystems['events'].trigger("add", object)
    }
  }
  addComponent(n, c) {
    if (n in this._componentLists)
      this._componentLists[n].push(c)
  }
  remove(object) {
    let index = this.objects.indexOf(object)
    if (object.has("mesh"))
      this._coreSystems.renderer.remove(object.get("mesh"))
    if (object.has("body"))
      this._coreSystems.world.remove(object.get("body"))

    Utils.removeElement(this.objects, index)
    if (this._coreSystems["events"]) {
      this._coreSystems['events'].trigger("remove", object)
    }
  }
  clear() {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      this.remove(this.objects[i])
    }
  }
  RAF() {
    this._rafID = requestAnimationFrame(this._update)
  }
  play() {
    if(!this._initialized){
      this.playing = true
      return
    }
    this.RAF()
    if (this._coreSystems["events"])
      this._coreSystems['events'].trigger("play")
  }
  pause() {
    if(!this._initialized){
      this.playing = false
      return
    }
    cancelAnimationFrame(this._rafID)
    if (this._coreSystems["events"]) 
      this._coreSystems['events'].trigger("pause")
  }
  initSystems() {
    for (var i = 0; i < this._systems.length; i++) {
      for (var j = 0; j < this._systems[i].length; j++) {
        this._systems[i][j].init(this)
      }
    }
  }
  update(dt = 0.016) {
    let world = this._coreSystems["world"],
      renderer = this._coreSystems["renderer"],
      events = this._coreSystems["events"],
      input = this._coreSystems["input"]

    let totalTS = performance.now()

    //the only reason this is here is that
    //i need to debug stuff visually
    if (renderer) renderer.clear()

    for (var i = 0; i < this._systems.length; i++) {
      this._systems[i].update(dt)
    }
    if (input) input.update()
    if (world) world.update(dt)
    if (renderer) renderer.update(dt)
    if (world && events) {
      events.trigger("precollision", world.contactList)
      events.trigger("collision", world.CLMDs)
    }
    this.perf.total = performance.now() - totalTS
  }
  registerClass(obj, override = false) {
    let n = obj.name.toLowerCase()
    if (n in this._classes && !override) return Err.warn(`The class \`${obj.name}\` is already registered.Set the second parameter of \`Manager.registerClass()\` to true if you wish to override the set class`)
    this._classes[n] = obj
  }
  registerSystem(n, sys, cn) {
    if (sys.init) sys.init(this)
    if (this._systemsMap[n] !== undefined) return
    switch (n) {
      case "events":
        this._coreSystems.events = sys
        break
      case "world":
        this._coreSystems.world = sys
        break
      case "renderer":
        this._coreSystems.renderer = sys
        break
      case "input":
        this._coreSystems.input = sys
        break
      default:
        this._systemsMap[n] = this._systems.length
        this._systems.push(sys)
        this._compMap[cn || n] = n
    }
  }
  getSystem(n) {
    if (n in this._coreSystems)
      return this._coreSystems[n]
    return this._systems[this._systemsMap[n]]
  }
  setComponentList(n, arr = []) {
    this._componentLists[n] = arr
  }
  getComponentList(n) {
    return this._componentList[n]
  }
  unregisterSystem(n) {
    this._coreSystems[n] = undefined
    this._systems[this._systemsMap[n]] = undefined
  }
  getEntityByComponents(comps, entities = this.objects) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < comps.length; j++) {
        if (!entities[i].has(comps[j])) continue
        return entities[i]
      }
    }
  }
  getEntitiesByComponents(comps, entities = this.objects, target = []) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < comps.length; j++) {
        if (!entities[i].has(comps[j])) continue
        target.push(entities[i])
      }
    }
    return target
  }
  getEntityByTags(tags, entities = this.objects) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (!entities[i].hasTag(tags[j])) continue
        return entities[i]
      }
    }
  }
  getEntitiesByTags(tags, entities = this.objects, target = []) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (!entities[i].hasTag(tags[j])) continue
        target.push(entities[i])
      }
    }
  }
  infertype(obj) {
    let n = obj.CHOAS_CLASSNAME
    if (n) {
      if (n in this._classes)
        return new this._classes[n]()
      Err.throw(`Class \`${n}\` is not registered in the manager thus cannot be used in cloning.Use \`Manager.registerClass\` to register it into this manager.`)
    }
    return obj instanceof Array ? [] : {}
  }
  clone(obj) {
    if (typeof obj !== "object") return obj
    let object = this.infertype(obj)
    for (var key in obj) {
      object[key] = this.clone(obj[key])
    }
    return object
  }
  static DefaultSystem(n) {
    return {
      init(manager) {
        manager.setComponentList(n)
      },
      update(dt) {
        let comp = manager.getComponentList(n)
        for (let i = 0; i < comp.length; i++) {
          comp[i].update(dt)
        }
      },
      add(comp) {

      },
      remove(comp) {

      }
    }
  }
  static Default() {
    let events = new EventDispatcher()
    let manager = new Manager()
    let renderer = new Renderer()
    let world = new World()
    let input = new Input()
    events.add("collision", defaultCollisionHandler)
    events.add("precollision", defaultPrecollisionHandler)
    manager.registerSystem("input", input)
    manager.registerSystem("events", events)
    manager.registerSystem("world", world)
    manager.registerSystem("renderer", renderer)

    return manager
  }
}
export {
  Manager
}