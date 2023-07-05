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
 * @param {any[]} arr1
 * @param {any[]} arr1
 */
Utils.appendArr = function(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
}
/**
 * Clears an array
 * 
 * @memberof Utils
 * @param {any[]} arr
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
 * @param {any[]} arr
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
 * @param {any[]} arr
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
 * @param {Object} component the class to add methods to.
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

Utils.inheritSystem = function(system) {
  if (system == void 0 || typeof system !== "function") return
  let proto = system.prototype
  if (!proto.init) {
    proto.init = function() {
      Err.warnOnce("Please override the init method in the system " + proto.constructor.name)
    }
  }
  if (!proto.update) {
    proto.update = function() {
      Err.warnOnce("Please override the update method in the system " + proto.constructor.name)

    }
  }
  if (!proto.add) {
    proto.add = function(component) {
      this.objects.push(component)
    }
  }

  if (!proto.remove) {
    proto.remove = function(component) {
      let index = this.objects.indexOf(component)
      Utils.removeElement(this.objects, index)
    }
  }
}