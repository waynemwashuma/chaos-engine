import {Vector} from "../../utils/index.js"

class Path{
  _points = []
  lerpfunc = null
  distFunc = null
  _index = 0
  _lerp_t = 0
  _current = new Vector()
  loop = false
  add(point){
    this._points.push(point)
    
    return this
  }
  
  clear(){
    this._points.length = 0
		this._index = 0

		return this
  }
  remove(){
    
  }
  update(dt){
    
  }
}