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
  if (component == void 0 || typeof component !== "function") return
  let proto = component.prototype

  if (proto.destroy) {
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
  if (proto.init) {
    let init = proto.init
    proto.init = function(entity) {
      this.entity = entity
      init.call(this, entity)
    }
  } else {
    proto.init = function(entity) {
      this.entity = entity
    }
  }
  if (!proto.update) {
    proto.update = function() {
      Err.warnOnce("Please override the update function in the component " + proto.constructor.name)

    }
  }
  proto.getComponent = function(n) {
    return this.parent.getComponent(n);
  }
  proto.requires = function(...names) {
    for (var i = 0; i < names.length; i++)
      if (!this.entity.has(names[i]))
        Err.throw(`The component \`${this.CHOAS_CLASSNAME}\` requires another component \`${names[i]}\` but cannot find it in the Entity with id ${this.entity.id}`)
  }

  proto.query = function(bound, target = []) {
    return this.parent.query(bound, target)
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
      Utils.removeElement(this.objects,index)
    }
  }
}