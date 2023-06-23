class Angle {
  constructor(deg) {
    this._deg = deg || 0
    this._rad = deg * Math.PI/2 || 0
  }
  get CHOAS_CLASSNAME() {
    return this.constructor.name.toLowerCase()
  }
  get CHAOS_OBJ_TYPE() {
    return "angle"
  }
  set degree (x){
    this._deg = x
    this._rad = x * Math.PI/180
  }
  set radian(x){
    this._rad = x
    this._deg = x * 180/Math.PI
  }
  get radian(){
    return this._rad
  }
  get degree(){
    return this._deg
  }
  copy(angle){
    this.degree = angle.degree
  }
  
  static fromJSON(obj){
    return new Angle(obj._deg)
  }
}

export{
  Angle
}