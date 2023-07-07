/**
 * @interface Icomponent
 * 
 * @method {(entity:Entity):void} init
 * @method {(dt:number):void} update
 * @method {(name:string):Icomponent} get
 * @method {(region:Bounds,target?:Entity[]):Entity[]} query
 */

/**
 * @interface Isystem
 * 
 * @method {(component:Icomponent):void} add
 * @method {(component:Icomponent):void} remove
 * @method {(manager:Manager):void} init
 * @method {(dt:number):void} update
 */