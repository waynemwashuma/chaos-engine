/**@enum {number}*/
export const ShapeType = Object.freeze({
  CIRCLE: 0,
  POLYGON: 1
})
/**@enum {number}*/
export const ObjType = Object.freeze({
  CONSTRAINT: 0,
  BODY: 1,
  COMPOSITE: 2
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
  velocitySolverIterations: 10,
  fixedFrameRate: 1 / 60,
  penetrationSlop: 0.1,
  positionCorrection: true,
  warmStarting: false,
  impulseAccumulation: false,
  separationTolerance: 0.1,

  //For all bodies
  type: BodyType.DYNAMIC,
  mass: 1,
  restitution: 0.6,
  staticFriction: 1,//0.4,
  kineticFriction: 0.8,//0.2,
  boundPadding: 0,
  allowSleep: false,
  aabbDetectionOnly: false,
  collisionResponse: true,
  autoUpdateBound: true
}