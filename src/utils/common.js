import { Err } from "./error.js"

export const Utils = {}
let tmpID = 0
Utils.appendArr = function(arr1, arr2) {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i])
  }
}
Utils.clearArr = function(arr) {
  for (var i = arr.length; i > 0; i--) {
    arr.pop()
  }
}
Utils.popArr = function(arr, number) {
  let length = arr.length
  for (var i = length; i > length - number; i--) {
    arr.pop()
  }
}
Utils.removeElement = function(arr, index) {
  if (index == -1) return null
  if (arr.length - 1 == index) return arr.pop()

  let temp = arr[index]
  arr[index] = arr.pop()
  return temp
}
Utils.generateID = function() {
  return (tmpID += 1)
}

Utils.inheritComponent = function(component) {
  if (component == void 0 || typeof component !== "object") return
  if (component.CHAOS_CLASSNAME || component.CHAOS_OBJ_TYPE) return
  
  let proto = component.prototype || component.__proto__
  if (component.destroy) {
    let destroy = component.destroy
    proto.destroy = function() {
      this.parent = null
      destroy.call(this)
    }
  } else {
    proto.destroy = function() {
      this.parent = null
    }
  }
  if (component.init) {
    let init = component.init
    proto.init = function(parent) {
      this.parent = parent
      init.call(this, arguments)
    }
  } else {
    proto.init = function(parent) {
      this.parent = parent
    }
  }
  if (!component.update) {
    proto.update = function() {
      Err.warn("Please override the update function in the class " + this.CHAOS_CLASSNAME)
    }
  }
  proto.getComponent = function(n) {
    return this.parent.getComponent(n);
  }
  proto.requires = function(...names) {
    for (var i = 0; i < names.length; i++)
      if (!this.parent.has(names[i]))
        Err.throw(`The component \`${this.CHOAS_TYPE}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${this.parent.id}`)
  }

  proto.query = function(bound, target = []) {
    return this.parent.query(bound, target)
  }
  Object.defineProperty(proto, "CHOAS_CLASSNAME", {
    get: function() {
      return this.constructor.name
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

