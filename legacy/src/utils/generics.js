function getType(obj){
  //check of vector,mesh,body etc...
  return obj instanceof Array?[]:{}
} 
 function clone(obj) {
    let object = getType(obj)
    for (var key in object) {
      let value= obj[key]
      if (typeof value== "object") {
        object[key] = clone(value)
        continue
      }
      object[key] = value
    }
    return object
  }
  
  export {
    clone
  }