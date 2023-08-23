import { World } from "../physics/index.js"
import { Renderer2D } from "../render/index.js"
import { Loader } from "../loader/index.js"
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


/**
 * 
 */
/**
 * This class is responsible for managing all
 * entities and ensuring that systems are updated every frame.
 * 
 */
class Manager {
  /**
   * RAF number of current frame.Used for pausing the manager.
   * 
   * @private
   * @type number
   */
  _rafID = undefined
  /**
   * @private
   * @type {Object<string, function>}
   */
  _classes = {}
  /**
   * 
   * @private
   * @type Object<string,Component[]>
   */
  _componentLists = {}
  /**
   * 
   * @private
   * @type System[]
   */
  _systems = []
  /**
   * 
   * @private
   * @type {{
     world:World,
     renderer:Renderer,
     input:Input,
     audio:AudioHandler
   }}
   */
  _coreSystems = {
    world: null,
    renderer: null,
    input: null,
    //TODO - cleanup this events prop
    events: null,
    audio: null
  }
  /**
   * 
   * @private
   * @type boolean
   */
  _initialized = false
  /**
   * Whether or not the manager is playing.
   * 
   * @type boolean
   */
  playing = false
  /**
   * 
   * @private
   * @type Object<string, number>
   */
  _systemsMap = {}
  /**
   * 
   * @private
   * @type Object<string, string>
   */
  _compMap = {}
  /**
   * Master clock for the game
   * 
   * @type Clock
   */
  clock = new Clock()
  /**
   * 
   * @private
   * @type Entity[]
   */
  objects = []
  /**
   * 
   * @private
   * @type number
   */
  _accumulator = 0
  /**
   * Ideal framerate of the manager.Not implemented corrretly.
   * TODO correct it
   * 
   * @type number
   */
  frameRate = 0
  /**
   * 
   * @ignore.
   * This is an artifact of me debugging this.
   * TODO - Should implement a better soluton
   */
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /**
   * look at Loader for more info.
   * 
   * @readonly
   * @type Loader
   */
  loader = new Loader()
  /**
   * @readonly
   * @type EventDispatcher
   */
  events = new EventDispatcher()
  /**
   * @private
   */
  _update = accumulate => {
    let dt = this.clock.update(accumulate)

    if (this._accumulator < this.frameRate) {
      this._accumulator += dt
      this.RAF()
      return
    }
    this.events.trigger("updateStart")
    this.update(dt)
    this.events.trigger("update")
    this.events.trigger("updateEnd")
    this._accumulator = 0
    this.RAF()
  }
  /**
   * Creates a new instance of Manager class
   * 
   * @param {Object} [options] 
   * @param {boolean} [options.autoPlay=true] Whether the manager should immediately start playing after initialization
   * @param {Object} [options.files={}] This is passed onto the Loader.Please check `Loader.load()` for more information on it.
   * @param {boolean} [options.physics=true] Adds physics world as a System.
   * @param {boolean} [options.renderer=true] Adds a renderer as a system.
   * @param {boolean} [options.input=true] Adds input as a system.
   * 
   **/
  constructor(options = {}) {
    options = Object.assign({
      autoPlay: true,
      physics: true,
      renderer: true,
      input: true
    }, options)
    if (options.input)
      this.registerSystem("input", new Input())
    if (options.physics) {
      this.registerSystem("world", new World())
      this.events.add("collision", defaultCollisionHandler)
      this.events.add("precollision", defaultPrecollisionHandler)
    }
    if (options.renderer)
      this.registerSystem("renderer", new Renderer2D())
    this.loader.onfinish = e => {
      this.init()
      this.play()
    }
    this.loader.loadAll(options.files)
  }
  /**
   * This initializes the manager.
   * No need to call this function directly.
   * This is called after the preloader finishes loading all its files.
   * 
   */
  init() {
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].init(this)
    }
    //this.initSystems()
    this.events.trigger("init", this)
    this.update(0)
    this._initialized = true
    if (this.playing) this.play()
  }
  /**
   * Adds an entity to the manager and initializes it.
   * 
   * @param {Entity} object The entity to add
   */
  add(object) {
    if (object.manager) {
      Err.warn(`The entity with id ${object.id} has already been added to a manager.It will be ignored and not added to the manager`, object)
      return
    }
    this.objects.push(object)
    object.init(this)
    this.events.trigger("add", object)
  }
  /**
   * This adds a component to a componentList
   * if the componentList is there else exits
   * without an error.
   * There is no need for you to use this method
   * as it is for internal use only and may change in the future 
   * 
   * @param {string} n name of the component
   * @param {Component} c An object implementing Component
   */
  addComponent(n, c) {
    if (n === "body") {
      this._coreSystems.world.add(c)
      return
    }
    if (n === "sprite") {
      this._coreSystems.renderer.add(c)
      return
    }
    if (n in this._componentLists)
      this._componentLists[n].push(c)
  }
  /**
   * This removes a component from a componentList
   * if the componentList is there else exits
   * without an error.
   * There is no need for you to use this method
   * as it is for internal use only and may change in the future 
   * @param { string } n name of the component *
   * @param { Component } c An object implementing Component interface
   */
  removeComponent(n, c) {
    if (n === "body") {
      this._coreSystems.world.remove(c)
      return
    }
    if (n === "sprite") {
      this._coreSystems.renderer.remove(c)
      return
    }
    if (n in this._componentLists)
      Utils.removeElement(this._componentLists[n], this._componentLists[n].indexOf(c))
  }
  /**
   * Removes an entity from the manager.
   * Note that this doesn't destroy the entity, only removes it and its components from the manager.
   * To destroy the entity,use `Entity.destroy()` method.
   * 
   * @param {Entity} object The entity to remove
   */
  remove(object) {
    let index = this.objects.indexOf(object)
    object.removeComponents()
    Utils.removeElement(this.objects, index)
    this.events.trigger("remove", object)

  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      this.remove(this.objects[i])
    }
  }
  /**
   * This method requests an animation frame from the browser
   * 
   * @private
   */
  RAF() {
    this._rafID = requestAnimationFrame(this._update)
  }
  /**
   * This starts up the update loop of the manager
   */
  play() {
    if (!this._initialized) {
      this.playing = true
      return
    }
    this.RAF()
    this.events.trigger("play")
  }
  /**
   * This stops the update loop of the manager
   */
  pause() {
    if (!this._initialized) {
      this.playing = false
      return
    }
    cancelAnimationFrame(this._rafID)
    this.events.trigger("pause")
  }
  /**
   * This method might be useless as systems are initialized on being added
   * 
   * @private 
   */
  initSystems() {
    for (var i = 0; i < this._systems.length; i++) {
      for (var j = 0; j < this._systems[i].length; j++) {
        this._systems[i][j].init(this)
      }
    }
  }

  /**
   * Marches the update loop forward,updating
   * the systems
   * You shouldn't mess with this/call it or everything will explode with undetectable errors.
   * 
   * @private
   */
  update(dt = 0.016) {
    let world = this._coreSystems["world"],
      renderer = this._coreSystems["renderer"],
      input = this._coreSystems["input"]

    let totalTS = performance.now()

    //the only reason this is here is that
    //i need to debug stuff visually - ill remove it later.
    if (renderer) renderer.clear()

    for (var i = 0; i < this._systems.length; i++) {
      this._systems[i].update(dt)
    }
    if (input) input.update()
    if (world) world.update(dt)
    if (renderer) renderer.update(dt)
    if (world) {
      this.events.trigger("precollision", world.contactList)
      this.events.trigger("collision", world.CLMDs)
    }
    this.perf.total = performance.now() - totalTS
  }
  /**
   * This registers a class into the manager so that ot can be used in cloning an entity.
   * 
   * @param {function} obj The class or constructor function to register
   * @param {boolean} override Whether to override an existing class
   */
  registerClass(obj, override = false) {
    let n = obj.name.toLowerCase()
    if (n in this._classes && !override) return Err.warn(`The class \`${obj.name}\` is already registered.Set the second parameter of \`Manager.registerClass()\` to true if you wish to override the set class`)
    this._classes[n] = obj
  }
  /**
   * Used to register a system
   * 
   * @param {string} n The name for the system
   * @param {System} sys The system to be addad
   * 
   * @param {string} [cn=n] The componentList name that the system will primarily take care of
   */
  registerSystem(n, sys, cn = n) {
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
        this._compMap[cn] = n
    }
  }
  /**
   * Gets the named system
   * 
   * @param {string} n the name the system was registered with.
   * 
   * @return {System}
   */
  getSystem(n) {
    if (n in this._coreSystems)
      return this._coreSystems[n]
    return this._systems[this._systemsMap[n]]
  }
  /**
   * Removes a system from the manager.
   * 
   * @param {string} n The name of the system
   * @returns {void}
   * 
   */
  unregisterSystem(n) {
    if (n in this._coreSystems)
      return this._systems[this._systemsMap[n]] = null
    delete this._systems[this._systemsMap[n]]
    delete this._systemsMap[n]
  }
  /**
   * Used to create a componentList in the manager.componentsA component must have the same name as the componentList to be added into it.
   * 
   * @param {string} n The name of the components to store into the created componentlist
   * @param {Component[]} [arr=[]] A reference to the array to store components in.
   */
  setComponentList(n, arr = []) {
    this._componentLists[n] = arr
  }
  /**
   * Used to create a componentList in the manager.A component must have the same name as the componentList to be added into it.
   * 
   * @param {string} n The name of the components to store into the created componentlist
   * @returns {Component[]} An array of components
   */
  getComponentList(n) {
    return this._componentList[n]
  }
  /**
   * Finds the first entity with all the components and returns it.
   * 
   * @param {Array<String>} comps An array containing the component names to be searched
   * @returns {Entity} 
   */
  getEntityByComponents(comps) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < comps.length; j++) {
        if (!entities[i].has(comps[j])) continue
        return entities[i]
      }
    }
  }
  /**
   * Finds the first entity with all the tag and returns it.
   * 
   * @param {Array<String>} comps An array containing the component names to be searched
   * @param {Entity[]} [entities = Manager#objects] The array of entities to search in.Defaults to the manager's entity list
   * @param {Entity[]} [target]
   * 
   * @returns {Entity[]} 
   */
  getEntitiesByComponents(comps, entities = this.objects, target = []) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < comps.length; j++) {
        if (!entities[i].has(comps[j])) continue
        target.push(entities[i])
      }
    }
    return target
  }
  /**
   * Finds the first entity with all the tag and returns it.
   * 
   * @param {Array<String>} tags An array containing the tags to be searched
   * @returns {Entity} 
   */
  getEntityByTags(tags) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (!entities[i].hasTag(tags[j])) continue
        return entities[i]
      }
    }
  }
  /**
   * Finds the entities with all the tag and returns them in an array.
   * 
   * @param {string[]} tags An array containing the tags to be searched
   * @param {Entity[]} [entities = Manager#objects] The array of entities to search in. Defaults to the manager's entity list
   * @param {Entity[]} target
   * @returns {Entity[]} 
   */
  getEntitiesByTags(tags, entities = this.objects, target = []) {
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        if (!entities[i].hasTag(tags[j])) continue
        target.push(entities[i])
      }
    }
  }
  /**
   * Ignore this,im going to remove it and the rest of cloning utilities.
   * @private
   * @deprecated
   */
  infertype(obj) {
    let n = obj.CHOAS_CLASSNAME
    if (n) {
      if (n in this._classes)
        return new this._classes[n]()
      Err.throw(`Class \`${n}\` is not registered in the manager thus cannot be used in cloning.Use \`Manager.registerClass\` to register it into this manager.`)
    }
    return obj instanceof Array ? [] : {}
  }
  /**
   * Deep copies an entity
   * 
   * @deprecated
   * @private
   * @returns {Entity}
   */
  clone(obj) {
    if (typeof obj !== "object") return obj
    let object = this.infertype(obj)
    for (var key in obj) {
      object[key] = this.clone(obj[key])
    }
    return object
  }
  /**
   * Creates a system that allows you to use the `Component.update` method for the given componentList whose name is given.
   * 
   * @param {string} name The name of componentList this system is taking care of.
   * 
   * @returns {System}
   */
  static DefaultSystem(name) {
    let n = name
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
        manager.getComponentList(n).push(comp)
      },
      remove(comp) {
        let list = manager.getComponentList(n),
          index = list.indexOf(comp)
        Utils.removeElement(list, index)
      }
    }
  }
  /**
   * @param {BoundingCircle | BoundingBpx  } bound
   * @returns Entity[]
   */
  query(bound) {
    ///TODO - What will happen if there is no world?   ...Yes,it will crash.
    return this._coreSystems.world.query(bound)
  }
}
export {
  Manager
}