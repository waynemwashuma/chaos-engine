/*
 * @author Wayne Mwashuma
 * {@link https://github.com/waynemwashuma/chaos-engine.git}
 * @copyright  2023-2023 Wayne Mwashuma
 * @license MIT
 *
 * 
 * MIT License

Copyright (c) 2023 Wayne Mwashuma

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
let marker = `🚀Chaos Engine Says::::\n`;
let mess = [];

/**
 * Logs out a warning to the console.
 *
 * @param {string} message
 */
function warn(message) {
  console.warn(marker + message);
}

/**
 * Throws a fatal error.
 * 
 * @param {string} message
 */
function throws(message) {
  throw new Error(marker + message)
}

/**
 * Logs out a non fatal error to the console.
 * 
 * @param {string} message
 */
function error(message) {
  console.error(marker + message);
}

/**
 * Logs out a message to the console.
 * 
 * @param {string} message
 */
function log(message) {
  console.log(marker + message);
}
/**
 * Logs out a warning once to the console.
 * 
 * @param {string} message
 */
function warnOnce(message) {
  if (mess.includes(message)) return
  mess.push(message);
  warn(message);
}
/**
 * Logs out a message,warning or error to the console according to the supplied log function.
 * 
 * @param {boolean} test
 * @param {string} message
 * @param {Function} errfunc
 */
function assert(test, errfunc, message) {
  if (!test) errfunc(message);
  return test
}

/**
 * Logs out a warning to the console.
 * 
 * @param {string} message
 */
function deprecate(original, replacement = "") {
  let message = `"${original}" has been depreciated.`;
  if (replacement !== "")
    message += `Use "${replacement}" instead.`;
  warnOnce(message);
}

var error$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  warn: warn,
  throws: throws,
  error: error,
  log: log,
  warnOnce: warnOnce,
  assert: assert,
  deprecate: deprecate
});

let tmpID = 0;

/**
 * Appends the second array to the first.
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr1
 * @param {T[]} arr2
 */
function appendArr(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i]);
  }
}
/**
 * Clears an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 */
function clearArr(arr) {
  for (var i = arr.length; i > 0; i--) {
    arr.pop();
  }
}
/**
 * Removes a number of items at the end of an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 * @param {number} number
 */
function popArr(arr, number) {
  let length = arr.length;
  for (var i = length; i > length - number; i--) {
    arr.pop();
  }
}
/**
 * Removes an element by its index from an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 * @param {number} index
 */
function removeElement(arr, index) {
  if (index == -1) return null
  if (arr.length - 1 == index) return arr.pop()

  let temp = arr[index];
  arr[index] = arr.pop();
  return temp
}
/**
 * Generates a unique id when called
 * 
 * @memberof Utils
 */
function generateID() {
  return (tmpID += 1)
}

/**
 * Mixes the functions required by a component into a class.
 * 
 * @memberof Utils
 * @param {Function} component the class/constructor function to add methods to.
 * @param {boolean} [overrideInit=true]
 * @param {boolean} [overrideUpdate=true]
 */
function inheritComponent(component, overrideInit = true, overrideUpdate = true) {
  if (component == void 0 || typeof component !== "function") return
  let proto = component.prototype;

  if (proto.destroy) {
    let destroy = component.destroy;
    proto.destroy = function() {
      this.entity = null;
      destroy.call(this);
    };
  } else {
    proto.destroy = function() {
      this.entity = null;
    };
  }
  if (proto.init && overrideInit) {
    let init = proto.init;
    proto.init = function(entity) {
      this.entity = entity;
      init.call(this, entity);
    };
  } else if (!proto.init) {
    proto.init = function(entity) {
      this.entity = entity;
    };
  }
  if (!proto.update && overrideUpdate) {
    proto.update = function() {
      Err.warnOnce("Please override the update function in the component " + proto.constructor.name);

    };
  }
  proto.get = function(n) {
    return this.entity.getComponent(n);
  };
  proto.requires = function(entity,...names) {
    for (var i = 0; i < names.length; i++)
      if (!entity.has(names[i]))
        throws(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${entity.id}`);
  };

  proto.query = function(bound, target = []) {
    return this.entity.query(bound, target)
  };
  if (!proto.toJson) {
    //console.log(proto);
    proto.toJson = function() {
      throw "Error, implement .toJson() in the class " + this.CHOAS_CLASSNAME
    };
  }
  Object.defineProperty(proto, "CHOAS_CLASSNAME", {
    get: function() {
      return this.constructor.name.toLowerCase()
    },
    enumerable: true,
    configurable: false
  });
  Object.defineProperty(proto, "CHAOS_OBJ_TYPE", {
    get: function() {
      return "component"
    },
    enumerable: true,
    configurable: false
  });
}
/**
 * Mixes the functions required by an object  into another object.
 * 
 *  @param {Object} from the object constructor function to add methods from.
 * @param {Object} to the object constructor function to add methods to.
 */
function mixin(from, to,props = []) {
  let proto = from.prototype;
  let proto2 = to.prototype;
  console.log(proto2);
  Object.assign(proto,from);
  for (let name of props) {
    //if(!(methodName in proto))continue
    //if (methodName in proto2) continue
    
    proto2[name] = proto[name];
  }
  //console.log(new to());
}

var common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  appendArr: appendArr,
  clearArr: clearArr,
  popArr: popArr,
  removeElement: removeElement,
  generateID: generateID,
  inheritComponent: inheritComponent,
  mixin: mixin
});

/**
 * Handles time management for the game.
*/
class Clock {
  /**
   * Last time the clock was updated
   * 
   * @private
   * @type number
  */
  lastcall = 0
  /**
   * Difference between the last call in the last frame and current call.
   * 
   * @type number 
  */
  dt = 0
  /*getFrameRate(){
    return 1/(this.dt/1000)
  }
  getRoundedFrameRate(){
    return Math.round(this.getFrameRate())
  }*/
  /**
   * Updates the clock
   * 
   * @param {number} accumulate
  */
  update(accumulate){
    this.dt = accumulate - this.lastcall || 0;
    //this.framerate = this.getFrameRate()
    this.lastcall = accumulate; 
    
    return this.dt/1000
  }
}

class Perf{
  _start = 0
  _time = 0
  start(){
    this._start = performance.now();
  }
  end(){
    this._time = performance.now() - this._start;
    return this._time
  }
  fps(){
    return 1000/this._time
  }
}

//import { DEVICE } from "../device/index.js"

class Loader {
  constructor(manager) {
    this._toload = [];
    this.imgs = {};
    this.sfx = {};
    this.json = {};
    this._progressBytes = 0;
    this._totalBytes = 0;
    this._filesErr = 0;
    this._filesLoaded = 0;
    this._totalFileNo = 0;
    const that = this;
    this.onfinish = null;
    this._handlers = {
      onload: function(xhr, e) {
        let type = that._getType(xhr.responseURL);
        let name = that._getName(xhr.responseURL);
        if (e.lengthComputable === false) {
          that._handlers.onerror(xhr, e);
          return
        }
        if (type === "image") {
          that.imgs[name] = new Image();
          that.imgs[name].src = URL.createObjectURL(xhr.response);
        } else if (type === "audio") {
          that.sfx[name] = xhr.response;
          //if using webAudio,just set it to the buffer 
          //else find a way to put this buffer into an audio tag
        } else if (type === "json") {
          that.json[name] = JSON.parse(xhr.response);
        } else {
          return warn(`The file in url ${xhr.responseURL} is not loaded into the loader because its extension name is not supported.`)
        }
        that._filesLoaded += 1;

        if (that._filesLoaded + that._filesErr === that._totalFileNo && that.onfinish) {
          that.onfinish();
        }

      },
      onheadload: function(e) {
        if (e.total === 0 || !e.lengthComputable) return
        that._totalBytes += e.total;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i], true);

        xhr.onload = e => that._handlers.onload(xhr);
        xhr.onerror = that._handlers.onerror(xhr);
        xhr.send();
      },
      onerror: function(e) {
        that._filesErr += 1;
        warn(`The file ${e.responseURL} could not be loaded as the file might not exist in current url`);
        if (that._filesLoaded + that._filesErr === that._totalFileNo && that.onfinish) that.onfinish();
      }
    };
  }
  _getName(url) {
    if (url.includes("/")) {
      let tmp = url.split("/");
      url = tmp[tmp.length - 1];
    }
    return url.split(".")[0]
  }
  _getType(url) {
    let ext;
    if (url.includes("/")) {
      let tmp = url.split("/");
      url = tmp[tmp.length - 1];
    }
    ext = url.split(".")[1];

    if (ext === "jpg" || ext === "png" || ext === "jpeg") return "image"
    if (ext === "mp3" || ext === "ogg") return "audio"
    if (ext === "json") return "json"
  }
  loadAll(files = {}) {
    this._totalFileNo =
      (files.images?.length || 0) +
      (files.audio?.length || 0) +
      (files.json?.length || 0);
    if (this._totalFileNo === 0) {
      this.onfinish();
      return
    }
    if (files.images) {
      for (var i = 0; i < files.images.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', files.images[i], true);
        xhr.responseType = "blob";
        xhr.onload = e => {
          this._handlers.onload(xhr, e);

        };
        xhr.onerror = e => this._handlers.onerror(xhr);
        xhr.send();

      }
    }
    if (files.audio) {
      for (var i = 0; i < files.audio.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "arraybuffer";
        xhr.open('GET', files.audio[i], true);
        xhr.onload = e => this._handlers.onload(xhr, e);
        xhr.onerror = e => this._handlers.onerror(xhr);
        xhr.send();

      }
    }
    if (files.json) {
      for (var i = 0; i < files.json.length; i++) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "text";
        xhr.open('GET', files.json[i], true);
        xhr.onload = e => this._handlers.onload(xhr, e);
        xhr.onerror = e => this._handlers.onerror(xhr);
        xhr.send();
      }

    }
  }
}

/**
 * This class manages all events by a game manager.
 * When adding a handler to an event with another handler,the latter will not be overriden,rather,the former will be added to complement the latter.
 */
class EventDispatcher {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type Object<string,function[]>
   */
  handlers = {}
  /**
   * This fires all event handlers of a certain event.
   * 
   * @param {string} n the name of event fired.
   * @param {any} data The payload of the event.
   */
  trigger(n, data) {
    if (n in this.handlers)
      this.handlers[n].forEach(h => h(data));
  }
  /**
   * Ignore this,must be here for it to be a system.Might make this class not a system later
   */
  init() {}
  /**
   * Adds an event handler to an event dispatcher.
   * 
   * @param {string} name name of the event.
   * @param {function} handler Function to be called when the event is triggered.
   */
  add(name, handler) {
    if (name in this.handlers) {
      this.handlers[name].push(handler);
      return
    }
    this.handlers[name] = [handler];
  }
}

/**
 * This handles events created by the DOM.
 */
class DOMEventHandler {
  /**
   * A dictionary of callback functions
   * 
   * @private
   * @type Object<string,function[]>
   */
  handlers = {}
  /**
   * A dictionary of the main callback functions
   * 
   * @private
   * @type Object<string,function>
   */
  _evHandlers = {}
  /**
   * Adds an eventlistener.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  add(e, h) {
    if (this.handlers[e])
      return this.handlers[e].push(h)
    this.handlers[e] = [h];
    let listener = (event) => {
      let handlers = this.handlers[e];
      for (var i = 0; i < handlers.length; i++) {
        handlers[i](event);
      }
    };
    document.addEventListener(e, listener);
    this._evHandlers[e] = listener;
  }
  /**
   * Removes an eventlistener.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  remove(e, h) {
    this.handlers[e].splice(this.handlers[e].indexOf(h), 1);
    if (!this.handlers[e].length)
      this.dispose(e);
  }
  /**
   * Removes all eventlisteners of an event.
   * 
   * @param {string} e Name of the DOMEvent.
   * @param {function} h The eventlistener.
   */
  disposeEvent(e) {
    document.removeEventListener(e, this._evHandlers[e]);
    delete this.handlers[e];
    delete this._evHandlers[e];
  }
  /**
   * Clears all eventlisteners of every event registered.
   */
  clear() {
    for (var ev in this.handlers) {
      this.dispose(ev);
    }
  }
  /* 
  Donno why this is here,but i do know past me has a reason for this being here.
  Ill leave it for now.
  */
  init() {}
}

/**
 * This provides a way to fire off an entity's collision event handler registered to it.
 * 
 * @param {CollisionPair[]} clmds an array of collision manifolds
*/
function defaultCollisionHandler(clmds) {
  let a, b;
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].bodyA.entity.getHandler("collision");
    b = clmds[i].bodyB.entity.getHandler("collision");

    if (a) a(
      clmds[i].bodyA.entity,
      clmds[i].bodyB.entity,
      clmds[i]
    );
    if (b) b(
      clmds[i].bodyB.entity,
      clmds[i].bodyA.entity,
      clmds[i]
    );
  }
}

/**
 * This provides a way to fire off an entity's precollision event handler registered to it
 * 
 * @param {Manifold[]} clmds an array of collision manifolds
*/
function defaultPrecollisionHandler(clmds) {
  let a, b;
  for (let i = 0; i < clmds.length; i++) {
    a = clmds[i].a.entity.getHandler("precollision");
    b = clmds[i].b.entity.getHandler("precollision");

    if (a) a(
      clmds[i].a.entity,
      clmds[i].b.entity,
      clmds[i]
    );
    if (b) b(
      clmds[i].b.entity,
      clmds[i].a.entity,
      clmds[i]
    );
  }
}

/**@enum {string}*/
const Events = {
  COLLISION : "collision",
  PRECOLLISION : "precollision",
  PREUPDATE : "preupdate",
  POSTUPDATE : "postupdate",
   UPDATE : "postupdate",  
   INITIALIZE : "init",
   ADD : "add",
   REMOVE : "remove",
   PAUSE : "pause",
   PLAY : "play"
};

class Signal {
  _listeners = []
  _value = null
  constructor(value){
    this._value = value;
  }
  set value(x) {
    this._value = x;
    for (var i = 0; i < this._listeners.length; i++) {
      let func = this._listeners[i];
      func.listener(this);
      if(func.callOnce)
      this.removeListener(func.listener);
    }
  }
  get value() {
    return this._value
  }
  addListener(listener,callOnce=false) {
    this._listeners.push({
      listener,
      callOnce
    });
  }
  removeListener(listener) {
    for (var i = 0; i < this._listeners.length; i++) {
      if (this._listeners[i].listener == listener)
        return this._detach(i)
    }
  }
  _detach(bindingIndex){
    this._listeners.splice(i, 1);
  }
}

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
  perf = new Perf()
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
    this.perf.start();
    let dt = this.clock.update(accumulate);

    if (this._accumulator < this.frameRate) {
      this._accumulator += dt;
      this.RAF();
      return
    }
    this.events.trigger("updateStart");
    this.update(dt);
    this.events.trigger("update");
    this.events.trigger("updateEnd");
    this._accumulator = 0;
    this.perf.end();
    this.RAF();
  }
  /**
   * Creates a new instance of Manager class
   **/
  constructor(options = {}) {
    this.loader.onfinish = e => {
      this.init();
      this.play();
    };
    this.loader.loadAll(options.files);
  }
  /**
   * This initializes the manager.
   * No need to call this function directly.
   * This is called after the preloader finishes loading all its files.
   * 
   */
  init() {
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].init(this);
    }
    //this.initSystems()
    this.events.trigger("init", this);
    this.update(0);
    this._initialized = true;
    if (this.playing) this.play();
  }
  /**
   * Adds an entity to the manager and initializes it.
   * 
   * @param {Entity} object The entity to add
   */
  add(object) {
    if (object.manager) {
      warn(`The entity with id ${object.id} has already been added to a manager.It will be ignored and not added to the manager`);
      return
    }
    this.objects.push(object);
    object.init(this);
    this.events.trigger("add", object);
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
      this._coreSystems.world.add(c);
      return
    }
    if (n === "sprite" && this._coreSystems.renderer != void 0) {
      this._coreSystems.renderer.add(c);
      return
    }
    if (n in this._compMap) {
      const name = this._compMap[n];
      this._systems[this._systemsMap[name]].add(c);
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
      this._coreSystems.world.remove(c);
      return
    }
    if (n === "sprite" && this._coreSystems.renderer != void 0) {
      this._coreSystems.renderer.remove(c);
      return
    }
    if (n in this._compMap) {
      const name = this._compMap[n];
      this._systems[this._systemsMap[name]].remove(c);
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
    this.events.trigger("remove", object);
    let index = this.objects.indexOf(object);
    object.removeComponents();
    object.reset();
    removeElement(this.objects, index);
  }
  /**
   * This removes all of the entities and components from the manager
   */
  clear() {
    for (let i = this.objects.length - 1; i >= 0; i--) {
      this.remove(this.objects[i]);
    }
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
    this.events.trigger("play");
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
    this.events.trigger("pause");
  }
  /**
   * This method might be useless as systems are initialized on being added
   * 
   * @private 
   */
  initSystems() {
    for (var i = 0; i < this._systems.length; i++) {
      for (var j = 0; j < this._systems[i].length; j++) {
        this._systems[i][j].init(this);
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
      input = this._coreSystems["input"];

    //the only reason this is here is that
    //i need to debug stuff visually - ill remove it later.
    if (renderer) renderer.clear();

    for (var i = 0; i < this._systems.length; i++) {
      this._systems[i].update(dt);
    }
    if (input) input.update();
    if (world) world.update(dt);
    if (renderer) renderer.update(dt);
    if (world) {
      this.events.trigger("precollision", world.contactList);
      this.events.trigger("collision", world.CLMDs);
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
    if (sys.init) sys.init(this);
    if (this._systemsMap[n] !== undefined) return
    switch (n) {
      case "world":
        this._coreSystems.world = sys;
        break
      case "renderer":
        this._coreSystems.renderer = sys;
        break
      case "input":
        this._coreSystems.input = sys;
        break
      default:
        this._systemsMap[n] = this._systems.length;
        this._systems.push(sys);
        this._compMap[cn] = n;
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
      return this._coreSystems[n] = null
    delete this._systems[this._systemsMap[n]];
    delete this._systemsMap[n];
  }
  /**
   * Used to create a componentList in the manager.componentsA component must have the same name as the componentList to be added into it.
   * 
   * @param {string} n The name of the components to store into the created componentlist
   * @param {Component[]} [arr=[]] A reference to the array to store components in.
   */
  setComponentList(n, arr = []) {
    this._componentLists[n] = arr;
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
   * @param {Array<String>} comps An array containing the component names to be searched
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
        target.push(entities[i]);
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
        target.push(entities[i]);
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
    let n = name;
    return {
      init(manager) {
        manager.setComponentList(n);
      },
      update(dt) {
        let comp = manager.getComponentList(n);
        for (let i = 0; i < comp.length; i++) {
          comp[i].update(dt);
        }
      },
      add(comp) {
        manager.getComponentList(n).push(comp);
      },
      remove(comp) {
        let list = manager.getComponentList(n),
          index = list.indexOf(comp);
        removeElement(list, index);
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

/**
 * A helper class.
 * Since there are no interfaces in JavaScript,
 * you might have to extend this to create a component, but there is another solution.
 * Use instead `Component.implement()` if you have your own hierarchy of classes.
 * In typescript,this would be an interface.
 * 
 * @interface
 * 
 */
class Component {

  destroy() {}
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "component"
  }
  /**
   * @param {Entity} entity
  */
  init(entity) {}
  /**
   * @param {number} dt
   */
  update(dt) {
    warnOnce("Please override the update function in the component " + proto.constructor.name);
  }
  /**
   * @param {string} n
   */
  get(entity,n) {
    return entity.getComponent(n);
  }
  /**
   * @param {...string} names
   */
  requires(entity,...names) {
    for (var i = 0; i < names.length; i++)
      if (!entity.has(names[i]))
        throws(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${entity.id}`);
  }
  /**
   * @param {CircleBounding | BoxBounding} bound
   * @param {Entity} [target=[]]
   */
  query(entity,bound, target = []) {
    return entity.query(bound, target)
  }
  static fromJson() {
    throw "Implement static method fromJson() in your component " + this.CHOAS_CLASSNAME
  }
  static toJson() {
    throw "Implement static method toJson() in your component " + this.CHOAS_CLASSNAME
  }
  static implement(component) {
    inheritComponent(component);
  }
}

/**
 * Updates components assigned to it.
 * 
 * @interface
 */
class System {
  init() {
    warnOnce("Please override the init method in the system " + this.constructor.name);
  }
  update() {
    warnOnce("Please override the update method in the system " + this.constructor.name);

  }
  add(component) {
    this.objects.push(component);
  }
  remove(component) {
    let index = this.objects.indexOf(component);
    removeElement(this.objects, index);
  }
  static implement(system) {
    mixin(System,system);
  }
}

/**
 * 
 * @function
 * @name System#add
 * @param {Component} component
 */
/**
 * 
 * @function
 * @name System#remove
 * @param {Component} component
 */
/**
 * 
 * @function
 * @name System#init
 * @param {Manager} manager
 */
/**
 * 
 * @function
 * @name System#update
 * @param {number} dt
 */

/**
 * This is a container to hold components,tags and event handlers.
 * 
 * @class
 * @public
 */
class Entity {
  /**
   * Dictionary of component to manage.
   * 
   * @private
   * @type Object<string,Component>
   */
  _components = {}
  /**
   * Dictionary of handlers to call during an event.
   * 
   * @private
   * @type Object<string,function>
   */
  _handlers = {}
  /**
   * A list of tags to identify an entity.
   * 
   * @private
   * @type Set<string>
   */
  _tags = new Set()
  /**
   * The manager handling this entity.
   * 
   * @private
   * @type Manager
   */
  _global = null
  /**
   * A flag to show if the entity is added to a manager.
   * 
   * @type {boolean}
   */
  active = false

  get CHAOS_OBJ_TYPE() {
    return "entity"
  }
  get CHAOS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * Removes all components and handlers from an entity while removing it from its manager
   */
  destroy() {
    for (let k in this._components) {
      let comp = this._components[k];
      if (comp.destroy)
        comp.destroy();
      delete this._components[k];
    }
    for (let k in this._handlers) {
      delete this._handlers[k];
    }
    this.removeSelf();
  }
  /**
   * Removes an entity and its components from its manager whilst retaining its components and handlers
   */
  removeSelf() {
    if (this._global) this._global.remove(this);
  }
  /**
   * This is an internal function,no need to use it.
   * 
   * @package
   */
  reset() {
    this.active = false;
    this._global = null;
  }
  /**
   * Removes all components of an entity from its manager but keeps the entity inside the manager.
   * This is an internal function so no need on your part to use it.
   */
  removeComponents() {
    if (this._global === void 0) return
    for (var k in this._components) {
      this._global.removeComponent(k, this._components[k]);
    }
  }
  /**
   * Gets the current manager of an entity
   * 
   * @returns {Manager}
   */
  get manager() {
    return this._global
  }
  /**
   * Adds a component into an entity
   * 
   * @param {String} n Name of the component.
   * @param {Component} c The component to add.
   * 
   * @returns {this}
   */
  attach(n, c) {
    this._components[n] = c;
    if (this.manager) {
      c.init(this);
      this._global.addComponent(n, c);
    }
    return this
  }
  /**
   * Removes a component from an entity.
   * 
   * @param {String} n Name pf the component
   * @rerurns {this}
   */
  remove(n) {
    this._global.removeComponent(n, this._components[n]);
    delete this._components[n];
    return this
  }
  /**
   * Registers a function to handle a named event.
   * 
   * @param {string} n Name of the event
   * @param {function} h The function to be called when an event is fired.
   */
  register(n, h) {
    this._handlers[n] = h;
  }
  /**
   * Removes an event handler function of the given name
   * 
   * @param {string} n Name of the event
   */
  unregister(n) {
    if (!(n in this._handlers)) return
    delete this._handlers[n];
  }
  /**
   * Returns an event handler which can be fired during an event
   * 
   * @param {string} n Name of the event
   * @returns {function | undefined}
   */
  getHandler(n) {
    return this._handlers[n]
  }
  /**
   * Returns the named component.
   * 
   * @param {string} n Name of the component.
   * @returns {Component | undefined }
   */
  get(n) {
    return this._components[n]
  }
  /**
   * Used to check if the component exists in an entity
   * 
   * @param {string} n Name of the component.
   * @returns {boolean}
   */
  has(n) {
    return n in this._components
  }
  /**
   * Adds a tag into an entity.
   * 
   * @param {string} n The tag to be added
   */
  addTag(n) {
    this._tags.add(n);
  }
  /**
   * Removes a tag from an entity.
   * 
   * @param {string} n The tag to be added
   */
  removeTag(n) {
    this._tags.delete(n);
  }
  /**
   * Checks if a tag exists in an entity.
   * 
   * @param {string} n The tag to be added
   * @returns {boolean}
   */
  hasTag(n) {
    return this._tags.has(n)
  }
  /**
   * Initializes the components within an entity and marks it as active.
   * It is called by an instance of a game manager so no need to call it manually
   * 
   * @package
   * @param {Manager} global
   */
  init(global) {
    this._global = global;
    this.active = true;
    for (let k in this._components) {
      this._components[k].init(this);
      global.addComponent(k, this._components[k]);
    }
  }
  /**
   * A helper function to create a new Entity with transform,movable and bounds components.
   * 
   * @depreciated
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns {Entity}
   */
  static Default(x, y, a) {
    console.warn("'Entity.Default()' is depreciated,use 'createEntity()' instead.");
    return new Entity()
      .attach("transform", new Transform(x, y, a))
      .attach("movable", new Movable())
      .attach("bounds", new Bound())
  }
  /**
   * Search an entity's manager for entities in a given bound.
   * 
   * @param {Bounds} bound the region to search entitities in.
   * @param {Entity[]} [target=[]] An array to store results in.
   * @returns {Entity[]}
   */
  query(bound, target = []) {
    return this._global.query(bound, target)
  }
  /**
   * Todo - type serialization docs correctly
   * @param {{}} obj
   * @param {Map<string,function>} compList 
   */
  fromJSON(obj, compList) {
    let entity = this;

    obj.tags.forEach((a) => {
      entity.addTag(a);
    });
    for (var key in obj.comps) {
      let c = new compList[key]().fromJSON(obj.comps[key]);
      entity.attach(key, c);
    }
    return entity
  }
  /**
   * @returns {{
     deg: number,
     type:string
   }}
   */
  toJson() {
    let obj = {
      comps: {},
      tags: []
    };
    for (var key in this._components) {
      obj.comps[key] = this._components[key].toJson();
    }
    this._tags.forEach((a) => {
      obj.tags.push(a);
    });
    obj.type = this.CHAOS_OBJ_TYPE;
    return obj
  }
}

class TweenManager extends System {
  objects = []
  init(manager) {
    manager.setComponentList("tween", this.objects);
  }

  update(dt) {
    for (var i = 0; i < this.objects.length; i++) {
      let tween = this.objects[i];

      tween.update(dt);
    }
  }
}

const RHI = Math.PI / 180,
  RHI_INV = 1 / RHI;

/**
 * Creates a random number between the parameters
 * 
 * @param {number} [min=0] The minimal bound of the random number
 * @param {number} [max=1] The maximum bound of the random number
 * @returns {number}
 */
function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min
}

/**
 * Returns the square of a number
 * 
 * @param {number} x The number to square
 *  @returns {number}
*/
function sq(x) {
  return x * x
}
/**
 * Returns the power of a number by a given exponent.
 * 
 *  @param {number} x the number to power.
 *  @param {number} [e=2] The number to power by.
 *  @returns {number}
*/
function exp(x, e = 2) {
  return x ** e
}
/**
 * Returns the square root pf a number
 * 
 * @param {number} x The number to root 
 * @returns {number}
*/
function sqrt(x) {
  return Math.sqrt(x)
}


/**
 * Interpolates between two numbers by a constant t.
 * 
 *  @param {number} a The minimal bound of the interpolation.
 *  @param {number} b The maximum bound of the interpolation.
 *  @param {number} t A number between 0 and 1 to interpopate by.Any other number greater than 1 or less than 0 will extapolate beyond b or a respectively.
 *  @returns {number}
*/
function lerp(a, b, t) {
  return a + t * (b - a)
}

/**
 * Rounds a given value to a given precision.
 * 
 *  @param {number} number The number to round.
 *  @param {number} [precision=4] How many decimal places there should be.
 *  @returns {number}
*/
function round(number, precision = 4) {
  precision = 10 ** precision;
  return Math.round(number * precision) / precision
}

/**
 * Clamps a value between two numbers.
 * 
 *  @param {number} value The number to clamp.
 *  @param {number} min The minimal bound of the clamped number.
 *  @param {number} max The maximum bound of the clamped number.
 *  @returns {number}
*/
function clamp(value, min, max) {
  if (value < min) return min
  if (value > max) return max
  return value
}

/**
 * Maps a value from one range to another.
 * 
 *  @param {number} v
 *  @param {number} x1
 *  @param {number} y1
 *  @param {number} x2
 *  @param {number} y2
 *  @returns {number}
*/
function map(v, x1, y1, x2, y2) {
  return x2 + v * (y2 - x2) / (y1 - x1)
}
/**
 * Returns a unique number given from a pair of numbers
 *  @param {number} a
 *  @param {number} b
 *  @returns {number}
*/
function naturalizePair(a, b) {
  if (a > b)
    return (a + b) * (a + b + 1) / 2 + a;
  return (a + b) * (a + b + 1) / 2 + b;
}

/**
 * Converts a degree to a radian.
 * 
 * @param {number} deg number to convert.
 *  @returns {number}
*/
function degToRad(deg) {
  return deg * RHI
}

/**
 * Converts a radian to a degree.
 * 
 * @param {number} rad number to convert.
 *  @returns {number}
*/
function radToDeg(rad) {
  return rad * RHI_INV
}

let obj$1 = {
  x: 0,
  y: 0
};
let TWO_PI = Math.PI * 2;
/**
 * This is a 2D vector class.
 * 
 * @license MIT
 */
class Vector2$1 {
  /**
   * @param {number} x the x coordinate of the vector
   * @param {number} y the y coordinate of the vector
   */
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "vector"
  }
  /**
   *Calculates length of this vector and returns 
   * it
   * 
   * @returns {number}
   */
  magnitude() {
    return Math.sqrt(this.magnitudeSquared());
  };
  /**
   * Sets a vector to have the given length.
   * 
   * @param {number} length 
   */
  setMagnitude(length) {
    this.normalize().multiply(length);
  }
  /**
   *Calculates length squared of vector and returns it
   */
  magnitudeSquared() {
    return this.y ** 2 + this.x ** 2
  }
  /**
   *Calculates length of this vector to another vector
   * @param { Vector2} v the other vector
   */
  distanceTo(v) {
    obj$1.x = this.x - v.x;
    obj$1.y = this.y - v.y;
    return Math.sqrt( Vector2$1.prototype.magnitudeSquared.call(obj$1))
  }
  /**
   *Calculates length squared of this vector to another vector
   * 
   * @param { Vector2} v the other vector
   * @returns {number}
   */
  distanceToSquared(v) {
    obj$1.x = this.x - v.x;
    obj$1.y = this.y - v.y;
    return Vector2$1.prototype.magnitudeSquared.call(obj$1)
  }
  /**
   * Adds a given vector into this 
   * 
   * @param { Vector2} v
   * @returns {this}
   */
  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this
  }
  /**
   * Adds a scalar value into this vector's
   * x and y values
   * 
   * @param {number} n
   * @returns {this}
   */
  addScalar(n) {
    this.x += n;
    this.y += n;
    return this
  }
  /**
   * Subtracts a given vector from this vector
   * 
   * @param { Vector2} v
   * @returns {this}
   */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this
  }
  /**
   * Subtracts a scalar value from this vector's x and y values.
   * 
   * @param {number} n
   * @returns {this}
   */
  subScalar(n) {
    this.x -= n;
    this.y -= n;
    return this
  }
  /**
   * Calculates the dot product of two vectors.
   * 
   * @param { Vector2} v
   * @returns {number}
   */
  dot(v) {
    return this.x * v.x + this.y * v.y
  }
  /**
   * Calculates the cross product of two vectors.
   * 
   * @param { Vector2} v
   * @returns {number}
   */
  cross(v) {
    return this.x * v.y - this.y * v.x
  }
  /**
   * Multiplies this vector with a scalar.
   * 
   * @param {number} n 
   * @returns {this}
   */
  multiply(n) {
    this.x *= n;
    this.y *= n;
    return this
  }
  /**
   * Divides this vector with a scalar.
   * 
   * @param {number} n 
   * @returns {this}
   */
  divide(n) {
    this.multiply(1 / n);
    return this
  }
  /**
   * Makes this vector a unit vector by 
   * dividing its components with its length.
   * 
   * @returns {this}
   */
  normalize() {
    const length = this.magnitude();
    if (length == 0) return this
    this.x = this.x / length;
    this.y = this.y / length;
    return this
  };
  /**
   * Checks to see if this vector is equal to
   * another vector.
   * 
   * @param { Vector2} v
   * @returns {boolean}
   */
  equals(v) {
    return v.x === this.x && v.y === this.y
  }
  /**
   * Checks if the vector length is zero.
   * 
   * @returns {boolean}
   */
  equalsZero() {
    return this.x === 0 && this.y === 0
  }
  /**
   * Returns a scaled vector normal to this vector,when scaled to 1,it returns a unit vector.
   * 
   * @param {number} l the length of the vector returned.
   * @param { Vector2} [target = Vector2] Vector2 in which results are stored.
   * @returns { Vector2}
   */
  normal(l = 1, target) {
    target = target || new Vector2$1();
    target.copy(this).normalize();
    return target.set(-target.y * l, target.x * l);
  };
  /**
   * Returns the normal to a vector, the normal has the same length as the vector.
   * 
   * @param { Vector2} [target = Vector2] Vector2 in which results are stored.
   *  @returns { Vector2}
   */
  normalFast(target = new Vector2$1()) {
    return target.set(-this.y, this.x)
  }
  /**
   * Rotates this vector by a given angle in radians.
   * 
   * @param {number} rad Angle in radians
   * @returns {this}
   */
  rotate(rad) {
    let
      x = this.x,
      cos = Math.cos(rad),
      sin = Math.sin(rad);
    this.x = x * cos - this.y * sin;
    this.y = x * sin + this.y * cos;
    return this
  };
  /**
   * Returns an array with x and y values of
   * this vector pushed into the array in
   * that order.
   * 
   * @param {number[]} [target = []] The array to
   * push values.Defaults to creating a new
   * array if not provided one
   * @returns number[]
   */
  toArray(target = [], offset = 0) {
    target[offset] = this.x;
    target[offset + 1] = this.y;
    return target;
  }
  /**
   * Copies x and y values of this vector to 
   * a new vector and returns the new vector.
   * 
   * @return Vector2
   */
  clone() {
    return new Vector2$1(this.x, this.y)
  }
  /**
   * Copies x and y values of another vector
   * to this vector.
   * 
   * @@param { Vector2} v 
   * @return this
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;
    return this
  }
  /**
   * Sets x and y values of this vector to the given parameter.
   * 
   * @param {Number} x 
   * @param {Number} y
   * @returns {this}
   */
  set(x, y) {
    this.x = x;
    this.y = y;
    return this
  }
  /**
   * Draws this vector to a 2D canvas.
   * 
   * @param {CanvasRenderingContext2D} ctx the context to draw on.
   * @param {number} x Translates the x-coordinate origin of the vector
   * @param {number} y Translates the y-coordinate origin of the vector
   * @param {string} color a CSS string that
   * is supplied to the rendering context.Can
   *  be a hex(e.g "0xFFFFFF"),rgb(e.g "rgb(255,255,255)"),hsl or a color name(e.g "white")
   * @param {Number} scale A value that
   * lengthens or shortens the length of the vector
   * @returns {this}
   */
  draw(ctx, x = 0, y = 0, color = "red", scale = 1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(this.x * scale + x, this.y * scale + y);
    //ctx.arc(this.x * scale + x, this.y * scale + y, 2, 0, Math.PI * 2)
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.strokeStyle = "black";
    ctx.closePath();
    return this
  }
  /**
   * Negates the values of this vector.
   * 
   * @returns {this}
   */
  reverse() {
    return this.multiply(-1)
  }
  /**
   * Returns a vector of this reflected on a sirface perpendicular to the normal.
   * 
   * @param {number} normal the unit vector perpendicular to reflection surface
   * @param { Vector2} [target]
   * @return { Vector2}
   */
  reflect(normal, target = new Vector2$1()) {
    return target.copy(normal).multiply(this.dot(normal) * 2).sub(this)
  }
  /**
   * Forces this vector to have a length 
   * between the min and max.
   * 
   * @param {number} [min = 0] The smallest value 
   * the length of this vector is allowed to have.
   * @param {number} [max = 1] The biggest value the length of this vector is allowed to have.
   * @returns {this}
   */
  clamp(min = 0, max = 1) {
    let length = this.magnitude();
    if (length == 0) return this
    if (length > max)
      return this.multiply(max / length)
    if (length < min)
      return this.multiply(min / length)
    return this
  }
  
  toJson() {
    return this
  }
  fromJson(obj) {
    this.x = obj.x;
    this.y = obj.y;
  }

  [Symbol.iterator] = function*() {
    yield this.x;
    yield this.y;
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in the range 0° to 360° in the anticlockwise direction from v1 to v2
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
   */
  static getAbsDegBtwn(v1, v2) {
    let a = v1.cross(v2);
    let deg = Vector2$1.getDegBtwn(v1, v2);
    return a < 0 ? deg : 360 - deg
  }
  /**
   * Same as ` Vector2.getAbsDegBtwn` but returns in radians.
   * 
   * @param { Vector2 } v1 start of the angle
   * @param { Vector2 } v2 end of the angle
   * @returns {number}
   **/
  static getAbsRadBtwn(v1, v2) {
    let a = v1.cross(v2);
    let deg = Vector2$1.getDegBtwn(v1, v2);
    return a < 0 ? deg : 360 - deg
  }
  /**
   * Gets the angle (in radians) between two
   * vectors in the shortest direction from v1 to v2 in the range of `0` to `Math.PI`
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
   */
  static getRadBtwn(v1, v2) {
    return Math.acos(v1.dot(v2) / (v1.magnitude() * v2.magnitude()))
  }
  /**
   * Gets the angle (in degrees) between two
   * vectors in shortest direction from v1 to v2 in the range `0°` to `180°`
   * 
   * @param { Vector2} v1 start of the angle
   * @param { Vector2} v2 end of the angle
   * @returns {number}
   */
  static getDegBtwn(v1, v2) {
    return Vector2$1.getRadBtwn(v1, v2) * 180 / Math.PI
  }
  /**
   * Returns a unit vector pointing in the
   * given angle starting from the positive x axis.
   * 
   * @param {number} radian angle in radians from 0 to `Math.PI * 2`
   * @param { Vector2} [target] Vector2 to store results in.
   * @returns { Vector2}
   */
  static fromRad(radian, target = new Vector2$1()) {
    return target.set(Math.cos(radian), Math.sin(radian))
  }
  /**
   * Returns a unit vector pointing in the
   * given angle from the positive x axis
   * 
   * @param {number} degree angle in radians from `0°` to `360°`
   * @param { Vector2} [target] Vector2 to store results in.
   * @returns { Vector2}
   */
  static fromDeg(degree, target) {
    return Vector2$1.fromRad(degree * Math.PI / 180, target)
  }
  /**
   * Generates a new unit Vector2 in a random direction
   * 
   * @param { Vector2} [target]
   * @returns { Vector2}
   */
  static random(target) {
    return Vector2$1.fromRad(Math.random() * TWO_PI, target)
  }
  /**
   * Returns a Vector2 that has been lerped between v1 and v2
   * @param { Vector2} v1 the vector to lerp from
   * @param { Vector2} v2 the vector to lerp from
   * @param {number} t a value from 0 to 1 to scale the new Vector2 between v1 and v2
   * @param { Vector2} [target] the vector to store results into
   * 
   * @returns { Vector2}
   */
  static lerp(v1, v2, t, target = new Vector2$1()) {
    target = target || new Vector2$1();
    return target.set(
      (v2.x - v1.x) * t + v1.x,
      (v2.y - v1.y) * t + v1.y
    )
  }

  /**
   * Returns the angle in degrees between the positive x-axis and the vector.
   * 
   * @param { Vector2} v
   * @returns {number}
   */
  static toDeg(v) {
    return Vector2$1.toRad(v) / Math.PI * 180
  }

  /**
   * Returns the angle in radians between the positive x-axis and the vector.
   * 
   * @param { Vector2} v
   * @returns {number}
   */
  static toRad(v) {
    let a = Math.atan2(v.y, v.x);
    return a < 0 ? TWO_PI + a : a
  }

  /**
   * A vector whose x and y values will remain 0.
   * 
   * @static
   * @readonly
   * @type { Vector2}
   */
  static ZERO = Object.freeze(new Vector2$1())

}
class Vector extends Vector2$1{
  constructor(x,y){
    super(x,y);
    console.error("The class `Vector` is depreciated since v0.4.13.Use Vector2 instead.");
  }
}
class Vec2 extends Vector2$1{
  constructor(x,y){
    super(x,y);
    console.error("The class `Vec2` is depreciated since v0.4.13.Use Vector2 instead.");
  }
}

/**
 * Wrapper class since JavaScript doesn't support references to numbers explicitly.
 * Keeps record of the orientation of an entity.
 */
class Angle {

  /**
   * Orientation in radians.
   * 
   * @private
   * @type number
   */
  _value = 0
  /**
   * Cosine of the angle.
   * 
   * @private
   * @type number
   */
  _cos = 0
  /**
   * Cosine of the angle.
   * 
   * @private
   * @type number
   */
  _sin = 0
  /**
   * @param {number} [deg=0] Orientation in degrees.
   */

  //TODO - Change this to radians instead
  constructor(deg = 0) {
    this.value = deg * Math.PI/2;
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "angle"
  }
  /**
   * The orientation in degrees.
   * @deprecated
   */
  set degree(x) {
    deprecate("Angle.degree");
    this.value = x * Math.PI / 180;
  }
  get _rad(){
    return this._value
  }
  set _rad(x){
    this._value = x;
  }
  get _deg(){
    return this.value * 180/Math.PI
  }
  set _deg(x){
    this.value = x * Math.PI/180;
  }
  /**
   * The orientation in radians.
   * 
   * @deprecated
   */
  set radian(x) {
    deprecate("Angle.radian", "Angle.value");
    this.value = x;
  }
  get radian() {
    deprecate("Angle.radian", "Angle.value");
    return this.value
  }
  get degree() {
    deprecate("Angle.degree");
    return this.value * 180/Math.PI
  }
  /**
   * The angle in radians.
   * @type number
   */
  get value() {
    return this._value
  }
  set value(x) {
    this._value = x;
    this._cos = Math.cos(x);
    this._sin = Math.sin(x);
  }
  /**
   * @type number
   */
  get cos() {
    return this._cos
  }
  /**
   * @type number
   */
  get sin() {
    return this._sin
  }
  /**
   * Copies the orientation of another angle.
   * 
   * @param {Angle} angle
   */
  copy(angle) {
    this.value = angle.value;
  }

  fromJSON(obj) {
    this.value = obj.val;
  }
  /**
   * @returns {{
     deg: number,
     type:string | number
   }}
   */
  toJson() {
    return {
      val: this.value,
      type: this.CHAOS_OBJ_TYPE
    }
  }
}

/**
 * A class that is used to transform positions through rotation, scaling and translation.
 */
class Matrix2 {
  /**
   *  @param {number} [a=1]
   *  @param {number} [b=0]
   *  @param {number} [c=0]
   *  @param {number} [d=1]
   *  @param {number} [e=0]
   *  @param {number} [f=0]
  */
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} scaleX
   * @param {number} scaleY
   * @param {number} rotation
   * 
   * @returns this
   */
  setFromTransform(x, y, scaleX, scaleY, rotation) {
    let cos = Math.cos(rotation);
    let sin = Math.sin(rotation);

    this.a = cos * scaleX;
    this.b = sin * scaleX;
    this.c = -sin * scaleY;
    this.d = cos * scaleY;
    this.e = x;
    this.f = y;
    return this;
  };
  /**
   * Multiplies with another matrix,
   *  A * B = C, where B is this matrix
   * 
   * @param {Matrix2} m
   * @returns this
   */
  prepend(m) {
    let x = this.e;
    let a1 = this.a;
    let c1 = this.c;
    this.a = a1 * m.a + this.b * m.c;
    this.b = a1 * m.b + this.b * m.d;
    this.c = c1 * m.a + this.d * m.c;
    this.d = c1 * m.b + this.d * m.d;
    this.e = x * m.a + this.f * m.c + m.e;
    this.f = x * m.b + this.f * m.d + m.f;
    return this;
  };
  /**
   * Multiplies with another matrix,
   *  A * B = C, where A is this matrix
   * 
   * @param {Matrix2} m
   * @returns {this}
   */
  append(m) {
    let a1 = this.a;
    let b1 = this.b;
    let c1 = this.c;
    let d1 = this.d;
    this.a = m.a * a1 + m.b * c1;
    this.b = m.a * b1 + m.b * d1;
    this.c = m.c * a1 + m.d * c1;
    this.d = m.c * b1 + m.d * d1;
    this.e = m.e * a1 + m.f * c1 + this.e;
    this.f = m.e * b1 + m.f * d1 + this.f;
    return this;
  }
  /**
   * Makes a matrix to be an identity matrix.
   * 
   * @returns this
   */
  identity() {
    this.a = 1;
    this.b = 0;
    this.c = 0;
    this.d = 1;
    this.e = 0;
    this.f = 0;
    return this;
  };
  /**
   * Rotates the matrix by the given angle.
   * 
   * @param {number} radians
   * @returns this
   */
  rotate(radians) {

    let cos = Math.cos(radians);
    let sin = Math.sin(radians);
    let a1 = this.a;
    let c1 = this.c;
    let x = this.e;
    this.a = a1 * cos - this.b * sin;
    this.b = a1 * sin + this.b * cos;
    this.c = c1 * cos - this.d * sin;
    this.d = c1 * sin + this.d * cos;
    this.e = x * cos - this.f * sin;
    this.f = x * sin + this.f * cos;
    return this;
  };
  /**
   * Translates a matrix by a given amount.
   * 
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  translate(x, y) {
    this.e += x;
    this.f += y;
    return this;
  };
  /**
   * Scales a matrix by a given amount.
   * 
   * @param {number} x
   * @param {number} y
   * @returns this
   */
  scale(x, y) {
    this.a *= x;
    this.d *= y;
    return this;
  };
  /**
   * Transforms the given vector.
   * 
   * @param { Vector2} v
   */
  transform(v) {
    let x = v.x;

    v.x = this.a * x + this.c * v.y + this.e;
    v.y = this.b * x + this.d * v.y + this.f;
    return v;
  };
  /**
   * Inverts the matrix.
   *
   * @returns this
   */
  invert() {
    let a = this.a;
    let b = this.b;
    let c = this.c;
    let d = this.d;
    let x = this.e;
    let n = a * d - b * c;
    this.a = d / n;
    this.b = -b / n;
    this.c = -c / n;
    this.d = a / n;
    this.e = (c * this.f - d * x) / n;
    this.f = -(a * this.f - b * x) / n;
    return this;
  };
  /**
   * Copies a matrix into this matrix.
   * 
   * @param {Matrix2} m
   * @returns this
   */
  copy(m) {
    this.a = m.a;
    this.b = m.b;
    this.c = m.c;
    this.d = m.d;
    this.e = m.e;
    this.f = m.f;
    return this;
  }
  /**
   * Creates a new matrix,fills its values with this ones and returns the former.
   * 
   * @returns Matrix2
   */
  clone() {
    return new Matrix2().copy(this);
  }
  /**
   * Deeply checks if a matrix is equal to another.
   * 
   * @param {Matrix2} matrix
   * @returns boolean
   */
  equals(matrix) {
    return (this.a === matrix.a && this.b === matrix.b && this.c === matrix.c && this.d === matrix.d && this.e === matrix.e && this.f === matrix.f);
  }

  [Symbol.iterator] = function*() {
    yield this.a;
    yield this.b;
    yield this.c;
    yield this.d;
    yield this.e;
    yield this.f;
  }
}

function wrapAngle(x) {
  let a = x;
  while (a > Math.PI * 2) {
    a = a - Math.PI * 2;
  }
  while (a < 0) {
    a = a + Math.PI * 2;
  }
  return a
}

const Easing = {
  linear: function(x) {
    return x;
  },
  quadraticIn: function(x) {
    return x * x;
  },
  quadraticOut: function(x) {
    return x * (2 - x);
  },
  quadraticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x;
    }
    return -0.5 * (--x * (x - 2) - 1);
  },
  cubicIn: function(x) {
    return x * x * x;
  },
  cubicOut: function(x) {
    return --x * x * x + 1;
  },
  cubicInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x;
    }
    return 0.5 * ((x -= 2) * x * x + 2);
  },
  quarticIn: function(x) {
    return x * x * x * x;
  },
  quarticOut: function(x) {
    return 1 - --x * x * x * x;
  },
  quarticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x * x;
    }
    return -0.5 * ((x -= 2) * x * x * x - 2);
  },
  quinticIn: function(x) {
    return x * x * x * x * x;
  },
  quinticOut: function(x) {
    return --x * x * x * x * x + 1;
  },
  quinticInOut: function(x) {
    if ((x *= 2) < 1) {
      return 0.5 * x * x * x * x * x;
    }
    return 0.5 * ((x -= 2) * x * x * x * x + 2);
  },
  sinusoidalIn: function(x) {
    return 1 - Math.sin(((1.0 - x) * Math.PI) / 2);
  },
  sinusoidalOut: function(x) {
    return Math.sin((x * Math.PI) / 2);
  },
  sinusoidalInOut: function(x) {
    return 0.5 * (1 - Math.sin(Math.PI * (0.5 - x)));
  },
  exponentialIn: function(x) {
    return x === 0 ? 0 : Math.pow(1024, x - 1);
  },
  exponentialOut: function(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  exponentialInOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    if ((x *= 2) < 1) {
      return 0.5 * Math.pow(1024, x - 1);
    }
    return 0.5 * (-Math.pow(2, -10 * (x - 1)) + 2);
  },
  circularIn: function(x) {
    return 1 - Math.sqrt(1 - x * x);
  },
  circularOut: function(x) {
    return Math.sqrt(1 - --x * x);
  },
  circularInOut: function(x) {
    if ((x *= 2) < 1) {
      return -0.5 * (Math.sqrt(1 - x * x) - 1);
    }
    return 0.5 * (Math.sqrt(1 - (x -= 2) * x) + 1);
  },
  elasticIn: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return -Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
  },
  elasticOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return Math.pow(2, -10 * x) * Math.sin((x - 0.1) * 5 * Math.PI) + 1;
  },
  elasticInOut: function(x) {
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    x *= 2;
    if (x < 1) {
      return -0.5 * Math.pow(2, 10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI);
    }
    return 0.5 * Math.pow(2, -10 * (x - 1)) * Math.sin((x - 1.1) * 5 * Math.PI) + 1;
  },
  backIn: function(x) {
    var s = 1.70158;
    return x === 1 ? 1 : x * x * ((s + 1) * x - s);
  },
  backOut: function(x) {
    var s = 1.70158;
    return x === 0 ? 0 : --x * x * ((s + 1) * x + s) + 1;
  },
  backInOut: function(x) {
    var s = 1.70158 * 1.525;
    if ((x *= 2) < 1) {
      return 0.5 * (x * x * ((s + 1) * x - s));
    }
    return 0.5 * ((x -= 2) * x * ((s + 1) * x + s) + 2);
  },
  bounceIn: function(x) {
    return 1 - Easing.bounceOut(1 - x);
  },
  bounceOut: function(x) {
    if (x < 1 / 2.75) {
      return 7.5625 * x * x;
    }
    else if (x < 2 / 2.75) {
      return 7.5625 * (x -= 1.5 / 2.75) * x + 0.75;
    }
    else if (x < 2.5 / 2.75) {
      return 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375;
    }
    else {
      return 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
    }
  },
  bounceInOut: function(x) {
    if (x < 0.5) {
      return Easing.bounceIn(x * 2) * 0.5;
    }
    return Easing.bounceOut(x * 2 - 1) * 0.5 + 0.5;
  },
};

const Interpolation = {
  Linear: function(p0, p1, t) {
    return (p1 - p0) * t + p0
  },
  Bernstein: function(n, i) {
    const fc = Interpolation.Utils.Factorial;

    return fc(n) / fc(i) / fc(n - i)
  },
  Factorial: (function() {
    const a = [1];

    return function(n) {
      let s = 1;

      if (a[n]) {
        return a[n]
      }

      for (let i = n; i > 1; i--) {
        s *= i;
      }

      a[n] = s;
      return s
    }
  })(),

  CatmullRom: function(p0, p1, p2, p3, t) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;

    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1
  },
};

/**
 * Component responsible for animations.
 * 
 * @template {T}
 */
class Tween {
  _duration = 0
  _repeat = false
  active = false
  /**
   * @type {T}
   */
  _to = null
  _from = null
  _into = null
  _interpolationFunc = Interpolation.Linear
  _easingFunction = Easing.linear
  _timeTaken = 0
  _updateFunc = NoUpdateThrow
  _next = null
  /**
   *@template {T}
   *@param {T} to
   *@param {T} from
   *@param {number} duration
   */
  constructor(into) {
    this._into = into;
  }
  init(entity) {
    this.play();
  }
  /**
   * @param {T} x
   */
  to(x) {
    this._to = x;
    return this
  }
  /**
   * @param {T} x
   */
  from(x) {
    this._from = x;
    return this
  }
  /**
   * @param {T} t
   */
  duration(t) {
    this._duration = t;
    return this
  }
  repeat() {
    this._repeat = true;
    return this
  }
  play() {
    this._timeTaken = 0;
    this.active = true;
  }
  stop() {
    this.active = false;
  }
  onUpdate(callback) {
    this._updateFunc = callback;
    return this
  }
  easing(func) {
    this._easingFunction = func;
    return this
  }
  interpolant(func) {
    this._interpolationFunc = func;
    return this
  }
  update(dt) {
    if (!this.active) return

    this._timeTaken += dt;
    if (this._timeTaken >= this._duration) {
      if(this._next !== void 0){
        this.stop();
        this._next.play();
      }
      if (this._repeat) {
        this._timeTaken = 0;
      } else {
        this._timeTaken = this._duration;
        this.active = false;
      }
    }
    let t = this._easingFunction(
      this._timeTaken / this._duration
    );
    this._updateFunc(
      this._interpolationFunc,
      this._to,
      this._from,
      t,
      this._into
    );
  }
  chain(next) {
    this._next = next;
    return this
  }
}

/**
 * @type Tween<number>
 */
new Tween();

/**
 * @template {T}
 * @callback TweenUpdate
 * @param {Function} lerpFunc
 * @param {T} to
 * @param {T} from
 * @param {number} t
 * @param {T} into
 * 
 * @returns {void}
 */

/**
 * @type {TweenUpdate}
 */
function Vector2Update(lerpFunc, to, from, t, into) {
  into.x = lerpFunc(from.x, to.x, t);
  into.y = lerpFunc(from.y, to.y, t);
}
function Vector3Update(lerpFunc, to, from, t, into) {
  into.x = lerpFunc(from.x, to.x, t);
  into.y = lerpFunc(from.y, to.y, t);
  into.z = lerpFunc(from.z, to.z, t);
}

function ColorUpdate(lerpFunc, to, from, t, into) {
  into.r = lerpFunc(from.r, to.r, t);
  into.g = lerpFunc(from.g, to.g, t);
  into.b = lerpFunc(from.b, to.b, t);
  into.a = lerpFunc(from.a, to.a, t);
}

function AngleUpdate(lerpFunc, to, from, t, into) {
  into.rad = lerpFunc(from.rad, to.rad, t);
}

function NoUpdateThrow() {
  throw "The Tween does not have a valid onUpdate callback."
}

/**
 * This module is used to check if bounds of a body overlap
 */
const Overlaps = {
  /**
   * Checks if two AABB overlap
   * 
   * @param {BoundingBox} a
   * @param {BoundingBox} b
   */
  AABBColliding(a, b) {
    return (
      a.min.x <= b.max.x &&
      a.max.x >= b.min.x &&
      a.min.y <= b.max.y &&
      a.max.y >= b.min.y
    )
  },
  /**
   * Checks if two BoundingCircles overlap
   * 
   * @param {BoundingCircle} a
   * @param {BoundingCircle} b
   */
  boundSpheresColliding(a, b) {
    const distance = (a.pos.x - b.pos.x) * (a.pos.x - b.pos.x) +
      (a.pos.y - b.pos.y) * (a.pos.y - b.pos.y);
    return distance < a.r * a.r + b.r * b.r;
  },
    /**
     * Checks if An AABB and a CircleBound overlap
     * 
     * @param {BoundingBox} a
     * @param {BoundingCircle} b
     */
  AABBvsSphere(a, b) {
    const x = Math.max(a.min.x, Math.min(b.pos.x, a.max.x));
    const y = Math.max(a.min.y, Math.min(b.pos.y, a.max.y));
    const distance =
      (x - b.pos.x) * (x - b.pos.x) +
      (y - b.pos.y) * (y - b.pos.y);

    return distance < b.r * b.r;
  }
};

/**
 * A rectangular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
class BoundingBox extends Component {
  /**
   * 
   * @type Vector_like
   */
  pos = null
  /**
   * The upper limit of the bounding box
   * 
   * @type Vector_like
   */
  max = null
  /**
   * The lower limit of the bounding box
   * 
   * @type Vector_like
   */
  min = null
  /**
   * @param {number} [minX=0]
   * @param {number} [minY=0]
   * @param {number} [maxX=0]
   * @param {number} [maxY=0]
   */
  constructor(minX = 0, minY = 0, maxX = 0, maxY = 0) {
    super();
    this.pos = {
      x: 0,
      y: 0
    };
    this.max = {
      x: maxX,
      y: maxY
    };
    this.min = {
      x: minX,
      y: minY
    };
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param {BoundingCircle | BoundingBox} bound the bound to check  intersection with
   * @returns boolean
   **/
  intersects(bound) {
    if (bound.r)
      return Overlaps.AABBvsSphere(this, bound)
    return Overlaps.AABBColliding(this, bound)
  }
  /**
   * Calculates the bounds of the body
   * 
   * @param {Body} body Body to calculate max and min from
   * @param {Number} padding increases the size of the bounds
   */
  calculateBounds(body, padding = 0) {
    let minX = Number.MAX_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxX = -Number.MAX_SAFE_INTEGER,
      maxY = -Number.MAX_SAFE_INTEGER;

    if (body.shapes.length == 0) {
      this.min.x = body.position.x;
      this.max.x = body.position.x;
      this.min.y = body.position.y;
      this.max.y = body.position.y;
      this.pos.x = body.position.x;
      this.pos.y = body.position.y;
      return
    }
    for (var i = 0; i < body.shapes.length; i++) {
      let shape = body.shapes[i];
      if (shape.type == 0) {
        let idx = body.position.x - shape.radius,
          idy = body.position.y - shape.radius,
          mdx = body.position.x + shape.radius,
          mdy = body.position.y + shape.radius;
        if (!minX || idx < minX) minX = idx;
        if (!maxX || mdx > maxX) maxX = mdx;
        if (!minY || idy < minY) minY = idy;
        if (!maxY || mdy > maxY) maxY = mdy;
        continue
      }
      for (var j = 0; j < shape.vertices.length; j++) {
        let vertex = shape.vertices[j];
        if (vertex.x < minX) minX = vertex.x;
        if (vertex.x > maxX) maxX = vertex.x;
        if (vertex.y < minY) minY = vertex.y;
        if (vertex.y > maxY) maxY = vertex.y;
      }
    }
    this.min.x = minX - padding;
    this.max.x = maxX + padding;
    this.min.y = minY - padding;
    this.max.y = maxY + padding;
    this.pos.x = body.position.x;
    this.pos.y = body.position.y;
  }
  /**
   * Translates this bound to the given position.
   * 
   * @param { Vector2} pos
   */
  update(pos) {
    let dx = pos.x - this.pos.x;
    let dy = pos.y - this.pos.y;

    this.pos.x = pos.x;
    this.pos.y = pos.y;
    this.min.x += dx;
    this.max.x += dx;
    this.min.y += dy;
    this.max.y += dy;
  }
  /**
   * Deep copies a bounding box to a new one.
   * 
   * @returns BoundingBox
   */
  clone() {
    return new BoundingBox(this.min.x, this.min.y, this.max.x, this.max.y)
  }
  /**
   * Deep copies another bounding box.
   * 
   * @param {BoundingBox} bounds
   */
  copy(bounds) {
    this.pos.x = bounds.pos.x;
    this.pos.y = bounds.pos.y;
    this.min.x = bounds.min.x;
    this.min.y = bounds.min.y;
    this.max.x = bounds.max.x;
    this.max.y = bounds.max.y;
  }
  toJson() {
    return {
      posX: this.pos.x,
      posY: this.pos.y,
      minX: this.min.x,
      minY: this.min.y,
      maxX: this.max.x,
      maxY: this.max.y,
    }
  }
  fromJson(obj) {
    this.pos.x = obj.posX;
    this.pos.y = obj.posY;
    this.min.x = obj.minX;
    this.min.y = obj.minY;
    this.max.x = obj.maxX;
    this.max.y = obj.maxY;
  }
  /**
   * Combines two bounds to create a new one that covers the previous two.
   * 
   * @param {BoundingBox} bound1 
   * @param {BoundingBox} bound2 
   * @param {BoundingBox} target Bound to store results into.
   * @returns BoundingBox
   */
  static union(bound1, bound2, target) {
    target = target || new BoundingBox();

    target.max.x = bound1.max.x > bound2.max.x ? bound1.max.x : bound2.max.x;
    target.max.y = bound1.max.y > bound2.max.y ? bound1.max.y : bound2.max.y;
    target.min.x = bound1.min.x < bound2.min.x ? bound1.min.x : bound2.min.x;
    target.min.y = bound1.min.y < bound2.min.y ? bound1.min.y : bound2.min.y;
    return target
  }
}

/**
 * A circular bound that is used to contain a body so that broadphase can be used for quick collision detection.
 */
class BoundingCircle {
  /**
   * 
   * @type number
  */
  r = 0
  /**
   * 
   * @type Vector_like
  */
  pos = null
  /**
   * @param {number} [r=0]
   */
  constructor(r = 0) {
    this.r = r;
    this.pos = { x: 0, y: 0 };
  }
  /**
   * 
   * Checks to see if this intersects with another bounding box
   * @param { BoundingCircle | BoundingBox } bound the bound to check  intersection with
   **/
  intersects(bound) {
    if (bound.r)
      return Overlaps.boundSpheresColliding(this, bound)
    return Overlaps.AABBvsSphere(bound, this)
  }
  /**
   * Calculates the bounds of the body
   * 
   * @param {Body} body Body to calculate max and min from
   * @@param {Number} padding increases the size of the bounds
   */
  calculateBounds(body, padding = 0) {
    let radsq = 0,
      shape,
      vertices,
      tmp;
    for (var i = 0; i < body.shapes.length; i++) {
      shape = body.shapes[i];
      if (shape.radius) {
        tmp = shape.radius * shape.radius;
        if (tmp > radsq) radsq = tmp;
        continue
      }
      for (var j = 0; j < body.shapes[i].vertices.length; j++) {
        vertices = body.shapes[i].vertices;
        for (var j = 0; j < vertices.length; j++) {
          tmp = vertices[j].distanceToSquared(body.position);
          if (tmp > radsq) radsq = tmp;
        }
        
      }
    }
    this.pos.x = body.position.x;
    this.pos.y = body.position.y;
    this.r = Math.sqrt(radsq);
  }
  /**
   * Translates this bound to the given position.
   * 
   * @param {Vector_like} pos
   */
  update(pos) {
    //let dx = pos.x - this.pos.x
    //let dy = pos.y - this.pos.y

    this.pos.x = pos.x;
    this.pos.y = pos.y;
  }
  toJson(){
    return {
      posX:this.pos.x,
      posY:this.pos.y,
      r:this.r
    }
  }
  fromJson(obj){
    this.pos.x = obj.posX;
    this.pos.y = obj.posY;
    this.r = obj.r;
  }
}

class Geometry {
  /**
   * @type Vector2[]
   */
  vertices = null
  /**
   * @type Vector2[]
   */
  normals = null
  /**
   * @type Vector2[]
   */
  _dynNormals = null
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices;
    this.normals = this.calcFaceNormals();
    this._dynNormals = this.normals.map(e => e.clone());
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "geometry"
  }
  /**
   * @param {number} rad
   * @param { Vector2[]} target
   */
  getNormals(rad, target) {
    target = target || [];
    for (var i = 0; i < this.normals.length; i++) {
      target.push(this._dynNormals[i].copy(this.normals[i]).rotate(rad));
    }
    return target
  }
  /**
   * @private
   * @returns Vector2[]
   */
  calcFaceNormals() {
    const axes = [],
      { vertices } = this;
    for (var i = 0; i < vertices.length; i++) {
      let axis = vertices[i >= vertices.length ? vertices.length - 1 : i]
        .clone()
        .sub(vertices[i + 1 >= vertices.length ? 0 : i + 1]).normal();
      for (var j = 0; j < axes.length; j++) {
        if (axis.equals(axes[j]) || axis.clone().reverse().equals(axes[j])) {
          axis = null;
          break
        }
      }
      if (!axis) continue
      axes.push(axis);
    }
    return axes
  }
  /**
   * @param {number} n
   * @param { Vector2[]} vertices
   * @param { Vector2} pos
   * @patam {number} rad
   */
  transform(vertices, pos, rad, n) {
    for (let i = 0; i < this.vertices.length; i++) {
      let vertex = vertices[i];
      vertex.copy(this.vertices[i]);
      vertex.rotate(rad);
      vertex.multiply(n);
      vertex.add(pos);
    }
  }
  toJson(){
    let obj = {
      vertices:this.vertices.map((v)=>v.toJson())
    };
    return obj
  }
  fromJson(obj){
    this.vertices = obj.vertices.map(v=>new Vector2().fromJson(v));
    this.normals = this.calcFaceNormals();
    this._dynNormals = this.normals.map(e => e.clone());
  }
}

/**@enum {number}*/
const ShapeType = Object.freeze({
  CIRCLE: 0,
  POLYGON: 1
});
/**@enum {number}*/
const ObjType = Object.freeze({
  CONSTRAINT: 0,
  BODY: 1,
  COMPOSITE: 2
});
/**@enum {number}*/
const BodyType = Object.freeze({
  DYNAMIC:2,
  KINEMATIC:1,
  STATIC:0
});

//Default settings 
const Settings = {
  //For the world
  posDampen: 0.80,
  linearDamping: 0.001,
  angularDamping: 0.001,
  velocitySolverIterations: 10,
  fixedFrameRate: 0.016,
  
  //For all bodies
  mass: 1,
  restitution: 0.6,
  staticFriction: 0.4,
  kineticFriction: 0.2,
  boundPadding : 0,
  allowSleep: false,
  aabbDetectionOnly: false,
  collisionResponse: true,
  autoUpdateBound: true,
  type:BodyType.DYNAMIC
};

let tmp1$c = new Vector2$1();

/**
 * This class makes a body tangible
 * to collision detection and response.Without it,the body will not be able to interact with other bodies.
 */
class Shape {
  /**
   * Used to determine what type of shape this is.
   * 
   * @type number
   * @readonly
   */
  type = ShapeType.POLYGON
  /**
   * The offset angle of this shape from this body's angle.
   * 
   * @type number
   */
  offAngle = 0
  /**
   * The offset position of this shape from this body's position.
   * 
   * @type Vector2
   */
  offPosition = null
  /**
   * The vertices describing the shape.
   * 
   * @type Vector2[]
   */
  vertices = null
  /**
   * Keeps the original normals and vertices of this shape
   * 
   * @type Geometry
   */
  geometry = null

  /**
   * @param { Vector2[]} vertices The vertices of the shape in local space coordinates.
   * @param { Vector2} [offset=vector] offset position relative to parent body
   * @param {number} [offsetAngle=0] offset angle relative to parent body.
   */
  constructor(vertices, offset = new Vector2$1(), offsetAngle = 0) {
    this.offPosition = offset;
    this.offAngle = offsetAngle * Math.PI / 180;
    this.vertices = vertices.map(v => v.clone());
    this.geometry = new Geometry(vertices);
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "shape"
  }
  /**
   * The area occupied by a shape.
   * @type number
   */
  get area() {
    return 0
  }
  /**
   * Returns the normals of the faces when rotated.
   * 
   * @param {Shape} shape
   * @param { Vector2[]} [target=[]] An array where results are stored.
   * @returns { Vector2[]}
   */
  getNormals(shape, target) {
    return this.geometry.getNormals(this.angle, target)
  }
  /**
   * Transforms the local coordinates of the vertices to world coordinates.
   * 
   * @param { Vector2} position the world position of the body
   * @param {number} angle the orientation of body
   * @param {number} scale the scale of the body
   */
  update(position, angle, scale) {
    this.angle = this.offAngle + angle;
    this.geometry.transform(this.vertices, tmp1$c.copy(position).add(this.offPosition), this.angle, 1 , position);
  }

  /**
   * Returns the world coordinates of the vertices.
   * 
   * @param { Vector2} axis
   * @param { Vector2[]} target 
   * @returns { Vector2[]}
   */
  getVertices(axis, target) {
    return this.vertices
  }

  /**
   * Calculates the inertia of a given shape.
   * 
   * @virtual
   * @returns {number}
   */
  static calcInertia() {
    throw new Error("Implement in the children classes")
  }
  toJson() {
    let obj = {
      type: this.CHAOS_OBJ_TYPE,
      geometry: this.geometry.toJson(),
      shapwType: this.type,
      offset: this.offPosition.toJson(),
      offAngle: this.offAngle
    };
    return obj
  }
  fromJson(obj) {
    this.offAngle = obj.offAngle;
    this.offPosition = obj.offset;
    this.geometry.fromJson(obj.geometry);
    this.vertices = this.geometry.vertices.map(v => v.clone());
  }
  static CIRCLE = 0
  static POLYGON = 1
}

class Line extends Shape {
  /**
   * @type number
  */
  length = 0
  /**
   * @param {number} length
   * @param { Vector2} offset
   * @param {number} pffsetAngle
  */
  constructor(length,offset,offsetAngle) {
    let start = new Vector2$1(1).multiply(length / 2),
      end = new Vector2$1(1).multiply(-length / 2);
    super([start, end],offset,offsetAngle);
    this.length = length;
  }
}

let _vec1 = new Vector2$1();
let _vec2 = new Vector2$1();

/**
 * A circular shape.
 * 
 * 
 * @augments Shape
 */
class Circle extends Shape {
  angle = 0
  radius = 0
  /**
   * @param {number} radius 
   * @param { Vector2} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(radius, offset, offsetAngle) {

    //the first vertex is position 
    super([], offset, offsetAngle);
    this.vertices = [new Vector2$1(), new Vector2$1(), new Vector2$1()];
    this.radius = radius;
    this.type = Shape.CIRCLE;
  }
  get position() {
    return this.vertices[0]
  }
  /**
   * @inheritdoc
   * @param {number} mass
   * @param {number} radius 
   */
  static calcInertia(mass, radius) {
    return mass * (radius * radius) / 4
  }
  /**
   * @inheritdoc
   * 
   * @param { Vector2} axis
   * @param { Vector2[]} out 
   * @returns { Vector2[]}
   */
  getVertices(axis, out) {
    let target = out || [];
    let v1 = _vec1.copy(axis).multiply(-this.radius).add(this.position);
    let v2 = _vec2.copy(axis).multiply(this.radius).add(this.position);
    target[0] = v1.clone();
    target[1] = v2.clone();
    return target
  }
  /**
   * 
   * @param {Shape} shape 
   * @param { Vector2[]} [target=[]] target
   * @returns Array< Vector2>
   */
  getNormals(shape, target = []) {
    let min = null,
      vertex = null;
    for (let i = 0; i < shape.vertices.length; i++) {
      let a = this.position.distanceToSquared(shape.vertices[i]);
      if (!min || min > a) {
        vertex = shape.vertices[i];
        min = a;
      }
    }
    if (!vertex) vertex = shape.position;
    target.push(_vec1.copy(vertex).sub(this.position).normalize().clone());
    return target
  }
  /**
   * @inheritdoc
   * 
   * @param { Vector2} position
   * @param {number} angle
   * @param {number} scale 
   */
  update(position, angle, scale) {
    this.position.copy(position).add(this.offPosition);
    this.angle = this.offAngle + angle;
  }
  get area() {
    return Math.PI * this.radius * this.radius
  }
  toJson() {
    let obj = {
      radius: this.radius,
      offset: this.offPosition,
      offAngle: this.offAngle,
      shapeType: this.type,
      type: this.CHAOS_OBJ_TYPE
    };
    return obj
  }
  fromJson(obj) {
    return new Circle(
      obj.radius,
      new Vector2$1().fromJson(obj.offset),
      obj.offAngle
    )
  }
}

class Rectangle extends Shape {
  /**
   * @type number
   */
  height = 0
  /**
   * @type number
   */
  width = 0
  /**
   * @param {number} width
   * @param {number} height
   * @param { Vector2} offset Positional offset from the body center.
   *  @param {number} offsetAngle Angular offset from the body center.
   */
  constructor(width, height, offset, offsetAngle) {
    let v1 = new Vector2$1(-width / 2, -height / 2);
    let v2 = new Vector2$1(-width / 2, height / 2);
    let v3 = new Vector2$1(width / 2, height / 2);
    let v4 = new Vector2$1(width / 2, -height / 2);
    super([v1, v2, v3, v4], offset, offsetAngle);
    this.height = height;
    this.width = width;
  }
  /**
   * @inheritdoc
   * @param {number} mass of the body
   * @param {number} width
   * @param {number} height
   * @returns number
   */
  static calcInertia(mass, width, height) {
    return mass * (sq(width) + sq(height)) / 12
  }
  get area() {
    return this.width * this.height
  }

}

let tmp1$b = new Vector2$1();

/**
 * A triangular shape.
 * 
 * @augments Shape
 */
class Triangle extends Shape {
  /**
   * @param {number} base Length of one side.
   * @param {number} height Length of a second side.
   * @param {number} angle The angle between the two sides.
   * @param { Vector2} offset Positional offset from the body center.
   * @param {number} offsetAngle Angular offset from the body center.
   * 
   */
  constructor(base, height, angle, offset, offsetAngle) {
    let l1 = new Vector2$1().set(1, 0).multiply(base);
    let l2 = Vector2$1.fromRad(angle).multiply(height/Math.sin(angle));
    let center = tmp1$b.set((l1.x + l2.x) / 3, l2.y / 3);
    super([
      new Vector2$1().sub(center),
      l1.sub(center),
      l2.sub(center)
    ], offset, offsetAngle);
  }
  static calcInertia(mass,base,height,angle){
    return 0.5 * mass * base * height * (1 - 2/3 * (1 - (Math.cos(2 * angle * 180/Math.PI))/2))
  }
}

/**
 * Component to hold the bounds of an entity.
 * 
 */
class Bound$1 extends Component {
  /**
   * The actual bounds.Used for collision detection.
   * 
   * @type BoundingBox | BoundingCircle
   */
  bounds = new BoundingBox()
  toJson(){
    return {
      bounds:this.bounds.toJson()
    }
  }
  fromJson(obj){
    this.bpunds.fromJson(obj.bounds);
  }
}

/**
 * Holds transformation info of an entity 
 * 
 */
class Transform$1 extends Component{
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns 
   */
  constructor(x,y,a){
    super();
    this.position = new Vector2$1(x,y);
    this.orientation = new Angle(a);
  }
  init(){}
  toJson(){
    return {
      position: this.position.toJson(),
      orientation:this.orientation.toJson()
    }
  }
  fromJson(obj){
    this.position.fromJson(obj.position);
    this.orientation.fromJson(obj.orientation);
  }
}

/**
 * Component to hold requirements for an entity to move.
 * 
 */
class Movable$1 extends Component {
  /**  * 
   * @param {number} x
   * @param {number} y
   * @param {number} a
   * @returns {Entity}
   */
  constructor(x, y, a) {
    super();
    this.transform = null;
    this.velocity = new Vector2$1(x, y);
    this.rotation = new Angle(a);
    this.acceleration = new Vector2$1();
    this.torque = new Angle();
  }
  init(entity) {
    this.requires(entity, "transform");
    if (!this.transform)
      this.transform = entity.get("transform");
  }
  toJson() {
    return {
      velocity: this.velocity.toJson(),
      rotation: this.rotation.toJson(),
      acceleration: this.acceleration.toJson()
    }
  }
  fromJson(obj) {
    this.velocity.fromJson(obj.velocity);
    this.rotation.fromJson(obj.rptatjon);
    this.acceleration.fromJson(obj.acceleration);
  }
}

class Intergrator extends System {
  active = false
  solver = EulerSolver.solve
  objects = []
  constructor() {
    super();
  }
  init(manager) {
    const world = manager.getSystem("world");
    if (world) world.enableIntergrate = false;
    this.active = true;
    
    manager.setComponentList("movable", this.objects);
  }
  update(dt) {
    for (let i = 0; i < this.objects.length; i++) {
      if (this.objects[i] == void 0) return
      this.solver(
        this.objects[i].transform,
        this.objects[i],
        dt
      );
    }
  }
}
const a = new Vector2$1();
/**
 * Semi implicit euler integration.
 * More stable than explicit euler intergration.
 */
class EulerSolver {
  /**
   * @param {number} dt
   */
  static solve(transform, movable, dt) {
    const position = transform.position;
    const velocity = movable.velocity;
    const acceleration = movable.acceleration;
    const orientation = transform.orientation;
    const rotation = movable.rotation;
    const torque = movable.torque;

    velocity.add(acceleration.multiply(dt));
    a.copy(velocity);
    position.add(a.multiply(dt));
    rotation.value += torque.value * dt;
    orientation.value += rotation.value * dt;
    acceleration.set(0, 0);
    torque.value = 0;
  }
}

/**
 * Holds information needed for collision detection and response.
 * 
 */
class Body extends Component {
  /**
   * Unique identification of a body.
   * 
   * @type number
   */
  id = generateID()
  _transform = new Transform$1()
  _movable = new Movable$1()
  _mass = 1
  /**
   * Rotational inertia of the body.
   * 
   * @private
   * @type number
   */
  _inertia = 1
  /**
   * Type of the body e.g Dynamic, Kinematic or Static.
   * 
   * @private
   * @type number
   */
  _type = 0
  /**
   * Anchors of the body in local space.
   * 
   * @private
   * @type Vector2[]
   */
  _localanchors = []
  /**
   * The original anchors of the body in local space.
   * 
   * @private
   * @type Vector2[]
   */
  anchors = []
  /**
   * Position of a body in the last frame..
   * 
   * @type Vector2
   */
  lastPosition = new Vector2$1()
  /**
   * Inverse mass of the body.
   * 
   * @type number
   */
  inv_mass = 0
  /**
   * Inverse inertia of the body.
   * 
   * @type number
   */
  inv_inertia = 0
  /**
   * The bounciness of the body between 0 and 1.
   * 
   * @type number
   * @default Settings.restitution
   */
  restitution = Settings.restitution
  /**
   * The friction of the body between 0 and 1 that affects it before it moves.
   * 
   * @type number
   * @default Settings.staticFriction
   */
  staticFriction = Settings.staticFriction
  /**
   * The friction of the body between 0 and 1that affects it after it moves.
   * 
   * @type number
   * @default Settings.kineticFriction
   */
  kineticFriction = Settings.kineticFriction
  /**
   * The padding of the body's bounds.
   * 
   * @type number
   * @default Settings.boundPadding
   */
  boundPadding = Settings.boundPadding
  /**
   * The index of the body in its manager.
   * 
   * @package
   * @type number
   * @default -1
   */
  index = -1
  /**
   * Used to describe how bodies will collide with each other.
   * Bodies in the same layer or layer 0 will always collide with each other unless they are in different groups.
   * Bodies in the same group will not collied with each other.
   * 
   * @type {{layer:number, group: number}}
   * @default -1
   */
  mask = {
    layer: 0,
    group: 0
  }
  /**
   * Object containing the body
   * 
   * @type Entity | null
   */
  entity = null
  /**
   * World space bounds of a body.
   * 
   * @type BoundingBox | BoundingCircle | null
   */
  bounds = null
  /**
   * Shapes a body is comprised of.
   * 
   * @type Shape[]
   */
  shapes = null
  /**
   * Client of the body inside a broadphase.
   * 
   * @package
   * @type Object | null
   */
  client = null
  /**
   * Whether the body should sleep when at rest or not.
   * 
   * @type boolean
   * @default Settings.allowSleep
   */
  allowSleep = Settings.allowSleep
  /**
   * If the body is asleep or not.
   * 
   * @type boolean
   */
  sleeping = false
  /**
   * Whether the body should detect collisions with bounds only.If true,no collision response will occur.Precollision event only will be fired.
   * 
   * @type boolean
   * @default Settings.aabbDetectionOnly
   */
  aabbDetectionOnly = Settings.aabbDetectionOnly
  /**
   * Whether the body should respond to collisions.If false,no collision response will occur but collision events will still be fired.
   * 
   * @type boolean
   * @default Settings.collisionResponse
   */
  collisionResponse = Settings.collisionResponse
  /**
   * Whether or not the bounds should be automatically updated.
   * 
   * @type boolean
   * @default Settings.autoUpdateBound
   */
  autoUpdateBound = Settings.autoUpdateBound
  /**
   * @param {Shape[]} shapes
   */
  constructor(...shapes) {
    super();
    this.type = Settings.type;
    this.shapes = shapes;
    this.mass = 1;
    this.inertia = 1;
  }
  /**
   * Type of a body.It includes the static and dynamic for now.
   * Static bodies do not move and do not react to collisions.
   * Dynamic bodies move and respond to collisions.
   * Kinematic bodies move but do not respond to collisions.
   * 
   * @example
   * let body = new Body()
   * body.type = Body.STATIC
   * 
   */
  set type(x) {
    if (x === Body.STATIC || x === Body.KINEMATIC) this.mass = 0;
    this._type = x;
  }
  get type() {
    return this._type
  }
  /**
   * Used to determine what it is in a world.
   * 
   * @package
   * @type number 
   */
  get physicsType() {
    return ObjType.BODY
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "body"
  }
  /**
   * Acceleration of a body
   * 
   * @type Vector2
   */
  get acceleration() {
    return this._movable.acceleration
  }
  set acceleration(x) {
    this._movable.acceleration.copy(x);
  }
  /**
   * Velocity of a body

   * @type Vector2
   */
  get velocity() {
    return this._movable.velocity
  }
  set velocity(x) {
    this._movable.velocity.copy(x);
  }
  /**
   * Rotation of a body
   * 
   * @type Angle
   */
  get rotation() {
    return this._movable.rotation
  }
  set rotation(x) {
    this._movable.rotation.copy(x);
  }
  /**
   * Orientation of a body in degrees.
   * 
   * @type number
   */
  set angle(angle) {
    this.orientation.value = degToRad(angle);
  }
  get angle() {
    return radToDeg(this.orientation.value)
  }
  /**
   * Mass of a body.
   * 
   * @type number
   */
  set mass(x) {
    this._mass = x;
    this.inv_mass = x === 0 ? 0 : 1 / x;
    if (x == 0) this.inertia = 0;
  }
  get mass() {
    return this._mass
  }
  /**
   * Density of a body.
   *
   * @type number
   */
  set density(x) {
    let area = 0;
    for (var i = 0; i < this.shapes.length; i++) {
      area += this.shapes[i].area;
    }
    this.mass = x * area * 0.01;
  }
  get density() {
    let area = 0;
    for (var i = 0; i < this.shapes.length; i++) {
      area += this.shapes[i].area;
    }
    return 100 * this.mass / area
  }
  /**
   * Rotational inertia of a body.
   * 
   * @type number
   */
  set inertia(x) {
    this._inertia = x;
    this.inv_inertia = x == 0 ? 0 : 1 / x;
  }
  get inertia() {
    return this._inertia
  }
  /**
   * World space position of a body
   * 
   * @type Vector2
   */
  get position() {
    return this._transform.position
  }
  set position(x) {
    this._transform.position.copy(x);
  }
  /**
   * Orientation of a body
   * 
   * @type Angle
   */
  set orientation(r) {
    this._transform.orientation.copy(r);
  }
  get orientation() {
    return this._transform.orientation
  }
  /**
   * Angular velocity of a body in degrees
   * 
   * @type number 
   */
  get angularVelocity() {
    return radToDeg(this.rotation.value)
  }
  set angularVelocity(x) {
    this.rotation.value = degToRad(x);
  }
  /**
   * Torque of a body in degrees
   * 
   * @type number 
   */
  get torque() {
    return this._movable.torque
  }
  set torque(x) {
    this._movable.torque.copy(x);
  }
  /**
   * Angular acceleration of a body in degrees
   * 
   * @type number 
   */
  get angularAcceleration() {
    return radToDeg(this._movable.torque.value)
  }
  set angularAcceleration(x) {
    this._movable.torque.value = degToRad(x);
  }
  /**
   * Sets an anchor that is relative to the center of the body into it.The anchor's world coordinates will be updated when the body too is updated.
   * 
   * @param { Vector2} v The anchor arm
   * @returns {number}
   */
  setAnchor(v) {
    this.anchors.push(new Vector2$1(v.x, v.y));
    return this._localanchors.push(v) - 1
  }
  /**
   * Gets an anchor in its local space coordinate form.
   * Treat the returned value as read-only.
   * 
   * @param {number} index the position of the
   * @returns { Vector2}
   */
  getAnchor(index) {
    return this.anchors[index]
  }
  /**
   * Returns a rotated anchor relative to the body.
   * 
   * @param {number} index The position of the anchor.
   * @param { Vector2} [target= Vector2] Vector2 to store results in.
   * @returns { Vector2}
   */
  getLocalAnchor(index, target = new Vector2$1()) {
    return target.copy(this._localanchors[index]).rotate(this.orientation.value)
  }
  /**
   * Applies a force to a body affecting its direction of travel and rotation.
   * 
   * 
   * @param { Vector2} force The force to be applied.
   * @param { Vector2} [arm= Vector2] The collision arm.
   */
  applyForce(force, arm = Vector2$1.ZERO) {
    this.acceleration.add(force.multiply(this.inv_mass));
    this.rotation.value += arm.cross(force) * this.inv_inertia;
  }

  /**
   * Initializes the body to its given.Called by the world or an entity manager.
   * 
   * @param { Entity } [entity]
   * @param {boolean} [composited=false]
   */
  init(entity, composited = false) {
    this.entity = entity;
    if (composited || entity == void 0) {
      this.bounds = new BoundingBox();
      if (entity != void 0) {
        this._movable.transform = this._transform;
        entity.manager.addComponent("transform",this._transform);
        entity.manager.addComponent("movable",this._movable);
      }
      this.update();
      return
    }
    this.requires(entity, "transform", "movable", "bounds");

    let transform = entity.get("transform");
    let bounds = entity.get("bounds").bounds;
    let move = entity.get("movable");
    this._transform = transform;
    this._movable = move;
    this.bounds = bounds;

    this.update();
  }

  /**
   * This updates the world coordinates of shapes, anchors and bounds.
   */
  update() {
    for (var i = 0; i < this.shapes.length; i++) {
      this.shapes[i].update(this.position, this.orientation.value);
    }
    for (var i = 0; i < this.anchors.length; i++) {
      this.anchors[i].copy(this._localanchors[i]).rotate(this.orientation.value); //.add(this.position)
    }
    if (this.autoUpdateBound)
      this.bounds.calculateBounds(this, this.boundPadding);
    this.bounds.update(this.position);
    //this.angle = this.angle > 360 ? this.angle - 360 : this.angle < 0 ? 360 + this.angle : this.angle
  }
  
  destroy(){
    this.entity.manager.removeComponent("movable",this._movable);
  }
  toJson() {
    let obj = {
      id: this.id,
      position: this.position.toJson(),
      velocity: this.velocity.toJson(),
      acceleration: this.acceleration.toJson(),
      orientation: this.orientation.toJson(),
      rotation: this.rotation.toJson(),
      shapes: [],
      anchors: [],
      collisionResponse: this.collisionResponse,
      allowSleep: this.allowSleep,
      type: this.CHAOS_OBJ_TYPE,
      phyType: this.type,
      mass: this.mass,
      inertia: this.inertia,
      autoUpdateBound: this.autoUpdateBound,
      boundPadding: this.boundPadding,
      aabbDetectionOnly: this.aabbDetectionOnly,
      mask: this.mask
    };
    this.anchors.forEach((a) => {
      obj.anchors.push(a);
    });
    this.shapes.forEach((a) => {
      obj.shapes.push(a.toJson());
    });
    return obj
  }
  //TODO  - Add way to add shapes to body
  fromJson(obj) {
    let shapes = [];
    obj.shapes.forEach((shape) => {
      shapes.push(Shape.fromJson(shape));
    });
    let body = this;
    body.shapes = shapes;
    body.acceleration = obj.acceleration;
    body.velocity = obj.velocity;
    body.position = pbj.position;
    body.rotation = obj.rotation;
    body.orientation = obj.orientation;
    body.mass = obj.mass;
    body.inertia = obj.inertia;
    body.type = obj.phyType;
    body.allowSleep = obj.allowSleep;
    body.aabbDetectionOnly = obj.aabbDetectionOnly;
    body.collisionResponse = obj.collisionResponse;
    body.autoUpdateBound = obj.autoUpdateBound;
    body.id = obj.id;
    body.mask = obj.mask;
    obj.anchors.forEach((v) => {
      body.setAnchor(new Vector2$1().fromJson(v));
    });
  }
  /**
   *Body type that dictates a body cannot move nor respond to collisions.
   * 
   * @static
   * @type number*/
  static STATIC = ObjType.STATIC
  /**
   * Body type that dictates a body can move but not respond to collisions.
   * 
   * @static
   * @type number
   */
  static KINEMATIC = ObjType.KINEMATIC
  /**
   * Body type that dictates a body can move and respond to collisions.
   * 
   * @static
   * @type number
   */
  static DYNAMIC = ObjType.DYNAMIC
}

/**
 * A body with a circle shape on it.
 * 
 * @augments Body
 */
class Ball extends Body {
  /**
   * @param {number} radius
  */
  constructor(radius) {
    super(new Circle(radius));
    this.inertia = Circle.calcInertia(this.mass, radius);
  }
  /**
   * @inheritdoc
   * @type number 
   */
  get mass() {
    return this._mass
  }
  set mass(x) {
    this._mass = x;
    this.inv_mass = x === 0 ? 0 : 1 / x;
    this.inertia = Circle.calcInertia(this.mass, this.shapes[0].radius);
  }
}

/**
 * A body with a rectangle shape on it.
 * 
 * @augments Body
*/
class Box extends Body {
  /**
   * @param {number} w
   * @param {number} h
  */
  constructor(w,h) {
    super(new Rectangle(w,h));
    this.inertia = Rectangle.calcInertia(this._mass,w,h);
    
  }
  /**
   * @inheritdoc
   * @type number 
  */
  set mass(x){
    this._mass = x;
    this.inv_mass = x === 0 ? 0 : 1 / x;
    this.inertia = Rectangle.calcInertia(x,this.shapes[0].width,this.shapes[0].height);
  }
  get mass(){
    return this._mass
  }
}

/**
 * Holds a group of related bodies and constraints.
 */
class Composite extends Component {
  /**
   * Entity this belongs to.
   * 
   * @type Entity | null
   */
  entity = null
  /**
   * List of bodies contained.
   *
   * @type Body[]
   */
  bodies = []
  /**
   * List of bodies contained.
   *
   * @type Constraint[]
   */
  constraints = []
  /**
   * Used to determine what it is in a world.
   * 
   * @package
   * @type number 
   */
  get physicsType() {
    return ObjType.COMPOSITE
  }
  /**
   * Initializes the body to its given.Called by the world or an entity manager.
   * 
   * @param {Entity | null} entity
   * @param {boolean} composited
   */
  init(entity) {
    this.bodies.forEach(e => {
      e.init(entity, true);
    });
    this.requires(entity, "transform");

  }
  /**
   * @param {Constraint | Body} object
   */
  add(object) {
    if (object.physicsType === ObjType.CONSTRAINT)
      return this.constraints.push(object)
    if (object.physicsType === ObjType.BODY)
      this.bodies.push(object);
  }
  /**
   * This updates the world coordinates of shapes, anchors and bounds.
   */
  update() {
    this.lastPosition.copy(this.position);
  }
  /**
   * Acceleration of a body
   * 
   * @type Vector2
   */
  get acceleration() {
    let acceleration = new Vector2$1();
    for (var i = 0; i < this.bodies.length; i++) {
      acceleration.copy(this.bodies[i].acceleration);
    }
    return acceleration.divide(this.bodies.length)
  }
  set acceleration(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].acceleration = x;
    }
  }
  /**
   * Velocity of a body
   * 
   * @type Vector2
   */
  get velocity() {
    let velocity = new Vector2$1();

    for (var i = 0; i < this.bodies.length; i++) {
      velocity.add(this.bodies[i].velocity);
    }
    return velocity.divide(this.bodies.length)
  }
  set velocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].velocity.copy(x);
    }
  }
  /**
   * Orientation of a body in degrees.
   * 
   * @type number
   */
  get angle() {
    let angle = 0;
    for (var i = 0; i < this.bodies.length; i++) {
      angle += this.bodies[i].angle;
    }
  }
  set angle(angle) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angle = x;
    }
  }

  /**
   * Mass of a body.
   * 
   * @type number
   */
  set mass(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].mass = x;
    }
  }
  get mass() {
    let mass = 0;
    for (var i = 0; i < this.bodies.length; i++) {
      mass += this.bodies[i].mass;
    }
    return mass
  }
  set type(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].type = x;
    }
  }
  get type() {
    return this.bodies[0]?.type
  }
  /**
   * Density of a body.
   * 
   * @type number
   */
  set density(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].density = x;
    }
  }
  get density() {
    let density = 0;
    for (var i = 0; i < this.bodies.length; i++) {
      density += this.bodies[i].density;
    }
    return density / this.bodies.length
  }
  /**
   * Position of a body
   * 
   * @type Vector2
   */
  get position() {
    let position = new Vector2$1();
    for (var i = 0; i < this.bodies.length; i++) {
      position.add(this.bodies[i].position);
    }
    return position
  }
  set position(x) {
    let dp = x.clone().sub(this.position);
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].position.add(dp);
    }
  }
  /**
   * Orientation of a body
   * 
   * @type Angle
   */
  set orientation(r) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].orientation.copy(r);
    }
  }
  get orientation() {
    let ang = 0;
    for (var i = 0; i < this.bodies.length; i++) {
      ang += this.bodies[i].orientation;
    }
    return ang / this.bodies.length
  }
  /**
   * Angular velocity of a body.
   * 
   * @type number
   */
  get angularVelocity() {
    let ang = 0;
    for (var i = 0; i < this.bodies.length; i++) {
      ang += this.bodies[i].angularVelocity;
    }
    return ang / this.bodies.length
  }
  set angularVelocity(x) {
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].angularVelocity = x;
    }
  }
  destroy() {
    this.bodies.forEach(b => {
      b.destroy();
    });
  }
}

class Trigon extends Body {
    /**
     * @param {number} base
     * @param {number} height
     * @param {number} angle Angle in radians
     * 
    */
    constructor(base, height, angle = Math.PI/3) {
        super(new Triangle(base, height, angle));
        this.inertia = Triangle.calcInertia(this.mass, base, height, angle);
        this.base = base;
        this.height = height;
        this.bangle = angle;
    }
    /**
     * @inheritdoc
     * @type number 
     */
    get mass() {
        return this._mass
    }
    set mass(x) {
        this._mass = x;
        this.inv_mass = x === 0 ? 0 : 1 / x;
        this.inertia = Triangle.calcInertia(this.mass, this.base, this.height,this.bangle);
    }
}

/**
 * Base class for constructing different types of constraints.
 * 
 * @abstract
 * @see DistanceConstraint
 * @see SpringConstraint
 */
class Constraint {
  /**
   * @param {Body} body1
   * @param {Body} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    this.body1 = body1;
    this.body2 = body2;
    this.localA = localA || new Vector2$1();
    this.localB = localB || new Vector2$1();
    this.stiffness = 50;
    this.dampening = 0.03;
  }
  /**
   * Determine type of object this is in the world.
   * 
   * @package
   * @type number
   */
  get physicsType() {
    return ObjType.CONSTRAINT
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "constraint"
  }
  /**
   * Will refactor this out later.
   * 
   * @protected
   * @param {Body} body1
   * @param {Body} body2
   * @param {number} dt
   */
  behavior(body1, body2, dt) {
    body2.position.copy(body1.position);
  }
  /**
   * Updates constraint forces
   *
   * @param {number} dt
   */
  update(dt) {
    this.behavior(this.body1, this.body2, dt);
  }
  toJson() {
    return {
      body1: this.body1.id,
      body2: this.body2.id,
      localA: this.localA.toJson(),
      localB: this.localB.toJson(),
      stiffness: this.stiffness,
      dampening: this.dampening,
      type:this.CHAOS_OBJ_TYPE
    }
  }
  fromJson(obj, world) {
    let bod1 = world.getById(obj.body1);
    let bod2 = world.getById(obj.body2);

    let constraint = new Constraint(
      bod1,
      bod2,
      new Vector2$1().fromJson(obj.localA),
      new Vector2$1().fromJson(obj.localB)
    );
    constraint.stiffness = obj.stiffness;
    constraint.dampening = obj.dampening;
    return constraint
  }
}

let tmp1$a = new Vector2$1(),
  tmp2$8 = new Vector2$1(),
  tmp3$4 = new Vector2$1(),
  tmp4$4 = new Vector2$1(),
  tmp5$3 = new Vector2$1();

/**
 * This constraint is stronger than a spring in the sense that it will not oscilate as such as a spring constraint.
 */
class DistanceConstraint extends Constraint {
  /**
   * @param {Body} body1
   * @param {Body} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    super(body1, body2,localA,localB);
    this.fixed = !body1.mass || !body2.mass;
    this.dampening = 1;
    this.maxDistance = 1;
    this.stiffness = 1;
  }
  /**
   * @inheritdoc
   * 
   * @param {Body} body1
   * @param {Body} body2
   * @param {number} dt
  */
  behavior(body1, body2,dt) {
    let arm1 = tmp1$a.copy(this.localA),
      arm2 = tmp2$8.copy(this.localB),
      pos1 = tmp3$4.copy(body1.position).add(arm1),
      pos2 = tmp4$4.copy(body2.position).add(arm2),
      dist = pos1.sub(pos2),
      magnitude = dist.magnitude();

    if (magnitude === 0) {
      return
    }
    let difference = (magnitude - this.maxDistance) / magnitude,
      force = dist.multiply(difference * this.stiffness * this.dampening),
      massTotal = body1.inv_mass + body2.inv_mass;
      //inertiaTotal = body1.inv_inertia + body2.inv_inertia
    tmp4$4.copy(force);
    force.divide(massTotal * 2);

    body1.velocity.add(tmp5$3.copy(force).multiply(-body1.inv_mass).divide(dt));
    body2.velocity.add(tmp5$3.copy(force).multiply(body2.inv_mass).divide(dt));

    body1.position.add(tmp5$3.copy(force).multiply(-body1.inv_mass));
    body2.position.add(tmp5$3.copy(force).multiply(body2.inv_mass));

    body1.rotation.value += tmp4$4.cross(arm1) * body1.inv_inertia;
    body2.rotation.value += tmp4$4.cross(arm2) * -body2.inv_inertia;
  }
}

let tmp1$9 = new Vector2$1(),
  tmp2$7 = new Vector2$1(),
  tmp3$3 = new Vector2$1(),
  tmp4$3 = new Vector2$1(),
  tmp5$2 = new Vector2$1(),
  zero = new Vector2$1();
 /**
  * A constraint that acts like a spring between two bodies
 */
class SpringConstraint extends Constraint {
  /**
   * @param {Body} body1
   * @param {Body} body2
   * @param { Vector2} localA
   * @param { Vector2} localB
   */
  constructor(body1, body2, localA, localB) {
    super(body1, body2);
    this.localA = new Vector2$1().copy(localA || zero);
    this.localB = new Vector2$1().copy(localB || zero);
    this.fixed = !body1.mass || !body2.mass;
    this.dampening = 1;
    this.maxDistance = 100;
    this.stiffness = 1;
  }
    /**
   * @inheritdoc
   * 
   * @param {Body} body1
   * @param {Body} body2
   * @param {number} dt
  */
  behavior(body1, body2, dt) {
    let arm1 = tmp1$9.copy(this.localA),
      arm2 = tmp2$7.copy(this.localB),
      pos1 = tmp3$3.copy(body1.position).add(arm1),
      pos2 = tmp4$3.copy(body2.position).add(arm2),
      dist = pos1.sub(pos2),
      magnitude = dist.magnitude();

    if (magnitude === 0) {
      return
    }
    let difference = (magnitude - this.maxDistance) / magnitude,
      force = dist.multiply(difference * this.stiffness * this.dampeninging),
      massTotal = body1.inv_mass + body2.inv_mass,
      inertiaTotal = body1.inv_inertia + body2.inv_inertia;
      force.divide(massTotal + inertiaTotal);
      body1.velocity.add(tmp5$2.copy(force).multiply(-body1.inv_mass));
      body2.velocity.add(tmp5$2.copy(force).multiply(body2.inv_mass));
      
      body1.rotation.value += force.cross(arm1) * body1.inv_inertia;
      body2.rotation.value += force.cross(arm2) * -body2.inv_inertia;
  }
}

new Vector2$1();

let position = new Vector2$1();
let acceleration = new Vector2$1();
let velocity = new Vector2$1();

/**
 * Verlet intergration.
 * Used so that constraints can be stable at little performance cost.
 */
class VerletSolver {
  /**
   * @param {Body} body
   * @param {number} dt
   */
  static solve(body, dt) {
    acceleration.copy(body.acceleration).multiply(dt * 0.5);
    velocity.copy(body.velocity);
    position.copy(body.position);
    body.acceleration.set(0, 0);
    body.velocity.add(acceleration);
    position.add(velocity.multiply(dt)).add(acceleration.multiply(dt));
    body.velocity.add(acceleration);
    body.position = position;
    body.angularVelocity += body.angularAcceleration * dt * 0.5;
    body.angle += body.angularVelocity * dt;
    body.angularVelocity += body.angularAcceleration * dt * 0.5;
    body.torque.value = 0;
  }
}

let tmp1$8 = new Vector2$1(),
  tmp2$6 = new Vector2$1(),
  tmp3$2 = new Vector2$1(),
  tmp4$2 = new Vector2$1(),
  tmp5$1 = new Vector2$1();

/**
 * Solves for impulse along collision tangent for a given body pair.
*/
const FrictionSolver = {
  /***/
  solve(manifold) {
    let { bodyA: a, bodyB: b, ca1, ca2, impulse } = manifold;
    let { axis } = manifold.contactData;
    if (impulse <= 0) return
    let a$va = tmp1$8.set(ca1.y * -a.rotation.value, ca1.x * a.rotation.value);
    let a$vb = tmp2$6.set(ca2.y * -b.rotation.value, ca2.x * b.rotation.value);
    let va = tmp3$2.copy(a.velocity).add(a$va);
    let vb = tmp4$2.copy(b.velocity).add(a$vb);
    let relVel = va.sub(vb);
    if (relVel.magnitudeSquared() === 0)
      return
    let tangent = axis.normal(1, tmp4$2);
    tangent = tangent.multiply(tangent.dot(relVel));
    if (tangent.magnitudeSquared() === 0) return
    tangent.normalize();

    let relV = tangent.dot(relVel);

    let sf = Math.min(a.staticFriction, b.staticFriction);
    let kf = Math.min(a.kineticFriction, b.kineticFriction);
    let j = -relV / (
      (a.inv_mass + b.inv_mass) +
      sq((ca1.dot(tangent)) * a.inv_inertia + sq(ca2.dot(tangent)) * b.inv_inertia)
    );

    let jt;
    if (Math.abs(j) <= impulse * sf) {
      jt = tangent.multiply(j);

    } else {
      jt = tangent.multiply(j * kf);
    }

    manifold.velA.add(tmp5$1.copy(jt).multiply(a.inv_mass));
    manifold.velB.add(tmp5$1.copy(jt).multiply(-b.inv_mass));
    manifold.rotA += ca1.cross(jt) * a.inv_inertia;
    manifold.rotB += ca2.cross(jt) * -b.inv_inertia;
  }
};

let v = { x: 0, y: 0 };

let velocityLimit = 1;
let angularVelocityLimit = 1;
let impulselimit = 0.8;

/**
 * Determines if the body pair should be put to sleep.
*/
const ContactSolver = {
  solve(a, b, impulse, contactNo) {
    if (contactNo == 2) {
      if (Math.abs(a.angularVelocity) > angularVelocityLimit) a.angularVelocity = 0;
      if (Math.abs(b.angularVelocity) > angularVelocityLimit) b.angularVelocity = 0;
    }
    if (impulse > impulselimit) return
    if (a.velocity.magnitude() > velocityLimit && Math.abs(a.angularVelocity) > angularVelocityLimit) return
    if (b.velocity.magnitude() > velocityLimit && Math.abs(b.angularVelocity) > angularVelocityLimit) return
    if (!a.allowSleep || !b.allowSleep)
      return
    a.sleeping = true;
    a.velocity = v;
    a.acceleration = v;
    b.sleeping = true;
    b.velocity = v;
    b.acceleration = v;
  }
};

const tmp1$7 = new Vector2$1(),
  tmp2$5 = new Vector2$1();
let dampen = Settings.posDampen;

/**
 * Solves the interpenetration of bodies.
*/
const PenetrationSolver = {
  solve(manifold, inv_dt) {
    let { bodyA, bodyB, ca1, ca2 } = manifold;
    let { axis, overlap } = manifold.contactData;

    const dampened = overlap * dampen;
    const a = dampened / (bodyA.inv_mass + bodyB.inv_mass + sq(ca1.cross(axis)) * bodyA.inv_inertia + sq(ca2.cross(axis)) * bodyB.inv_inertia);
    let jp = tmp2$5.copy(axis).multiply(a);
    bodyA.velocity.add(tmp1$7.copy(jp).multiply(bodyA.inv_mass * inv_dt));
    bodyB.velocity.add(tmp1$7.copy(jp).multiply(-bodyB.inv_mass * inv_dt));
    bodyA.rotation.value += ca1.cross(jp) * bodyA.inv_inertia * inv_dt;
    bodyB.rotation.value += ca2.cross(jp) * -bodyB.inv_inertia * inv_dt;
    manifold.contactData.lastOverlap = overlap;
  }
};

let tmp1$6 = new Vector2$1(),
  tmp2$4 = new Vector2$1(),
  tmp3$1 = new Vector2$1(),
  tmp4$1 = new Vector2$1();

/**
 * Solves for the collision normal impulse of a given body pair.
*/
const ImpulseSolver = {
  solve(manifold) {
    let { bodyA, bodyB, ca1, ca2, restitution } = manifold;
    let { axis } = manifold.contactData;
    let a$va = tmp1$6.set(ca1.y * -bodyA.rotation.value, ca1.x * bodyA.rotation.value);
    let a$vb = tmp2$4.set(ca2.y * -bodyB.rotation.value, ca2.x * bodyB.rotation.value);
    let va = tmp3$1.copy(bodyA.velocity).add(a$va);
    let vb = tmp4$1.copy(bodyB.velocity).add(a$vb);
    let vp = va.sub(vb);
    let vp_p = axis.dot(vp);

    if (vp_p >= 0) {
      manifold.impulse = 0;
      return
    }
    ////this used to be -(1 + restitution) but when i changed it,stability ensued.
    //i think the reason of the previous instability is because i changed the penetration solver to be impulse based from position based.
    //so.. i came back to that....
    let j = -(restitution) * vp_p / (
      (bodyA.inv_mass + bodyB.inv_mass) +
      sq(ca1.cross(axis)) * bodyA.inv_inertia +
      sq(ca2.cross(axis)) * bodyB.inv_inertia);

    let jn = axis.clone().multiply(j);
    let ang1 = ca1.cross(jn) * bodyA.inv_inertia;
    let ang2 = ca2.cross(jn) * -bodyB.inv_inertia;
    let vel1 = jn.clone().multiply(bodyA.inv_mass);
    let vel2 = jn.clone().multiply(-bodyB.inv_mass);
    manifold.velA.copy(vel1);
    manifold.velB.copy(vel2);
    manifold.rotA = ang1;
    manifold.rotB = ang2;
    manifold.impulse = j;
  }
};

/**
 * This is an abstract class that extended to classes that are used to filter out unnecessary collision checks to boost performance.
 * 
 * @abstract
 * @see QuadtreeBroadphase
 * @see GridBroadphase
 * @see AABBBroadphase
 */
class Broadphase {
  /**
   * Checks to see if two bodies can proceed to have their bounding boxes checked 
   * 
   * @param {Body} a
   * @param {Body} b
   */
  canCollide(a, b) {
    if (a.mass == 0 && b.mass == 0)
      return false
    if (
      (a.mask.group !== 0 && b.mask.group !== 0) &&
      a.mask.group == b.mask.group
    ) return false
    if (a.mask.layer && b.mask.layer && a.mask.layer !== b.mask.layer)
      return false
    if (a.sleeping && b.sleeping) return false
    //console.log(a.mass,b.mass);
    return true
  }
  /**
   * Adds a body to the broadphase
   * 
   * @param {Body} obj
   */
  insert(obj) {}
  /**
   * Removes a body from the broadphase
   * 
   * @param {Body} obj
   */
  remove(obj) {}

  /**
   * Renders a representation of a broadphase
   */
  draw(ctx) {}
  /**
   * Updates the internals of the broadphase if needed.
   * 
   * @param {Body[]} bodies
   */
  update(bodies) {}
  /**
   * Gets all possibly colliding pairs.
   * 
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target) {}

  /**
   * Returns bodies that are within the given bound.
   * 
   * @param {Bounds} bounds Region to check in.
   * @param {Body[]} target Empty array to store results.
   * @returns {Body[]}
   */
  query(bounds, target) {}
}

/**
 * Most basic broadphase.Should be used when number of bodies are few(i.e less than 100)
*/
class NaiveBroadphase extends Broadphase {
  /**
   * @private
   * @type Body[]
  */
  bodies = null
  /**
   * @param {World} world
  */
  constructor(world) {
    super();
    this.bodies = world.objects;
  }
  /**
   * @inheritdoc
   * @param {Bounds} bound Region to check in.
   * @param {Body[]} target Empty array to store results.
   * @returns {Body[]}
  */
  query(bound, target) {
    closeObjects = target || [];
    for (var i = 0; i < this.objects.length; i++) {
      let ob = this.world.objects[i];
      if (ob.bounds.intersects(bound) < dist)
        closeObjects.push(ob);
    }
    return closeObjects
  }
  /**
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
  */
  getCollisionPairs(target) {
    target = target || [];
    let bodies = this.bodies,
      length = bodies.length;
    for (let i = 0; i < length; i++) {
      let a = bodies[i];
      for (let j = i + 1; j < length; j++) {
        let b = bodies[j];
        if(!this.canCollide(a,b))continue
        if (!a.bounds.intersects(b.bounds))
          continue
        let list = {
          a,
          b
        };
        if (a.aabbDetectionOnly || b.aabbDetectionOnly) continue
        if (!a.shapes.length || !b.shapes.length) continue
        target.push(list);
      }
    }
    return target
  }

}

class Client {
  constructor(body) {
    this.body = body;
    this.bounds = body.bounds.clone();
    this.node = null;
  }
}

class Node {
  /**@type Node[]*/
  children = []
  /**@type Body[]*/
  objects = []
  /**@type Node*/
  root = null
  /**@type Node*/
  parent = null
  /**@type boolean*/
  hasObjects = false
  /**@type number*/
  index = -1
  /**@type Tree*/
  global = null
  /**@type Vector_like*/
  dims = null
  /**@type number*/
  depth = -1
  /**@type {{
    max:Vector_like,
    min:Vector_like
  }}*/
  bounds = null
  /**
   * @param {{
    max:Vector_like,
    min:Vector_like
  }} bounds
  */
  constructor(bounds) {
    this.bounds = bounds;
    this.dims = {
      x: this.bounds.max.x - this.bounds.min.x,
      y: this.bounds.max.y - this.bounds.min.y
    };
  }
  /**
   * @param {Node} node
   */
  add(node) {
    node.index = this.children.length;
    this.children.push(node);
    node.depth = this.depth + 1;
    node.parent = this;
    node.global = this.global;
  }
  clear() {
    for (var i = 0; i < this.children.length; i++) {
      const node = nodes[i];

      this.children.remove(node);
      node.parent = null;
      node.global = null;
    }
  }
  /**
   * @param {number} depth
   */
  split(depth = 1) {
    let w = this.dims.x / 2;
    let h = this.dims.y / 2;
    let topLeft = new Node({
      min: {
        x: this.bounds.min.x,
        y: this.bounds.min.y
      },
      max: {
        x: this.bounds.min.x + w,
        y: this.bounds.min.y + h
      }
    });
    let topRight = new Node({
      min: {
        x: this.bounds.min.x + w,
        y: this.bounds.min.y
      },
      max: {
        x: this.bounds.max.x,
        y: this.bounds.max.y - h
      }
    });
    let bottomLeft = new Node({
      min: {
        x: this.bounds.min.x,
        y: this.bounds.min.y + h
      },
      max: {
        x: this.bounds.max.x - w,
        y: this.bounds.max.y
      }
    });
    let bottomRight = new Node({
      min: {
        x: this.bounds.min.x + w,
        y: this.bounds.min.y + h
      },
      max: {
        x: this.bounds.max.x,
        y: this.bounds.max.y
      }
    });
    this.add(topLeft);
    this.add(topRight);
    this.add(bottomLeft);
    this.add(bottomRight);
    if (depth <= 1) return
    this.children.forEach(e => e.split(depth - 1));
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.strokeRect(this.bounds.min.x, this.bounds.min.y, this.dims.x, this.dims.y);
    ctx.stroke();
    ctx.closePath();
  }
  /**
   * @return boolean
   */
  isLeafNode() {
    return this.children.length == 0
  }
  /**
   * @return boolean
   */
  childrenHaveObj() {
    return this.children.length > 0 || (
      this.children[0].hasObjects ||
      this.children[1].hasObjects ||
      this.children[2].hasObjects ||
      this.children[3].hasObjects
    )
  }
  /**
   * @param {Bounds} bounds
   * @return boolean
   */
  intersects(bounds) {
    if (bounds.r)
      return Overlaps.AABBvsSphere(this.bounds, bounds)
    return Overlaps.AABBColliding(this.bounds, bounds)
  }
  /**
   * @param {Bounds} bounds
   * @return boolean
   */
  contains(bounds) {
    return (
      bounds.max.x < this.bounds.max.x &&
      bounds.max.y < this.bounds.max.y &&
      bounds.min.x > this.bounds.min.x &&
      bounds.min.y > this.bounds.min.y
    )
  }
  /**
   * @inheritdoc
   * @param {Bounds} bounds
   * @param {Body[]} [target]
   * @returns boolean
   */
  query(bounds, target = []) {
    if (!this.intersects(bounds))
      return target
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {
        this.children[i].query(bounds, target);
      }
    }
    for (var i = 0; i < this.objects.length; i++) {
      let a = this.objects[i];
      if (a.bounds.intersects(bounds))
        target.push(a);
    }
    return target
  }
  /**
   * @param {Body} obj
   * @returns boolean
   */
  insertObject(obj) {
    if (!this.contains(obj.bounds))
      return false
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {
        let r = this.children[i].insertObject(obj);
        if (r) {
          this.hasObjects = true;
          return true
        }
      }
    }
    if (this.contains(obj.bounds)) {
      this.objects.push(obj);
      obj.lastPosition.copy(obj.bounds.pos);
      this.hasObjects = true;
      return true
    }
    return false
  }
  /**
   * @param {Vector_like} position
   * @returns boolean
   */
  isInNode(position) {
    if (
      position.x > this.bounds.min.x &&
      position.y > this.bounds.min.y &&
      position.x < this.bounds.max.x &&
      position.y < this.bounds.max.y
    )
      return true
    return false
  }
  isRootNode() {
    return !this.parent
  }
  /**
   * @param {Body} obj
   */
  updateObject(obj) {
    this.removeObject(obj);
    this.global.insert(obj);
    return true
  }
  /**
   * @param {Body} obj
   * @returns boolean
   */
  removeObject(obj) {
    if (!this.isInNode(obj.lastPosition))
      return false
    let t = this.objects.indexOf(obj);
    if (t !== -1) {
      removeElement(this.objects, t);
      if (
        this.objects.length == 0 &&
        this.childrenHaveObj()
      ) this.hasObjects = false;
      return true
    }
    if (!this.isLeafNode()) {
      for (var i = 0; i < this.children.length; i++) {

        let r = this.children[i].removeObject(obj);
        if (r) {
          if (
            this.objects.length == 0 &&
            this.childrenHaveObj()
          ) this.hasObjects = false;
          return true
        }
      }
    }
    return false
  }
  /**
   * @template T
   * @param {Traverser} func
   * @param {T[]} target
   *  @returns []
   */
  traverse(func, target) {
    if (!this.isLeafNode()) {
      for (var i = 0; i < 4; i++) {
        let t = this.children[i].traverse(func, target);
        if (t != undefined &&
          (typeof t == "object" && t.length)) return target
      }
    }
    func(this, target);
    if (this.isRootNode()) {
      return target
    }
  }
  /**
   * @param {CollisionPair[]} target
   * @param {CollisionPair[]} stack
   */
  getCollisionPairs(target, stack) {
    if (!this.hasObjects) return
    if (!this.isLeafNode()) {
      appendArr(stack, this.objects);
      for (var i = 0; i < 4; i++) {
        this.children[i].getCollisionPairs(target, stack);
      }
      popArr(stack, this.objects.length);
    }
    let length = stack.length,
      obLength = this.objects.length,
      a, b;
    if (obLength == 0) return
    for (var i = 0; i < obLength; i++) {
      for (var j = i + 1; j < obLength; j++) {
        a = this.objects[i];
        b = this.objects[j];
        if (a.index == b.index) continue
        if (!this.global.canCollide(a, b)) continue
        if (!a.bounds.intersects(b.bounds))
          continue
        target.push({
          a,
          b
        });
      }
    }

    for (var i = 0; i < length; i++) {
      for (var j = 0; j < obLength; j++) {
        a = stack[i];
        b = this.objects[j];
        if (!this.global.canCollide(a, b)) continue
        if (!a.bounds.intersects(b.bounds))
          continue
        target.push({
          a,
          b
        });
      }
    }


  }
}

/**
 * This is a bounded broadphase that is used to speed up collision testing on sparse number of objects over a large area.
 * 
 * @extends Broadphase
 */
class QuadTreeBroadphase extends Broadphase {
  /**
   * @param {Bounds} bounds The region it operates on.
   * @param {number} [maxdepth=3] Maximum number of branches.
   * 
   */
  constructor(bounds, maxdepth = 3) {
    bounds = bounds || {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 1000,
        y: 1000
      }
    };
    super();
    this._root = new Node(bounds);
    this._root.global = this;
    this._root.depth = 0;
    this.maxDepth = maxdepth;
    this.bounds = bounds;

    if (maxdepth) this._root.split(maxdepth);
  }
  _insert(client) {
    client.bounds.copy(client.body.bounds);
    if (!this._root.contains(obj.bounds))
      return //console.log("out of bounds");
    this._root.insertObject(obj);
  }
  /**
   * @inheritdoc
   * @param {Body} obj
   */
  insert(obj) {
    let client = body.client;
    if (client == null) {
      client = body.client = new Client(body);
    }
    this._insert(client);
  }
  _remove(client) {
    return this._root.removeObject(obj)
  }
  /**
   * @inheritdoc
   * @param {Body} obj
   */
  remove(obj) {
    if (obj.client == null) return false
    return this._remove(obj.client)
  }
  /**
   * @inheritdoc
   * @param {Body[]} bodies
   */
  update(bodies) {
    for (var i = 0; i < bodies.length; i++) {
      this._remove(bodies[i].client);
      this._insert(bodies[i].client);
    }

  }
  /**
   * @inheritdoc
   * @param {Bounds} bounds Region to check in.
   * @param {Body[]} target Empty array to store results.
   * @returns {Body[]}
   */
  query(bounds, target) {
    this._root.query(bounds, target);
    return target
  }
  /**
   * A depth first search of the quadtree that applies the given function to its nodes.
   * 
   * @param {Function} func The function that checks every node unless it returns true.
   * 
   */
  traverse(func) {
    return this._root.traverse(func)
  }
  /**
   * @inheritdoc
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this._root.traverse(e => {
      if (e.hasObjects) {
        e.children.forEach(r => r.draw(ctx));
      }
    });
    ctx.fillStyle = "black";
  }
  /**
   * Resizes a quadtree to a new bound size.
   * This method should not be used without care.
   * 
   * @param {Bounds} bounds.
   * 
   */
  recalculateBounds(bounds) {
    if (!bounds) return
    let ob = this._root.traverse((e, arr) => {
      let length = e.objects.length;
      for (var i = 0; i < length; i++) {
        arr.push(e.objects[i]);
      }
    }, []);
    this._root = new Node(bounds);
    this._root.split();
    ob.forEach(e => {
      this.insert(ob);
    });
  }
  /**
   * @inheritdoc
   * @param {CollisionPair[]} target Empty array to store results.
   * @returns {CollisionPair[]}
   */
  getCollisionPairs(target) {
    this._root.getCollisionPairs(target, []);
  }
}

/**
 * @callback Traverser
 * @param {Node} node
 * @returns {boolean}
*/

const _arr = [],
  tmp1$5 = {
    overlap: 0,
    verticesA: null,
    verticesB: null,
    axis: new Vector2$1(),
    vertex: null,
    shape: null
  },
  tmp2$3 = {
    min: 0,
    max: 0,
    indexN: 0
  },
  tmp3 = {
    min: 0,
    max: 0,
    indexN: 0
  },
  tmp4 = new Vector2$1(),
  tmp5 = new Vector2$1(),
  tmp6 = new Vector2$1();

/**
 * Used for narrowphase collision detection and contact info generation.
 */
const SAT = {
  /**
   * @param {Body} body1
   * @param {Body} body2
   * @param {Manifold} manifold
   */
  shapesInBodyCollided(body1, body2, manifold) {
    let shapesA = body1.shapes,
      shapesB = body2.shapes;
    for (var i = 0; i < shapesA.length; i++) {
      for (var j = 0; j < shapesB.length; j++) {
        SAT.shapesCollided(shapesA[i], shapesB[j], manifold);
      }
    }
    if (manifold.overlap < 0) return manifold
    let body = manifold.dorminantShape,
      axis = tmp5.copy(manifold.axis),
      shape1 = manifold.shapes[0],
      shape2 = manifold.shapes[1];
    let overload = [];
    const vertices1 = SAT.findNearSupports(manifold.vertShapeA, axis, []);
    const vertices2 = SAT.findNearSupports(manifold.vertShapeB, tmp6.copy(axis).reverse(), []);
    for (var i = 0; i < vertices1.length; i++) {
      if (SAT.shapeContains(shape2, vertices1[i])) {
        overload.push(vertices1[i]);
      }
    }
    if (overload.length < 2) {
      for (var i = 0; i < vertices2.length; i++) {
        if (SAT.shapeContains(shape1, vertices2[i])) {
          overload.push(vertices2[i]);
          if (!overload.length)
            shape = shape2;
        }
      }
    }
    //some random error happened when this is not there.
    //Dont know if it isnt there now but i dont want to risk it ¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯
    if (overload.length == 0) {
      overload.push(vertices1[0]);
    }

    overload = SAT.findNearSupports(overload, axis, []);
    if (body == shape2) axis.reverse();
    if (body == shape1) {
      manifold.verticesA[0] = overload[0];
      manifold.verticesB[0] = overload[0].clone().add(tmp6.copy(axis).multiply(manifold.overlap));
      if (overload.length == 2) {
        manifold.verticesA[1] = overload[1];
        manifold.verticesB[1] = overload[1].clone().add(tmp6.copy(axis).multiply(manifold.overlap));
      }
    }
    if (body == shape2) {
      manifold.verticesA[0] = overload[0].clone()
        .add(tmp6.copy(axis).multiply(manifold.overlap));
      manifold.verticesB[0] = overload[0];
      if (overload.length == 2) {
        manifold.verticesA[1] = overload[1].clone().add(tmp6.copy(axis).multiply(manifold.overlap));
        manifold.verticesB[1] = overload[1];
      }
    }
    manifold.contactNo = overload.length;
    return manifold
  },
  /**
   * @param {Shape} shape1
   * @param {Shape} shape2
   * @param {Object} target
   */
  shapesCollided(shape1, shape2, target) {
    let arr = _arr,
      boundary;
    clearArr(arr);
    shape1.getNormals(shape2, arr);
    boundary = arr.length;
    shape2.getNormals(shape1, arr);

    SAT.projectShapesToAxes(shape1, shape2, arr, target, boundary);
  },
  /**
   * @param {Shape} shapeA
   * @param {Shape} shapeB
   * @param { Vector2[]} axes
   * @param {Manifold} shapeA
   * @param {number} iu
   */
  projectShapesToAxes(shapeA, shapeB, axes, manifold, iu) {
    let temp = tmp1$5;
    temp.vertex = null;
    temp.body = null;
    temp.overlap = Infinity;
    for (let i = 0; i < axes.length; i++) {
      let axis = tmp4.copy(axes[i]);

      let verticesA = shapeA.getVertices(axis);
      let verticesB = shapeB.getVertices(axis);
      let p1 = SAT.projectVerticesToAxis(verticesA, axis, tmp2$3);
      let p2 = SAT.projectVerticesToAxis(verticesB, axis, tmp3);
      let min = p1.max < p2.max ? p1.max : p2.max;
      let max = p1.min > p2.min ? p1.min : p2.min;
      let overlap = min - max;
      if (overlap < 0) return manifold

      if (p1.max < p2.max) axis.reverse();
      if (
        (p1.max > p2.max && p1.min < p2.min) ||
        (p2.max > p1.max && p2.min < p1.min)
      ) {
        let max = Math.abs(p1.max - p2.max),
          min = Math.abs(p1.min - p2.min);
        if (min < max) {
          overlap += min;
        } else {
          overlap += max;
          axis.reverse();
        }
      }
      if (overlap < temp.overlap) {
        temp.overlap = overlap;
        temp.axis.copy(axis);
        temp.shape = i <= iu - 1 ? shapeB : shapeA;
        temp.indexA = p1.indexN;
        temp.indexB = p2.indexN;
        temp.verticesA = verticesA;
        temp.verticesB = verticesB;
      }
    }
    if (temp.overlap > manifold.overlap) {
      manifold.overlap = temp.overlap;
      manifold.axis.copy(temp.axis);
      manifold.dorminantShape = temp.shape;
      manifold.shapes[0] = shapeA;
      manifold.shapes[1] = shapeB;
      manifold.vertShapeA = temp.verticesA;
      manifold.vertShapeB = temp.verticesB;
      manifold.indexA = temp.indexA;
      manifold.indexB = temp.indexB;
      manifold.done = true;
    }
    return manifold
  },
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param {Object} target
   */
  projectVerticesToAxis(vertices, axis, target) {
    let min = Infinity,
      max = -Infinity,
      nearVertex = null,
      length = vertices.length;

    for (let i = 0; i < length; i++) {
      let point = axis.dot(vertices[i]);
      if (point < min) {
        min = point;
        nearVertex = i;
      }
      if (point > max) {
        max = point;
      }
    }
    target.min = min;
    target.max = max;
    target.indexN = nearVertex;
    return target
  },
  /**
   * @param { Vector2[]} vertices
   * @param { Vector2} axis
   * @param { Vector2[]} target
   * @param {number} nearVertexIndex
   */
  findNearSupports(vertices, axis, target = [], nearVertexIndex) {
    let min = Infinity,
      nearVertices = target,
      length = vertices.length;

    for (let i = 0; i < length; i++) {
      let point = axis.dot(vertices[i]);
      if (
        Math.abs(point - min) <= 0.1 &&
        !nearVertices.includes(vertices[i])
      ) {
        nearVertices.push(vertices[i]);
        continue
      }
      if (point < min) {
        min = point;
        clearArr(nearVertices);
        nearVertices.push(vertices[i]);
        i = -1;
      }
    }
    return nearVertices
  },
  /**
   * @param {Shape} shape
   * @param { Vector2} point
   */
  shapeContains(shape, point) {
    if (shape.type == "circle")
      return SAT.circleContains(shape.position, shape.radius, point)
    return SAT.verticesContain(shape.vertices, point)
  },
  /**
   * @param { Vector2} position
   * @param {number} radius
   * @param { Vector2} point
   */
  circleContains(position, radius, point) {
    let dx = point.x - position.x,
      dy = point.y - position.y;
    if (dx * dx + dy * dy > radius * radius)
      return false
    return true
  },
  /**
   * @param { Vector2[]} vertices
   * @param {number} point 
   */
  verticesContain(vertices, point) {
    var pointX = point.x,
      pointY = point.y,
      length = vertices.length,
      vertex = vertices[length - 1],
      nextVertex;
    if (length < 2) return false
    for (var i = 0; i < length; i++) {
      nextVertex = vertices[i];
      if ((pointX - vertex.x) * (nextVertex.y - vertex.y) +
        (pointY - vertex.y) * (vertex.x - nextVertex.x) < 0) {
        return false;
      }
      vertex = nextVertex;
    }

    return true;
  }
};

class NarrowPhase{
  records = new Map()
  getCollisionPairs(contactList,clmds){
  }
}

/**
 * Uses the Separation Axis Theorem.
 * Best when your body shapes have few vertices.
 */
class SATNarrowPhase extends NarrowPhase {
  /**
   * @param {CollisionPair[]} contactList 
   * @param {Manifold[]} [clmds=[]]
   */
  getCollisionPairs(contactList, clmds = []) {
    for (var i = 0; i < contactList.length; i++) {
      let { a, b } = contactList[i];
      a.sleeping = false;
      b.sleeping = false;
      let id = naturalizePair(a.id, b.id);
      if (!this.records.has(id))
        this.records.set(id, {
          bodyA: a,
          bodyB: b,
          contactData: {
            lastOverlap: 0,
            overlap: -Infinity,
            done: false,
            axis: new Vector2$1(),
            verticesA: [],
            verticesB: [],
            vertShapeA: null,
            vertShapeB: null,
            contactNo: 0,
            shapes: [],
            indexA: 0,
            indexB: 0
          },
          stmp: -1,
          impulse: 0,
          persistent: false,
          ca1: new Vector2$1(),
          ca2: new Vector2$1(),
          restitution: 0,
          staticFriction: 0,
          kineticFriction: 0,
          velA: new Vector2$1(),
          velB: new Vector2$1(),
          rotA: 0,
          rotB: 0
        });
      let manifold = this.records.get(id);
      let collisionData = manifold.contactData;
      collisionData.overlap = -Infinity;
      collisionData.done = false;
      SAT.shapesInBodyCollided(a, b, collisionData);
      if (collisionData.overlap < 0 || !collisionData.done) continue
      if (collisionData.contactNo == 2) {
        Vector2$1.lerp(
          collisionData.verticesA[0],
          collisionData.verticesA[1],
          0.5,
          manifold.ca1
        ).sub(a.position);
        Vector2$1.lerp(
          collisionData.verticesB[0],
          collisionData.verticesB[1],
          0.5,
          manifold.ca2
        ).sub(b.position);
      } else {
        manifold.ca1.copy(collisionData.verticesA[0]).sub(a.position);
        manifold.ca2.copy(collisionData.verticesB[0]).sub(b.position);
      }
      manifold.restitution = a.restitution < b.restitution ? a.restitution : b.restitution;
      manifold.staticFriction = a.staticFriction < b.staticFriction ? a.staticFriction : b.staticFriction;
      manifold.kineticFriction = a.kineticFriction < b.kineticFriction ? a.kineticFriction : b.kineticFriction;
      if (a.collisionResponse && b.collisionResponse)
        clmds.push(manifold);
    }
    return clmds
  }
}

/**
 * Class responsible for updating bodies,constraints and composites.
 */
class World {
  /**
   * Used to check if a manifold is persistent.
   * 
   * @type number
   * @private
   */
  count = 0
  /**
   * A record of collision manifolds.
   * 
   * @type Map<number,Manifold>
   * @protected
   */
  records = new Map()
  /**
   * A list of bodies.
   * 
   * @type Body[]
   * @private
   */
  objects = []
  /**
   * A list of constraints fixed to a static object.
   * 
   * @type Constraint[]
   * @private
   */
  fixedConstraits = []
  /**
   * A list of constraints fixed to two dynamic bodies.
   * 
   * @type Array<Constraint>
   * @private
   */
  constraints = []
  /**
   * A value between 0 and 1 used to dampen linear velocity of bodies.
   * 
   * @type number
   */
  linearDamping = Settings.linearDamping
  /**
   * A value between 0 and 1 used to dampen angular velocity of bodies.
   * 
   * @type number
   */
  angularDamping = Settings.angularDamping

  /**
   * The number of times to solve for velocity.A high number results in much more stable stacking.
   * 
   * @type number
   */
  velocitySolverIterations = Settings.velocitySolverIterations
  /**
   * The collision manifolds that have passed narrowphase and verified to be colliding.
   * 
   * @type Manifold[]
   */
  CLMDs = []
  /**
   * The collision manifolds that have passed broadphase and could be colliding
   * 
   * 
   * @type CollisionPair[]
   */
  contactList = []
  /**
   * The gravitational pull of the world.
   * 
   * @type Vector2
   */
  gravitationalAcceleration = new Vector2$1(0, 0)
  /**
   * Time in seconds that a single frame takes.This has more precedence than the first parameter of World.update(),set to this to zero if you want to use the latter as the delta time.
   * 
   * @type number
   */
  fixedFrameRate = Settings.fixedFrameRate
  /**
   * 
   * @type { {lastTimestamp:number,total: number}}
   * @ignore
   */
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /**
   * This is a cheap way of determining which pairs of bodies could be colliding.
   * 
   * @type Broadphase
   */
  broadphase = null
  /**
   * This accurately tests body pairs to check 
   * for collision and outputs a manifold for each body pair.
   * 
   * @type NarrowPhase
   */
  narrowphase = null
  /**
   * Moves the bodies forward in time.
   * 
   * @type {Intergrator}
   */
  intergrator = VerletSolver
  /**
   * @type boolean
   * @default true
   */
  enableIntergrate = true

  constructor() {
    this.broadphase = new NaiveBroadphase(this);
    this.narrowphase = new SATNarrowPhase();
  }

  /**
   * Gravitational pull of the world,will affect all bodies except static bodies.
   * 
   * @type { Vector2 }
   */
  get gravity() {
    return this.gravitationalAcceleration
  }

  set gravity(x) {
    if (typeof x === "object") {
      this.gravitationalAcceleration.copy(x);
    } else {
      this.gravitationalAcceleration.set(0, x);
    }
  }

  /**
   * @private
   */
  narrowPhase() {
    this.CLMDs = this.narrowphase.getCollisionPairs(this.contactList, []);
  }
  /*
   * @private
   */
  broadPhase() {
    this.contactList = [];
    this.broadphase.getCollisionPairs(this.contactList);
  }
  /**
   * @private
   */
  collisionDetection() {
    this.broadPhase();
    this.narrowPhase();
  }
  /**
   * @private
   * @param {number} dt 
   */
  collisionResponse(dt) {
    let length = this.CLMDs.length,
      manifold,
      inv_dt = 1 / dt;

    for (var j = 0; j < this.velocitySolverIterations; j++) {
      for (let i = 0; i < length; i++) {
        manifold = this.CLMDs[i];
        manifold.velA.set(0, 0);
        manifold.velB.set(0, 0);
        manifold.rotA = 0;
        manifold.rotB = 0;
        ImpulseSolver.solve(manifold);
        FrictionSolver.solve(manifold);
      }
      for (var i = 0; i < length; i++) {
        manifold = this.CLMDs[i];
        manifold.bodyA.velocity.add(manifold.velA);
        manifold.bodyB.velocity.add(manifold.velB);
        manifold.bodyA.rotation.value += manifold.rotA;
        manifold.bodyB.rotation.value += manifold.rotB;
      }
    }

    for (let i = 0; i < length; i++) {
      manifold = this.CLMDs[i];
      PenetrationSolver.solve(manifold, inv_dt);
    }

    for (let i = 0; i < length; i++) {
      manifold = this.CLMDs[i];
      manifold.stmp = this.count;
      ContactSolver.solve(
        manifold.bodyA,
        manifold.bodyB,
        manifold.impulse,
        manifold.contactData.contactNo
      );
    }
  }
  /**
   * @private
   * @param {number} dt 
   * @param {number} length 
   */
  intergrate(dt, length) {
    for (var i = 0; i < length; i++) {
      let a = this.objects[i];
      if (!a.sleeping)
        this.intergrator.solve(a, dt);
      //VerletSolver.solve(a, dt)
    }
  }
  /**
   * @private
   * @param {number} length 
   * @param {number} dt 
   */
  applyGravity(length, dt) {
    for (var i = 0; i < length; i++) {
      let a = this.objects[i];
      if (a.mass)
        a.acceleration.add(this.gravitationalAcceleration);
    }
  }
  /**
   * @private
   * @param {number} dt
   */
  updateConstraints(dt) {
    let length = this.constraints.length,
      fixedlength = this.fixedConstraits.length;
    for (var i = 0; i < fixedlength; i++) {
      this.fixedConstraits[i].update(dt);
    }
    for (var i = 0; i < length; i++) {
      this.constraints[i].update(dt);
    }
  }
  /**
   * @private
   * @param {number} length 
   */
  updateBodies(length) {
    let ld = 1 - this.linearDamping;
    let ad = 1 - this.angularDamping;
    for (var i = 0; i < length; i++) {
      this.objects[i].update();
      this.objects[i].velocity.multiply(ld);
      this.objects[i].angularVelocity = this.objects[i].angularVelocity * ad;
    }
  }
  /**
   * 
   * 
   * @param {Number} delta the time passed between the last call and this call.
   */
  update(delta) {
    this.perf.lastTimestamp = performance.now();
    let dt = this.fixedFrameRate || delta;
    let length = this.objects.length;
    this.CLMDs = [];

    this.applyGravity(length, dt);
    this.updateBodies(length);
    this.updateConstraints(dt);
    this.broadphase.update();
    this.collisionDetection();
    this.collisionResponse(dt);
    this.updateConstraints(dt);
    if (this.enableIntergrate)
      this.intergrate(dt, length);
    this.updateBodies(length);
    this.count += 1;
    this.perf.total = performance.now() - this.perf.lastTimestamp;
  }

  /**
   * Initializes the manager.
   * 
   * @param {Manager} manager
   */
  init(manager) {
    manager.setComponentList("body", this.objects);
  }
  /**
   * Adds an object to the world.
   * 
   * @param {Body | Composite | Constraint} object
   */
  add(object) {
    if (object.physicsType == ObjType.BODY) {
      this.addBody(object);
    } else if (object.physicsType == ObjType.CONSTRAINT) {
      this.addConstraint(object);
    } else if (object.physicsType == ObjType.COMPOSITE) {
      this.addComposite(object);
    }
  }
  /**
   * Adds a body to the physics world
   * @param {Body} body Body to insert to world
   */
  addBody(body) {
    //must update vertices and bounds so that Broadphase works properly
    body.update();
    body.index = this.objects.length;
    this.objects.push(body);
    this.broadphase.insert(body);
  }
  /**
   * Removes an object from the world
   * @param {Body | Composite | Constraint} object
   */
  remove(object) {
    object.destroy();
    if (object.physicsType == ObjType.BODY) {
      this.removeBody(object);
    } else if (object.physicsType == ObjType.CONSTRAINT) {
      this.removeContraint(object);
    } else if (object.physicsType == ObjType.COMPOSITE) {
      this.removeComposite(object);
    }
  }
  /**
   * Removes a body from the physics world
   * @param {Body} body Body to remove from world
   * 
   * @returns Body
   */
  removeBody(body) {
    this.broadphase.remove(body);
    if (removeElement(this.objects, body.index)) {
      if (body.index === this.objects.length)
        return
      this.objects[body.index].index = body.index;
    }
    return body
  }
  /**
   * Adds a constraint to the physics world
   * @param {Constraint} constraint constaint to add to world
   */
  addConstraint(constraint) {
    if (constraint.fixed) {
      constraint.index = this.fixedConstraits.length;
      this.fixedConstraits.push(constraint);
      return
    }
    constraint.index = this.constraints.length;
    this.constraints.push(constraint);
  }
  /**
   * Removes a constraint from the physics world
   * @param {Constraint} constraint constaint to add to world
   * 
   * @returns Constraint
   */
  removeContraint(constraint) {
    let arr = constraint.fixed ? this.fixedConstraits : this.constraints;
    let temp = arr.pop();
    if (constraint.index == arr.length) return constraint
    arr[constraint.index] = temp;
    temp.index = constraint.index;
    constraint.index = -1;
    return constraint
  }

  /**
   * Adds a composite to the physics world.
   * 
   * @param {Composite} composite composite to add to world
   */
  addComposite(composite) {
    for (var i = 0; i < composite.bodies.length; i++) {
      this.addBody(composite.bodies[i]);
    }
    for (var i = 0; i < composite.constraints.length; i++) {
      this.addConstraint(composite.constraints[i]);
    }
  }
  /**
   * Removes a composite from the physics world.
   * 
   * @param {Composite} composite composite to remove
   */
  removeComposite(composite) {
    for (var i = 0; i < composite.bodies.length; i++) {
      this.removeBody(composite.bodies[i]);
    }
    for (var i = 0; i < composite.constraints.length; i++) {
      this.removeContraint(composite.constraints[i]);
    }
  }
  /**
   * Searches for objects in a given bounds and returns them.
   * 
   * @param {Bounds} bound the region to search in
   * @param {Array<Body>} [target = []] an array to store results in
   * @returns Array<Body>
   */
  query(bound, target = []) {
    this.broadphase.query(bound, target);
    return target
  }
}

class Camera {
  /**
   * @readonly
   * @type Transform
   */
  transform = new Transform$1()

  constructor() { }
  /**
   * @type Vector2
   */
  get position() {
    return this.transform.position
  }
  set position(x) {
    this.transform.position.copy(x);
  }
  update() {}
}

/**
 * This is an abstract class from which different types of renderers are implemented.
 * 
 * @abstract
 * @see Renderer2D
 * @see WebGLRenderer
 * @see WebGPURenderer
 */
class Renderer {
  /**
   * @type number
  */
  _rafID = 0
  /**
   * Used to throttle the frame rate.
   * 
   * @private
   * @rype number
   */
  _accumulator = 0
  /**
   * A list of meshes.
   * 
   * @type Sprite[]
   */
  objects = []
  /**
   * Used for monitoring perfomance of the renderer
   * 
   */
  perf = {
    lastTimestamp: 0,
    total: 0
  }
  /**
   * @private
   * @type {HTMLCanvasElement}
   */
  domElement = null
  /**@type {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext}*/
  ctx = null
  /**
   * @type {Camera}
   */
  camera = null
  /**
   * @param {CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext} context
   * @param {HTMLCanvasElement} canvas element to draw on
   */
  constructor(canvas, context) {
    this.domElement = canvas;
    this.ctx = context;
    this.camera = new Camera(this);
    this.clock = new Clock();
  }
  /**
   * Instantiates the renderer.
   * 
   * @param {Manager} manager
   */
  init(manager) {
    manager.setComponentList("sprite", this.objects);
  }
  /**
   * Clears the canvas on which the renderer draws on.
   */
  clear() {

    throw "Override Renderer.clear()"
  }
  /**
   * Updates the objects within the renderer.
   * 
   * @param {number} dt
   */
  update(dt) {
    throw "Override Renderer.update()"
  }
  /**
   * Requests an animation frame.
   * 
   * @protected
   */
  RAF() {
    this._rafID = requestAnimationFrame(this._update);
  }
  /**
   * Starts the rendering cycle of a renderer.
   */
  play() {
    this.RAF();
  }
  /**
   * Stops the rendering cycle of a renderer.
   */
  pause() {
    cancelAnimationFrame(this._rafID);
  }
  /**
   * Attaches the renderer to a given html element by its selector.
   * 
   * @param {string} selector A css selector string that is passed to document.querySelector
   * @param {true} focus whether to shift focus of input to the element pr not
   */
  bindTo(selector, focus = true) {
    let element = document.querySelector(selector);
    this.domElement.remove();
    this.domElement.style.backgroundColor = "grey";
    this.domElement.style.touchAction = "none";
    element.append(this.domElement);
  }
  /**
   * Adds a mesh to the renderer.
   * 
   * @param {Sprite | Group} sprite
   */
  add(sprite) {
    this.objects.push(sprite);
  }
  /**
   * Removes the given sprite from the renderer.
   * 
   * @param {Sprite} sprite
   */
  remove(sprite) {
    this.objects.splice(this.objects.indexOf(sprite), 1);
  }
  /**
   * Requests fullscreen for the renderer.
   */
  requestFullScreen() {
    this.domElement.parentElement.requestFullscreen();
  }
  /**
   * Sets the width and height of the canvas being rendered to.
   * 
   * @param {number} w Width of the canvas.
   * @param {number} h Height of the canvas.
   */
  setViewport(w, h) {
    let canvas = this.domElement;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * devicePixelRatio;
    canvas.height = h * devicePixelRatio;
  }
  /**
   * Width of the renderer
   * 
   * @type number
   */
  get width() {
    return this.domElement.width
  }
  set width(x) {
    this.domElement.width = x;
  }
  /**
   * Height of the renderer
   * 
   * @type number
   */
  get height() {
    return this.domElement.height
  }
  set height(x) {
    this.domElement.height = x;
  }
}

/**
 * Renders images and paths to the 2D context of a canvas.
 * 
 * @extends Renderer
 */
class Renderer2D extends Renderer {
  frameRate = 1 / 60
  renderLast = []
  /**
  @param {HTMLCanvasElement} [canvas] element to draw on
  */
  constructor(canvas) {
    canvas = canvas || document.createElement("canvas");
    super(canvas, canvas.getContext("2d"));

  }
  /**
   * @inheritdoc
   * 
   * @param {Sprite | Group} sprite
   */
  add(sprite) {
    super.add(sprite);
    sprite.geometry?.init(this.ctx);
  }
  clear() {
    this.ctx.setTransform();
    let h = this.height,
      w = this.width;
    this.ctx.clearRect(0, 0, w, h);
  }
  /**
   * @param {number} dt
   */
  update(dt) {
    this.camera.update();
    this.perf.lastTimestamp = performance.now();
    this.clear();
    if (this.background != void 0)
      this.background.update(this, dt);
    this.ctx.save();
    this.ctx.translate(this.camera.transform.position.x,-this.camera.transform.position.y);
    this.ctx.rotate(this.camera.transform.orientation.value);
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].render(this.ctx, dt);
    }
    this.ctx.restore();
    for (var i = 0; i < this.renderLast.length; i++) {
      this.renderLast[i].update(this, dt, this.camera.transform);
    }
    this.perf.total = performance.now() - this.perf.lastTimestamp;
  }
  /**
   * @private
   */
  _update = (accumulate) => {
    let dt = this.clock.update(accumulate);
    if (this._accumulator < this.frameRate) {
      this._accumulator += dt;
      this.RAF();
      return
    }
    this.update(dt || this._accumulator);
    this.RAF();
    this._accumulator = 0;
  }
  /**
   * @param {Sprite} sprite
  */
  addUI(sprite) {
    this.renderLast.push(sprite);
  }
  requestFullScreen() {
    this.domElement.parentElement.requestFullscreen();
  }
}

//Dont get too excited yet :)

/**
 * Renders images and paths to the webgpu context of a canvas.
 * 
 * @extends Renderer
*/
class WebGPURenderer extends Renderer{
  constructor(){
    throw new Error("Dont get too excited yet :)")
  }
}

/**
 * Renders images and paths to the webgl context of a canvas.
 * 
 * @extends Renderer
 */
class WebGLRenderer extends Renderer{
  constructor(){
    throw new Error("Hold your horses there!I haven't implemented this yet!")
  }
}

/**
 * This is the base class used to render images and paths onto the renderer.
 * Extend it to create your custom behaviour.
 * 
 * @implements Component
 * TODO - ADD id property to this class and Group class.
 */
class Sprite {
  /**
   * @private
   */
  _position = null
  /**
   * @private
   */
  _orientation = null
  /**
   * @private
   */
  _scale = null
  /**
   * @private
   */
  geometry = null
  /**
   * @private
   */
  material = null
  /**
   * @type Group | null
   */
  parent = null
  /**
   * @param {BufferGeometry} geometry
   * @param {Material} material
   */
  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;
  }
  /**
   * Angle in degrees
   * 
   * @type number
   */
  get angle() {
    return this._orientation.value * 180 / Math.PI
  }
  set angle(x) {
    this._orientation.value = x * Math.PI/180;
  }
  /**
   * World space position.
   * 
   * @type Vector2
   */
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x);
  }
  /**
   * Orientation of the sprite
   * 
   * @type Angle
   */
  get orientation() {
    return this._orientation
  }
  set orientation(x) {
    this._orientation.copy(x);
  }
  render(ctx, dt) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(...this._position);
    ctx.rotate(this._orientation.value);
    ctx.scale(...this._scale);
    this.material?.render(ctx,dt,this.geometry?.drawable);
    ctx.closePath();
    ctx.restore();
  }
  /**
   * @param {Entity} entity
   */
  init(entity) {
    if(!entity){
      this._position = new Vector2$1();
      this._orientation = new Angle();
      this._scale = new Vector2$1(1,1);
      return
    }
    this.entity = entity;
    this.requires(entity,"transform");
    let transform = entity.get("transform");
    this._position = transform.position;
    this._orientation = transform.orientation;
    //TODO - Correct this later
    this._scale = new Vector2$1(1,1);
    return this
  }
  toJson(){
    let obj = {
      pos:this._position.toJson(),
      angle:this._orientation.toJson(),
      geometry:this.geometry?.toJson(),
      material:this.material?.toJson(),
      parent:this.parent?.id
    };
    return obj
  }
  fromJson(obj,renderer){
    this.geometry?.fromJson(obj.geometry);
    this.material?.fromJson(obj.material);
    this.position.fromJson(obj.pos);
    this._orientation.fromJson(obj.angle);
    this.parent = renderer.getById(obj.parent);
  }
}
Component.implement(Sprite);

/**
 * @interface
*/
class Material{
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} [path]
  */
  render(ctx,dt,path){
    throw "Override this method in derived class"
  }
}

/**
 * 
 * @implements Material
*/
class BasicMaterial {
  /**
   * 
   * @type string
   * @default "white"
   */
  fill = "white"
  /**
   * 
   * @type string
   * @default "black"
   */
  stroke = "black"
  /**
   * 
   * @type boolean
   * @default false
   */
  wireframe = false
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} path
   */
  render(ctx,dt, path) {
    if (!this.wireframe) {
      ctx.fillStyle = this.fill;
      ctx.fill(path);
    }
    ctx.strokeStyle = this.stroke;
    ctx.stroke(path);
  }
}

/**
 * 
 * @implements Material
 */
class StaticImageMaterial {
  /**
   * @readonly
   * @type Image
   */
  image = null
  /**
   * 
   * @type number
   */
  width = 100
  /**
   * 
   * @type number
   */
  height = 100
  /**
   * @type Vector_like
   */
  offset = {
    x: 0,
    y: 0
  }
  /**
   * @param {Image} img
   */

  constructor(img) {
    //TODO - Find a way to load images synchronously.
    this.image = img;
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    ctx.drawImage(this.image, this.offset.x, this.offset.y, this.width, this.height);
  }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function line(ctx, x1, y1, x2, y2) {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
function rect(ctx, x, y, w, h) {
  ctx.rect(x, y, w, h);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} r
 */
function circle(ctx, x, y, r) {
  ctx.arc(x, y, r, 0, Math.PI * 2);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param { Vector2[]} vertices
 * @param {boolean} [close=true]
 */
function vertices(ctx, vertices, close = true) {
  if (vertices.length < 2) return;
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (var i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  if (close)
    ctx.lineTo(vertices[0].x, vertices[0].y);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} r
 * @param {number} start
 * @param {number} end
 */
function arc(ctx, x, y, r, start, end) {
  ctx.arc(x, y, r, start, end);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} text
 * @param {number} x
 * @param {number} y
 */
function fillText(ctx, text, x, y) {
  ctx.fillText(text, x, y);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} [color="black"]
 * @param {string} [fillRule]
 */
function fill(ctx, color = "black", fillRule) {
  ctx.fillStyle = color;
  ctx.fill(fillRule);
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param { string } [color = "black"]
 * @param {number} [width=1]
 */
function stroke(ctx, color = "black", width = 1) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} img
 * @param {number} x
 * @param {number} y
 * @param { number } [w = img#width]
 * @param { number } [h=img#height]
 * @param { number } [ix = 0]
 * @param { number } [iy = 0]
 */
function drawImage(
  ctx,
  img,
  x,
  y,
  w = img.width,
  h = img.height,
  ix = 0,
  iy = 0
) {
  ctx.drawImage(img, w * ix, h * iy, w, h,
    x,
    y,
    w, h);
}

/**
 * 
 * @implements Material
 */
class SpriteMaterial {
  /**
   * @type HTMLImageElement
   */
  img = null
  /**
   * The index of the current action.
   * 
   * @private
   * @type number
   */
  _index = 0
  /**
   * The current action's max frame index.
   * 
   * @private
   * @type number
   */
  _maxFrame = 0
  /**
   * The current frame of an action.
   * 
   * @private
   * @type number
   */
  _frame = 0
  /**
   * Used with ImageSprite#frameRate to throttle the fps of the sprite.
   * 
   * @private
   * @type number
   */
  _accumulator = 0
  /**
   * The maximum frames for each given action.
   * 
   * @type number
   */
  frameRate = 1 / 60
  /**
   * The current action.
   * 
   * @private
   * @type number[]
   */
  _maxFrames = null
  /**
   * The width of the sprite.
   * 
   * @type number
   */
  width = 0
  /**
   * The height of the sprite..
   * 
   * @type number
   */
  height = 0
  /**
   * The width of a frame.
   * 
   * @private
   * @type number
   */
  frameWidth = 0
  /**
   * The height of a frame..
   * 
   * @private
   * @type number
   */
  frameHeight = 0
  /**
   * @param {HTMLImageElement} img Image to draw
   * @param {number} [frames] Number of cutouts in the sprite in the X axis of the image.
   * @param {number} [actions] Number of cutouts in the sprite in the Y axis of the image.
   */
  constructor(img, frames = 1, actions = 1) {
    this.img = img;
    this.setup(frames, actions);
  }
  /**
   * 
   * @param {number} frames
   * @param {number} actions
   */
  setup(frames, actions) {
    this._maxFrame = frames - 1;
    this.width = this.img.width;
    this.height = this.img.height;
    this.frameWidth = this.img.width / (frames || 1);
    this.frameHeight = this.img.height / actions;
  }
  /**
   * Sets max number of frames for a given action
   * 
   * @param {number} action 
   * @param {number} max
   */
  setMaxFrames(action, max) {
    this._maxFrames = max;
  }
  /**
   * Sets a given action to be rendered
   * 
   * @param {number} index
   */
  setAction(index) {
    this._maxFrame = (this._maxFrames[index] || 0);
    this._index = index;
    this._frame = 0;
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   */
  render(ctx, dt) {
    drawImage(
      ctx,
      this.img,
      -this.frameWidth / 2,
      -this.frameHeight / 2,
      this.frameWidth,
      this.frameHeight,
      this._frame,
      this._index
    );
    this._accumulator += dt;
    if (this._accumulator < this.frameRate) return
    this._accumulator = 0;
    this._frame += 1;
    if (this._frame >= this._maxFrame)
      this._frame = 0;
  }
}

let r = new Vector2$1();
let material$1 = new BasicMaterial();
material$1.wireframe = true;
/**
 * This draws a body from the physics System.
 * 
 * @augments Sprite
 */
class BodySprite extends Sprite {
  /**
   * @private
   * @type Body
   */
  body = null
  /**
   * Determine whether to draw a representation of the velocity.
   * 
   * @type {boolean}
   */
  drawVelocity = false
  /**
   * Determine whether to draw the bounding box.
   * 
   * @type {boolean}
   */
  drawBounds = false
    /**
   * Determine whether to draw the position of the body.
   * 
   * @type {boolean}
   */
  drawPosition = true
  /**
   * @param {{}} [options={}] 
   * @param {boolean} [options.drawVelocity=false] Determine whether to draw a representation of the velocity.
   * @param {boolean} [options.drawBounds=false] Determine whether to draw the bounding box.
   */
  constructor(options = {}) {
    super();
    this.drawVelocity = options.drawVelocity || false;
    this.drawBounds = options.drawBounds || false;
  }
  /**
   * @inheritdoc
   *  @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
  */
  render(ctx, dt) {

    if (this.body.physicsType == ObjType.COMPOSITE) {
      for (var i = 0; i < this.body.bodies.length; i++) {
        this._drawShapes(this.body.bodies[i], ctx);

      }
    } else {
      this._drawShapes(this.body, ctx);
    }
    if (this.drawVelocity == true)
      this._drawVelocity(this.body, ctx);
    if (this.drawBounds == true)
      this._drawBound(this.body, ctx);
    if (this.drawPosition)
      this._drawCenter(this.body, ctx);
  }
  _drawCenter(body, ctx) {
    ctx.beginPath();
    circle(
      ctx,
      body.position.x,
      body.position.y,
      2
    );
    fill(ctx, "black");
    ctx.closePath();
  }
  /**
   * @private
   * @param {Body} body
   * @param {CanvasRenderingContext2D} renderer
   */
  _drawVelocity(body, ctx) {
    ctx.beginPath();
    line(
      ctx,
      body.position.x,
      body.position.y,
      body.position.x + body.velocity.x,
      body.position.y + body.velocity.y
    );
    stroke(ctx, "cyan");
    ctx.closePath();
  }
  /**
   * @private
   * @param {Body} body
   * @param {CanvasRenderingContext2D} renderer
   */
  _drawBound(body, ctx) {
    ctx.beginPath();
    if (body.bounds.r) {
      circle(ctx, ...body.position, body.bounds.r);
    } else {
      rect(
        ctx,
        body.bounds.min.x,
        body.bounds.min.y,
        body.bounds.max.x - this.body.bounds.min.x,
        body.bounds.max.y - this.body.bounds.min.y
      );
    }
    stroke(ctx, "red");
    ctx.closePath();
  }
  /**
   * @private
   * @param {Body} body
   * @param {CanvasRenderingContext2D} renderer
   */
  _drawShapes(body, ctx) {
    ctx.beginPath();
    for (var i = 0; i < body.shapes.length; i++) {
      let shape = body.shapes[i];
      if (shape.type === Shape.CIRCLE) {
        circle(
          ctx,
          shape.position.x,
          shape.position.y,
          shape.radius);
        Vector2$1.fromRad(shape.angle, r).multiply(shape.radius);
        line(ctx, ...shape.position,
          shape.position.x + r.x,
          shape.position.y + r.y);
      } else {
        vertices(ctx, shape.vertices, true);
      }
    }
    stroke(ctx);
    ctx.closePath();
  }
  /**
   * @inheritdoc
   * @param {Entity} parent
   */
  init(parent) {
    this.body = parent.get("body");
    super.init(parent);
  }
}

class BufferGeometry {
  /**
   * @readonly
   * @type Vector2[]
   */
  vertices = null
  /**
   * @package
   * @type Path2D | WebGLVertexArrayObject
   */
  drawable = null
  /**
   * @param { Vector2[]} vertices
   */
  constructor(vertices) {
    this.vertices = vertices || [];
  }
  /**
   * @package
   * @param {CanvasRenderingContext2D} ctx
   */
  init(ctx) {
    this.updateVertices(this.vertices);
  }
  updateVertices(data){
    const path = this.drawable = new Path2D();
    vertices(path, data, true);
  }
}

class CircleGeometry {
  /**
   * @param {number} radius
   */
  constructor(radius) {
    this.radius = radius;
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  init(ctx) {
    this._drawable = new Path2D();
    circle(path, this.vertices, true);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    circle(ctx, 0, 0, this.radius);
  }
}

let geometry = new BufferGeometry([
  new Vector2$1(-10, -10),
  new Vector2$1(-10, 10),
  new Vector2$1(20, 0)
  ]);
let material = new BasicMaterial();
material.fill = "purple";
/**
 * Used for debugging agents.
 * 
 * @augments Sprite
 */
class AgentSprite extends Sprite {
  /**
   * 
   * @private
   * @type Agent
   */
  agent = null
  constructor() {
    super(geometry,material);
  }
  /**
   * @inheritdoc
   * @param {Entity} entity 
   */
  init(entity) {
    super.init(entity);
    this.requires(entity,"agent");
    this.agent = entity.get("agent");
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.agent.draw(ctx);
    super.render(ctx);
  }
}

/**
 * Its a fricking particle!
 */
class Particle {
  /**
   * @readonly
   * @type Vector2
   */
  position = null
  /**
   * @readonly
   * @type Vector2
   */
  velocity = null
  /**
   * @type boolean
   */
  active = true
  /**
   * @type number
   */
  radius = 0
  /**
   * @type {{r:number,b:number,g:number,a:number}}
   */
  color = null
  /**
   * @private
   * @type number
   */
  _life = 0
  /**
   * @readonly
   * @type number
   */
  lifespan = 0
  /**
   * @param { Vector2} pos
   * @param {number} radius
   * @param {number} [lifespan=5] In seconds
   */
  constructor(pos, radius, lifespan = 5) {
    this.position = pos;
    this.velocity = new Vector2$1();
    this.radius = radius;
    this.color = {
      r: 100,
      g: 255,
      b: 255,
      a: 1
    };
    this.lifespan = lifespan;
    this._life = 0;
  }
  /**
   * Renders a particle.
   * 
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    circle(ctx, ...this.position, this.radius);
    fill(ctx, `rgba(${this.color.r},${this.color.g},${this.color.b},${this.color.a})`);
    ctx.closePath();
  }
  /**
   * Updates a particle's lifetime
   * @inheritdoc
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   */
  update(ctx, dt) {
    this._life += dt;
    this.position.add(this.velocity);
    this.active = this._life < this.lifespan;
  }
}

/**
 * This creates a particle system 
 * @augments Sprite
 */
class ParticleSystemSprite extends Sprite {
  /**
   * @private
   */
  _particles = []
  /**
   * @type number
   * @default 1
   */
  initial = 0
  /**
   * @type number
   * @default 1
   */
  frameIncrease = 0
  /**
   * @type number
   * @default 1
   */
  max = 0
  /**
   * @param {number} [initial=1] Number of particles to start with.
   * @param {number} [max=100] Maximum number of particles.
   * param {number} [increment=5] Maximum number of particles.
   */
  constructor(initial = 1, max = 100, increment = 5) {
    super();
    this.initial = initial;
    this.frameIncrease = increment;
    this.max = max;
  }

  /**
   * @protected
   * @param {number} n
   */
  initParticles(n) {
    for (var i = 0; i < n; i++) {
      this._particles.push(this.create());
    }
  }

  /**
   * override this to return an object created from your own class extending the particle class
   * 
   * @protected
   */
  create() {
    return new Particle(
      new Vector2$1(...this.position),
      rand(1, 10),
      rand(1, 6)
    )
  }
  /**
   * @inheritdoc
   * @param {Entity} entity
   */
  init(entity) {
    super.init(entity);
    this.initParticles(this.initial);
  }
  /**
   * @protected
   * @param {Particle} p
   * @param {number} dt
   */
  behavior(p,dt) {
    p.velocity.set(
      p.velocity.x + rand(-1, 1)*dt,
      p.velocity.y + rand(0, 0.3)*dt
    );
  }
  /**
   * @inheritdoc
   *  @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
  */
  render(ctx, dt) {
    for (let i = this._particles.length - 1; i > 0; i--) {
      let p = this._particles[i];
      p.update(ctx, dt);
      this.behavior(p,dt);
      p.draw(ctx, dt);
      if (!p.active) {
        this._particles.splice(i, 1);
      }
    }
    if (this._particles.length < this.max) {
      this.initParticles(this.frameIncrease);
    }
  }
}

/**
 * Used for grouping similar.
 * 
 * @augments Sprite
 */
class Group extends Sprite {
  /**
   * @private
   * @type Sprite[]
   */
  _children = null
  /**
   * @private
   * @type Group
   */
  parent = null
  /**
   * @param {Sprite[]} sprites
   */
  constructor(sprites = []) {
    super();
    this._children = sprites;
  }
  /**
   * @type string
   */
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  /**
   * @type string
   */
  get CHAOS_OBJ_TYPE() {
    return "group"
  }

  /**
   * Adds another sprite to this one
   * 
   * @param {Sprite | Group} sprite
   */
  add(sprite) {
    this._children.push(sprite);
    sprite.parent = this;
  }
  /**
   * Removes another sprite to this one
   * 
   * @param {Sprite | Group} sprite
   * @param {boolean} [recursive=false]
   * @param {number} [index]
   */
  remove(sprite, recursive = false, index) {
    let inx = index ?? this._children.indexOf(sprite);
    if (inx !== -1) {
      this._children[inx].parent = null;
      Utils.removeElement(this._children, inx);
      return true
    }
    if (!recursive) return false
    for (var i = 0; i < this._children.length; i++) {
      if (this._children.CHAOS_OBJ_TYPE == "group") {
        let t = this._children[i].remove(sprite, recursive, index);
        if (t) return true
      }
    }
    return false
  }
  /**
   * @inheritdoc
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   */
  render(ctx, dt) {
    for (var i = 0; i < this._children.length; i++) {
      this._children[i].render(ctx, dt);
    }
  }
}

class CamController {
  /**
   * @readonly
   * @type Vector2
   */
  offset = new Vector2$1()
  /**
   * @param {Camera} camera
   */
  constructor(camera) {
    this.transform = camera.transform;
    this.offset = new Vector2$1();
    this.targetPosition = null;
    this.targetOrientation = null;
  }
  /**
   * @param { Vector2} position
   * @param {Angle} orientation
   */
  follow(position, orientation = null) {
    this.targetOrientation = orientation;
    this.targetPosition = position;
  }
  /**
   * @param {Entity} entity
   */
  followEntity(entity) {
    if (!entity.has("transform")) return
    let target = entity.get("transform");
    this.follow(target.position, target.orientation);
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  setOffset(x, y) {
    this.offset.set(x, y);
  }
  init() {}
  update() {
    if (this.targetPosition)
      this.transform.position.copy(this.targetPosition.clone().sub(this.offset));
    if (this.targetOrientation)
      this.transform.orientation.copy(this.targetOrientation);
  }
}

/**
 * Handled the keyboard input of an application on a PC.
*/
class Keyboard {
  /**
   * Dictionary of keys showing if they are active or not.
   * 
   * @type Object<string,boolean>
  */
  keys = {}
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.keys = {};
    this.init(eh);
  }
  /**
   * Ensures that keycodes are produced in a consistent manner
   * 
   * @private
   * @param {string} keycode
   * @returns {string}
  */
  normalize(keycode) {
    let r = keycode;
    if (keycode.includes('Key')) {
      r = r.slice(3, r.length);
    }
    return r.toUpperCase()
  }
  /**
   * Adds Keyboard events to the DOM.
   * 
   * @param {DOMEventHandler} eh
  */
  init(eh) {
    eh.add('keydown',this._onDown);
    eh.add('keyup',this._onUp);
  }
  /**
   * @private
  */
  _onDown = e => {
    let key = this.normalize(e.code);
    this.keys[key] = true;
    //this.activeKeys.push(key)
  }
    /**
     * @private
     */
  _onUp = e =>{
    this.keys[this.normalize(e.code)] = false;
  }
}

/**
 * This handles all inputs from mouse and touchpad on laptops
 */

class Mouse {
  /**
   * Number of times the mouse has been clicked.
   * 
   * @type number
   */
  clickCount = 0
  /**
   * If the mouse is being dragged or not.
   * 
   * @type boolean
   */
  dragging = false
  /**
   * The position from which the mouse is being dragged.
   * 
   * @type Vector_like
   */
  dragLastPosition = { x: 0, y: 0 }
  /**
   * Distance vector between the last frame's position and current position.
   * 
   * @type Vector_like
   */
  delta = { x: 0, y: 0 }
  /**
   * Position of the mouse in current frame.
   * 
   * @type Vector_like
   */
  position = { x: 0, y: 0 }
  /**

   * Position of the mouse in last frame.

   * 
   * @type Vector_like
   */
  lastPosition = { x: 0, y: 0 }
  /**
   * If the left mouse button is pressed or not.
   * 
   * @type boolean
   */
  leftbutton = false
  /**
   * If the right mouse button is pressed or not.
   * 
   * @type boolean
   */
  rightbutton = false
  /**
   * @param {DOMEventHandler} eh
   */
  constructor(eh) {
    this.init(eh);
  }
  /**
   * Checks to see if the vector provided is
   * within a dragbox if mouse is being dragged with a right or left button down
   * 
   * @param {Vector_like} pos an object containing x and y coordinates to be checked
   * @returns {Boolean}
   * 
   */
  inDragBox(pos) {
    if (!this.dragging) return false
    if (pos.x > this.dragLastPosition.x && pos.x < this.position.x &&
      pos.y > this.dragLastPosition.y &&
      pos.y < this.position.y) {
      return false
    }
    return true
  }
  /**
   * Initializes the mouse by appending to the DOM
   *
   * @param {DOMEventHandler} eh
   */
  init(eh) {
    eh.add('click', this._onClick);
    eh.add('mousedown', this._onDown);
    eh.add('mouseup', this._onUp);
    eh.add('mousewheel', this._onWheel);
    eh.add('mousemove', this._onMove);
    eh.add("contextmenu", this._onContextMenu);
  }
  /**
   * @private
   */
  _onClick = (e) => {
    ++this.clickCount;
  }
  /**
   * @private
   */
  _onMove = (e) => {
    this.position.x = e.clientX;

    this.position.y = e.clientY;

    if (this.lastPosition.x === undefined) {
      this.lastPosition = { ...this.position };
    }
    this.delta.x = this.position.x - this.lastPosition.x;
    this.delta.y = this.position.y - this.lastPosition.y;
    this.dragging = this.leftbutton || this.rightbutton ? true : false;
    if (!this.dragging) {
      this.dragLastPosition.x = e.clientX;
      this.dragLastPosition.y = e.clientY;
    }
  }
  /**
   * @private
   */
  _onDown = (e) => {
    switch (e.button) {

      case 0:

        this.leftbutton = true;
        break;
      case 2:
        this.rightbutton = true;
        break;
    }
  }
  /**
   * @private
   */
  _onUp = (e) => {
    switch (e.button) {
      case 0:
        this.leftbutton = false;
        break;
      case 2:
        this.rightbutton = false;
        break;
    }
  }
  /**
   * @private
   */
  _onWheel = (e) => {
  }
  /**
   * @private
   */
  _onContextMenu = (e) => {
    e.preventDefault();
  }
  /**
   * Updates the mouse internals.
   */
  update() {
    this.lastPosition = { ...this.position };
  }
}

/**
 * Handles the touch input of an application from a smartphone,tablet or PCs with touchscreens.
 * 
 * Realized i need to massively change this to make it work well.
 */
class Touch {
  /**
   * @type TouchEvent[]
   */
  touches = []
  /**
   * @type number
  */
  clickCount = 0
  /**
   * @param {DOMEventHandler} eh
  */
  constructor(eh) {
    this.init(eh);
  }
  /**
   * Checks to see if the position is within the dragbox of the first two touches.
   * Not yet fully implemented
   * 
   * @param {Vector_like} pos
   */
  inDragBox(pos) {
    if (pos.x > this.dragLastPosition.x && pos.x < this.dragLastPosition.x + this.position.x &&
      pos.y > this.dragLastPosition.y && pos.y < this.dragLastPosition.y + this.position.y) {
      return false
    }
    return true
  }
  /**
   * Adds Touch events to the DOM.
   * 
   * @param {DOMEventHandler} eh
   */
  init(eh) {
    eh.add('touchstart', this._onDown);
    eh.add('touchend', this._onUp);
    eh.add('touchmove', this._onMove);
  }
  /**
   * @private
   */
  _onMove = (e) => {
    e.preventDefault();
  }
  /**
   * @private
   */
  _onDown = (e) => {
    this.touches = e.touches;
  }
  /**
   * @private
   */
  _onUp = (e) => {
    this.touches = e.touches;
  }
  update() {}
}

/**
 * This handles all inputs from the mouse,touch and keyboards.
 * 
 */
class Input {
  /**
   * This attaches callbacks to the DOM.
   * 
   * @type DOMEventHandler
  */
  DOMEventHandler = null
  /**
   * 
   * @type Mouse
  */
  mouse = null
  /**
   * 
   * @type Touch
  */
  touch = null
  /**
   * 
   * @type Keyboard
  */
  keyboard = null
  /**
   * @param {DOMEventHandler} eventHandler
  */
  constructor(eventHandler) {
    this.DOMEventHandler = eventHandler || new DOMEventHandler();
    this.mouse = new Mouse(this.DOMEventHandler);
    this.touch = new Touch(this.DOMEventHandler);
    this.keyboard = new Keyboard(this.DOMEventHandler);
  }
  /**
   * Updates all inputs.
  */
  update() {
    this.mouse.update();
    this.touch.update();
  }
  /**
   * Remove all bindings to the DOM for all input types.
  */
  dispose() {
    //TODO remove eventlisteners
    this.mouse.dispose();
    this.keyboard.dispose();
    this.touch.dispose();
  }
}

/**
 * This class is responsible for playing a singular sound.
 */
class Sfx {
  /**
   * @private
   * @type {AudioBuffer}
   */
  _soundBuffer = null
  /**
   * @private
   * @type {AudioBufferSourceNode}
   */
  _source = null
  /**
   * @private
   * @type {function}
   */
  _onended = null
  /**
   * @private
   * @type {AudioNode}
   */
  _destination = null
  /**
   * @private
   * @type {number}
   */
  _playingOffset = 0
  /**
   * Time on the sound to begin playing 
   * 
   * @type {number}
   */
  offset = 0
  /**
   * Whether to start from the beginning after sound has finished playing.
   * 
   * @type {boolean}
   */
  loop = false
  /**
   * @private
   * @type {number}
   */
  delay = 0
  /**
   * how long to play the sound.
   * 
   * @type {number}
   */
  duration = 0
  /**
   * @param {AudioHandler} handler 
   * @param {AudioBuffer} buffer
   */
  constructor(handler, buffer) {
    this.handler = handler;
    this.ctx = handler.ctx;
    this._soundBuffer = buffer;
    this._destination = handler.masterGainNode;
    this.finished = false;
    this.id = -1;
    this.duration = buffer.duration;

  }
  /**
   * Set callback when the sound finishes playing.
  */
  set onended(x) {
    this._onended = x;
  }
  /**
   * Plays an sfx from the beginning.
   */
  play() {
    this._playingOffset = this.offset;
    this.resume();
  }
  /**
   * Continues playing an sfx from where it was paused.
   */
  resume() {
    this._source = this.ctx.createBufferSource();
    this._source.buffer = this._soundBuffer;
    this._startTime = Date.now();
    this._source.connect(this._destination);
    this._source.start(this.delay, this._playingOffset, this.duration);
    this._source.loop = this.loop;
  }
  /**
   * Halts playing of an sfx.
   */
  pause() {
    this._source.stop();
    let time = (Date.now() - this._startTime) / 1000 + this._playingOffset;
    this._playingOffset = this.duration <= time ? this.offset : time;
  }
  /**
   * Disconnects this sfx from its current destination.
   */
  disconnect() {
    this._source.disconnect();
  }
  /**
   * Sets the given audionode to be the output destination of an sfx
   * 
   * @param {AudioNode} node
   */
  connect(node) {
    if (node)
      this._destination = node;
    if (!this._source) return;
    this._source.disconnect();
    this._source.connect(this._destination);
  }
}

/**
 * Manages playing of audio using Web Audio.
 */
class AudioHandler {
  /**
   * Audio context to use.
   * 
   *  @private
   * @type AudioContext
   */
  ctx = new AudioContext()
  /**
   * List of audio buffers to use.
   * 
   *  @private
   * @type Object<string,AudioBuffer>
   */
  sfx = {}
  /**
   * The name of the background music playing.
   * 
   *  @private
   * @type string
   */
  _backname = ""
  /**
   * The audiobuffer of the background music.
   * 
   *  @private
   * @type AudioBuffer
   */
  _background = null
  /**
   * List of playing sounds
   * 
   * @private
   * @type Sfx[]
   */
  playing = []
  /**
   * What to play after loading the audiobuffers.
   * 
   * @private
   */
  toplay = {}
  /**
   * Volume to resume playing when unmuted.
   * 
   * @private
   * @type number
   */
  _mute = 1
  /**
   * Master volume for all sounds.
   * 
   * @private
   * @type AudioNode
   */
  masterGainNode = null
  /**
   * @type string
   */
  baseUrl = ""
    /**
     * If the manager can play a sound.
   * @type boolean
   */
  canPlay = false
  constructor() {
    this.masterGainNode = this.ctx.createGain();
    this.masterGainNode.connect(this.ctx.destination);
    this.canPlay = this.ctx.state == "running";
    let that = this;
    window.addEventListener("pointerdown", function resume() {
      that.ctx.resume();
      if (that.ctx.state == "running") {
        removeEventListener("pointerdown", resume);
        that.canPlay = true;
      }
    });
  }
  /**
   * Load a sound into a sound manager
   * 
   * @param {string} src
   */
  load(src) {
    let name = src.split(".")[0];
    fetch(this.baseUrl + "/" + src)
      .then(e => e.arrayBuffer())
      .then(e => this.ctx.decodeAudioData(e))
      .then(e => {
        this.sfx[name] = e;
        if (this._backname == name)
          this.playMusic(name);
        if (name in this.toplay) {
          this.playEffect(name);
        }
      }).catch(err => console.log(err));
  }
  /**
   * Loads all audio from the loader.
   * 
   * @param {Loader} loader
   */
  loadFromLoader(loader) {
    for (var n in loader.sfx) {
      let name = n;
      this.ctx.decodeAudioData(loader.sfx[n]).then(e => {
        this.sfx[n] = e;
        if (this._backname == name)
          this.playMusic(name);
        if (name in this.toplay) {
          this.playEffect(name);
        }
      });
    }
  }
  /**
   * Plays a single audio as the background in a loop throughout the game
   * 
   * @param {string} name
   */
  playBackgroundMusic(name) {
    this._backname = name;
    if (!(name in this.sfx))
      return
    this._background = new Sfx(this, this.sfx[name]);
    this._background.loop = true;
    this._background.play();
  }
  /**
   * Plays a sound only once.
   * 
   * @param {string} name Name of audio to play.
   * @param {number} [offset] Where to start playing the audio.It is in seconds.
   * @param {number} [duration] how long in seconds will the audio defaults to total duration of the selected audio. 
   */
  playEffect(name, offset = 0, duration = 0) {
    if (!(name in this.sfx)) {
      this.toplay[name] = 1;
      return
    }
    let s = new Sfx(this, this.sfx[name]);
    let id = this.playing.length;
    s.id = id;
    s.offset = offset;
    if (duration)
      s.duration = duration;
    this.playing.push(s);
    s.play();
  }

  /**
   * Creates and returns an SFX.
   * 
   * @param {string} name
   * @rerurns Sfx
   */
  createSfx(name) {
    ///throw error if name is not in this.
    return new Sfx(this, this.sfx[name])
  }
  /**
   * Pauses currently playing sounds.
   */
  pauseAll() {
    this.playing.forEach(sound => {
      sound.stop();
    });
  }
  /**
   * Sets the volume to zero.Sounds will continue playing but not be audible.
   */
  mute() {
    this._mute = this.masterGainNode.gain;
    this.masterGainNode.gain = 0;

  }
  /**
   * Restores the volume before it was muted.
   */
  unmute() {
    this.masterGainNode.gain = this._mute;
  }
  /**
   * Removes an sfx from the handler and disconnects it from its destination.
   * 
   * @param {Sfx} sfx
   */
  remove(sfx) {
    let id = this.playing.indexOf(sfx);
    if (id == -1) return
    sfx.disconnect();
    removeElement(this.playing, id);
  }
}

/**
 * A system that manages agent components by updating them.
 */
class AgentManager extends System{
  /**
   * A list of agents to update every frame.
   * 
   * @type Agent[]
  */
  objects = []
  /**
   * Initializes the manager.
   * 
   * @param {Manager} manager
  */
  init(manager) {
    manager.setComponentList("agent", this.objects);
  }
  /**
   * Update all registered agents.
   * 
   * @param {number} dt
  */
  update(dt) {
    let inv_dt = 1 / dt;
    for (var i = 0; i < this.objects.length; i++) {
      this.objects[i].update(inv_dt);
    }
  }
}

/**
 * Manages the behaviours for an agent.
 * 
 * @package
 */
class BehaviourManager {
  /**
   * A list of behaviors
   * 
   * @type Behaviour[]
   */
  _behaviours = []
  /**
   * Accumulated force from behaviours to apply to agent
   */
  _accumulated = new Vector2$1()
  /**
   * Adds a behavior to the manager
   * 
   * @param {Behaviour} behaviour 
   */
  add(behaviour) {
    this._behaviours.push(behaviour);
    if (this.active) behaviour.init(this._agent);
  }
  /**
   * Removes a behavior to the manager
   * 
   * @param {Behaviour} behaviour 
   */
  remove(behaviour) {
    removeElement(this._behaviours, this._behaviours.indexOf(behaviour));
  }
  /**
   * Boots up the behavoiurs of the agent that contains it.
   * 
   * @param {Agent} agent 
   */
  init(agent) {
    this._agent = agent;
    for (var i = 0; i < this._behaviours.length; i++) {
      this._behaviours[i].init(agent);
    }
  }
  /**
   * Updates the behaviours of the agent and applies changes to agent.
   * 
   * @param {number} inv_dt
   */
  update(inv_dt) {
    let result = new Vector2$1();
    this._accumulated.set(0, 0);
    for (let i = 0; i < this._behaviours.length; i++) {
      this._behaviours[i].calc(result, inv_dt);
      this._accumulated.add(result);
    }
    this._agent.acceleration.add(this._accumulated);
    this._agent.orientation.value = Vector2$1.toRad(this._agent.velocity);
  }
  /**
   * Removes all behaviours from a manager.
   */
  clear() {
    clearArr(this._behaviours);
  }
  /**
   * @ignore
   * Used for visually debugging items.
   */
  draw(renderer) {
    this._behaviours.forEach(b => b.draw(renderer));
  }
}

/**
 * This is a component class used to add AI behavior to an entity.
 */
class Agent extends Component{
  /**
   * The position of the entity.
   * 
   * @type Vector2
   */
  position = null
  /**
   * The velocity of the entity.
   * 
   * @type Vector2
   */
  velocity = null
  /**
   * The acceleration of the entity.
   * 
   * @type Vector2
   */
  acceleration = null
  /**
   * The orientation of the entity.
   * 
   * @type Angle
   */
  orientation = null
  /**
   * The rotation of the entity.
   * 
   * @type Angle
   */
  rotation = null
  /**
   * The maximum speed of the agent in pixels per second.
   * 
   * @type number
   */
  maxSpeed = 20
  /**
   * Maximum rotation of the agent in radians per second
   * Not yet implemented.
   */
  maxTurnRate = 5
  /**
   * 
   * @private
   * @type BehaviourManager
   */
  behaviours = new BehaviourManager()
  /**
   * @inheritdoc
   * @param {Entity} entity
   */
  init(entity) {
    this.requires(entity,"transform", "movable");
    let move = entity.get("movable"),
      transform = entity.get("transform");
    this.velocity = move.velocity;
    this.rotation = move.rotation;
    this.position = transform.position;
    this.orientation = transform.orientation;
    this.acceleration = move.acceleration;
    this.behaviours.init(this);
  }
  /**
   * Adds a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  add(behaviour) {
    this.behaviours.add(behaviour);
  }
  /**
   * Removes a behavior to the agent.
   * 
   * @param {Behaviour} behaviour
   */
  remove(behaviour) {
    this.behaviours.remove(behaviour);
  }
  /**
   * @inheritdoc
   * @param {number} inv_dt Inverse of delta time i.e frameRate.
   */
  update(inv_dt) {
    this.behaviours.update(inv_dt);
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.behaviours.draw(ctx);
  }
}

/**
 * Base class for implementing customized behaviours.
 * 
 * @abstract
 */

class Behaviour {
  /**
   * The position of the agent.
   * 
   * @type Vector2
   */
  position = null
  /**
   * The velocity of the agent.
   * 
   * @type Vector2
   */
  velocity = null
  /**
   * The maximum speed a behaviour will reach when active.
   * 
   * @type number
   */

  maxSpeed = 1000
  /**
   * Maximum force a behaviour will exert on the agent.This affects acceleration, deceleration and turn rate of the agent.
   * 
   * @type number
   */
  maxForce = 1000
  /**
   * Whether to exert a behaviour's calculated force onto its agent
   */
  active = true

  /**
   * Sets up a behavior to work on an agent.
   * 
   * @param {Agent} agent
   */
  init(agent) {}
  /**
   * Calculates the amount of force required to satisfy a behavior.
   * 
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target, inv_dt) {}
  /**
   * Used to debug a behavior visually.
   * 
   * @param {Renderer} renderer
   */
  draw(renderer) {}
}

let tmp1$4 = new Vector2$1();
/**
 * Creates a behaviour to evade a certain position.
 * 
 * @augments Behaviour
*/
class EvadeBehaviour extends Behaviour {
  /**
   * Distance in which to begin evading.
   * 
   * @type number
  */
  radius = 200
  /**
   * @param { Vector2} pursuer
  */
  constructor(pursuer) {
    super();
    this.pursuer = pursuer;
  }
    /**
   * @inheritdoc
   * @param {Agent} agent
   */
  init(agent) {
    this.position = agent.position;
    this.velocity = agent.velocity;
    
  }
    /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target,inv_dt) {
    let difference = tmp1$4.copy(this.position).sub(this.pursuer);
    let length = difference.magnitude();
    if(length == 0 || length > this.radius)return
    difference.setMagnitude(map(length,0,this.radius,this.maxSpeed,0));
    let steering = difference.sub(this.velocity).multiply(inv_dt);
    
    steering.clamp(0, this.maxForce);
    target.copy(steering);
  }
}

let tmp1$3 = new Vector2$1(),
  tmp2$2 = new Vector2$1();
  
/**
 * Creates a behaviour that is used to make an agent wander in an organic manner.
 * 
 * @augments Behaviour
*/
class WanderBehaviour extends Behaviour {
  /**
   * This sets a point on the perimeter circle that is infront of the agent.
   * 
   * @type number
   */
  _theta = 90
  /**
   * This clamps the offset that modify the WandererBehaviour#theta value each frame.
   * 
  * @type number
  */
  dtheta = 10
  /**
   * How big should the circle in front of the agent be.
  */
  _radius = 100
  constructor() {
    super();
  }
  /**
   * @inheritdoc
   * @param {Agent} agent
   */
  init(agent) {
    this.position = agent.position;
    this.velocity = agent.velocity;
  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target, inv_dt) {

    this._theta += rand(-this.dtheta, +this.dtheta);
    let forward = tmp1$3.copy(this.velocity);
    if (forward.equalsZero())
      Vector2$1.random(forward);
    let radius = this._radius * 0.8;
    forward.setMagnitude(this._radius);
    //ctx.arc(...tmp2.copy(this.position).add(forward), radius, 0, Math.PI * 2)
    //ctx.stroke()
    Vector2$1.fromDeg(this._theta + Vector2$1.toDeg(this.velocity), tmp2$2).multiply(radius);
    forward.add(tmp2$2);
    //forward.draw(ctx,...this.position)
    forward.setMagnitude(this.maxSpeed);
    forward.sub(this.velocity).multiply(inv_dt).clamp(0, this.maxForce);
    target.copy(forward);
  }

}

/**
 * Not impemented.
 * 
 * @augments Behaviour
*/
class Pursuit extends Behaviour {
  constructor() {
    super();
  }
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
  init(){
    
  }
    /**
     * @inheritdoc
     * @param { Vector2} target
     * @param {number} inv_dt
     * @returns Vector2 the first parameter
     */
  calc(target){
    
  }
}

/**
 * not complete.
 * 
 * @augments Behaviour
 */
class Flock extends Behaviour{
  /**
   * @type Agent[]
   */
  neighbours = []
  constructor() {
    super();
  }
  /**
   * @inheritdoc
   * @param {Agent} agent
   * 
   */
  init(agent) {

  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target,inv_dt) {

  }
}

let tmp1$2 = new Vector2$1();
  
/**
 * Creates a behaviour to seek out a target and move towards it.
 * 
 * @augments Behaviour
*/
class SeekBehaviour extends Behaviour {
  /**
   * Not implemented.
   * Radius in which to seek out the target.
   * 
   * @type number
  */
  radius = 100
  /**
   * @type Vector2
  */
  target = null
  /**
   * @param { Vector2} target
  */
  constructor(target) {
    super();
    this.target = target;
  }
    /**
     * @inheritdoc
     * @param {Agent} agent
     */
  init(agent) {
    this.position = agent.position;
    this.velocity = agent.velocity;
  }
    /**
     * @inheritdoc
     * @param { Vector2} target
     * @param {number} inv_dt
     * @returns Vector2 the first parameter
     */
  calc(target,inv_dt) {
    let difference = tmp1$2.copy(this.target).sub(this.position);
    difference.setMagnitude(this.maxSpeed);
    let steering = difference.sub(this.velocity).multiply(inv_dt);
    
    steering.clamp(0, this.maxForce);
    target.copy(steering);
  }
}

let tmp1$1 = new Vector2$1(),
  tmp2$1 = new Vector2$1();

/**
 * This provides a seek behaviour which slows down when the agent approaches a target.
 * 
 * @augments Behaviour
 */
class ArriveBehaviour extends Behaviour {
  /**
   * Radius in which to expect the agent to start slowing down.
   * 
   * @type number
   */
  radius = 1000
  /**
   * @param { Vector2} target
   */
  constructor(target) {
    super();
    this.target = target;
  }

  /**
   * @inheritdoc
   * @param {Agent} agent
   */
  init(agent) {
    this.position = agent.position;
    this.velocity = agent.velocity;
  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target, inv_dt) {
    let difference = tmp1$1.copy(this.target).sub(this.position);
    let velocity = tmp2$1.copy(this.velocity);
    let length = difference.magnitude();

    if (length < this.radius) {
      difference.setMagnitude(map(length, 0, this.radius, 0, this.maxSpeed));
    } else {
      difference.setMagnitude(this.maxSpeed);
    }

    let steering = difference.sub(velocity).multiply(inv_dt);

    steering.clamp(0, this.maxForce);
    steering.draw(ctx, ...this.position);
    target.add(steering);
  }
}

const tmp1 = new Vector2$1();
const tmp2 = new Vector2$1();
/**
 * Creates a behaviour that follows a certain path.
 * 
 * @augments Behaviour
 */
class PathFollowing extends Behaviour {
  /**
   * The path taken by a pathfollowing behaviour.
   * 
   * @type Path
   */
  path = null
  /**
   * @param {Path} path
   */
  constructor(path) {
    super();
    this.path = path;
    path.speed = this.maxSpeed;
  }
  /**
   * @inheritdoc
   * @param { Vector2} target
   * @param {number} inv_dt
   * @returns Vector2 the first parameter
   */
  calc(target, inv_dt) {
    tmp1.copy(this.position);
    let [p1, p2] = this.path.current();
    tmp2.copy(p2).sub(p1).normalize();

    let proj = tmp2.dot(tmp1.sub(p1));
    let projPoint = this.path.update(proj);
    tmp1.copy(projPoint).sub(this.position);
    let length = tmp1.magnitude();
    if (length < this.velocity.magnitude()) {
      tmp1.setMagnitude(map(length, 0, this.maxSpeed, 0, this.maxSpeed));
    }
    let steering = tmp1.sub(this.velocity).multiply(inv_dt);

    steering.clamp(0, this.maxForce);
    target.add(steering);

    return target
  }
  /**
   * Removes all points on the path.
   */
  clear() {
    this.path.clear();
  }
  /**
   * @inheritdoc
   * @param {Agent} agent
   */
  init(agent) {
    this.position = agent.position;
    this.velocity = agent.velocity;
  }
  /**
   * Adds a point into the path.
   * 
   * @param { Vector2} point
   */
  add(point) {
    this.path.add(point);
  }
  /**
   * If the agent should start at the beginning after reaching the ent of the path.
   * 
   * @type boolean
   */
  set loop(x) {
    this.path.loop = x;
  }
  get loop() {
    return this.path.loop
  }
  /**
   * Sets a new path to follow.
   *
   * @param {Path} path
   */
  setPath(path) {
    this.path = path;
  }
  draw(ctx) {
    ctx.beginPath();
    circle(ctx, ...this.path.point(), 4);
    fill(ctx, "blue");
    ctx.closePath();
    ctx.beginPath();
    circle(ctx, ...this.path.point(), this.path.tolerance);
    stroke(ctx, "blue");
    ctx.closePath();
    this.path.draw(ctx);
  }
}

let tmp = new Vector2$1();
class Path {
  /**
   * @private
   * type Vector2[]
   */
  _points = []
  /**
   * @private
   * type number 
   */
  _index = 0
  /**
   * type number 
   */
  speed = 20
  /**
   * type number 
   */
  tolerance = 20
  /**
   * @private
   * type number 
   */
  _lerp_t = 0
  /**
   * @private
   * type number 
   */
  _lerpdist = 0
  /**
   * @private
   * type number[]
   */
  _way = [0, 1]
  /**
   * @private
   * type boolean 
   */
  _finished = false
  /**
   * @private
   * type Vector2 
   */
  _lerpedPoint = new Vector2$1()
  /**
   * type boolean 
   */
  loop = false
  /**
   * @param { Vector2} point
   */
  add(point) {
    this._points.push(point);

    return this
  }
  clear() {
    this._points.length = 0;
    this._way[0] = 0;
    this._way[1] = 0;
    this._lerp_t = 0;
    this._finished = false;

    return this
  }
  /**
   * private
   */
  advance() {
    if (this._points.length < 2) return false
    if (this._way[1] == this._points.length - 1 &&
      !this.loop) return false
    if (
      this._way[1] == this._points.length - 1 &&
      this.loop
    ) {
      this._way[0] = this._points.length - 1;
      this._way[1] = 0;
      this._lerp_t = 0;
      return true
    }
    this._way[0] = this._way[1];
    this._way[1] += 1;
    this._lerp_t = 0;
    return true
  }
  /**
   * 
   * @param {number} lerpdist
   */
  update(lerpdist = this._lerpdist) {
    if (this._finished) return this._lerpedPoint
    let dist = tmp.copy(this._points[this._way[0]]).sub(this._points[this._way[1]]).magnitude();
    this._lerp_t = (this.speed + lerpdist) / dist;
    if (this._lerp_t > 1 && (dist - lerpdist) < this.tolerance) {
      if (!this.advance()) this._finished = true;
    }
    this._lerp_t = clamp(this._lerp_t, 0, 1);
    Vector2$1.lerp(
      this._points[this._way[0]],
      this._points[this._way[1]],
      this._lerp_t,
      this._lerpedPoint
    );
    return this._lerpedPoint
  }
  current() {
    return [
      this._points[this._way[0]],
      this._points[this._way[1]]
      ]
  }
  point() {
    return this._lerpedPoint
  }
  get path() {
    return this._points
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    vertices(ctx, this._points, this.loop);
    stroke(ctx, "lightgreen");
    ctx.closePath();
  }
}

/**
 * Contains values showing which features are supported,general model of the device and browser used.
 */

const DEVICE = {
  /**
   * Whether this device supports WebGPU
   * 
   * @type boolean
   */
  webgpu: false,
  /**
   * Whether this device supports WebGL
   * 
   * @type boolean
   */
  webgl: false,
  /**
   * Whether this device supports 2D canvas
   * 
   * @type boolean
   */
  canvas: false,
  /**
   * Whether this device supports WebAudio
   * 
   * @type boolean
   */
  webAudio: false,
  /**
   * Whether this device supports Audio tag.
   * 
   * @type boolean
   */
  audio: false,

  /**
   * A list of audio extensions this device supports.
   * 
   * @type array<string>
   */
  supportedAudio: [],
  /**
   * A list of image extensions this device supports.
   * 
   * @type array<string>
   */
  supportedImages: [],

  /**
   * Whether this device uses windows
   * 
   * @type boolean
   */
  windows: false,
  /**
   * Whether this device uses MacOS
   * 
   * @type boolean
   */
  mac: false,
  /**
   * Whether this device uses android
   * 
   * @type boolean
   */
  android: false,
  /**
   * Whether this device uses linux
   * 
   * @type boolean
   */
  linux: false,
  /**
   * Whether this device uses IOS
   * 
   * @type boolean
   */
  ios: false,

  /**
   * If browser used is Chrome.
   * 
   * @type boolean
   */
  chrome: false,
  /**
   * If browser used is FireFox.
   * 
   * @type boolean
   */
  firefox: false,
  /**
   * If browser used is Edge.
   * 
   * @type boolean
   */
  edge: false,
  /**
   * If browser used is Internet Explorer.
   * 
   * @type boolean
   */
  ie: false,
  /**
   * If browser used is Safari.
   * 
   * @type boolean
   */
  safari: false,
  /**
   * If browser used is Opera.
   * 
   * @type boolean
   */
  opera: false

};
const ua = navigator.userAgent;
const ae = new Audio();

if (/Android/.test(ua)) {
  DEVICE.android = true;
}
else if (/iP[ao]d|iPhone/i.test(ua)) {
  DEVICE.ios = true;
}
else if (/Linux/.test(ua)) {
  DEVICE.linux = true;
}
else if (/Mac OS/.test(ua)) {
  DEVICE.mac = true;
}
else if (/Windows/.test(ua)) {
  DEVICE.windows = true;
}


if (window.AudioContext && window.AudioBuffer && window.AudioBufferSourceNode) {
  DEVICE.webAudio = true;
}

if (/Chrome/.test(ua)) {
  DEVICE.chrome = true;
}
else if (/Firefox/.test(ua)) {
  DEVICE.firefox = true;
}
else if (/Trident/.test(ua)) {
  DEVICE.edge = true;
}
else if (/Opera/.test(ua))
{
  DEVICE.opera = true;
}
else if (/Safari/.test(ua))
{
  DEVICE.safari = true;
}

if (DEVICE.audio = !!ae.canPlayType)
{
  if (ae.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("ogg");
  }

  if (ae.canPlayType('audio/mpeg;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("mp3");
  }
  if (ae.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("wav");
  }

  if (ae.canPlayType('audio/x-m4a;').replace(/^no$/,'') || ae.canPlayType('audio/aac;').replace(/^no$/, ''))
  {
    DEVICE.supportedAudio.push("m4a");
  }
}

DEVICE.canvas = !!window.CanvasRenderingContext2D;
DEVICE.webgl = !!window.WebGLRenderingContext;

Object.freeze(DEVICE);
Object.freeze(DEVICE.supportedAudio);
Object.freeze(DEVICE.supportedImages);

/**
 * Used to manipulate and read from the cookie string.
 * 
 * @module Cookie
*/

const Cookies = {
  /**
   * Adds a cookie pair to cookies.
   * 
   * @param {string} n Key of the cookie.
   * @param {string} v The value of the cookie.
   * @param {number} [=12000] Max age of the cookie before it is deleted.
  */
  set(n, v, maxAge= 12000) {
    document.cookie = `${n}=${v};maxAge=${maxAge}`;
  },
  /**
   * Returns the value of the given key.
   * 
   * @param {string} n Key of the cookie
   * @returns {string}
  */
  get(n) {
    let arr = document.cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=');
      if (pair[0].includes(n))
        return pair[1]
    }
  },
  /**
   * Removes a cookie by its key from cookies.
   * 
   * @param {string} n Key of the cookie
  */
  delete(n){
    document.cookie = `${n}=; max-age=0`;
  },
  /**
   * Removes all cookies that are contained on the document.
  */
  clear() {
    let arr = document.cookie.split(";");
    for (var i = 0; i < arr.length; i++) {
      let pair = arr[i].split('=');
      this.delete(pair[0]);
    }
  }
};

/**
 * This provides temporary storage when your application tab is open.
 * 
 * @module Session
*/
const Session = {
  /**
   * Adds a value to sessions
   * 
   * @param {string} k 
   * @param {any} v
  */
  set(k,v) {
    let json = JSON.stringify(v);
    sessionStorage.setItem(k,json);
  },
  /**
   * Gets a value from sessions using a key
   * 
   * @param {string} k A key to retrieve a value
  */
  get(k) {
    let json = sessionStorage.getItem(k);
    return JSON.parse(json)
  },
  /**
   * Removes everything from sessions
  */
  clear() {
    sessionStorage.clear();
  }
};

/**
 * This provides permanent storage
*/

const Storage = {
  /**
   * Adds a value to local storage
   * 
   * @param {string} k 
   * @param {any} v
  */
  set(k,v) {
    let json = JSON.stringify(v);
    localStorage.setItem(k,json);
  },
  /**
   * Gets a value from local storage by its key.
   * 
   * @param {string} k
  */
  get(k) {
    let json = localStorage.getItem(k);
    return JSON.parse(json)
  },
  /**
   * Removes everything from local storage 
  */
  clear() {
    localStorage.clear();
  }
};

class IndexedList {
  _keys = new Map()
  _list = []
  get(name){
    return this._list[this._keys.get(name)]
  }
  push(name, value) {
    this._keys.set(name,this._list.length);
    this._list.push(value);
  }
  remove(name) {
    this._list.splice(
      this._keys.get(name),
      1
    );
    this._keys.delete(name);
  }
  values() {
    return this._list
  }
}

/**
 * @param {number} x x-position of entity 
 * @param {number} y y-position of entity 
 * @param {number} a angle in degrees
 */

function createEntity(x, y, a) {
  return new Entity()
    .attach("transform", new Transform$1(x, y, a))
    .attach("movable", new Movable$1())
    .attach("bounds", new Bound$1())
}

/**
 * Creates a new instance of Manager class with given default systems.
 * 
 * @param {Object} [options] 
 * @param {boolean} [options.autoPlay=true] Whether the manager should immediately start playing after initialization
 * @param {Object} [options.files={}] manager is passed onto the Loader.Please check `Loader.load()` for more information on it.
 * @param {boolean} [options.physics=true] Adds physics world as a System.
 * @param {boolean} [options.renderer=true] Adds a renderer as a system.
 * @param {boolean} [options.input=true] Adds input as a system.
 * 
 * @returns {Manager}
 **/
function createManager(options) {
  options = Object.assign({
    autoPlay: true,
    physics: true,
    renderer: true,
    input: true
  }, options);

  let manager = new Manager();

  if (options.input)
    manager.registerSystem("input", new Input());
  if (options.physics) {
    manager.registerSystem("world", new World());
    manager.events.add("collision", defaultCollisionHandler);
    manager.events.add("precollision", defaultPrecollisionHandler);
  }
  if (options.renderer)
    manager.registerSystem("renderer", new Renderer2D());
  return manager
}

//import {System} from "../ecs/index.js"

function fpsDebugger(manager) {
  const container = document.body.appendChild(document.createElement("div"));
  
  container.id = "fps-container";
  container.style.position = "absolute";
  container.style.top = "0px";
  container.style.right = "0px";
  container.style.width = "100px";
  container.style.height = "20px";
  container.style.background = "black";
  container.style.textAlign = "center";
  container.style.color = "white";
  
  manager.registerSystem("fps",{
    updateTime : 0.5,
    timerDt : 0,
    init(manager){
      this.perf = manager.perf;
    },
    update(dt){
      this.timerDt += dt;
      if(this.timerDt < this.updateTime)return
      container.innerHTML = this.perf.fps().toFixed(2);
      this.timerDt = 0;
    }
  });
}

/**
 * @param {Manager} manager
 */
function bodyDebugger(manager) {
  manager.registerSystem("bodydebugger", {
    key: new Map(),
    renderer: null,
    init(manager) {
      this.renderer = manager.getSystem('renderer');
      manager.events.add('add', (entity) => {
        if (entity.has('body')) {
          entity.manager.getSystem('bodydebugger').add(entity.get("body"));
        }
        manager.events.add('remove', (entity) => {
          if (entity.has('body')) {
            entity.manager.getSystem('bodydebugger').remove(entity.get("body"));
          }
        });
      });
    },
    add(body) {
      const sprite = new BodySprite(body);
      sprite.init(body.entity);
      this.renderer.add(sprite);
      this.key.set(body, sprite);
    },
    remove(body) {
      const sprite = this.key.get(body);
      this.renderer.remove(sprite);
      this.key.delete(body);
    },
    update() {}
  });
}

class Ray {
  maxLength = 1000;
  constructor(origin = new Vector2$1(), direction = new Vector2$1()) {
    this._origin = origin;
    this._direction = direction;
  }
  get direction() {
    return this._direction
  }
  set direction(x) {
    this._direction.copy(x);
  }
  get origin() {
    return this._origin
  }
  set origin(x) {
    this._origin.copy(x);
  }
  setOrigin(x, y) {
    this._origin.set(x, y);
  }
  setDirection(x, y) {
    this._direction.set(x, y);
  }
}

class RaycastResult{
  ray = null
  mode = RayCastModes.NONE
  collisions = []
}
class RayCollisionResult{
  distance = 0
  object = null
  points = [ ]
  ray = null
}

/**
 * @enum {number}
 * 
*/
const RayCastModes = {
  NONE : 0,
  NEAREST:1,
  FIRST:2,
  ANY:3
};

class RaycastManager extends System {
  objects = []
  bodies = null
  init(manager) {
    if (!manager.getSystem("world"))
      throw "World is required for running Raycast system."
    
    let renderer = manager.getSystem("renderer");
    manager.setComponentList("raycaster",this.objects);
    this.bodies = manager.getComponentList("body");
    renderer.add({
      context:this,
      render(ctx) {
        this.context.objects.forEach(e=>{
          e.draw(ctx);
        });
      }
    });
  }
  update(){
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].update(this.bodies);
    }
  }
}

class Raycaster extends Component {
  rays = []
  initialDir = []
  _number = 0
  _angle = 0
  _transform = null
  _lastangle = 0
  constructor(number = 1, angleSpace = 0) {
    super();
    this._angle = angleSpace;
    this._number = number;
  }
  init(entity) {
    this.requires(entity, "transform");
    this._transform = entity.get("transform");

    const halfview = this._number * this._angle / 2;
    for (let a = -halfview; a <= halfview; a += this._angle) {
      this.rays.push(new Ray(new Vector2$1(), Vector2$1.fromRad(a)));
      this.initialDir.push(Vector2$1.fromRad(a));
      if (this._angle == 0) break
    }
  }
  update(bodies) {
    const angle = this._transform.orientation.value;
    const rotangle = angle - this._lastangle;
    
    for (var i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      ray.origin.copy(this._transform.position);
      ray.direction.rotate(rotangle);
    }
    this._lastangle = angle;
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.translate(...this._transform.position);

    this.rays.forEach(r => {
      ctx.moveTo(0, 0);
      ctx.lineTo(
        r.direction.x * r.maxLength,
        r.direction.y * r.maxLength
      );
    });
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.stroke();
  }
  add() {
    throw "noooo"
  }
}

export { Agent, AgentManager, AgentSprite, Angle, AngleUpdate, ArriveBehaviour, AudioHandler, Ball, BasicMaterial, Behaviour, Body, BodySprite, Bound$1 as Bound, BoundingBox, BoundingCircle, Box, BufferGeometry, CamController, Camera, Circle, CircleGeometry, Clock, ColorUpdate, Component, Composite, Constraint, Cookies, DEVICE, DOMEventHandler, DistanceConstraint, Easing, Entity, error$1 as Err, EulerSolver, EvadeBehaviour, EventDispatcher, Events, Flock, Geometry, Group, IndexedList, Input, Intergrator, Interpolation, Keyboard, Line, Loader, Manager, Material, Matrix2 as Matrix, Matrix2, Mouse, Movable$1 as Movable, NaiveBroadphase, NarrowPhase, Overlaps, Particle, ParticleSystemSprite, Path, PathFollowing, Perf, Pursuit, QuadTreeBroadphase, Ray, RayCastModes, RayCollisionResult, RaycastManager, RaycastResult, Raycaster, Rectangle, Renderer, Renderer2D, SATNarrowPhase, SeekBehaviour, Session, Sfx, Shape, Signal, SpringConstraint, Sprite, SpriteMaterial, StaticImageMaterial, Storage, System, Touch, Transform$1 as Transform, Triangle, Trigon, Tween, TweenManager, common as Utils, Vec2, Vector, Vector2$1 as Vector2, Vector2Update, Vector3Update, WanderBehaviour, WebGLRenderer, WebGPURenderer, World, arc, bodyDebugger, circle, clamp, createEntity, createManager, defaultCollisionHandler, defaultPrecollisionHandler, degToRad, drawImage, exp, fill, fillText, fpsDebugger, lerp, line, map, mixin, naturalizePair, radToDeg, rand, rect, round, sq, sqrt, stroke, vertices, wrapAngle };
/**
 * @typedef Bounds
 * @property {Vector_like} max
 * @property {Vector_like} min
 *//**
 * @typedef CollisionPair
 * @property {Body} a
 * @property {Body} b
*/

/**
 * @typedef Manifold
 * @property {Body} bodyA 
 * @property {Body} bodyB
 * @property {ContactManifold} contactData
 * @property {number} stmp
 * @property {number} impulse
 * @property {boolean} persistent 
 * @property { Vector2} ca1
 * @property { Vector2} ca2
 * @property {number} restitution
 * @property {number} staticFriction
 * @property {number} kineticFriction
 * @property { Vector2} velA
 * @property { Vector2} velB
 * @property {number} rotA
 * @property {number} rotB
 */

/**
 * @typedef ContactManifold
 * @property {number} lastOverlap
 * @property {number} overlap=-Infinity
 * @property {boolean} done=false
 * @property { Vector2} axis
 * @property { Vector2[]} verticesA
 * @property { Vector2[]} verticesB
 * @property {Shape} vertShapeA
 * @property {Shape} vertShapeB
 * @property {number} contactNo
 * @property {number} indexA
 * @property {number} indexB
 *//**
 * @typedef Vector_like
 * @property {number} x
 * @property {number} y
 */