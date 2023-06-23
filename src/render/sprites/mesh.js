import { Vector,Angle }from "../../math/index.js"

export class Mesh {
    /**
   * @private
   */
  _position = new Vector()
  /**
   * @private
   */
  _orientation = new Angle()
  scale = new Vector(1, 1)
  /**
   * @private
   */
  _children = []
  /**
   * @private
   */
  parent = null
  get angle() {
    return this._orientation.radian * 180 / Math.PI
  }
  set angle(x) {
    this._orientation.degree = x
  }
  get position() {
    return this._position
  }
  set position(x) {
    this._position.copy(x)
  }
  get orientation() {
    return this._orientation
  }
  set orientation(x) {
    this._orientation.copy(x)
  }
  constructor(geometry, material,options ={}) {
    this.geometry = geometry
    this.material = material
    if(options.selfInit)this.init()
  }
  render(render) {
    let x = this._position.x,
      y = this._position.y

    render.begin()
    render.translate(x, y)
    render.rotate(this._orientation.radian)
    render.scale(...this.scale)
    this.geometry.render(render)
    this.material.render(render)
    render.close()
    render.reset()
  }
  init(entity) {
    this.entity = entity
    this.requires("transform")
    let transform = entity.get("transform")
    this._position = transform.position
    this._orientation = transform.orientation
    this.bounds = parent.bounds
  }
  
}