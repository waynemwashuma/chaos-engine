import { Clock, Utils, Perf } from "../utils/index.js"
import { Logger } from "../logger/index.js"
import { EventDispatcher } from "../events/index.js"
import { IndexedList } from "../dataStructures/index.js"

/**
 * This class is responsible for managing all
 * entities and ensuring that systems are updated every frame.
 * 
 */
export class Manager {
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
   * @type IndexedList<System>
   */
  _systems = new IndexedList()
  /**
   * 
   * @private
   * @type {{
     world:World2D,
     renderer:Renderer,
     input:Input,
     audio:AudioHandler
   }}
   */
  _coreSystems = {
    world: null,
    renderer: null,
    input: null,
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
  perf = new Perf()
  /**
   * @readonly
   * @type EventDispatcher
   */
  events = new EventDispatcher()
  /**
   * @private
   */
  _update = accumulate => {
    this.perf.start()
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
    this.perf.end()
    this.RAF()
  }
  /**
   * Creates a new instance of Manager class
   **/
  constructor(options = {}) {
    this.init()
    this.play()
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
      Logger.warn(`The entity with id ${object.id} has already been added to a manager.It will be ignored and not added to the manager`, object)
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
    if (n === "body" && this._coreSystems.world != void 0) {
      this._coreSystems.world.add(c)
      return
    }
    if (n === "sprite" && this._coreSystems.renderer != void 0) {
      this._coreSystems.renderer.add(c)
      return
    }
    if (n in this._compMap) {
      const name = this._compMap[n]
      this._systems.get(name).add(c)
    }
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
    if (n === "body" && this._coreSystems.world != void 0) {
      this._coreSystems.world.remove(c)
      return
    }
    if (n === "sprite" && this._coreSystems.renderer != void 0) {
      this._coreSystems.renderer.remove(c)
      return
    }
    if (n in this._compMap) {
      const name = this._compMap[n]
      this._systems.get(name).remove(c)
    }

  }
  /**
   * Removes an entity from the manager.
   * Note that this doesn't destroy the entity, only removes it and its components from the manager.
   * To destroy the entity,use `Entity.destroy()` method.
   * 
   * @param {Entity} object The entity to remove
   */
  remove(object) {
    this.events.trigger("remove", object)
    let index = this.objects.indexOf(object)
    object.removeComponents()
    object.reset()
    Utils.removeElement(this.objects, index)
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      this.remove(this.objects[i])
    }
    this.events.trigger("clear")
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
    let systems = this._systems.values()
    for (let i = 0; i < systems.length; i++) {
      for (let j = 0; j < system[i].length; j++) {
        systems[i][j].init(this)
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
    const world = this._coreSystems["world"],
      renderer = this._coreSystems["renderer"],
      input = this._coreSystems["input"],
      systems = this._systems.values()

    //Todo - The only reason this is here is that
    //i need to debug stuff visually - ill remove it later.
    if (renderer) renderer.clear()

    for (var i = 0; i < systems.length; i++) {
      systems[i].update(dt)
    }
    if (input) input.update()
    if (world) world.update(dt)
    if (renderer) renderer.update(dt)
    if (world) {
      this.events.trigger("precollision", world.contactList)
      this.events.trigger("collision", world.CLMDs)
    }
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
    if (this._systems.has(n)) return Logger.warn(`The system ${n} has already been registered`)
    switch (n) {
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
        this._systems.set(n, sys)
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
    return this._systems.get(n)
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
      return this._coreSystems[n] = null
    this._systems.remove(n)
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
    return this._componentLists[n]
  }
  /**
   * Finds the first entity with all the components and returns it.
   * 
   * @param {String[]} comps An array containing the component names to be searched
   * @returns {Entity} 
   */
  getEntityByComponents(comps, entities = this.objects) {
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
   * @param {string[]} comps An array containing the component names to be searched
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
   * @param {String[]} tags An array containing the tags to be searched
   * @returns {Entity} 
   */
  getEntityByTags(tags, entities = this.objects) {
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
    return target
  }
  /**
   * Ignore this,im going to remove it and the rest of cloning utilities.
   * @private
   * @deprecated
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