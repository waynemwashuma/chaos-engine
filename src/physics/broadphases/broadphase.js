class Broadphase {
  canCollide(a, b) {
    
    if (a.mass == 0 && b.mass == 0)
      return false
    if (
      (a.mask.group !== 0 && b.mask.group !== 0) &&
      a.mask.group == b.mask.group
    ) return false
    if (a.mask.layer && b.mask.layer && a.mask.layer !== b.mask.layer)
      return false
    if(a.sleeping && b.sleeping) return false
    //console.log(a.mass,b.mass);
    return true
  }
  insert() {}
  remove() {}
  traverse(func) {}
  draw(ctx) {}
  update(obj) {}
  remove(obj) {}
}

export {
  Broadphase
}