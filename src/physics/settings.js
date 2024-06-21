/**@enum {number}*/
export const ShapeType = Object.freeze({
  CIRCLE: 0,
  POLYGON: 1
})

/**@enum {number}*/
export const BodyType = Object.freeze({
  DYNAMIC: 2,
  KINEMATIC: 1,
  STATIC: 0
})

//Default settings 
export const Settings = {

  //For the world
  posDampen: 0.3,
  linearDamping: 0.001,
  angularDamping: 0.001,
  velocitySolverIterations: 1,
  fixedFrameRate: 1 / 60,
  penetrationSlop: 0.01,
  separationTolerance: 0.1,

  //For all bodies
  type: BodyType.DYNAMIC,
  mass: 1,
  restitution: 1,//0.6,
  staticFriction: 1,//0.4,
  kineticFriction: 0.5,//0.2,
  boundPadding: 0,
}