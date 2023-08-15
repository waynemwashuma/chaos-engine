/**
 * @interface
*/
export class Material{
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} dt
   * @param {Path2D} [path]
  */
  render(ctx,dt,path){
    throw "Override this method in derived class"
  }
}
