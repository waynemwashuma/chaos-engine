import { Err } from "./error.js"
/**
 * Contains a subset of useful functionality.
 * 
 * @module Utils
 */
export const Utils = {}
let tmpID = 0

/**
 * Appends the second array to the first.
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr1
 * @param {T[]} arr2
 */
Utils.appendArr = function appendArr(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
}
/**
 * Clears an array
 * 
 * @memberof Utils
 * @template T
 * @param {T[]} arr
 */
Utils.clearArr = function(arr) {
  for (var i = arr.length; i > 0; i--) {
    arr.pop()
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
Utils.popArr = function(arr, number) {
  let length = arr.length
  for (var i = length; i > length - number; i--) {
    arr.pop()
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
Utils.removeElement = function(arr, index) {
  if (index == -1) return null
  if (arr.length - 1 == index) return arr.pop()

  let temp = arr[index]
  arr[index] = arr.pop()
  return temp
}
/**
 * Generates a unique id when called
 * 
 * @memberof Utils
 */
Utils.generateID = function() {
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
Utils.inheritComponent = function(component, overrideInit = true, overrideUpdate = true) {
  if (component == void 0 || typeof component !== "function") return
  let proto = component.prototype

  if (proto.destroy) {
    let destroy = component.destroy
    proto.destroy = function() {
      this.entity = null
      destroy.call(this)
    }
  } else {
    proto.destroy = function() {
      this.entity = null
    }
  }
  if (proto.init && overrideInit) {
    let init = proto.init
    proto.init = function(entity) {
      this.entity = entity
      init.call(this, entity)
    }
  } else if (!proto.init) {
    proto.init = function(entity) {
      this.entity = entity
    }
  }
  if (!proto.update && overrideUpdate) {
    proto.update = function() {
      Err.warnOnce("Please override the update function in the component " + proto.constructor.name)

    }
  }
  proto.get = function(n) {
    return this.entity.getComponent(n);
  }
  proto.requires = function(...names) {
    for (var i = 0; i < names.length; i++)
      if (!this.entity.has(names[i]))
        Err.throw(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${this.entity.id}`)
  }

  proto.query = function(bound, target = []) {
    return this.entity.query(bound, target)
  }
  if (!proto.toJson) {
    //console.log(proto);
    proto.toJson = function() {
      throw "Error, implement .toJson() in the class " + this.CHOAS_CLASSNAME
    }
  }
  Object.defineProperty(proto, "CHOAS_CLASSNAME", {
    get: function() {
      return this.constructor.name.toLowerCase()
    },
    enumerable: true,
    configurable: false
  })
  Object.defineProperty(proto, "CHAOS_OBJ_TYPE", {
    get: function() {
      return "component"
    },
    enumerable: true,
    configurable: false
  })
}
/**
 * Mixes the functions required by an object  into another object.
 * 
 * @memberof Utils
 *  @param {Object} from the object constructor function to add methods from.
 * @param {Object} to the object constructor function to add methods to.
 */
export function mixin(from, to,props = []) {
  let proto = from.prototype
  let proto2 = to.prototype
  console.log(proto2);
  Object.assign(proto,from)
  for (let name of props) {
    let methodName = props[name]
    //if(!(methodName in proto))continue
    //if (methodName in proto2) continue
    
    proto2[name] = proto[name]
  }
  //console.log(new to());
}