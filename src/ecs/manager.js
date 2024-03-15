import { ArchetypeTable } from "../dataStructures/index.js"
import { Clock } from "../math/index.js"
import { EventDispatcher } from "../events/index.js"
import { Entity } from "./entity.js"
import { Query } from "./query.js"
export class Manager {
  /**
   * RAF number of current frame.Used for pausing the manager.
   * 
   * @private
   * @type {number}
   */
  _rafID = 0
  /**
   * @private
   */
  _table = new ArchetypeTable()
  /**
   * 
   * @private
   * @type {SystemFunc[]}
   */
  _systems = []
  /**
   * 
   * @private
   * @type {boolean}
   */
  _initialized = false
  /**
   * @private
   * @type {Record<string,any>}
   */
  _resources = {}
  /**
   * Whether or not the manager is playing.
   * 
   * @type {boolean}
   */
  playing = false
  /**
   * 
   * @private
   * @type {Clock}
   */
  clock = new Clock()
  /**
   * 
   * @private
   * @type {number}
   */
  _accumulator = 0
  /**
   * Ideal framerate of the manager.Not implemented corrretly.
   * TODO correct it
   * 
   * @type {number}
   */
  frameRate = 0
  /**
   * @readonly
   * @type {EventDispatcher}
   */
  events = new EventDispatcher()
  /**
   * @private
   * @param {number} accumulate
   */
  _update = accumulate => {
    const dt = Clock.update(this.clock, accumulate);

    if (this._accumulator < this.frameRate) {
      this._accumulator += dt;
      this.RAF();
      return
    }
    this.events.trigger("updateStart", dt);
    this.update(dt)
    this._accumulator = 0;
    this.events.trigger("update", dt);
    this.events.trigger("updateEnd", dt);
    this.RAF();
  }
  /**
   * Creates a new instance of Manager class
   * @param {ManagerOptions} options
   **/
  constructor(options = {
    autoplay: true
  }) {
    options = Object.assign({
      autoplay: true,
    }, options)
    this.init()
    if (options.autoplay) this.play()
  }
  /**
   * This initializes the manager.
   * No need to call this function directly.
   * This is called after the preloader finishes loading all its files.
   * 
   */
  init() {
    this.events.trigger("init", this);
    this._initialized = true;
    if (this.playing) this.play();
  }

  /**
   * Adds an entity to the manager and initializes it.
   * 
   * @param {Record<string,any>} [components] The entity to add
   */
  create(components) {
    const entity = new Entity()

    this._table.insert(entity, components)
    this.events.trigger("add", {
      entity,
      components
    })
    return entity
  }
  /**
   * Removes an entity from the manager.
   * Note that this doesn't destroy the entity, only removes it and its components from the manager.
   * To destroy the entity,use `Entity.destroy()` method.
   * 
   * @param {Entity} entity The entity to remove
   */
  remove(entity) {
    this.events.trigger("remove", entity);
    this._table.remove(entity)
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { string[]  } compNames
   * @returns {T}
   */
  get(entity, ...compNames) {
    return this._table.get(entity, compNames)
  }
  /**
   * @template T
   * @param {Entity} entity
   * @param { T } components
   */
  set(entity, components) {
    throw "not implemented yet"
  }
  /**
   * @template T
   * @param { string[]  } compNames
   * @returns {Query<T>}
   */
  query(...compNames) {
    const query = new Query(...compNames)
    query.components = this._table.query(compNames)
    return query
  }
  /**
   * @param {string} name
   */
  queryEvent(name) {
    return this.events.getEvent(name)
  }
  /**
   * @template T
   * @param {string} name
   * @returns {T}
   */
  getResource(name) {
    return this._resources[name]
  }
  /**
   * @template T
   * @param {string} name
   * @param {T} resource
   */
  setResource(name, resource) {
    this._resources[name] = resource
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    this.events.trigger("clear", this)
    this._table.clear()
  }
  /**
   * This method requests an animation frame from the browser
   * 
   * @private
   */
  RAF() {
    this._rafID = requestAnimationFrame(this._update);
  }
  /**
   * This starts up the update loop of the manager
   */
  play() {
    if (!this._initialized) {
      this.playing = true;
      return
    }
    this.RAF();
    this.events.trigger("play", this);
  }
  /**
   * This stops the update loop of the manager
   */
  pause() {
    if (!this._initialized) {
      this.playing = false;
      return
    }
    cancelAnimationFrame(this._rafID);
    this.events.trigger("pause", this);
  }
  /**
   * Marches the update loop forward,updating
   * the systems
   * You shouldn't mess with this/call it or everything will explode with undetectable Loggerors.
   * 
   * @private
   */
  update(dt = 0.016) {
    const systems = this._systems;
    this.setResource("delta",dt)
    for (let i = 0; i < systems.length; i++) {
      systems[i](this);
    }
  }
  /**
   * Used to register a system
   *
   * @param {SystemFunc} sys The system to be addad
   * 
   */
  registerSystem(sys) {
    this._systems.push(sys)
  }
  /**
   * @param {Plugin} plugin
  */
  registerPlugin(plugin){
    plugin.register(manager)
  }
}

/**
 * @callback SystemFunc
 * @param {Manager} manager
 * @returns {void}
 */
/**
 * @typedef ManagerOptions
 * @property {boolean} autoplay
 */
 /**
  * @typedef Plugin
  * @property {SystemFunc} register
 */