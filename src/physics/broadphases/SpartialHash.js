import { Broadphase } from "./broadphase.js"

class Client {
  constructor(obj) {
    this.object = obj
  }
}

/**
 * This is a bounded broadphase that is used to speed up collision testing on dense number of objects over a small area.
 * 
 * @extends Broadphase
 */
class Grid extends Broadphase{
  
}

export{
  Grid// as GridBroadphase
}